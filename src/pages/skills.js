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
    <section className="min-h-screen w-full py-20 flex flex-col items-center bg-gradient-to-br from-white to-blue-50">
      <h1 className="text-5xl md:text-6xl font-extrabold text-blue-700 mb-16 text-center animate-fadeIn">
        My Skills
      </h1>

      {loading && <p className="text-gray-500 text-lg">Loading skills...</p>}
      {error && <p className="text-red-500 text-lg">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl w-full px-6">
        {!loading && !error && skills.length === 0 && (
          <p className="text-gray-500 col-span-full text-center">No skills added yet.</p>
        )}

        {skills.map((skill) => (
          <div
            key={skill._id}
            className="relative bg-white rounded-2xl p-8 shadow-md flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl group overflow-hidden"
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/30 via-white/0 to-blue-200/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

            {/* Skill Image or Fallback */}
            {skill.imageUrl?.trim() ? (
              <img
                src={skill.imageUrl}
                alt={skill.name}
                className="w-20 h-20 object-contain mb-4 z-10"
              />
            ) : (
              <span className="text-6xl mb-4 z-10">💻</span>
            )}

            <h3 className="text-2xl font-bold mt-1 z-10">{skill.name}</h3>
          </div>
        ))}
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
