"use client";

import { useRouter } from "next/navigation";
import { getUser } from "@/lib/auth";


export default function Hero() {


const router = useRouter();



const handleFindOpportunities = ()=>{


const user = getUser();



if(!user){

router.push("/signup");

return;

}



if(user.role?.toUpperCase() === "JOB_SEEKER"){

router.push("/dashboard");

}

else{

router.push("/employer/dashboard");

}


};





const handleHireTalent = ()=>{


const user = getUser();



if(!user){

router.push("/signup");

return;

}



if(user.role?.toUpperCase() === "EMPLOYER"){

router.push("/employer/dashboard");

}

else{

router.push("/dashboard");

}


};




return (
    <div 
      className="text-slate-900 antialiased font-sans relative overflow-x-hidden min-h-screen"
      style={{ backgroundImage: "linear-gradient(to right top, #e4e9ed, #cbdcec, #b3ceec, #9fbfec, #8eb0eb)" }}
    >
      
      <section className="relative overflow-hidden min-h-[85vh] flex items-center border-b border-slate-300/40">

        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-14 items-center relative z-10">


          <div className="flex flex-col justify-center">

            <div>

              <span className="inline-block bg-white/70 text-blue-700 border border-white/80 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 shadow-sm backdrop-blur-sm">

                ✨ A better way to restart careers

              </span>

            </div>


            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6">

              A career break is{" "}

              <span className="bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent block sm:inline">

                not the end

              </span>{" "}

              of your story.

            </h1>


            <p className="text-lg text-slate-700 max-w-xl leading-relaxed font-medium">

              SecondChance helps talented professionals returning after career breaks
              reconnect with premier organizations where skills, experience, and 
              flexible career paths truly matter.

            </p>


          </div>





          <div className="relative">


            <div className="bg-white/40 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-400/20 border border-white/60 p-6 sm:p-8">


              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">



                {/* JOB SEEKER */}


                <div className="bg-white/70 border border-white/80 rounded-2xl p-6 text-center flex flex-col justify-between transition hover:shadow-md">


                  <div>

                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl mx-auto mb-4">

                      👩‍💻

                    </div>


                    <h3 className="font-bold text-lg text-slate-900">

                      Job Seekers

                    </h3>


                    <p className="text-slate-600 text-xs mt-3 leading-relaxed">

                      Create your profile, showcase your real skills, and discover flexible roles matching your expertise.

                    </p>


                  </div>



                  <button

                  onClick={handleFindOpportunities}

                  className="mt-6 w-full bg-slate-900 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-800 transition shadow-sm"

                  >

                    Find Opportunities

                  </button>



                </div>






                {/* EMPLOYER */}


                <div className="bg-white/70 border border-white/80 rounded-2xl p-6 text-center flex flex-col justify-between transition hover:shadow-md">


                  <div>


                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl mx-auto mb-4">

                      🏢

                    </div>


                    <h3 className="font-bold text-lg text-slate-900">

                      Employers

                    </h3>


                    <p className="text-slate-600 text-xs mt-3 leading-relaxed">

                      Post inclusive career listings and easily connect with motivated, experienced professionals.

                    </p>


                  </div>



                  <button

                  onClick={handleHireTalent}

                  className="mt-6 w-full bg-slate-900 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-800 transition shadow-sm"

                  >

                    Hire Talent

                  </button>



                </div>



              </div>


            </div>


          </div>


        </div>

      </section>




      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">


        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950/40 opacity-70 -z-10" />


        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">


          <span className="text-red-500 text-2xl mb-2 block">❤️</span>


          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">

            Why SecondChance Exists

          </h2>


          <p className="text-xl md:text-2xl font-medium text-slate-200 max-w-2xl mx-auto mb-10 italic leading-relaxed">

            "A career break changes your timeline, <span className="text-blue-400 font-semibold not-italic">not your talent.</span>"

          </p>


          <p className="text-slate-400 text-base mb-12 max-w-xl mx-auto leading-relaxed">

            Millions of exceptionally skilled people step away from the workforce every year due to unpredictable life realities. Traditional hiring models penalize this gap—we change that narrative.

          </p>


          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">


            <div className="bg-slate-800/60 border border-slate-700/50 p-5 rounded-2xl">
              👶
              <h4 className="font-bold text-white text-sm mt-3">Family</h4>
              <p className="text-slate-400 text-xs">Caregiving & childcare</p>
            </div>


            <div className="bg-slate-800/60 border border-slate-700/50 p-5 rounded-2xl">
              ❤️
              <h4 className="font-bold text-white text-sm mt-3">Personal</h4>
              <p className="text-slate-400 text-xs">Health & situations</p>
            </div>


            <div className="bg-slate-800/60 border border-slate-700/50 p-5 rounded-2xl">
              ♿
              <h4 className="font-bold text-white text-sm mt-3">Accessibility</h4>
              <p className="text-slate-400 text-xs">Custom workspace needs</p>
            </div>


            <div className="bg-slate-800/60 border border-slate-700/50 p-5 rounded-2xl">
              🌱
              <h4 className="font-bold text-white text-sm mt-3">Transitions</h4>
              <p className="text-slate-400 text-xs">Evolving life paths</p>
            </div>


          </div>



          <div className="mt-14">

            <p className="text-blue-400 font-semibold text-base">

              SecondChance builds the bridge helping them return with absolute confidence.

            </p>

          </div>


        </div>


      </section>



    </div>
  );
}