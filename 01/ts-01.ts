let isDone: boolean = false;
console.log("boolean", isDone);

let decimal: number = 6;
console.log("number", decimal);

let color: string = "blue";
console.log("string", color);

let list: number[] = [1,2,3];
console.log("number[]", list);

let tuple: [string, number] = ["hello", 3];
console.log("tuple Type", tuple);

enum Color {
    Red, Green, Blue
}
let fColor: Color = Color.Blue;
console.log("Color Blue", fColor);  //2
console.log(Color);                 // { '0': 'Red', '1': 'Green', '2': 'Blue', Red: 0, Green: 1, Blue: 2 }

let notSure: any = 4;
notSure = "string";
console.log(notSure);

let unionType : string | number = "hello";
console.log("unionType", unionType);
unionType = 42;
console.log("unionType", unionType);