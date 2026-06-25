"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

export default function MyApplications() {
  const router = useRouter();
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await api.get("/applications/me");
      setApplications(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to synchronize your application data pipeline.");
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
          Synchronizing tracking records...
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

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* ================= NAVIGATION & BACK TRIGGER ================= */}
        <button 
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 transition-colors"
        >
          ← Back to Marketplace
        </button>

        {/* ================= HEADER SECTION ================= */}
        <header className="mb-10 pb-6 border-b border-slate-300/40">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            My Applications
          </h1>
          <p className="text-sm text-slate-600 font-medium mt-1">
            Track real-time candidate processing states and interview validation cycles.
          </p>
        </header>

        {/* ================= PIPELINE TRACK ENTRIES ================= */}
        {applications.length === 0 ? (
          <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl p-12 text-center shadow-xl shadow-slate-400/5">
            <div className="text-4xl mb-3">📬</div>
            <h3 className="text-base font-bold text-slate-800">No active paths tracking</h3>
            <p className="text-xs text-slate-600 font-medium mt-1">
              Initiate requests within the opportunity portal to begin tracking your professional trajectory.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((application) => {
              const status = application.status || "PENDING";
              const isAccepted = status === "ACCEPTED";
              const isRejected = status === "REJECTED";

              return (
                <div
                  key={application.id}
                  className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-xl shadow-slate-400/5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 hover:bg-white/60 transition-colors duration-150"
                >
                  {/* Left Column: Core Job Details */}
                  <div className="space-y-2 max-w-xl">
                    <h2 className="text-xl font-black text-slate-900 tracking-tight leading-tight">
                      {application.opportunity?.title || "Role Title Omitted"}
                    </h2>
                    
                    {application.opportunity?.description && (
                      <p className="text-slate-600 text-sm leading-relaxed font-medium line-clamp-2">
                        {application.opportunity.description}
                      </p>
                    )}
                  </div>

                  {/* Right Column: Status Tracking Module */}
                  <div className="pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-300/30 flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block sm:mb-1">
                      Tracking Phase
                    </span>
                    
                    <span className={`text-[10px] font-extrabold tracking-wider uppercase px-3 py-1 rounded-md border shadow-sm ${
                      isAccepted 
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200/60" 
                        : isRejected 
                        ? "bg-rose-50 text-rose-800 border-rose-200/60" 
                        : "bg-amber-50 text-amber-800 border-amber-200/60"
                    }`}>
                      {status}
                    </span>
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