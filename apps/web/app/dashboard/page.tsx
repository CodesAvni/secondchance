"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      setUser(JSON.parse(data));
    } else {
      // Fallback for visual rendering testing
      setUser({ name: "Alex" }); 
    }
  }, []);

  if (!user) {
    return (
      <div 
        className="min-h-screen text-blue-900 flex items-center justify-center font-medium"
        style={{ backgroundImage: "linear-gradient(to right top, #e4e9ed, #cbdcec, #b3ceec, #9fbfec, #8eb0eb)" }}
      >
        <div className="flex items-center gap-2 bg-white/60 px-6 py-4 rounded-2xl shadow-sm backdrop-blur-md border border-white/40">
          <div className="w-3 h-3 rounded-full bg-blue-600 animate-bounce" />
          Setting up your workspace...
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen text-slate-800 font-sans antialiased relative overflow-x-hidden"
      style={{ backgroundImage: "linear-gradient(to right top, #e4e9ed, #cbdcec, #b3ceec, #9fbfec, #8eb0eb)" }}
    >
      
      {/* Soft Artistic Ambient Background Glows tailored to match the gradient tone */}
      <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-white/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        
        {/* ================= MAIN HEADER BLOCK ================= */}
        <header className="mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-6 border-b border-slate-300/40">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Welcome back, {user.name} 👋
            </h1>
            <p className="text-sm text-slate-700 mt-1.5 font-medium">
              Your flexible workspace • <span className="text-blue-800 font-bold">SecondChance Studio</span>
            </p>
          </div>
          
          <div className="bg-white/70 border border-white/80 px-4 py-2 rounded-2xl flex items-center gap-2.5 shadow-sm backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <span className="text-xs font-bold text-blue-900 tracking-wide uppercase">Active Track</span>
          </div>
        </header>

        {/* ================= DASHBOARD LAYOUT GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT SIDEBAR: THE ROADMAP DIAGRAM (4 Columns) */}
          <div className="lg:col-span-4 bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-xl shadow-slate-400/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600" />
            
            <h2 className="text-base font-bold text-slate-900 mb-8 flex items-center gap-2">
              <span className="text-blue-600">🌱</span> How it works
            </h2>

            {/* Premium Minimalist Process Timeline */}
            <div className="relative pl-6 space-y-8 before:absolute before:bottom-2 before:top-2 before:left-[9px] before:w-[2px] before:bg-slate-300/50">
              
             {/* Point 1 */}

<div className="relative">

<div className="absolute -left-[21px] top-1.5 w-[8px] h-[8px] rounded-full bg-blue-600 ring-4 ring-blue-100" />

<h3 className="font-bold text-xs text-blue-900 uppercase tracking-wider">
1. Profile Setup
</h3>

<p className="text-xs text-slate-700 mt-1 leading-relaxed">
Create your comeback profile and share your experience, preferences and journey.
</p>

</div>



{/* Point 2 */}

<div className="relative">

<div className="absolute -left-[21px] top-1.5 w-[8px] h-[8px] rounded-full bg-indigo-500 ring-4 ring-indigo-100" />

<h3 className="font-bold text-xs text-indigo-900 uppercase tracking-wider">
2. Add Your Skills
</h3>

<p className="text-xs text-slate-700 mt-1 leading-relaxed">
Highlight your skills and strengths that matter beyond career gaps.
</p>

</div>





{/* Point 3 */}

<div className="relative">

<div className="absolute -left-[21px] top-1.5 w-[8px] h-[8px] rounded-full bg-purple-500 ring-4 ring-purple-100" />

<h3 className="font-bold text-xs text-purple-900 uppercase tracking-wider">
3. Find Opportunities
</h3>

<p className="text-xs text-slate-700 mt-1 leading-relaxed">
Explore flexible and inclusive jobs from supportive employers.
</p>

</div>





{/* Point 4 */}

<div className="relative">

<div className="absolute -left-[21px] top-1.5 w-[8px] h-[8px] rounded-full bg-slate-400 ring-4 ring-slate-200" />

<h3 className="font-bold text-xs text-slate-600 uppercase tracking-wider">
4. Apply & Track
</h3>

<p className="text-xs text-slate-700 mt-1 leading-relaxed">
Apply confidently and follow your application progress.
</p>

</div>
</div>
</div>

          {/* RIGHT SIDEBAR: DIGITAL WORKSPACE INTERFACES (8 Columns) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* CARD 3: DYNAMIC PROFILE EDITOR */}
            <Link href="/profile" className="block group">
              <div className="bg-white/70 hover:bg-white/90 border border-white/60 hover:border-slate-400/60 rounded-3xl shadow-sm transition-all duration-300 transform hover:-translate-y-0.5 overflow-hidden backdrop-blur-md">
                
                {/* Visual Window Header */}
                <div className="bg-white/40 px-5 py-3.5 border-b border-slate-200/40 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-slate-300" />
                    <div className="w-2 h-2 rounded-full bg-slate-300" />
                    <div className="w-2 h-2 rounded-full bg-slate-300" />
                  </div>
                  <span className="text-[10px] font-bold bg-white/80 text-slate-700 px-2.5 py-0.5 rounded-full border border-slate-300/60 transition-colors group-hover:bg-slate-900 group-hover:text-white">OPEN CANVAS</span>
                </div>

                {/* Card Content Inner */}
                <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white text-slate-700 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-sm border border-slate-200/40">
                      👤
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 group-hover:text-slate-700 transition-colors">
                        Manage Comeback Profile
                      </h2>
                      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                        Refine core tool skillsets, describe your timeline pause safely, and keep preferences live.
                      </p>
                    </div>
                  </div>
                  <div className="text-slate-400 group-hover:text-slate-800 transition-colors text-lg hidden sm:block font-mono pl-2">
                    ⟶
                  </div>
                </div>

              </div>
            </Link>

{/* CARD 2: SKILLS */}
<Link href="/skills" className="block group">
              <div className="bg-white/70 hover:bg-white/90 border border-white/60 hover:border-slate-400/60 rounded-3xl shadow-sm transition-all duration-300 transform hover:-translate-y-0.5 overflow-hidden backdrop-blur-md">
                
                {/* Visual Window Header */}
                <div className="bg-white/40 px-5 py-3.5 border-b border-slate-200/40 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-slate-300" />
                    <div className="w-2 h-2 rounded-full bg-slate-300" />
                    <div className="w-2 h-2 rounded-full bg-slate-300" />
                  </div>
                  <span className="text-[10px] font-bold bg-white/80 text-slate-700 px-2.5 py-0.5 rounded-full border border-slate-300/60 transition-colors group-hover:bg-slate-900 group-hover:text-white">SKILL PROFILE</span>
                </div>

                {/* Card Content Inner */}
                <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white text-slate-700 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-sm border border-slate-200/40">
                      👤
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 group-hover:text-slate-700 transition-colors">
                        Add your skills
                      </h2>
                      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                        Show employers your abilities,experience and strength.
                      </p>
                    </div>
                  </div>
                  <div className="text-slate-400 group-hover:text-slate-800 transition-colors text-lg hidden sm:block font-mono pl-2">
                    ⟶
                  </div>
                </div>

              </div>
            </Link>

            {/* CARD 1: BROWSE OPPORTUNITIES */}
            <Link href="/opportunities" className="block group">
              <div className="bg-white/70 hover:bg-white/90 border border-white/60 hover:border-blue-400/50 rounded-3xl shadow-sm transition-all duration-300 transform hover:-translate-y-0.5 overflow-hidden backdrop-blur-md">
                
                {/* Visual Window Header */}
                <div className="bg-white/40 px-5 py-3.5 border-b border-slate-200/40 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-slate-300" />
                    <div className="w-2 h-2 rounded-full bg-slate-300" />
                    <div className="w-2 h-2 rounded-full bg-slate-300" />
                  </div>
                  <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-100/60 transition-colors group-hover:bg-blue-600 group-hover:text-white">OPEN ENGINE</span>
                </div>

                {/* Card Content Inner */}
                <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-sm border border-blue-100/40">
                      💼
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                        Browse Inclusive Opportunities
                      </h2>
                      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                        Discover open listings managed by intentional managers looking for diverse experiences.
                      </p>
                    </div>
                  </div>
                  <div className="text-slate-400 group-hover:text-blue-700 transition-colors text-lg hidden sm:block font-mono pl-2">
                    ⟶
                  </div>
                </div>

              </div>
            </Link>

            {/* CARD 2: LIVE APPLICATIONS TRACKER */}
            <Link href="/my-applications" className="block group">
              <div className="bg-white/70 hover:bg-white/90 border border-white/60 hover:border-indigo-400/50 rounded-3xl shadow-sm transition-all duration-300 transform hover:-translate-y-0.5 overflow-hidden backdrop-blur-md">
                
                {/* Visual Window Header */}
                <div className="bg-white/40 px-5 py-3.5 border-b border-slate-200/40 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-slate-300" />
                    <div className="w-2 h-2 rounded-full bg-slate-300" />
                    <div className="w-2 h-2 rounded-full bg-slate-300" />
                  </div>
                  <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full border border-indigo-100/60 transition-colors group-hover:bg-indigo-600 group-hover:text-white">OPEN PIPELINE</span>
                </div>

                {/* Card Content Inner */}
                <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-sm border border-indigo-100/40">
                      📊
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        My Active Submissions
                      </h2>
                      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                        Track interview loops, transparent schedule operations, and live progress charts.
                      </p>
                    </div>
                  </div>
                  <div className="text-slate-400 group-hover:text-indigo-600 transition-colors text-lg hidden sm:block font-mono pl-2">
                    ⟶
                  </div>
                </div>

              </div>
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
}