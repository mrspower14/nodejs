const postService = require("../services/postService");

//게시글 목록
const list = async (req, res) => {
    const result = await postService.list();
    res.json(result);
}

//게시글 상세 조회
const get = async (req, res) => {
    const post = await postService.get(req.params.id);
    if (!post) {
        res.status(404).json({message: "게시물을 찾을 수 없습니다."})
    }
    res.json(post);
}

//게시글 쓰기 
const create = async (req, res) => {
    const { title, content, author } = req.body;
    if (!title || !content ) {
        return res.status(400).json({message: "제목과 내용은 필수예요"});
    }

    const post = await postService.create({title, content, author});
    res.status(201).json(post);
}


const update = async (req, res) => {
    const { title, content, author } = req.body;
    const post = await postService.update(req.params.id, {title, content, author});
    if (!post) {
        res.status(404).json({message: "게시물을 찾을 수 없습니다."})
    }

    res.json(post);
}

const remove = async (req, res) => {
    const post = await postService.remove(req.params.id);
    if (!post) {
        res.status(404).json({message: "게시물을 찾을 수 없습니다."})
    }

    res.json({messge: "삭제됨", post});
}

module.exports = { list, get, update, remove, create }