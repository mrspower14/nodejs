interface User {
    name: string;
    age: number;
    email?: string;
}

const user11 : User = {
    name: "이지훈", age: 20
}

//인터페이스 속성을 전부 선택적으로 바꿔줍니다.
type PartialUser = Partial<User>;
const part1 : PartialUser = {
    name: "이지훈"
}
console.log(part1);

//인터페이스 속성을 전부 필수로 바꿔줍니다.
type RequiredUser = Required<User>;
const ruser1 : RequiredUser = {
    name: "이지훈", age: 20, email: 'a@naver.com'
};
ruser1.name = "김갑돌";
console.log(ruser1);

//인터페이스 모든 필드를 읽기전용
type ReadOnlyUser = Readonly<User>;
const rouser1 : ReadOnlyUser = {
    name: "이지훈", age: 20, email: 'a@naver.com'
};
//rouser1.name = "김갑돌";    //오류가 나지만 수정됨
console.log(rouser1);