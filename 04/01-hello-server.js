const express = require("express");
const app = express();

//http://localhost:3030/
app.get("/", (req, res) => {
    res.json( {message: "Hello Express~~"} );
});

//http://localhost:3030/hello
app.get("/hello", (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Hello World!</title>
                <body>
                    <h1>Hello Express</h1>
                    <p> 첫번째 express 응답 메시지 </p>
                </body>
            </head>
        </html>
        `);
});

app.listen(3000, () => {
    console.log("http://localhost:3000 에서 실행중");
});