const fs = require("fs");

// fs.writeFileSync("test.txt", "Hello World");

// //1. test2.txt 파일을 만들고 "안녕하세요 남부여성발전센터 입니다."
// fs.writeFileSync("test2.txt", "안녕하세요. 남부여성발전센터입니다.");

// //2.비동기 파일 만들기 .
// fs.writeFile("async-test.txt", "Hello World", (err) => {
//     if (err) {
//         console.error("error", err);
//         return;
//     } 
//     console.log("비동기 파일쓰기 완료");
// });

// console.log("비동기 파일 쓰기 완료2");

// //3. async-test2.text 파일을 만들고 "안녕하세요 남부여성발전센터 입니다."
// fs.writeFile("async-test2.txt", "안녕하세요 남부여성발전센터입니다.", (err) => {
//     if (err) {
//         console.error("error", err);
//         return;
//     }
//     console.log("비동기 파일 쓰기 완료");
// });

// console.log("실행 완료");

// const data = fs.readFileSync("test.txt", "utf-8");
// console.log(data);

// const data2 = fs.readFileSync("test2.txt", "utf-8");
// console.log(data2);

// const asyncData = fs.readFile("async-test.txt", "utf-8", (err, data) => {
//     if (err) {
//         console.error("error", err);
//         return;
//     }
//     console.log("data: ", data);
//     printData(data);
// });
// console.log("실행완료");
// function printData(str) {
//     console.log("printData: ", str);
// }
 

// 5. json 파일 저장 후 읽기 
// const objData = {
//     name: "김철수", age: 25, grade: "A"
// };
// fs.writeFileSync("obj-test.json", JSON.stringify(objData));

// const dataStr = fs.readFileSync("obj-test.json", "utf-8");
// console.log(dataStr);
// console.log(typeof dataStr);
// const dataJson = JSON.parse(dataStr);
// console.log(dataJson);
// console.log(dataJson.name);


let personInfo = {
    name: "홍길동",
    age: 25,
    address: "서울시 금천구",
    hobby: ["뜨게질","독서","커피내리기"],
}
//1.personInfo 객체를 JSON string 포멧으로 personInfo.json 저장
fs.writeFileSync("personInfo.json", JSON.stringify(personInfo));
//2.personInfo.json 파일에서 읽고  personInfo2 객채에 저장하세요.
let personInfoStr;
try {
    personInfoStr = fs.readFileSync("personInfo.json", "utf-8");
    console.log("STRING: ", personInfoStr);
} catch(e) {
    personInfoStr = "{}";
    console.error("error");
}
personInfo2 = JSON.parse(personInfoStr);
//3.personInfo2 의 name, age, address, hobby를 console 출력 
console.log("JSON: ", personInfo2);
console.log(personInfo2.name, personInfo2.age, personInfo2.address, personInfo2.hobby);