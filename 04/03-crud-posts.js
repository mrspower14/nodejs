const express = require("express");
const winston = require("winston");
const app = express();

//logger 생성
//debug, info, warn, error 
const logger = winston.createLogger({
    level: "info",      //개발환경에서는 debug, 운영환경에서는 info~error 
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({timestamp, level, message}) => {
            return `${timestamp} [${level}] : ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: "app.log"})
    ]
});

// 1.미들웨어
app.use(express.json());    //POST/PUT BODY JSON 담기 위해서 

// 2.첫번째 미들웨어 생성 //공통으로 처리할 내용을 넣어..(인증,로그)
app.use((req, res, next) => {
    // const fullUrl = req.protocol + '://' + req.headers.host + req.originalUrl;
    // console.log('현재 접속 주소:', fullUrl);

    console.log(`${req.url} - ${req.method}`);
    next(); //다음 단계 라우터로 넘어가세요. next() 호출 안하면 응답 멈춤. 반드시 필요 **
});
// 3.winston 미들웨어 생성
// tail -f app.log => 로그파일 실시간으로 조회 
app.use((req, res, next) => {
    logger.info(`${req.url} - ${req.method}`);
    next();
})

let posts = [
    {id: 1, title: "첫 번째 글", content: "안녕하세요", author: "김철수"}
];

let nextId = 2; //새 글의 ID 부여 위해서 사용

// 목록 조회
app.get("/posts", (req, res) => {
    //1. json 으로 posts 객체를 클라이언트에 반환하는 코드를 작성해보세요.
    res.json(posts);
});

// 글쓰기 POST method 
app.post("/posts", (req, res) => {
    const {title, content, author} = req.body;  //구조분해할당
    
    if (!title || !content) {
        return res.status(400).json({message: "title과 content는 필수입니다."});
    }

    const post = { id: nextId++, title, content, author: author || "익명"};
    posts.push(post);

    res.status(201).json(post);
});

//게시글 수정
app.put("/posts/:id", (req, res) => {
    //1. 해당되는 게시글 가져오기
    const post = posts.find((p) => p.id === Number(req.params.id));
    if (!post) {
        return res.status(404).json({message: "게시물을 찾을 수 없습니다."});
    }

    //2.req.body > title, content, author 변수에 넣기 (구조분해 할당)
    const {title, content, author} = req.body;
    // title, content, author post에 업데이트 
    if (title   !== undefined) post.title = title;
    if (content !== undefined) post.content = content;
    if (author  !== undefined) post.author = author;

    res.json(post);
});

// 게시글 하나 가져오기 
app.get("/posts/:id", (req, res) => {
    const post = posts.find((p) => p.id === Number(req.params.id));
    if (!post) {
        return res.status(404).json({message: "게시물을 찾을 수 없습니다."});
    }
    res.json(post);
});

// 삭제
app.delete("/posts/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = posts.findIndex((p) => p.id === id);
    if (index === -1) {
        return res.status(404).json({message: "게시물을 찾을 수 없습니다."});
    }

    //게시글 삭제 splice(index, 1) => 샥제(인덱스, 1개)
    const [removed] = posts.splice(index, 1);
    res.json({message: "삭제됨", post: removed});
});


app.listen(3000, () => {
    console.log("http://localhost:3000 에서 실행 중")
});