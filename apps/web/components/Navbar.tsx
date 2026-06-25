"use client";
import Cookies from "js-cookie";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Navbar(){

const router = useRouter();

const pathname = usePathname();


const [user,setUser] = useState<any>(null);



useEffect(()=>{


const loadUser = ()=>{


const storedUser =
localStorage.getItem("user");


if(storedUser){

setUser(JSON.parse(storedUser));

}
else{

setUser(null);

}


};



loadUser();



window.addEventListener(
"storage",
loadUser
);



return ()=>{

window.removeEventListener(
"storage",
loadUser
);

};



},[]);



const logout = ()=>{


Cookies.remove("token");
Cookies.remove("role");
localStorage.removeItem("user");


setUser(null);


router.push("/");


};




// current pages

const isLoginPage = pathname === "/login";

const isSignupPage = pathname === "/signup";




return (

<nav className="
flex
justify-between
items-center
px-8
py-5
bg-black
shadow-lg
">



{/* LOGO */}

<Link href="/">


<h1 className="
text-3xl
font-extrabold
tracking-wide
text-white
">


<span className="text-blue-400">
Second
</span>

Chance


</h1>


</Link>





{/* RIGHT SIDE */}


{

user ? (



<div className="flex items-center gap-5">


<div className="text-white text-sm">


<p className="font-semibold">

{user.name}

</p>


<p className="text-gray-300 text-xs">

{user.email}

</p>


</div>



<button

onClick={logout}

className="
bg-red-500/10
text-red-400
border
border-red-400/30
px-6
py-2
rounded-xl
font-semibold
hover:bg-red-500/20
transition
"

>

Logout

</button>



</div>



)


:


(



<div className="flex gap-4">


{

!isLoginPage && (


<Link href="/login">


<button

className="
bg-white/10
text-white
border
border-white/20
px-6
py-2
rounded-xl
font-semibold
hover:bg-white/20
transition
"

>

Login

</button>


</Link>


)


}





{

!isSignupPage && (



<Link href="/signup">


<button

className="
bg-blue-500
text-white
px-6
py-2
rounded-xl
font-semibold
hover:bg-blue-600
transition
shadow-lg
"

>

Sign Up

</button>


</Link>


)


}



</div>


)


}



</nav>

)


}