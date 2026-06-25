"use client";
import Cookies from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

export default function SignupPage() {

  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [role, setRole] = useState("JOB_SEEKER");

  const [loading, setLoading] = useState(false);



  const handleSignup = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();


    try {

      setLoading(true);



      const response = await api.post(
        "/auth/register",
        {
          name,
          email,
          password,
          role,
        }
      );



      

      alert("Account created successfully");



      const user = response.data.user;

Cookies.set(
"token",
response.data.token
);

Cookies.set(
"role",
response.data.user.role
);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

window.dispatchEvent(new Event("storage"));

      // ROLE BASED REDIRECTION

      if(user.role === "EMPLOYER"){

        router.push("/employer/dashboard");

      }
      else{

        router.push("/dashboard");

      }



    } catch(error:any){


      console.log(error);


      alert(
        error.response?.data?.message ||
        "Signup failed"
      );


    } finally {

      setLoading(false);

    }

  };





return (

<div 
className="
min-h-screen 
flex 
justify-center 
items-center 
text-slate-800 
font-sans 
antialiased 
relative 
px-4
"

style={{ 
backgroundImage:
"linear-gradient(to right top, #e4e9ed, #cbdcec, #b3ceec, #9fbfec, #8eb0eb)"
}}

>



<div className="
absolute 
top-0 
right-0 
w-full 
h-full 
bg-white/10 
pointer-events-none
"
/>





<div className="
w-full 
max-w-md 
p-8 
bg-white/40 
backdrop-blur-xl 
rounded-3xl 
shadow-xl 
shadow-slate-400/20 
border 
border-white/60 
relative 
z-10
">



<h1 className="
text-3xl 
font-black 
mb-6 
text-center 
text-slate-900
">

Create Account

</h1>






<form
onSubmit={handleSignup}
className="space-y-4"
>



<input

type="text"

placeholder="Name"

className="
w-full 
bg-white/70 
border 
border-slate-300/60 
p-3 
rounded-xl
"

value={name}

onChange={(e)=>
setName(e.target.value)
}

required

/>






<input

type="email"

placeholder="Email"

className="
w-full 
bg-white/70 
border 
border-slate-300/60 
p-3 
rounded-xl
"

value={email}

onChange={(e)=>
setEmail(e.target.value)
}

required

/>







<input

type="password"

placeholder="Password"

className="
w-full 
bg-white/70 
border 
border-slate-300/60 
p-3 
rounded-xl
"

value={password}

onChange={(e)=>
setPassword(e.target.value)
}

required

/>







<select

className="
w-full 
bg-white/70 
border 
border-slate-300/60 
p-3 
rounded-xl
"

value={role}

onChange={(e)=>
setRole(e.target.value)
}

>



<option value="JOB_SEEKER">

Job Seeker

</option>



<option value="EMPLOYER">

Employer

</option>



</select>







<button

type="submit"

disabled={loading}

className="
w-full 
bg-slate-900 
text-white 
p-3 
rounded-xl 
font-bold
"

>


{
loading
?
"Creating..."
:
"Sign Up"
}


</button>



</form>




</div>


</div>


);


}