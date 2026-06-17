let arr = [5, 23, "hello", true, "world", -9];

// // 1.for 문을 이용해서 arr 배열의 요소들을 하나씩 콘솔에 출력해보세요
// for (let i=0; i < arr.length; i++) {
//     console.log(arr[i]);
// }

// // 1-1. while 문을 이용해서 arr 배열의 요소들을 하나씩 콘솔에 출력해보세요
// let i = 0;
// while (i < arr.length) {
//     console.log(arr[i]);
//     i++;
// }

// // 2.forEach 함수
// arr.forEach((data) => {
//     console.log(data);
// });

// 3.filter arr에서 문자만 출력
arr.filter((data) => {
    if (typeof data === 'string') {
        console.log(data);
    }
})

