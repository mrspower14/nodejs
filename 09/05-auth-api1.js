const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;

const multer = require("multer");
const path = require("path");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({extened: true}));

//.env 에서 가져오기 
require("dotenv").config();
const secret = process.env.JWT_SECTET;
const saltRound = Number(process.env.SALT_ROUND);

const users = [];
const posts = [];
let userId = 1;
let postId = 1;

try {
    fs.readdirSync('users');
} catch(e) {
    console.log('users 폴더 생성');
    fs.mkdirSync('users');
}

const upload = multer({
    storage: multer.diskStorage ({
        destination(req, file, done) {
            done(null, 'users/');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            const newName = path.basename(file.originalname, ext) + Date.now() + ext;
            done(null, newName);
        }
    }),
    limits: {fileSize: 1024 * 1024 * 10}
});

app.post("/userRegister", upload.single('image'), async (req, res) => {
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({success: false, message: "name, email, password는 필수입니다."});
    }

    if (users.find((e) => e.email === email)) {
        return res.status(409).json({success: false, message: "이미 가입한 이메일 입니다."});
    }

    const hash = await bcrypt.hash(password, saltRound);
    const user = {id: userId++, name, email, password: hash};
    users.push(user);

    res.status(201).json({success: true, data:{id: user.id, name: user.name, email: user.email, image: req.file.filename}});
});

// 회원가입
app.post("/register", async (req, res) => {
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({success: false, message: "name, email, password는 필수입니다."});
    }

    if (users.find((e) => e.email === email)) {
        return res.status(409).json({success: false, message: "이미 가입한 이메일 입니다."});
    }

    const hash = await bcrypt.hash(password, saltRound);
    const user = {id: userId++, name, email, password: hash};
    users.push(user);

    res.status(201).json( {success: true, data:{id: user.id, name: user.name, email: user.email}});
});

//로그인
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({success: false, message: "email, password는 필수입니다."});
    }

    const user = users.find((user) => user.email === email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({success: false, message: "email 또는 password가 올바르지 않습니다."});
    }

    const token = jwt.sign({id: user.id, name: user.name}, secret, {expiresIn: "1h"});
    res.json({success: true, token});
    //token:
    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Iuq5gOyyoOyImCIsImlhdCI6MTc4MTA3NDIyNSwiZXhwIjoxNzgxMDc3ODI1fQ.JkEVHBBKj_D3XZrRUVGzY7QteMoJkmeuBHlG8Jg2wK0
});

function auth(req, res, next) {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) {
        return res.status(401).json({success: false, message: "토큰이 없습니다."});
    }

    try {
        req.user = jwt.verify(token, secret);
        next();
    } catch(err) {
        return res.status(401).json({success: false, message: "유효하지 않은 토큰입니다."});
    }

}

//게시글 작성 
app.post("/posts", auth, (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({success: false, message: "title, content는 필수입니다."});
    }

    const post = { id: postId++, title, content, name: req.user.name };
    posts.push(post);

    res.status(201).json({ success: true, post })

});


// //게시글 작성 auth 체크 안함.
// app.post("/posts", (req, res) => {
//     const { title, content } = req.body;
//     if (!title || !content) {
//         return res.status(400).json({success: false, message: "title, content는 필수입니다."});
//     }

//     const post = {id: postId++, title, content};
//     posts.push(post);

//     res.status(201).json({ success: true, post })

// });

// 게시글 전체 가져오기  
app.get("/posts", auth, (req, res) => {
    res.status(200).json({success: true, posts});
});



app.listen(port, () => {
    console.log(`Server start at ${port}`);
})