const { Sequelize, DataTypes, Op } = require("sequelize");  //Op: where 조건에서 like 사용 
const path = require("path");
const { title } = require("process");

//sequelize orm 객체 생성
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.join(__dirname, "basics.db"),
    logging: true
});

// 테이블 = 모델 을 만들어야 
// 모델 orm 
const Post = sequelize.define("Post", {
    title: {type: DataTypes.STRING, allowNull: false},
    content: {type: DataTypes.TEXT, allowNull: false},
    author: {type: DataTypes.STRING}
});

async function main() {
    //await sequelize.sync();               // = sync({force: false})
    await sequelize.sync({force: true}); //테이블 있으면 재생성 안함

    //insert = create
    // insert into Posts (title, content, author) values (?, ?, ?);
    await Post.create({title: "첫 번째 글", content: "안녕하세요. 첫번째", author: "김철수"});
    await Post.create({title: "두 번째 글", content: "안녕하세요. 두번째", author: "이영희"});
    await Post.create({title: "세 번째 글", content: "안녕하세요. 세번째", author: "김바둑"});

    //select * from Posts
    const all = await Post.findAll();
    //console.log(all);
    all.forEach((a) => {
        console.log(a.dataValues);
        //console.log(a.title, a.content, a.author);
    });
    // for (const a of all ){
    //     console.log(a.dataValues);
    // }

    console.log("");
    //select * from Posts where id = 1 
    const first = await Post.findByPk(1);
    console.log(first.title, first.content, first.author);

    //select * from Posts where author='이영희'
    const second = await Post.findAll({
        where: {
            author: '이영희'
        }
    });
    second.forEach((a) => {
        console.log(a.dataValues);
    });

    //UPDATE Posts SET title = "1번 제목 수정" WHERE id = 1 
    const post = await Post.findByPk(1);
    post.title = "1번 제목 수정";
    await post.save();
    console.log("수정된 후 1번글", (await Post.findByPk(1)).title);

    //DELETE FROM `Posts` WHERE `id` = 2
    await Post.destroy({ where: {id: 2}});
    console.log("삭제된 후 전체 글 수", (await Post.count()));  //select count(*) from Posts 

    // INSERT INTO `Posts` (`id`,`title`,`content`,`author`,`createdAt`,`updatedAt`) 
    //  VALUES (NULL,'Node.js입문','Node 연습부터','김철수','2026-06-09 02:09:32.217 +00:00','2026-06-09 02:09:32.217 +00:00'),
    //         (NULL,'Express.js입문','Express 연습부터','김기남','2026-06-09 02:09:32.217 +00:00','2026-06-09 02:09:32.217 +00:00'),
    //         (NULL,'Nest.js입문','Nest 연습부터','김영희','2026-06-09 02:09:32.217 +00:00','2026-06-09 02:09:32.217 +00:00');
    // insert into Posts(title, content, author) value (?,?,?),(?,?,?),(?,?,?);
    //bulk insert 
    await Post.bulkCreate([
        { title: "Node.js입문", content: "Node 연습부터", author: "김철수"},
        { title: "Express.js입문", content: "Express 연습부터", author: "김기남"},
        { title: "Nest.js입문", content: "Nest 연습부터", author: "김영희"}
    ]);

    //select * from Posts where author='김철수'
    const byAuthor = await Post.findAll({
        where: { author: "김철수"}
    })
    //console.log(byAuthor);
    byAuthor.forEach((author) => {
        console.log(author.dataValues);
    });

    //select * from Posts where title like '%Express%'
    const likeTitle = await Post.findAll({
        where: { title: { [Op.like] : "%Express%"}}
    });
    console.log("Op.like", likeTitle.map((p) => p.title));

    //select id, title from Posts order by id asc, title desc Limit 2 
    const titleOnly = await Post.findAll({
        attributes: ["id", "title"],
        order: [["id", "ASC"], ["title", "DESC"]],
        limit: 2
    });
    console.log("titleOnly", titleOnly.map((p) => p.toJSON()))

    // 1건만 가져온다.
    const one = await Post.findOne({
        where: { author: "김철수"},
        order: [["id", "ASC"]]
    });
    console.log("one", one.toJSON());

    //김철수 -> 이철수로 변경
    //update Posts set author = '이철수' where author = '김철수'
    const [affected] = await Post.update({author: "이철수"}, {where: {author: "김철수"}});
    console.log(affected);

    // select 문 넣어서 실행 
    const rawRows = await sequelize.query(
        "select id, title, author from Posts where author = :author",
        {
            replacements: {author: "이철수"},
            type: Sequelize.QueryTypes.SELECT,  //select 결과를 배열로..
        }
    );
    console.log("rawRows", rawRows);

    //select * from Posts where id in (1, 3, 5)
    const inIds = await Post.findAll({
        where: { id: { [Op.in] : [1, 3, 5]}}
    })
    console.log("inIds", inIds.map((p) => p.toJSON()));

    //select * from Posts where author="김기남" and title like "%Express%"
    const andCond = await Post.findAll({
        where: {
            [Op.and] : [{author: "김기남"}, {title: {[Op.like]: "%Express%"}}] 
        }
    });
    console.log("andCond", andCond.map((p) => p.toJSON()));

    //select * from Posts where (author="김기남" and title like "%Express%") or (author="김영희" and title like "%Nest%")
    const andOrCond = await Post.findAll({
        where: {
            [Op.or] : 
                [
                    {[Op.and] : [{author: "김기남"}, {title: {[Op.like]: "%Express%"}}]},
                    {[Op.and] : [{author: "김영희"}, {title: {[Op.like]: "%Nest%"}}]}
                ]
        }
    });
    console.log("andOrCond", andOrCond.map((p) => p.toJSON()));
}


main();