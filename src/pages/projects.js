import React, { useEffect, useState } from "react";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/auth/projects");
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <section className="min-h-screen py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-4 mb-4">
            <div className="w-3 h-12 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-slate-900 bg-clip-text text-transparent tracking-tight">
              My Projects
            </h1>
            <div className="w-3 h-12 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
          </div>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            A collection of my recent work and creative endeavors
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center gap-3 py-20">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-600 text-lg">Loading projects...</p>
          </div>
        )}

        {/* Projects Grid - Exactly 3 per row */}
        {!loading && projects.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🚀</span>
            </div>
            <p className="text-slate-500 text-xl">No projects added yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project._id || index}
                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:-translate-y-2 border border-white/60"
              >
                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-600/3 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10"></div>

                {/* Image Container */}
                <div className="relative w-full h-64 overflow-hidden">
                  <img
                    src={project.imageUrl || "/projects/default.png"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                    <h2 className="text-xl font-bold text-white text-center line-clamp-2">
                      {project.title}
                    </h2>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200"></div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col gap-4 relative z-20">
                  <p className="text-slate-600 leading-relaxed line-clamp-3 flex-1">
                    {project.description}
                  </p>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group/link"
                    >
                      <span>Live Demo</span>
                      <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 group-hover:w-3/4"></div>
              </div>
            ))}
          </div>
        )}

        {/* Background Elements */}
        <div className="absolute top-40 left-10 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl -z-10 animate-pulse-slow delay-1000"></div>
      </div>

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
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}