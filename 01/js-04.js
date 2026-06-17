let personInfo = {
    name: "홍길동",
    age: 25,
    address: "서울시 금천구",
    hobby: ["뜨게질","독서","커피내리기"],
}

console.log(personInfo.name);
console.log(personInfo.age);

//2.personInfo  객체에 나이를 1씩 증가할 수 있는 addAge 메서드 생성
personInfo.addAge = function() {
    this.age = this.age + 1;
}

//3.personInfo 에 cnrkehls addAge 호출해서 나이가 1씩 증가하는지 확인 
personInfo.addAge()
console.log(personInfo.age);


let personInfo2 = {
    name: "홍길동",
    age: 25,
    address: "서울시 금천구",
    hobby: ["뜨게질","독서","커피내리기"],
    addAge2() {
        this.age = this.age + 1;
    }
}

personInfo2.addAge2()
console.log(personInfo2.age);