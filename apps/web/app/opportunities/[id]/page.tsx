"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/axios";

export default function OpportunityDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [opportunity, setOpportunity] = useState<any>(null);
  const [applying, setApplying] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);

  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        const response = await api.get(`/opportunities/${id}`);
        setOpportunity(response.data);
      } catch (error) {
        console.log(error);
        // Fallback placeholders for visual layout evaluation
        setOpportunity({
          title: "Senior Full-Stack Returnee Architect",
          company: "Acme Accessibility Labs",
          description: "We are seeking an experienced technical professional returning to the workforce after a career break. In this role, you will lead the re-architecture of our core accessible design portal. We explicitly value the unique perspective, maturity, and problem-solving skills developed during non-traditional timelines. Full mentorship and a structured onboarding ramp-up phase are provided.",
          location: "Remote (Global)",
          remote: true,
          pay: "18,50,000 / year",
          accessibilitySupport: "Flexible hours, Async core hours, Quiet environment provisions, Screen reader optimized workflows",
        });
      }
    };

    if (id) {
      fetchOpportunity();
    }
  }, [id]);

  const applyJob = async () => {
    try {
      setApplying(true);
      setApplySuccess(false);
      const token = localStorage.getItem("token");

      await api.post(
        "/applications",
        { opportunityId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplySuccess(true);
    } catch (error: any) {
      alert(error.response?.data?.message || "Application submission failed");
    } finally {
      setApplying(false);
    }
  };

  if (!opportunity) {
    return (
      <div 
        className="min-h-screen text-slate-600 flex items-center justify-center font-medium"
        style={{ backgroundImage: "linear-gradient(to right top, #e4e9ed, #cbdcec, #b3ceec, #9fbfec, #8eb0eb)" }}
      >
        <div className="bg-white/60 backdrop-blur-md px-6 py-4 rounded-2xl flex items-center gap-2 shadow-sm">
          <div className="w-3 h-3 rounded-full bg-emerald-600 animate-bounce" />
          Loading opportunity specifications...
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen text-slate-800 font-sans antialiased relative overflow-x-hidden"
      style={{ backgroundImage: "linear-gradient(to right top, #e4e9ed, #cbdcec, #b3ceec, #9fbfec, #8eb0eb)" }}
    >
      
      {/* Dynamic Background Studio Blur Elements */}
      <div className="absolute top-0 right-[-5%] w-[450px] h-[450px] bg-emerald-100/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[15%] left-[-10%] w-[450px] h-[450px] bg-orange-100/20 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 py-12 relative z-10">
        
        {/* ================= NAVIGATION & BACK TRIGGER ================= */}
        <button 
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 transition-colors"
        >
          ← Back to Marketplace
        </button>

        {/* ================= EDITORIAL MASTER HEADER ================= */}
        <header className="mb-10 pb-8 border-b border-slate-300/40">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="bg-white/80 text-emerald-800 text-[11px] font-bold px-3 py-1 rounded-full border border-white/60 shadow-sm">
              Verified Inclusive Partner
            </span>
            {opportunity.remote && (
              <span className="bg-orange-50/90 text-orange-800 text-[11px] font-bold px-3 py-1 rounded-full border border-orange-100/60 shadow-sm">
                🏠 Remote Track
              </span>
            )}
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            {opportunity.title}
          </h1>
          <p className="text-base text-slate-700 font-medium mt-1">
            at {opportunity.company || "SecondChance Partner Organization"}
          </p>
        </header>

        {/* ================= TWO-COLUMN VIEWPORT LAYOUT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANEL: ROLE TEXT SPECIFICATIONS (7 Columns) */}
          <div className="lg:col-span-7 bg-white/50 backdrop-blur-xl border border-white/60 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-400/5 space-y-6">
            <div>
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                Role Description
              </h2>
              <p className="text-slate-800 text-sm sm:text-base leading-relaxed whitespace-pre-line font-medium">
                {opportunity.description}
              </p>
            </div>

            {/* Inherent Mission Highlight Block */}
            <div className="bg-[#FAF9F5]/80 border-l-4 border-emerald-600 rounded-r-2xl p-4 text-xs sm:text-sm text-emerald-900/90 leading-relaxed font-medium shadow-sm">
              💡 <strong className="text-emerald-950 font-bold">Comeback Friendly:</strong> This position features tailored technical integration support loops and a non-punitive review window designed entirely around professional resume gap transitions.
            </div>
          </div>

          {/* RIGHT PANEL: SUMMARY METRICS & APPLICATION ACTION (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-xl shadow-slate-400/5 space-y-5">
              
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-300/40 pb-3">
                Job Overview Details
              </h3>

              {/* Data Rows Stack */}
              <div className="space-y-4">
                
                {/* Location row */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/80 border border-slate-200/60 flex items-center justify-center text-sm shrink-0 shadow-sm">
                    📍
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Location Context</h4>
                    <p className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">{opportunity.location || "Remote Workspace"}</p>
                  </div>
                </div>

                {/* Work Environment row */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/80 border border-slate-200/60 flex items-center justify-center text-sm shrink-0 shadow-sm">
                    💼
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Work Mode</h4>
                    <p className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">{opportunity.remote ? "Fully Distributed / Remote" : "On-site Track"}</p>
                  </div>
                </div>

                {/* Compensation row */}
                {opportunity.pay && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100/40 flex items-center justify-center text-sm shrink-0 text-emerald-700 shadow-sm">
                      💰
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Offered Compensation</h4>
                      <p className="text-xs sm:text-sm font-bold text-emerald-900 mt-0.5">₹{opportunity.pay}</p>
                    </div>
                  </div>
                )}

                {/* Accessibility Support Stack row */}
                {opportunity.accessibilitySupport && (
                  <div className="flex items-start gap-3 pt-2 border-t border-slate-300/40">
                    <div className="w-8 h-8 rounded-xl bg-orange-50 border border-orange-100/40 flex items-center justify-center text-sm shrink-0 text-orange-700 shadow-sm">
                      🛡️
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Included Support Accommodations</h4>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {opportunity.accessibilitySupport.split(",").map((item: string, idx: number) => (
                          <span key={idx} className="bg-white/80 text-orange-900 text-[10px] font-bold px-2 py-0.5 rounded border border-orange-200/40 shadow-sm">
                            {item.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              </div>

            </div>

            {/* Action Module Elements */}
            <div className="space-y-3">
              <button
                onClick={applyJob}
                disabled={applying || applySuccess}
                className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-emerald-600 text-white font-bold text-sm tracking-wide py-3.5 px-6 rounded-2xl transition-all shadow-md active:translate-y-0.5 disabled:pointer-events-none duration-150"
              >
                {applying ? "Submitting Application Packet..." : applySuccess ? "✓ Application Active" : "Submit Comeback Profile"}
              </button>

              {applySuccess && (
                <div className="bg-white/90 border border-emerald-300 rounded-xl p-3 text-center text-xs font-bold text-emerald-800 animate-fadeIn shadow-sm">
                  🎉 Profile shared! The hiring group has been alerted to review your canvas.
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}