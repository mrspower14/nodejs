const express = require("express");
const { sequelize, User, Post } = require("./models");
const postRoute = require("./routes/postRoute");
const userRoute = require("./routes/userRoute");

const app = express();
app.use(express.json());

app.use("/users", userRoute);
app.use("/posts", postRoute);

async function main() {
    await sequelize.sync();
    if ((await User.count()) === 0) {
        const user = await User.create(({name: "김철수", email: "aa@naver.com"}));

        await Post.bulkCreate([
            { title: "첫 번째 글", content: "MVC 구조로 만든 게시판.", userId: user.id},
            { title: "두 번째 글", content: "계층을 나눠 관리합니다.", userId: user.id},
        ]);
    }

    app.listen(3000, () => console.log('localhost:3000에서 서버 실행중'));
}

main();