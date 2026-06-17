const jwt = require("jsonwebtoken");
const secret = "J3r=qK4!7ZQ5";      //lastpass.com  -> password-generator //.env에 숨김


//토큰 생성 
const token = jwt.sign({id: 1, name: "김철수", lvl: 3}, secret, {expiresIn: "1h"});
console.log("토큰: ", token);
//토큰 값은 웹사이트: jwt.io 에서 확인 가능.

//위변조 불가 
const token1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Iuq5gOyyoOyImCIsImx2bCI6MywiaWF0IjoxNzgxMDY4NTYxLCJleHAiOjE3ODEwNzIxNjF9.H767jHWACq3NvVjPBH0abeTSq_xs3MeqxjowlkEq95s1";
const payload = jwt.verify(token, secret);
console.log("페이로드: ", payload);

const token2 = jwt.sign({id: 1, name: "김철수", lvl: 3}, secret, {expiresIn: "1h"});
const payload2 = jwt.verify(token2, secret);
console.log("페이로드2: ", payload2);
    
if (payload === payload2) {
    console.log("===", payload, payload2);    
} else {
    console.log("xxx", payload, payload2);
}

try{
    jwt.verify(token1, secret);
} catch(err) {
    console.log("위변조 토큰 거부: ", err.message);
    //res.status(404).json({message: err.message}) ...
}