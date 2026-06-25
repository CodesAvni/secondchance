"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

export default function SkillsPage() {
  const [skills, setSkills] = useState<any[]>([]);
  const [mySkills, setMySkills] = useState<any[]>([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [experience, setExperience] = useState("BEGINNER");
  const [processingId, setProcessingId] = useState<string | null>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    fetchSkills();
    fetchMySkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await api.get("/skills");
      setSkills(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMySkills = async () => {
    try {
      const res = await api.get("/skills/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMySkills(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addSkill = async () => {
    if (!selectedSkill) {
      alert("Please select a valid technical or soft skill asset.");
      return;
    }

    try {
      await api.post(
        "/skills/user",
        {
          skillId: selectedSkill,
          experienceLevel: experience,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Skill associated successfully!");
      setSelectedSkill("");
      fetchMySkills();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to catalog competence layer.");
    }
  };

  const deleteSkill = async (skillId: string) => {
    try {
      setProcessingId(skillId);
      await api.delete(`/skills/user/${skillId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchMySkills();
    } catch (error) {
      console.log(error);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div 
      className="min-h-screen text-slate-800 font-sans antialiased relative overflow-x-hidden py-12 px-4 sm:px-6 md:px-10"
      style={{ backgroundImage: "linear-gradient(to right top, #e4e9ed, #cbdcec, #b3ceec, #9fbfec, #8eb0eb)" }}
    >
      {/* Soft ambient background decoration blobs */}
      <div className="absolute top-0 right-[-5%] w-[450px] h-[450px] bg-white/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[15%] left-[-10%] w-[450px] h-[450px] bg-blue-100/20 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* ================= HEADER SECTION ================= */}
        <header className="mb-10 pb-6 border-b border-slate-300/40">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Professional Skill Blueprint
          </h1>
          <p className="text-sm text-slate-600 font-medium mt-1">
            Map your competencies and technical mastery layers to customize recommendations.
          </p>
        </header>

        {/* ================= TWO-COLUMN DASHBOARD PANELS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANEL: CURRENT SKILLS MATRIX (7 Columns) */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-2 ml-1">
              Active Experience Canvas
              <span className="bg-white/80 text-[11px] text-slate-700 px-2.5 py-0.5 rounded-full border border-white/60 font-semibold shadow-sm">
                {mySkills.length} Verified
              </span>
            </h2>

            {mySkills.length === 0 ? (
              <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl p-10 text-center shadow-xl shadow-slate-400/5">
                <div className="text-3xl mb-3">🛠️</div>
                <h3 className="text-sm font-bold text-slate-800">No entries charted</h3>
                <p className="text-xs text-slate-600 font-medium mt-1">
                  Use the integration toolkit panel to map your technical strengths.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mySkills.map((item) => {
                  const level = item.experienceLevel;
                  return (
                    <div
                      key={item.skillId}
                      className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-2xl p-4 shadow-md shadow-slate-400/5 flex items-center justify-between gap-4 group hover:bg-white/60 transition-colors duration-150"
                    >
                      <div className="space-y-1">
                        <p className="font-bold text-slate-900 tracking-tight text-sm sm:text-base">
                          {item.skill?.name}
                        </p>
                        
                        <span className={`inline-block text-[9px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded border shadow-sm ${
                          level === "ADVANCED" 
                            ? "bg-slate-900 text-white border-slate-950" 
                            : level === "INTERMEDIATE" 
                            ? "bg-blue-50 text-blue-800 border-blue-100" 
                            : "bg-white/80 text-slate-700 border-slate-200"
                        }`}>
                          {level}
                        </span>
                      </div>

                      <button
                        disabled={processingId === item.skillId}
                        onClick={() => deleteSkill(item.skillId)}
                        className="text-xs font-bold text-rose-700 hover:text-rose-900 transition-colors bg-rose-50 hover:bg-rose-100/60 border border-rose-200/40 px-2.5 py-1.5 rounded-xl shadow-sm active:translate-y-0.5 duration-150 shrink-0"
                      >
                        {processingId === item.skillId ? "Clearing..." : "Remove"}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT PANEL: ADDcompetence TOOLKIT (5 Columns) */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-lg font-bold text-slate-900 mb-2 ml-1">
              Append Competency
            </h2>

            <div className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-xl shadow-slate-400/5 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-1">
                  Select Technical Focus Area
                </label>
                <select
                  className="w-full bg-white/80 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 font-semibold shadow-sm cursor-pointer"
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                >
                  <option value="" className="text-slate-400">
                    -- Browse Capability Indexes --
                  </option>
                  {skills.map((skill) => (
                    <option key={skill.id} value={skill.id}>
                      {skill.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-1">
                  Current Execution Depth
                </label>
                <select
                  className="w-full bg-white/80 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 font-semibold shadow-sm cursor-pointer"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                >
                  <option value="BEGINNER">BEGINNER (Familiarity / Concept Phase)</option>
                  <option value="INTERMEDIATE">INTERMEDIATE (Practical Industry Execution)</option>
                  <option value="ADVANCED">ADVANCED (Architectural Mastery / Guidance Capability)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  onClick={addSkill}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm tracking-wide py-3.5 px-6 rounded-2xl transition-all shadow-md active:translate-y-0.5 duration-150"
                >
                  Append To Profile
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}