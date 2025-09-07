import { useEffect, useState } from "react";

// Set this to true for your admin view
const isAdmin = false;

export default function CertificationsPage() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // 👈 for modal

  useEffect(() => {
    fetchCerts();
  }, []);

  async function fetchCerts() {
    try {
      const res = await fetch("/api/auth/certifications");
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || `HTTP ${res.status}`);
      }
      const data = await res.json();
      setCerts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch certifications:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this certification?")) return;
    try {
      const res = await fetch("/api/auth/certifications", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (res.ok) fetchCerts();
      else throw new Error(data.message || "Failed to delete");
    } catch (err) {
      console.error(err);
      alert("Delete failed: " + err.message);
    }
  }

  async function handleEdit(cert) {
    const newTitle = prompt("Edit Title:", cert.title);
    const newDescription = prompt("Edit Description:", cert.description || "");
    if (newTitle === null) return;

    try {
      const res = await fetch("/api/auth/certifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: cert._id,
          title: newTitle,
          description: newDescription,
          images: cert.images,
        }),
      });
      const data = await res.json();
      if (res.ok) fetchCerts();
      else throw new Error(data.message || "Failed to update");
    } catch (err) {
      console.error(err);
      alert("Update failed: " + err.message);
    }
  }

  if (loading) return <p className="p-6 text-center text-gray-500">Loading...</p>;
  if (error) return <p className="p-6 text-center text-red-600">Error: {error}</p>;

  return (
    <section className="min-h-screen py-16 bg-gradient-to-br from-white to-blue-50">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-12 text-center animate-fadeIn">
          Certifications & Participations
        </h1>

        {certs.length === 0 ? (
          <p className="text-gray-600 text-center">No certifications uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certs.map((c) => (
              <article
                key={c._id}
                className="relative bg-white rounded-2xl shadow-md p-6 flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-2xl group overflow-hidden animate-fadeIn"
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/40 via-white/0 to-blue-100/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

                <div className="relative z-10">
                  <h2 className="text-2xl font-semibold mb-3">{c.title}</h2>
                  {c.description && <p className="text-gray-700 mb-4">{c.description}</p>}
                  {Array.isArray(c.images) && c.images.length > 0 && (
                    <div className="flex flex-wrap gap-3 mb-4">
                      {c.images.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt={`cert-${i}`}
                          className="w-32 h-32 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform"
                          onClick={() => setSelectedImage(img)} // 👈 open modal
                        />
                      ))}
                    </div>
                  )}

                  {/* Admin Buttons */}
                  {isAdmin && (
                    <div className="flex gap-3 mt-2">
                      <button
                        onClick={() => handleEdit(c)}
                        className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(c._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative">
            <img
              src={selectedImage}
              alt="Certificate"
              className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg"
            />
            <button
              className="absolute top-2 right-2 bg-white text-black rounded-full px-2 py-1 shadow-md"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

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
