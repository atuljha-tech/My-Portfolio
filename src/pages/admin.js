"use client"

import { useState, useEffect } from "react"
import { signIn, signOut, useSession } from "next-auth/react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

async function uploadToCloudinary(file) {
  if (!file) {
    console.log("❌ No file provided to uploadToCloudinary");
    return null;
  }

  console.log("📤 uploadToCloudinary called with file:", {
    name: file.name,
    size: file.size,
    type: file.type,
    cloudName: cloudName,
    preset: preset
  });

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", preset);

  try {
    console.log("🔄 Sending to Cloudinary...");
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: data,
    });

    console.log("📡 Cloudinary response status:", res.status);
    console.log("📡 Cloudinary response ok:", res.ok);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ Cloudinary error response:", errorText);
      throw new Error(`Upload failed: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    console.log("📸 Cloudinary success response:", json);

    if (json.secure_url) {
      console.log("✅ Upload successful, returning:", json.secure_url);
      return json.secure_url;
    } else {
      console.error("❌ No secure_url in response:", json);
      return null;
    }
  } catch (error) {
    console.error("💥 Upload error:", error);
    return null;
  }
}

export default function AdminPage() {
  const { data: session } = useSession()

  // login state
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  // Skill state
  const [skillName, setSkillName] = useState("")
  const [skillFile, setSkillFile] = useState(null)
  const [skillPreview, setSkillPreview] = useState(null)
  const [savingSkill, setSavingSkill] = useState(false)
  const [skills, setSkills] = useState([])
  const [editingSkill, setEditingSkill] = useState(null)

  // Project state
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [link, setLink] = useState("")
  const [projectFile, setProjectFile] = useState(null)
  const [projectPreview, setProjectPreview] = useState(null)
  const [savingProject, setSavingProject] = useState(false)
  const [projects, setProjects] = useState([])
  const [editingProject, setEditingProject] = useState(null)

  // Certification state
  const [certTitle, setCertTitle] = useState("")
  const [certDesc, setCertDesc] = useState("")
  const [certFiles, setCertFiles] = useState([])
  const [certPreviews, setCertPreviews] = useState([])
  const [savingCert, setSavingCert] = useState(false)
  const [certs, setCerts] = useState([])
  const [editingCert, setEditingCert] = useState(null)

  // Fetch skills, projects, certifications
  useEffect(() => {
    async function fetchData() {
      if (!session) return
      try {
        const skillsRes = await fetch("/api/auth/skills")
        const projectsRes = await fetch("/api/auth/projects")
        const certsRes = await fetch("/api/auth/certifications")

        const skillsData = skillsRes.ok ? await skillsRes.json() : []
        const projectsData = projectsRes.ok ? await projectsRes.json() : []
        const certsData = certsRes.ok ? await certsRes.json() : []

        setSkills(skillsData)
        setProjects(projectsData)
        setCerts(certsData)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [session])

  if (!session) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Admin Portal</h1>
            <p className="text-slate-600">Access your dashboard</p>
          </div>
          <div className="space-y-4">
            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
              onClick={async () => {
                const res = await signIn("credentials", { redirect: false, username, password })
                if (res?.error) {
                  toast.error("Invalid credentials")
                } else {
                  toast.success("Welcome back!")
                }
              }}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ====== Skill Handlers ======
  async function handleSaveSkill(e) {
    e.preventDefault()
    try {
      setSavingSkill(true)
      const imageUrl = skillFile ? await uploadToCloudinary(skillFile) : editingSkill?.imageUrl || ""
      const payload = { name: skillName || "Unnamed Skill", imageUrl }

      if (editingSkill) {
        const res = await fetch("/api/auth/skills", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, id: editingSkill._id }),
        })
        if (!res.ok) throw new Error("Failed to update skill")
        const updated = await res.json()
        setSkills(skills.map((s) => (s._id === updated._id ? updated : s)))
        setEditingSkill(null)
        toast.success("Skill updated successfully!")
      } else {
        const res = await fetch("/api/auth/skills", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error("Failed to add skill")
        const saved = await res.json()
        setSkills([saved, ...skills])
        toast.success("Skill added successfully!")
      }

      setSkillName("")
      setSkillFile(null)
      setSkillPreview(null)
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSavingSkill(false)
    }
  }

  function startEditSkill(skill) {
    setEditingSkill(skill)
    setSkillName(skill.name)
    setSkillPreview(skill.imageUrl || null)
    setSkillFile(null)
  }

  async function handleRemoveSkill(id) {
    try {
      const res = await fetch("/api/auth/skills", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      if (res.ok) {
        setSkills(skills.filter((s) => s._id !== id))
        toast.success("Skill removed successfully!")
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

  // ====== Project Handlers ======
  async function handleSaveProject(e) {
  e.preventDefault()
  try {
    setSavingProject(true)
    
    console.log("🔍 DEBUG handleSaveProject START:");
    console.log("Editing project:", editingProject);
    console.log("Project file:", projectFile);
    
    // FIX: Store the file in a variable before any state changes
    const currentProjectFile = projectFile;
    
    let imageUrl;
    
    if (currentProjectFile) {
      console.log("🔄 Uploading project file...");
      imageUrl = await uploadToCloudinary(currentProjectFile);
      console.log("Upload result:", imageUrl);
    } else {
      imageUrl = editingProject?.imageUrl || "";
      console.log("📝 Using existing image URL:", imageUrl);
    }
    
    console.log("Final imageUrl:", imageUrl);
    
    const payload = { 
      title: title || "Untitled Project", 
      description: desc || "", 
      link: link || "", 
      imageUrl 
    }

    console.log("📦 Payload to send:", payload);

    if (editingProject) {
      console.log("🔄 Updating existing project...");
      const res = await fetch("/api/auth/projects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, id: editingProject._id }),
      })
      if (!res.ok) throw new Error("Failed to update project")
      const updated = await res.json()
      setProjects(projects.map((p) => (p._id === updated._id ? updated : p)))
      setEditingProject(null)
      toast.success("Project updated successfully!")
    } else {
      console.log("🆕 Creating new project...");
      const res = await fetch("/api/auth/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error("Failed to add project")
      const saved = await res.json()
      setProjects([saved, ...projects])
      toast.success("Project added successfully!")
    }

    // Reset form
    setTitle("")
    setDesc("")
    setLink("")
    setProjectFile(null)
    setProjectPreview(null)
    
    console.log("✅ handleSaveProject COMPLETED");
  } catch (err) {
    console.error("❌ Error in handleSaveProject:", err);
    toast.error(err.message)
  } finally {
    setSavingProject(false)
  }
}
  function startEditProject(project) {
    setEditingProject(project)
    setTitle(project.title)
    setDesc(project.description || "")
    setLink(project.link || "")
    setProjectPreview(project.imageUrl || null)
    setProjectFile(null)
  }

  async function handleRemoveProject(id) {
    try {
      const res = await fetch("/api/auth/projects", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      if (res.ok) {
        setProjects(projects.filter((p) => p._id !== id))
        toast.success("Project removed successfully!")
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

// ====== Certification Handlers ======
async function handleSaveCert(e) {
  e.preventDefault();
  try {
    setSavingCert(true);
    let uploadedUrls = editingCert?.images || [];

    if (certFiles.length > 0) {
      const urls = await Promise.all(certFiles.map(uploadToCloudinary));
      uploadedUrls = urls.filter(Boolean);
      if (uploadedUrls.length === 0) throw new Error("Failed to upload images");
    }

    const payload = {
      title: certTitle.trim() || "Untitled Certification",
      description: certDesc.trim() || "",
      images: uploadedUrls,
    };

    const method = editingCert ? "PATCH" : "POST";
    const body = editingCert ? { ...payload, id: editingCert._id } : payload;

    const res = await fetch("/api/auth/certifications", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Failed to save certification");

    if (editingCert) {
      setCerts(certs.map((c) => (c._id === data._id ? data : c)));
      setEditingCert(null);
      toast.success("Certification updated successfully!");
    } else {
      setCerts([data, ...certs]);
      toast.success("Certification added successfully!");
    }

    setCertTitle("");
    setCertDesc("");
    setCertFiles([]);
    setCertPreviews([]);
  } catch (err) {
    toast.error(err.message);
  } finally {
    setSavingCert(false);
  }
}

function startEditCert(cert) {
  setEditingCert(cert);
  setCertTitle(cert.title);
  setCertDesc(cert.description || "");
  setCertPreviews(cert.images || []);
  setCertFiles([]);
}

async function handleRemoveCert(id) {
  try {
    const res = await fetch("/api/auth/certifications", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setCerts(certs.filter((c) => c._id !== id));
      toast.success("Certification removed successfully!");
    }
  } catch (err) {
    toast.error(err.message);
  }
}


  // ====== UI ======
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-slate-600 mt-1">Manage your portfolio content</p>
            </div>
            <button
              onClick={() => signOut()}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Sign Out
            </button>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            {editingSkill ? "Edit Skill" : "Add New Skill"}
          </h2>
          <form onSubmit={handleSaveSkill} className="space-y-6">
            <input
              placeholder="Skill name (e.g., React, Node.js, Python)"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-700">Skill Icon/Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null
                  setSkillFile(file)
                  setSkillPreview(file ? URL.createObjectURL(file) : null)
                }}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {skillPreview && (
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                  <img
                    src={skillPreview || "/placeholder.svg"}
                    alt="preview"
                    className="w-16 h-16 object-cover rounded-xl shadow-md"
                  />
                  <span className="text-sm text-slate-600">Preview</span>
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={savingSkill}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {savingSkill ? "Saving..." : editingSkill ? "Update Skill" : "Add Skill"}
            </button>
            {editingSkill && (
              <button
                type="button"
                onClick={() => {
                  setEditingSkill(null)
                  setSkillName("")
                  setSkillFile(null)
                  setSkillPreview(null)
                }}
                className="ml-4 px-6 py-4 bg-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-300 transition-all duration-200"
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14-7H5a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            Skills ({skills.length})
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {skills.map((s) => (
              <div
                key={s._id}
                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100"
              >
                <img
                  src={s.imageUrl || "/placeholder.svg?height=64&width=64&query=skill icon"}
                  alt={s.name}
                  className="w-16 h-16 rounded-xl object-cover mx-auto mb-3 group-hover:scale-110 transition-transform duration-300"
                />
                <p className="text-sm font-medium text-slate-800 text-center text-balance">{s.name}</p>

                <button
                  onClick={() => startEditSkill(s)}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 shadow-lg flex items-center justify-center"
                  title="Edit skill"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => handleRemoveSkill(s._id)}
                  className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-r from-red-400 to-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 shadow-lg flex items-center justify-center"
                  title="Remove skill"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            {editingProject ? "Edit Project" : "Add New Project"}
          </h2>
          <form onSubmit={handleSaveProject} className="space-y-6">
            <input
              placeholder="Project title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
            <textarea
              placeholder="Project description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={4}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none"
            />
            <input
              placeholder="Project link (optional)"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-700">Project Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null
                  setProjectFile(file)
                  setProjectPreview(file ? URL.createObjectURL(file) : null)
                }}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
              {projectPreview && (
                <div className="p-4 bg-slate-50 rounded-xl">
                  <img
                    src={projectPreview || "/placeholder.svg"}
                    alt="preview"
                    className="w-full max-w-md h-48 object-cover rounded-xl shadow-md"
                  />
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={savingProject}
              className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {savingProject ? "Saving..." : editingProject ? "Update Project" : "Add Project"}
            </button>
            {editingProject && (
              <button
                type="button"
                onClick={() => {
                  setEditingProject(null)
                  setTitle("")
                  setDesc("")
                  setLink("")
                  setProjectFile(null)
                  setProjectPreview(null)
                }}
                className="ml-4 px-6 py-4 bg-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-300 transition-all duration-200"
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            Projects ({projects.length})
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <div
                key={p._id}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={p.imageUrl || "/placeholder.svg?height=200&width=400&query=project screenshot"}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-slate-800 mb-2 text-balance">{p.title}</h3>
                  {p.description && <p className="text-sm text-slate-600 mb-3 line-clamp-3">{p.description}</p>}
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                    >
                      View Project
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  )}
                </div>

                <button
                  onClick={() => startEditProject(p)}
                  className="absolute top-3 right-12 w-10 h-10 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 shadow-lg flex items-center justify-center"
                  title="Edit project"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => handleRemoveProject(p._id)}
                  className="absolute top-3 right-2 w-10 h-10 bg-gradient-to-r from-red-400 to-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 shadow-lg flex items-center justify-center"
                  title="Remove project"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-rose-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z"
                />
              </svg>
            </div>
            {editingCert ? "Edit Certification" : "Add New Certification"}
          </h2>
          <form onSubmit={handleSaveCert} className="space-y-6">
            <input
              placeholder="Certification title"
              value={certTitle}
              onChange={(e) => setCertTitle(e.target.value)}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200"
            />
            <textarea
              placeholder="Description (optional)"
              value={certDesc}
              onChange={(e) => setCertDesc(e.target.value)}
              rows={3}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200 resize-none"
            />
            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-700">Certification Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files || [])
                  setCertFiles(files)
                  setCertPreviews(files.map((f) => URL.createObjectURL(f)))
                }}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100"
              />
              {certPreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl">
                  {certPreviews.map((src, idx) => (
                    <img
                      key={idx}
                      src={src || "/placeholder.svg"}
                      alt="preview"
                      className="w-full h-24 object-cover rounded-lg shadow-md"
                    />
                  ))}
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={savingCert}
              className="px-8 py-4 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-xl font-semibold hover:from-rose-600 hover:to-rose-700 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {savingCert ? "Saving..." : editingCert ? "Update Certification" : "Add Certification"}
            </button>
            {editingCert && (
              <button
                type="button"
                onClick={() => {
                  setEditingCert(null)
                  setCertTitle("")
                  setCertDesc("")
                  setCertFiles([])
                  setCertPreviews([])
                }}
                className="ml-4 px-6 py-4 bg-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-300 transition-all duration-200"
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-violet-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14-7H5a2 2 0 00-2 2v14c0 1.1.9 2 2 2h14a2 2 0 002-2V6a2 2 0 00-2-2z"
                />
              </svg>
            </div>
            Certifications ({certs.length})
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {certs.map((c) => (
              <div
                key={c._id}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100"
              >
                {c.images && c.images.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 p-4">
                    {c.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img || "/placeholder.svg"}
                        alt="certification"
                        className="w-full h-32 object-cover rounded-xl shadow-sm group-hover:scale-105 transition-transform duration-300"
                      />
                    ))}
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-bold text-lg text-slate-800 mb-2 text-balance">{c.title}</h3>
                  {c.description && <p className="text-sm text-slate-600">{c.description}</p>}
                </div>

                <button
                  onClick={() => startEditCert(c)}
                  className="absolute top-3 right-12 w-10 h-10 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 shadow-lg flex items-center justify-center"
                  title="Edit certification"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => handleRemoveCert(c._id)}
                  className="absolute top-3 right-2 w-10 h-10 bg-gradient-to-r from-red-400 to-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 shadow-lg flex items-center justify-center"
                  title="Remove certification"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="mt-16"
      />
    </div>
  )
}
