//first need with Auth and then nextResponse
import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(){
    return NextResponse.next()
  },
  {
    callbacks:{
      authorized:({token,req})=>{
        //breaking down pathname
        const{pathname}=req.nextUrl;
        
        //allow the auth related path
        if(pathname.startsWith("/api/auth") || pathname==="/login"|| pathname==="/register"){
          return true;
        }

        //other public path allowance
        if(pathname==="/" || pathname.startsWith("/api/videos")){
          return true;
        }

        return !!token;
      }
    }
  }
)
//path where middle ware must run
export const config={
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
};