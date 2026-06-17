import 'reflect-metadata';

//decorator : class 공통 동작부여. 기능부여
function MarkController(constructor: Function) {
    console.log("등록된 클래스", constructor.name);
}

@MarkController
class ExampleClass {
    constructor(public name: string) {}
}

const example = new ExampleClass("홍길동");
console.log("example name: ", example.name);
console.log("");

/////
const controllerUrls : Record<string, string> = {} ;

//데코레이터 생성
function Controller(url: string) {
    console.log(`Controller(${url}) 호출됨`);
    return function registerController (constructor: Function) {
        console.log(`class ${constructor.name} 등록됨`);
        controllerUrls[constructor.name] = url;
    }
}

//데코레이터 넣어주면 . 
@Controller("/products")
class ProductController {
    create() {
        return "상품 생성"
    }
}
console.log("controllerUrls: ", controllerUrls);
const pc = new ProductController();
console.log(pc.create());

// 출력샘플....
// Controller(/products) 호출됨
// class ProductController 등록
// controllerUrls:  { ProductController: '/products' }