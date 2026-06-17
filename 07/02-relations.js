const path = require("path");
const { Sequelize, DataTypes} = require("sequelize");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.join(__dirname, "relations.db"),
    logging: true
});

const User = sequelize.define("User", {name: DataTypes.STRING});
const Post = sequelize.define("Post", {title: DataTypes.STRING, content: DataTypes.TEXT});
const Comment = sequelize.define("Comment", {content: DataTypes.TEXT});

User.hasMany(Post);     //users 1 : posts N
Post.belongsTo(User);   //posts N : users 1

Post.hasMany(Comment);  //posts 1 : comments N
Comment.belongsTo(Post);//comments N : posts 1

async function main(){
    await sequelize.sync();
    //await sequelize.sync({force: true}); //테이블 있으면 재생성 안함
    let post;
    const user1 = await User.create({name: "김철수"});
    post = await Post.create({title: "세 게시글", content: "내용이예요 감사합니다.", UserId: user1.id});
    
    await Comment.create({content: "좋은 글입니다.", PostId: post.id});
    await Comment.create({content: "좋은 날씨입니다.", PostId: post.id});
    await Comment.create({content: "맛점 하세요.", PostId: post.id});

    // const result = await Post.findByPk(post.id, {
    //     include: [User, Comment]
    // });
    // console.log(result.title, result.User, result.Comments);
    // console.log(result.toJSON());

    // //모든 게시글을 가져 오는데 게시글의 작성자와 댓글을 같이 출력해보세요.
    // const resultAll = await Post.findAll(
    //     {
    //         include: [User, Comment]
    //     }
    // )
    // console.log(resultAll.map((p) => p.toJSON()));

    const user11 = await User.findByPk(1, {
        include: [{model: Post}]
    });

    console.log("user11:", user11.toJSON());



}

main();