const { Post, User } = require("../models");

const withAuthor = { include: [{model: User, as:"author", attributes: ["id", "name" ] }] };

//게시글 목록
const listWithAuthor = () => {
    return Post.findAll({...withAuthor, order: [["id", "desc"]]});
}

//게시글 목록
const list = () => {
    return Post.findAll({ order: [["id", "desc"]]});
}


//게시글 상세
const getWithAuthor = (id) => {
    return Post.findByPk(id, withAuthor);
}

//게시글 상세 
const get = (id) => {
    return Post.findByPk(id);
}

//게시글 쓰기   
const create = ({title, content, author}) => {
    return Post.create({title, content, author});
}


//게시글 쓰기   
const update = async (id, {title, content, author}) => {
    const post = await Post.findByPk(id);
    if (!post) return null;
    if (title !== undefined && title) post.title = title;
    if (content !== undefined && content) post.content = content;
    if (author !== undefined && author) post.author = author;

    await post.save();

    return post;
}


const remove = async (id) => {
    const post = await Post.findByPk(id);
    if (!post) return null;
    await post.destroy();
    return post;
}


module.exports = { list, get, create, update, remove }