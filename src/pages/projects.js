import React, { useEffect, useState } from "react";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/auth/projects");
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      }
    }

    fetchProjects();
  }, []);

  return (
    <section className="min-h-screen py-16 bg-gradient-to-br from-white to-blue-50 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 animate-fadeIn">
          My Projects
        </h1>

        {projects.length === 0 ? (
          <p className="text-gray-600 text-center">No projects added yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="relative flex flex-col bg-white rounded-2xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl group animate-fadeIn"
              >
                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/30 via-white/0 to-blue-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

                {/* Image */}
                <div className="relative w-full h-56 md:h-64 overflow-hidden">
                  <img
                    src={project.imageUrl || "/projects/default.png"}
                    alt={project.title}
                    className="w-full h-full object-cover rounded-t-2xl"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/40 px-4 py-2">
                    <h2 className="text-lg md:text-xl font-bold text-white text-center truncate">
                      {project.title}
                    </h2>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex flex-col gap-4 flex-1 relative z-10">
                  <p className="text-gray-700 text-base md:text-lg flex-1">
                    {project.description}
                  </p>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 bg-white text-blue-600 font-semibold py-2 px-4 rounded-xl text-center border border-blue-600 hover:bg-blue-50 transition-all duration-300"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .animate-fadeIn {
          opacity: 0;
          animation: fadeIn 0.5s forwards;
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
