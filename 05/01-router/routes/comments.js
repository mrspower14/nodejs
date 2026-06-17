//댓글 관리

const express = require("express");
const router = express.Router();

const comments = [
    {id: 1, postId: 1, content: "좋은 글입니다."},
    {id: 2, postId: 1, content: "감사합니다."},
    {id: 3, postId: 2, content: "아주 좋은 글입니다."}
];

//http://localhost:3000/comments 
router.get("/", (req, res) => {
    res.json(comments);
});

//http://localhost:3000/comments/1
router.get("/:id", (req, res) => {
    const comment = comments.filter((c) => c.postId === Number(req.params.id));
    if (!comment) {
        return res.status(200).json({message: "댓글이 없습니다."});
    }
    res.json(comment);
});


module.exports = router;