"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

export default function EmployerOpportunities() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    remote: false,
    pay: "",
    location: "",
    accessibilitySupport: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const createOpportunity = async () => {
    if (!form.title || !form.description) {
      alert("Please fill out the core Title and Description fields.");
      return;
    }

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");

      await api.post(
        "/opportunities",
        {
          ...form,
          pay: Number(form.pay) || 0
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Opportunity listed successfully!");
      router.push("/employer/dashboard");
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to establish listing.");
    } finally {
      setSubmitting(false);
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

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* ================= NAVIGATION & BACK TRIGGER ================= */}
        <button 
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 transition-colors"
        >
          ← Back to Dashboard
        </button>

        {/* ================= HEADER SECTION ================= */}
        <header className="mb-8 pb-6 border-b border-slate-300/40">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Create Opportunity
          </h1>
          <p className="text-sm text-slate-600 font-medium mt-1">
            Publish an adaptive role targeted toward individuals returning to the corporate structure.
          </p>
        </header>

        {/* ================= FORM INTERFACE CARD ================= */}
        <div className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-400/5 space-y-5">
          
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-1">
              Position Title
            </label>
            <input
              name="title"
              value={form.title}
              placeholder="e.g., Program Operations Manager"
              className="w-full bg-white/80 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 font-medium shadow-sm"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-1">
              Role Description
            </label>
            <textarea
              name="description"
              value={form.description}
              placeholder="Outline workflow structure, direct daily scopes, and team structures..."
              rows={5}
              className="w-full bg-white/80 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 font-medium shadow-sm resize-none"
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-1">
                Office / Regional Hub Location
              </label>
              <input
                name="location"
                value={form.location}
                placeholder="e.g., New Delhi, India"
                className="w-full bg-white/80 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 font-medium shadow-sm"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-1">
                Estimated Compensation (Annual Base)
              </label>
              <input
                name="pay"
                value={form.pay}
                placeholder="e.g., 1200000"
                className="w-full bg-white/80 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 font-medium shadow-sm"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-1">
              Included Accommodations & Accessibility Support
            </label>
            <input
              name="accessibilitySupport"
              value={form.accessibilitySupport}
              placeholder="e.g., Flexible schedules, Core asynchronous windows, Quiet workspaces"
              className="w-full bg-white/80 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 font-medium shadow-sm"
              onChange={handleChange}
            />
            <p className="text-[10px] text-slate-500 font-medium mt-1.5 ml-1">
              💡 Separate multiple adjustments with commas to generate micro-badge components on the role canvas.
            </p>
          </div>

          {/* CUSTOM TOGGLE FOR REMOTE */}
          <div className="pt-2">
            <label className="inline-flex items-center gap-3 bg-white/70 border border-slate-200 rounded-xl px-4 py-3 cursor-pointer hover:bg-white/90 transition-colors shadow-sm select-none">
              <input
                type="checkbox"
                checked={form.remote}
                className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-400 accent-slate-900"
                onChange={(e) =>
                  setForm({
                    ...form,
                    remote: e.target.checked
                  })
                }
              />
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                This track is fully open to Remote / Distributed workflows
              </div>
            </label>
          </div>

          {/* SUBMIT COMPONENT ACTION */}
          <div className="pt-4 border-t border-slate-300/30 flex justify-end">
            <button
              onClick={createOpportunity}
              disabled={submitting}
              className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-bold text-sm tracking-wide py-3.5 px-8 rounded-2xl transition-all shadow-md active:translate-y-0.5 duration-150"
            >
              {submitting ? "Establishing Track..." : "Establish Role Listing"}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}