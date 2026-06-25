"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import ResumeUpload from "@/components/ResumeUpload";
export default function ProfilePage() {
  const [profile, setProfile] = useState({
    bio: "",
    location: "",
    languages: "",
    accessibilityPreferences: "",
    preferredLanguage: "",
    communicationPreference: "",
    workPreference: "",
  });

  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        setProfile({
          bio: data.bio || "",
          location: data.location || "",
          languages: data.languages?.join(", ") || "",
          accessibilityPreferences: data.accessibilityPreferences?.join(", ") || "",
          preferredLanguage: data.preferredLanguage || "",
          communicationPreference: data.communicationPreference || "",
          workPreference: data.workPreference || "",
        });
      } catch (error) {
        console.log(error);
        // Fallback user-friendly placeholders for development visual evaluation
        setProfile({
          bio: "Returning to the workforce after a 3-year career break to care for my family. I bring strong skills in project coordination, multi-tasking, household management, and basic customer operations.",
          location: "Chicago, IL",
          languages: "People Management, Organization, Microsoft Office, Problem Solving",
          accessibilityPreferences: "Flexible Scheduling, Clear Instruction, Screen Reader Support",
          preferredLanguage: "English",
          communicationPreference: "Asynchronous (Slack/Email)",
          workPreference: "Remote",
        });
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setSaveSuccess(false);
      const token = localStorage.getItem("token");

      await api.put(
        "/profile",
        {
          ...profile,
          languages: profile.languages.split(",").map((s) => s.trim()).filter(Boolean),
          accessibilityPreferences: profile.accessibilityPreferences.split(",").map((s) => s.trim()).filter(Boolean),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (error: any) {
      console.log(error);
      alert(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

const [aiLoading, setAiLoading] = useState(false);

const handleAiGenerate = async () => {
  if (!profile.bio.trim()) {
    alert("Please type a few rough notes or keywords in the box first!");
    return;
  }

  try {
    setAiLoading(true);
    const token = localStorage.getItem("token");
    
    const response = await api.post(
      "/ai/generate-bio", 
      { rawNotes: profile.bio },
      { headers: { Authorization: `Bearer ${token}` } }
    );
if (response.data?.bio) {
      setProfile((prev) => ({
        ...prev,
        bio: response.data.bio,
      }));
    }
    
  } catch (error) {
    console.error(error);
    alert("AI Generation failed. Please try again.");
  } finally {
    setAiLoading(false);
  }
};
  return (
    <div 
      className="min-h-screen text-slate-800 font-sans antialiased relative overflow-x-hidden py-12 px-4 sm:px-6"
      style={{ backgroundImage: "linear-gradient(to right top, #e4e9ed, #cbdcec, #b3ceec, #9fbfec, #8eb0eb)" }}
    >
      
      {/* Immersive background decoration blur nodes */}
      <div className="absolute top-0 right-[-10%] w-[450px] h-[450px] bg-white/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-15%] w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* ================= HEADER ================= */}
        <header className="mb-10 pb-6 border-b border-slate-300/40">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Your Profile Setup ✨
          </h1>
          <p className="text-base text-slate-700 mt-2 font-medium">
            Customize your details below to highlight your life experiences, unique daily talents, and ideal workplace settings.
          </p>
        </header>

        {/* ================= MAIN FORM ================= */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* LEFT CONTAINER: ABOUT YOU (7 Columns) */}
          <div className="md:col-span-7 space-y-6">
            <div className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-xl shadow-slate-400/10 space-y-5">
              
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200/40 pb-3">
                <span>👤</span> Tell Us About Yourself
              </h2> 

              {/* Bio Field */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Your Story & Background
                </label>
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  placeholder="Share a short summary of who you are. Feel free to mention your life experiences, strengths, and what kind of role you are excited to take on next..."
                  rows={4}
                  className="w-full bg-white/80 border border-slate-300/60 rounded-xl p-3.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none leading-relaxed"
                />
                <button
    type="button"
    onClick={handleAiGenerate}
    disabled={aiLoading}
    className="self-start text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200 transition-all disabled:opacity-50 mt-1"
  >
    {aiLoading ? "✨ Structuring your bio..." : "✨ Generate Professional Bio with AI"}
  </button>
              </div>

              {/* Location & Native Language Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Where are you located?
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={profile.location}
                    onChange={handleChange}
                    placeholder="e.g. Chicago, IL"
                    className="w-full bg-white/80 border border-slate-300/60 rounded-xl p-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Preferred Language
                  </label>
                  <input
                    type="text"
                    name="preferredLanguage"
                    value={profile.preferredLanguage}
                    onChange={handleChange}
                    placeholder="e.g. English"
                    className="w-full bg-white/80 border border-slate-300/60 rounded-xl p-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
              </div>

              {/* Life Skills & Professional Tool Sets */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Your Skills & Strengths <span className="text-slate-500 font-normal">(Separated by commas)</span>
                </label>
                <p className="text-xs text-slate-600 -mt-1 italic">
                  Tip: Include daily life skills (e.g., Caregiving, Household Budgeting, Time Management) alongside any business software or technical skills.
                </p>
                <input
                  type="text"
                  name="languages"
                  value={profile.languages}
                  onChange={handleChange}
                  placeholder="e.g. Organization, Communication, Customer Care, MS Excel"
                  className="w-full bg-white/80 border border-slate-300/60 rounded-xl p-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                />
                
                {/* Skill Pills Feedback */}
                {profile.languages.trim() && (
                  <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-slate-200/40">
                    {profile.languages.split(",").map((tag, idx) => tag.trim() && (
                      <span key={idx} className="bg-blue-50/80 text-blue-800 text-xs px-2.5 py-1 rounded-md font-medium border border-blue-100/60 shadow-sm">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* RIGHT CONTAINER: WORKPLACE PREFERENCES (5 Columns) */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-xl shadow-slate-400/10 space-y-5">
              
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200/40 pb-3">
                <span>🌱</span> Job Adjustments & Preferences
              </h2>

              {/* Work Preference Dropdown */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  How would you prefer to work?
                </label>
                <select
                  name="workPreference"
                  value={profile.workPreference}
                  onChange={handleChange}
                  className="w-full bg-white/80 border border-slate-300/60 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer text-slate-700"
                >
                  <option value="">Select a choice</option>
                  <option value="Remote">Remote (Work From Home)</option>
                  <option value="Hybrid">Hybrid (Mix of Home and Office)</option>
                  <option value="Onsite">Onsite (At the Workspace Office)</option>
                  <option value="Flexible">Open / Fully Flexible Schedule</option>
                </select>
              </div>

              {/* Communication Preference Dropdown */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Best way to reach you
                </label>
                <select
                  name="communicationPreference"
                  value={profile.communicationPreference}
                  onChange={handleChange}
                  className="w-full bg-white/80 border border-slate-300/60 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer text-slate-700"
                >
                  <option value="">Select a choice</option>
                  <option value="Asynchronous (Slack/Email)">Messaging Priority (Email/Slack text responses)</option>
                  <option value="Synchronous (Calls/Meetings)">Direct Priority (Phone calls & video meetings)</option>
                  <option value="Text Only">Written Chat & Text updates only</option>
                </select>
              </div>

              {/* Accessibility Preferences Stack */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Inclusion & Support Requests <span className="text-slate-500 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  name="accessibilityPreferences"
                  value={profile.accessibilityPreferences}
                  onChange={handleChange}
                  placeholder="e.g. Flexible breaks, Clear written guidelines"
                  className="w-full bg-white/80 border border-slate-300/60 rounded-xl p-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                />

                {/* Accessibility Tag Previews */}
                {profile.accessibilityPreferences.trim() && (
                  <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-slate-200/40">
                    {profile.accessibilityPreferences.split(",").map((item, idx) => item.trim() && (
                      <span key={idx} className="bg-indigo-50/80 text-indigo-800 text-xs px-2.5 py-1 rounded-md font-semibold border border-indigo-100/60 shadow-sm">
                        🛡️ {item.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm tracking-wide py-3.5 px-6 rounded-2xl transition-all shadow-md active:translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none"
              >
                {loading ? "Saving Changes..." : "Save Profile"}
              </button>

              {/* Success Notification Alert */}
              {saveSuccess && (
                <div className="bg-blue-600 border border-blue-500 rounded-xl p-3 text-center text-xs font-bold text-white shadow-md animate-fadeIn">
                  🎉 Your updates have been saved successfully!
                </div>
              )}
            </div>

          </div>

        </form>
 <div className="mt-8">
          <ResumeUpload />
        </div>
      </div>
    </div>
  );
}