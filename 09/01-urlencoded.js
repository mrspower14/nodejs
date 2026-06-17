const express = require("express");
const app = express();
const port = 3000;

app.use(express.json()); //json 입력객체 할당
app.use(express.urlencoded({extened: true}));   //중첩되어있을때도 해줘야.

app.post('/posts', (req, res) => {
    console.log('req.body: ', req.body);
    console.log('author: ', req.body.author);

    res.send({sucess: true, resCode: 'OK', data: req.body});
});


app.listen(port, () => {
    console.log(`Server start at ${port}`);
});
