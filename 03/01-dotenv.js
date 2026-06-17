require("dotenv").config();

console.log("서버포트:", process.env.PORT);
console.log("DB 이름:", process.env.DB_NAME);
console.log("API 키:", process.env.API_KEY);

//.env에 키가 NODE_ENV 값이 development 넣고 
//process.env.NDE_ENV를 출력해보세요
console.log("NODE_ENV:", process.env.NODE_ENV);

//개발환경일 경우 '개발환경에서 실행중', '운영환경에서 실행중'
if (process.env.NODE_ENV === 'development') {
//if (process.env.NODE_ENV.includes('development')) {
    console.log("개발 환경에서 실행중");
} else {
    console.log("운영 환경에서 실행중");
}
