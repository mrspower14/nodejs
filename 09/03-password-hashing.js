const bcrypt = require("bcryptjs");

async function main() {
    const password = 'my-secret-1234';
    const hash = await bcrypt.hash(password, 10);   //해싱을 10번, salt는 알아서 넣어줌

    console.log("평문: ", password);
    console.log("해시: ", hash); 

    console.log('올바른 비밀번호: ', await bcrypt.compare('my-secret-1234', hash));
    console.log('틀린 비밀번호: ', await bcrypt.compare('my-secret-1235', hash));
}

main();


//$2b $10 $UaHLkC8rpHzsHZ 5IjtC66uqnYL/m56FTqFUqnkgw8OBG5T6ykSNm6
//$2b : bcrypt 버전
//$10 : 해싱 횟수
//$UaHLkC8rpH : salt
//zsHZ5IjtC66uqnYL/m56FTqFUqnkgw8OBG5T6ykSNm6: 해시값