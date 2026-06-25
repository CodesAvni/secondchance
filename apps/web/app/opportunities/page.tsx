"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/axios";

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<any[]>([]);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await api.get("/opportunities");
        setOpportunities(response.data);
      } catch (error) {
        console.log(error);
        // Fallback mock array focusing on diverse life skills alongside professional fields
        setOpportunities([
          {
            id: "1",
            title: "Community Program Coordinator",
            company: "Bright Horizons Care Center",
            description: "Looking for an organized individual to coordinate daily activities and support local community outreach programs. Great fit for people with strong family management, parenting, or caregiving experience who excel at multi-tasking and helping others.",
            location: "Remote (Global)",
            remote: true,
            pay: "6,00,000 / year",
            accessibilitySupport: "Flexible hours, No late night shifts"
          },
          {
            id: "2",
            title: "Office Administration & Guest Specialist",
            company: "Ember Hospitality Group",
            description: "Manage client relations, incoming communication, and office files. We value practical, real-world skills like scheduling, problem-solving, and a welcoming personality. Perfect if you are returning to work after a family pause.",
            location: "Mumbai, India",
            remote: false,
            pay: "4,50,000 / year",
            accessibilitySupport: "Ergonomic seating, Clear onboarding guide"
          },
          {
            id: "3",
            title: "Support Operations Team Lead",
            company: "Studio Bloom Solutions",
            description: "Help guide our customer chat teams. If you have experience managing household budgets, organizing large events, or leading local volunteer groups, your daily leadership skills are exactly what we are searching for.",
            location: "Remote",
            remote: true,
            pay: "8,00,000 / year",
            accessibilitySupport: "Written communication focus, regular breaks"
          }
        ]);
      }
    };

    fetchOpportunities();
  }, []);

  return (
    <div 
      className="min-h-screen text-slate-800 font-sans antialiased relative overflow-x-hidden py-12 px-4 sm:px-6"
      style={{ backgroundImage: "linear-gradient(to right top, #e4e9ed, #cbdcec, #b3ceec, #9fbfec, #8eb0eb)" }}
    >
      
      {/* Soft ambient background decoration blobs */}
      <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-white/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[450px] h-[450px] bg-blue-100/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* ================= HEADER ================= */}
        <header className="mb-12 pb-6 border-b border-slate-300/40 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Find Your Next Opportunity ✨
            </h1>
            <p className="text-base text-slate-700 mt-2 font-medium">
              Explore welcoming workplaces that value your everyday life talents, professional skills, and unique experiences.
            </p>
          </div>
          
          {/* Active Job Matches Badge */}
          <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl px-4 py-2 flex items-center gap-3 shadow-sm text-xs font-semibold text-slate-700">
            <span>Found <strong className="text-blue-700 font-bold">{opportunities.length}</strong> jobs that match your profile</span>
          </div>
        </header>

        {/* ================= OPPORTUNITIES GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.map((item) => (
            <div
              key={item.id}
              className="bg-white/50 backdrop-blur-xl border border-white/60 hover:border-blue-400/50 rounded-3xl p-6 shadow-xl shadow-slate-400/10 hover:shadow-2xl hover:shadow-slate-400/20 transition-all duration-300 flex flex-col justify-between group"
            >
              
              {/* Card Body */}
              <div>
                <div className="flex justify-between items-start gap-2 mb-4">
                  <span className="text-[11px] font-bold text-slate-500 tracking-wider uppercase">
                    {item.company || "Inclusive Partner"}
                  </span>
                  
                  {/* Remote / Onsite Status Tag */}
                  {item.remote ? (
                    <span className="bg-blue-100/80 text-blue-800 text-[10px] font-bold px-2.5 py-0.5 rounded-md border border-blue-200/40">
                      Work from Home
                    </span>
                  ) : (
                    <span className="bg-slate-100/80 text-slate-700 text-[10px] font-bold px-2.5 py-0.5 rounded-md border border-slate-200/60">
                      In-Office
                    </span>
                  )}
                </div>

                <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-900 transition-colors tracking-tight line-clamp-1">
                  {item.title}
                </h2>
                
                <p className="text-slate-700 text-sm mt-3 leading-relaxed line-clamp-4">
                  {item.description}
                </p>

                {/* Info List */}
                <div className="mt-5 pt-4 border-t border-slate-300/40 space-y-2 text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">📍</span>
                    <span className="truncate">{item.location || "Remote Location"}</span>
                  </div>
                  
                  {item.pay && (
                    <div className="flex items-center gap-2 text-slate-900 font-bold">
                      <span className="text-sm">💰</span>
                      <span>₹{item.pay}</span>
                    </div>
                  )}

                  {item.accessibilitySupport && (
                    <div className="flex items-center gap-2 text-indigo-900 font-bold truncate">
                      <span className="text-sm">🛡️</span>
                      <span>Support: {item.accessibilitySupport}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* View Button */}
              <div className="mt-6 pt-2">
                <Link href={`/opportunities/${item.id}`} className="block">
                  <button className="w-full bg-white/80 hover:bg-slate-900 text-slate-800 group-hover:text-white font-bold text-xs tracking-wide py-3 rounded-xl border border-slate-300/60 group-hover:border-slate-900 transition-all duration-300 shadow-sm">
                    View Details & Apply →
                  </button>
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}