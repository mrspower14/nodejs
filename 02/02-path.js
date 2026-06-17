const path = require("path");
const fs = require("fs");

//console.log(__dirname);
//console.log(__filename);

//const sampleDir = path.join(__dirname, "samples", "test.json");
//console.log(sampleDir, typeof sampleDir);

// // 디렉토리 만들기
// const dirName = path.join(__dirname, "parent", "child");
// //console.log(dirName);
// fs.mkdirSync(dirName, {recursive: true});

//현재 디렉토리 밑에 02/samples/files/token/jwt.json 파일 경로 만들기
let tokenDir = path.join(__dirname, "samples", "files", "token");
console.log(tokenDir);
if (!fs.existsSync(tokenDir)) fs.mkdirSync(tokenDir, {recursive: true});

//02/samples/files/token/jwt.json 
//파일 생성 하고 여기에 jwtObj 객체를 string 형태로 저장 
tokenDir = path.join(tokenDir, "jwt.json");
const jwtObj = {
    token: "11111", expiredAt: "2026-06-04"
};
fs.writeFileSync(tokenDir, JSON.stringify(jwtObj));

// //02/samples/files/token/jwt.json 파일을 읽어서 내용을
// //jwtObj2로 저장하고, token 정보를 출력
let jwtStr = "";
try {
    jwtStr = fs.readFileSync(tokenDir, "utf-8");
} catch(err) {
    console.log("error: ", err);
    jwtStr = "{}";
}
console.log("String: ", jwtStr, typeof jwtStr);

const jwtJson = JSON.parse(jwtStr);
console.log("JSON: ", jwtJson, typeof jwtJson);