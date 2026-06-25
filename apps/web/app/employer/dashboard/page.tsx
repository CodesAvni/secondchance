"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/axios";

export default function EmployerDashboard() {
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      const response = await api.get("/opportunities");
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const myOpportunities = response.data.filter(
        (opportunity: any) => opportunity.employerId === user.id
      );

      setOpportunities(myOpportunities);
    } catch (error) {
      console.log(error);
      alert("Failed to load opportunities. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div 
        className="min-h-screen text-slate-600 flex items-center justify-center font-semibold"
        style={{ backgroundImage: "linear-gradient(to right top, #e4e9ed, #cbdcec, #b3ceec, #9fbfec, #8eb0eb)" }}
      >
        <div className="bg-white/60 backdrop-blur-md px-6 py-4 rounded-2xl flex items-center gap-3 shadow-md">
          <div className="w-3 h-3 rounded-full bg-slate-800 animate-bounce" />
          Loading dashboard metrics...
        </div>
      </div>
    );
  }

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
        <header className="mb-10 pb-6 border-b border-slate-300/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Employer Dashboard
            </h1>
            <p className="text-sm text-slate-600 font-medium mt-1">
              Manage listings, review accommodations, and coordinate your candidate pipeline.
            </p>
          </div>
          
          <Link href="/employer/opportunities">
            <button className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm tracking-wide py-3 px-6 rounded-2xl transition-all shadow-md active:translate-y-0.5 duration-150 shrink-0">
              ＋ Create Opportunity
            </button>
          </Link>
        </header>

        {/* ================= CONTENT MAIN SECTION ================= */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            Your Listed Positions
            <span className="bg-white/80 text-xs text-slate-700 px-2.5 py-0.5 rounded-full border border-white/60 font-semibold shadow-sm">
              {opportunities.length} Total
            </span>
          </h2>

          {opportunities.length === 0 ? (
            <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl p-10 text-center shadow-xl shadow-slate-400/5">
              <div className="text-3xl mb-3">💼</div>
              <h3 className="text-base font-bold text-slate-800">No postings discovered</h3>
              <p className="text-xs text-slate-600 font-medium mt-1 max-w-sm mx-auto">
                Get started by creating a comeback-friendly opportunity targeting adaptive real-world execution skills.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {opportunities.map((job) => (
                <div
                  key={job.id}
                  className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-xl shadow-slate-400/5 flex flex-col justify-between hover:bg-white/60 transition-colors duration-200"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-xl font-black text-slate-900 tracking-tight leading-tight">
                        {job.title}
                      </h3>
                    </div>
                    
                    <p className="text-slate-700 text-sm leading-relaxed font-medium line-clamp-3">
                      {job.description}
                    </p>

                    <div className="flex items-center gap-2 pt-2 text-xs font-bold text-slate-600">
                      <div className="w-6 h-6 rounded-lg bg-white/80 border border-slate-200 flex items-center justify-center shadow-sm">
                        📍
                      </div>
                      <span>{job.location || "Remote Workspace"}</span>
                    </div>
                  </div>

                  <div className="pt-6 mt-4 border-t border-slate-300/30 flex items-center justify-end">
                    <Link href={`/employer/applications?opportunityId=${job.id}`}>
                      <button className="bg-white/80 hover:bg-white border border-slate-300 text-slate-800 font-bold text-xs tracking-wide py-2.5 px-4 rounded-xl transition-all shadow-sm active:translate-y-0.5 duration-150">
                        View Applicants →
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}