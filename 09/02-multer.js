//npm i multer morgan nodenom
const express = require("express");
const app = express();
const port = 3000;
const morgan = require("morgan");   //요청 라우터,메소드를 보여준다.
const fs = require("fs");           //filesystem 내장모듈
const multer = require("multer");
const path = require("path");

try {
    fs.readdirSync('upload');
} catch(e) {
    console.log('upload 폴더 생성');
    fs.mkdirSync('upload');
}

//미들웨어 
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {   //저장위치 done: callback 
            done(null, 'upload/');       //upload/
        },
        filename(req, file, done) {     //파일명을 unique 하게
            const ext = path.extname(file.originalname);                //파일 확장자 
            const baseName = path.basename(file.originalname, ext);     //확장자 뺀 이름
            const newName = baseName + Date.now() + ext;
            done(null, newName);
        }
    }),
    limits: { fileSize: 1024 * 1024 * 10 }  //10메가 용량 제한
});

//파일 하나 받는 api //postman 에서 //form-data 로 보낸다.
app.post("/upload", upload.single('image'), (req, res) => {
    console.log(req.file);
    console.log(req.body);
    res.send({success: true, image: req.file.filename});
});

//파일 여러개를 하나의 키로 전송
app.post("/uploadimages", upload.array('images'), (req, res) => {
    console.log(req.files);
    console.log(req.body);
    res.send({success: true, image: req.files});
});

//여러파일을 각각의 키로 전송
app.post("/uploadfiles", 
         upload.fields([{name: 'image'}, {name: 'pdf'}]), 
         (req, res) => {
    console.log(req.files);
    console.log(req.body);
    res.send({success: true, image: req.files.image, pad: req.files.pdf});
    //res.status(201).json({success: true, image: req.files.image, pad: req.files.pdf});
});

//파일 전달 (bmp1개 )
app.get("/image", (req, res) => {
    const filename = req.query.filename;
    const pathName = path.join(__dirname, '/upload/', filename);
    return res.sendFile(pathName);
    //return res.sendFile(process.cwd() + "/upload/" + filename);
});


app.listen(port, () => {
    console.log(`Server start at ${port}`);
});