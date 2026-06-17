const users = [
    {id: 1, name:"홍길동", age: 25, score: 85},
    {id: 2, name:"김철수", age: 30, score: 92},
    {id: 3, name:"이영회", age: 22, score: 78},
    {id: 4, name:"박민수", age: 19, score: 88},
    {id: 5, name:"최지원", age: 35, score: 95}
];

// 1.filter user의 나이가 30세 미만인 사람들을 출력 
const youngusers = users.filter(user => user.age < 30);
console.log("30세 미만인 사람들", youngusers);

// 2.사용자 이름만 추출해 보세요.
const userNames = users.map(user => user.name);
console.log("사용자 이름만 추출", userNames);

// 3.나이가 25세 미만인 사람들의 이름만 출력헤보세요.
const usernames25 = users.filter(user => user.age < 25).map(user => user.name);
console.log("25세 미만인 사람들 사용자 이름은", usernames25.join(', '));


