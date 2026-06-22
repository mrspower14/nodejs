import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { MemberStatus } from "@prisma/client";

export interface AuthMember{
    id: number;
    email: string;
    nickName: string;
    telNo: string;
    memStatus: MemberStatus
    rentAvailYn: boolean;
    rentAvailDt: string;
}

export const CurrentUser = createParamDecorator((
    field: keyof AuthMember,  //id, email, nickName...
    ctx: ExecutionContext   //nestjs 에서 제공하는 요청 컨텍스트 httpRequest를 뺄수 있다.
)=>{
    //Http 요청 객체(req)를 꺼낸다. from NESTJS 요청 컨텍스트에서 
    const request = ctx.switchToHttp().getRequest();    //http에서 request만 빼낸다.
    //console.log("####################",request);

    //JWTStrategy.validate 가 채워둔 사용자 정보를 꺼낸다.
    //기본으로 user로 넘어온다.
    const user: AuthMember = request.user;    
    //console.log("wwwwwwwwwwwwwwwwwwwww",member);

    //field 가 있으면 한필드만 없으면 객체 전체 반환
    //@CurrentUser("id")  -> user.id
    //@CurrentUser() -> user(전체)
    return field ? user?.[field] : user;
});