const express = require("express");
const app = express();

const posts = [
    {id: 1, title: "첫 번째 글", content: "안녕하세요", author: "김철수"},
    {id: 2, title: "두 번째 글", content: "반갑습니다", author: "이형희"},
    {id: 3, title: "세 번째 글", content: "또 만나요", author: "김태연"},
];

//http://localhost:3030/posts
app.get("/posts", (req, res) => {
    res.json(posts);
})

//http://localhost:3030/posts?author=김철수      // * 쿼리
app.get("/posts", (req, res) => {
    const { author } = req.query;   //GET 쿼리 가져오기 
    //console.log(author, title);
    if (author) {
        //return posts.filter((post) => post.author === author);
        return res.json(posts.filter((post) => post.author === author));
    }
    res.json(posts);
})


//http://localhost:3030/posts/1                     // * 파람
app.get("/posts/:id", (req, res) => {
    const id = Number(req.params.id);       //string으로 옴  :
    const post = posts.find((p) => p.id === id);
    if (!post) {
        return res.status(404).json({message: "게시물을 찾을 수 없습니다."});
    }
    res.json(post);     //==res.status(200).json(post);
})

app.listen(3000, () => {
    console.log("http://localhost:3030 에서 실행 중")
});