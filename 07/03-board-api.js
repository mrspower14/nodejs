const express = require("express");
const { Sequelize, DataTypes} = require("sequelize");
const path = require("path");

const app = express();
app.use(express.json());

const sequelize = new Sequelize ({
    dialect: "sqlite",
    storage: path.join(__dirname, "board.db"),
    logging: false  
});

const Post = sequelize.define("Post", {
    title: {type: DataTypes.STRING, allowNull: false},
    content: {type: DataTypes.TEXT, allowNull: false},
    author: {type: DataTypes.STRING}
});

//게시글 생성 라우터 
app.post("/posts", async (req, res) => {
    const { title, content, author } = req.body;

    if (!title || !content) {
        return res.stutue(400).json({message: "제목과 본문은 필수입니다."});
    }

    const post = await Post.create({title, content, author});
    res.status(201).json(post);
})

//게시글 전체 가져오기  
app.get("/posts", async (req, res) => {
    const posts = await Post.findAll({
        attributes: ["id", "title", "content", "author"],
        order: [["id", "desc"]]
    });

    res.json(posts);
});

//게시글 상세 가져오기 
app.get("/posts/:id", async (req, res) => {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
        return res.status(404).json({message: "게시물을 찾을 수 없습니다."});
    }
    
    res.json(post);
});

//게시글 수정
app.put("/posts/:id", async (req, res) => {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
        return res.status(404).json({message: "게시물을 찾을 수 없습니다."});
    }

    const {title, content, author} = req.body;
    if (title !== undefined && title) post.title = title;
    if (content !== undefined && content) post.content = content;
    if (author !== undefined && author) post.author = author;

    await post.save();

    res.json(post);
})

//게시글 삭제
app.delete("/posts/:id", async (req, res) => {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
        return res.status(404).json({message: "게시물을 찾을 수 없습니다."});
    }

    await post.destroy();
    res.json({message: "삭제됨", post});

    // await Post.destroy({ where: {id: req.params.id}});
    // res.json({message: "삭제됨"});
})



async function main() {
    // model 생성
    await sequelize.sync();
    // express 기동
    app.listen(3000, () => console.log('localhost:3000 서버 실행 중'));
}
main();