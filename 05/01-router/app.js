const express = require("express");
const app = express();

app.use(express.json()); //POST/PUT BODY JSON 담기 위해서 

const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");

// http://localhost:3000/posts -> postsRouter 전달하세요.
app.use("/posts", postsRouter);

// http://localhost:3000/comments -> commentsRouter 전달하세요.
app.use("/comments", commentsRouter);

app.listen(3000, () => {
    console.log("3000포트 서버 실행 중...")
})