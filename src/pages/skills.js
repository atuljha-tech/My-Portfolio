import React, { useEffect, useState } from "react";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const res = await fetch("/api/auth/skills");
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `HTTP ${res.status}`);
        }
        const data = await res.json();
        setSkills(data);
      } catch (err) {
        console.error("Failed to fetch skills:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSkills();
  }, []);

  return (
    <section className="min-h-screen w-full py-20 flex flex-col items-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      {/* Enhanced Header */}
      <div className="text-center mb-16 px-6">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-slate-900 bg-clip-text text-transparent tracking-tight">
            My Skills
          </h1>
          <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
        </div>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Technologies and tools I work with to bring ideas to life
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center gap-3 text-slate-600">
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg">Loading skills...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 max-w-md mx-auto">
          <p className="text-red-700 text-center font-medium">{error}</p>
        </div>
      )}

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl w-full px-6">
        {!loading && !error && skills.length === 0 && (
          <div className="col-span-full text-center py-12">
            <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">💻</span>
            </div>
            <p className="text-slate-500 text-lg">No skills added yet.</p>
          </div>
        )}

        {skills.map((skill) => (
          <div
            key={skill._id}
            className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-white/60 flex flex-col items-center text-center transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer overflow-hidden"
          >
            {/* Enhanced Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-600/3 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>

            {/* Subtle Border Glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

            {/* Skill Content */}
            <div className="relative z-10 flex flex-col items-center space-y-4 w-full">
              {/* Skill Image or Fallback */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center shadow-inner group-hover:shadow-lg transition-all duration-500">
                {skill.imageUrl?.trim() ? (
                  <img
                    src={skill.imageUrl}
                    alt={skill.name}
                    className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-500">💻</span>
                )}
              </div>

              {/* Skill Name */}
              <h3 className="text-lg font-semibold text-slate-800 group-hover:text-slate-900 transition-colors duration-300 leading-tight">
                {skill.name}
              </h3>
            </div>

            {/* Bottom Accent Line */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 group-hover:w-3/4"></div>
          </div>
        ))}
      </div>

      {/* Enhanced Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl -z-10 animate-pulse-slow delay-1000"></div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}