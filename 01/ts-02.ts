interface User {
    name: string;
    age: number;
}

const user1 :User = {
    name: "홍길동",
    age: 40
}
console.log(user1);

//Product 인터페이스 정의
interface Product {
    title: string;
    price: number;
}

const product1 : Product = {
    title: "사과",
    price: 3000
}
console.log(product1);

interface ColorConfig {
    color? : string;
    width? : number;
}
const config1 : ColorConfig = {
    color : "red"
}
console.log(config1);

//선택적 프로퍼티
//UpdateProfileDTO 인터페이스를 만들고,
//속성: nickname, phone, marketingAgreed
//필수값은 nickname, 나머지는 선택적
//nickname: 문자열, phone: 문자열, marketingAgreed: boolean
interface UpdateProfileDTO {
    nickname: string;
    phone?: string;
    marketingAgreed?: boolean;
}

const udto1 : UpdateProfileDTO = {
    nickname: "홍길동"
}
const udto2 : UpdateProfileDTO = {
    nickname: "홍길동",
    phone: "010-1111-2222"
}
const udto3 : UpdateProfileDTO = {
    nickname: "홍길동",
    phone: "010-1111-3333",
    marketingAgreed: true
}
console.log(udto1);
console.log(udto2);
console.log(udto3);

interface Admin extends User {
    role: string;
}

const admin1 : Admin = {
    name: "홍길동",
    age: 30,
    role: "관리자"
}
console.log(admin1);

type Student = {
    name: string;
    age: number;
}
type Status = "pending" | "paid" | "shipped";

interface Order {
    id: number;
    status: Status;
}
const order1 : Order = {
    id: 1,
    status: "pending"
}
console.log(order1);

//인터페이스 확장
//Shape 인터페이스 정의하고 color 속성(문자열)
//Shape 인터페이스를 확장한 Square 인터페이스 정의
//Square 의 추가속성 sideLength 숫자 타입으로 정의
//사각형 객체 만들기
interface Shape {
    color: string
}
interface Square extends Shape {
    sideLength: number;
}

const square1 : Square = {
    color: "white",
    sideLength: 30
}
console.log(square1);