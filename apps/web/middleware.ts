import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(request: NextRequest){

console.log("PATH:", request.nextUrl.pathname);

console.log(
  "ROLE COOKIE:",
  request.cookies.get("role")?.value
);

console.log(
  "TOKEN COOKIE:",
  request.cookies.get("token")?.value
);
const token =
request.cookies.get("token")?.value;


const role =
request.cookies.get("role")?.value;



const pathname =
request.nextUrl.pathname;



// Not logged in protection

if(!token){

if(
pathname.startsWith("/dashboard") ||
pathname.startsWith("/profile") ||
pathname.startsWith("/skills") ||
pathname.startsWith("/opportunities") ||
pathname.startsWith("/my-applications") ||
pathname.startsWith("/employer")
){

return NextResponse.redirect(
new URL("/login",request.url)
);

}

}





// Employer accessing job seeker pages

if(role?.toUpperCase() === "EMPLOYER"){


if(

pathname === "/dashboard" ||
pathname.startsWith("/profile") ||
pathname.startsWith("/skills") ||
pathname.startsWith("/my-applications") ||
pathname === "/opportunities"

){

return NextResponse.redirect(
new URL("/employer/dashboard",request.url)
);

}


}





// Job seeker accessing employer pages

if(role?.toUpperCase() === "JOB_SEEKER"){


if(
pathname.startsWith("/employer")
){

return NextResponse.redirect(
new URL("/dashboard",request.url)
);

}


}



return NextResponse.next();


}



export const config = {

matcher:[

"/dashboard/:path*",
"/profile/:path*",
"/skills/:path*",
"/opportunities/:path*",
"/my-applications/:path*",
"/employer/:path*"

]

};