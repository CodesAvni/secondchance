"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import api from "@/lib/axios";

function EmployerApplicationsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const opportunityId = searchParams.get("opportunityId");

  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actioningId, setActioningId] = useState<string | null>(null);

  useEffect(() => {
    if (opportunityId) {
      fetchApplications();
    } else {
      setLoading(false);
    }
  }, [opportunityId]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await api.get(
        `/applications/opportunity/${opportunityId}`
      );
      setApplications(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load pipeline applicant specifications.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      setActioningId(id);
      await api.patch(`/applications/${id}/status`, { status });
      alert(`Application has been successfully marked as ${status.toLowerCase()}.`);
      await fetchApplications();
    } catch (error) {
      console.log(error);
      alert("Failed to process status adjustment.");
    } finally {
      setActioningId(null);
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
          Synchronizing candidate profile streams...
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

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* ================= NAVIGATION & BACK TRIGGER ================= */}
        <button 
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 transition-colors"
        >
          ← Back to Dashboard
        </button>

        {/* ================= HEADER SECTION ================= */}
        <header className="mb-10 pb-6 border-b border-slate-300/40">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Applicants Pipeline
          </h1>
          <p className="text-sm text-slate-600 font-medium mt-1">
            Review matching returnee profiles and manage transition cycle updates.
          </p>
        </header>

        {/* ================= APPLICANTS CONTENT LISTING ================= */}
        {applications.length === 0 ? (
          <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl p-12 text-center shadow-xl shadow-slate-400/5">
            <div className="text-4xl mb-3">📁</div>
            <h3 className="text-base font-bold text-slate-800">No applications recorded</h3>
            <p className="text-xs text-slate-600 font-medium mt-1">
              Profiles will populate here as candidates initiate their comeback application processes.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => {
              const isAccepted = app.status === "ACCEPTED";
              const isRejected = app.status === "REJECTED";

              return (
                <div
                  key={app.id}
                  className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-xl shadow-slate-400/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 hover:bg-white/60 transition-colors duration-150"
                >
                  {/* Candidate Core Identity Profile */}
                  <div className="space-y-2.5">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-lg font-black text-slate-900 tracking-tight">
                        {app.applicant?.name || "Anonymous Candidate"}
                      </h2>
                      
                      {/* Styled Dynamic Status Badge Components */}
                      <span className={`text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-0.5 rounded-md border shadow-sm ${
                        isAccepted 
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200/50" 
                          : isRejected 
                          ? "bg-rose-50 text-rose-800 border-rose-200/50" 
                          : "bg-slate-100 text-slate-700 border-slate-300/50"
                      }`}>
                        {app.status || "PENDING"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                      <span className="bg-white/80 border border-slate-200 px-2 py-1 rounded-lg text-[11px] font-semibold text-slate-700 shadow-sm flex items-center gap-1.5">
                        ✉️ {app.applicant?.email || "No email documented"}
                      </span>
                    </div>
                  </div>

                  {/* Decision Management Core Action Elements */}
                  <div className="flex items-center gap-2 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-300/30 shrink-0">
                    <button
                      disabled={actioningId !== null || isAccepted}
                      onClick={() => updateStatus(app.id, "ACCEPTED")}
                      className="bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-900 text-white font-bold text-xs tracking-wide py-2.5 px-4 rounded-xl transition-all shadow-sm active:translate-y-0.5 duration-150"
                    >
                      Approve Path
                    </button>

                    <button
                      disabled={actioningId !== null || isRejected}
                      onClick={() => updateStatus(app.id, "REJECTED")}
                      className="bg-white/80 hover:bg-white border border-slate-300 text-rose-700 disabled:opacity-40 font-bold text-xs tracking-wide py-2.5 px-4 rounded-xl transition-all shadow-sm active:translate-y-0.5 duration-150"
                    >
                      Decline Track
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
export default function EmployerApplications() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EmployerApplicationsContent />
    </Suspense>
  );
}