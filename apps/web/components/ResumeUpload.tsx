"use client";

import { useRef, useState, useEffect } from "react"; // Added useEffect
import api from "@/lib/axios";

export default function ResumeUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [existingResume, setExistingResume] = useState<string | null>(null); // Track database state
  const [fetching, setFetching] = useState(true); // Track initial load

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Fetch current profile data when component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data?.resumeUrl) {
          setExistingResume(response.data.resumeUrl);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchProfile();
  }, []);

  const uploadResume = async () => {
    if (!file) {
      alert("Please select a PDF first");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await api.post("/profile/resume", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("Resume uploaded successfully");
      
      // Update local state so it immediately reflects without a reload
      if (response.data?.profile?.resumeUrl) {
        setExistingResume(response.data.profile.resumeUrl);
        setFile(null); // Clear selected file slot
      }
    } catch (error: any) {
      console.log(error);
      alert(error.response?.data?.message || "Resume upload failed");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <p className="mt-8 text-center text-slate-500 text-sm">Loading resume status...</p>;
  }

  return (
    <div className="bg-white/50 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-xl mt-8">
      <h2 className="font-bold text-lg mb-4">📄 Upload Resume</h2>

      {/* 2. Show badge/status if resume exists in DB */}
      {existingResume && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-800 flex items-center justify-between">
          <span>✅ You have already uploaded a resume.</span>
          <a 
            href={`http://localhost:5000/${existingResume}`} // Point to backend URL port
            target="_blank" 
            rel="noopener noreferrer"
            className="underline font-medium hover:text-emerald-900"
          >
            View File
          </a>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => {
          setFile(e.target.files?.[0] || null);
        }}
      />

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="bg-slate-800 text-white px-5 py-3 rounded-xl"
      >
        {existingResume ? "Replace PDF" : "Choose PDF"}
      </button>

      {file && (
        <p className="mt-3 text-sm text-slate-600">
          Selected for upload: {file.name}
        </p>
      )}

      <button
        type="button"
        onClick={uploadResume}
        disabled={loading}
        className="mt-4 block bg-blue-600 text-white px-5 py-3 rounded-xl"
      >
        {loading ? "Uploading..." : existingResume ? "Update Resume" : "Upload Resume"}
      </button>
    </div>
  );
}