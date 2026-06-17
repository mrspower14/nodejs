function add(x: number, y: number) : number {
    return x + y;
}
console.log("add", add(3,4));

function multiply(x: number, y: number, z: number) : number {
    return x * y * z;
}
console.log("multiply", multiply(2,3,4));

function buildName(firstName: string, lastName?: string) : string {
    return lastName?`${firstName} ${lastName}`: firstName;
}
console.log("build name", buildName("길동"));
console.log("build name", buildName("철수","김"));

function greet( name: string, greeting: string = "안녕하세요.") : string {
    return `${greeting} ${name}`;
}
console.log("Greet", greet("홍길동"));
console.log("Greet", greet("홍길동", "반갑습니다."));

function identity<T>(arg: T) : T {
    return arg;
}
console.log("number", identity<number>(42));
console.log("string", identity<string>("hello"));
console.log("string", identity("hello2"));

function identify2(arg: any) : any {
    return arg;
}

function logValue<T extends string | number> (value: T) : void {
    console.log(value);
}
logValue("hello");
logValue(42);
//logValue(false);

///buildSearchUrl
function buildSearchUrl ( keyword: string, category?: string, minPrice?: number ) : string {
    let rtn = `/products?keyword=${keyword}`; 
    rtn += category !== undefined && category ? `&category=${category}` : "";
    rtn += minPrice !== undefined && minPrice ? `&minPrice=${minPrice}` : "";
    return rtn;
}
console.log("buildSearchUrl", buildSearchUrl("이이폰"));
console.log("buildSearchUrl", buildSearchUrl("이이폰", "전자기기"));
console.log("buildSearchUrl", buildSearchUrl("이이폰", "전자기기", 5000));
console.log("buildSearchUrl", buildSearchUrl("이이폰", undefined, 5000));
