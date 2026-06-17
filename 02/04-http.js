const http = require("http");   //Common JS module

const server = http.createServer((req, res) => {
    //실제 웹서버 로직 추가
    //req: request, res: response 

    //200 클라이언트(브라우저) -> 성공 
    //Content-Type: text, html, json, media ... 
    //   charset: utf-8 문자타입 
    res.writeHead(200, { "Content-Type":"text/plain; charset=utf-8" });

    console.log("요청 URL", req.url);
    console.log("요청 메서드", req.method);
    console.log("요청 헤더", req.headers);

    res.end("안녕하세요. 첫번째 노드 웹서버입니다.");
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중 입니다.`);
})