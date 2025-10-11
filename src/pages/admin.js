"use client"

import { useState, useEffect } from "react"
import { signIn, signOut, useSession } from "next-auth/react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dlc1h34jb"
const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "atuljha"

async function uploadToCloudinary(file) {
  if (!file) return null

  const data = new FormData()
  data.append("file", file)
  data.append("upload_preset", preset)
  
  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: data,
    })
    const json = await res.json()
    return json.secure_url || null
  } catch (error) {
    console.error("Upload error:", error)
    return null
  }
}

export default function AdminPage() {
  const { data: session } = useSession()

  // Login state
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

  // Fetch data
  useEffect(() => {
    async function fetchData() {
      if (!session) return
      try {
        const [skillsRes, projectsRes, certsRes] = await Promise.all([
          fetch("/api/auth/skills"),
          fetch("/api/auth/projects"),
          fetch("/api/auth/certifications")
        ])

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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/80 backdrop-blur-sm border border-white/20 rounded-3xl shadow-2xl p-8 transform hover:scale-[1.02] transition-all duration-500">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">Admin Portal</h1>
            <p className="text-slate-600 text-lg">Welcome back! Please sign in</p>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-4 bg-white/60 border border-slate-200/60 rounded-2xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-3 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-300 backdrop-blur-sm"
              />
              <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 bg-white/60 border border-slate-200/60 rounded-2xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-3 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-300 backdrop-blur-sm"
              />
            </div>
            <button
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-bold hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] hover:shadow-xl transition-all duration-300 shadow-lg group"
              onClick={async () => {
                const res = await signIn("credentials", { redirect: false, username, password })
                if (res?.error) {
                  toast.error("Invalid credentials")
                } else {
                  toast.success("Welcome back! 🎉")
                }
              }}
            >
              <span className="flex items-center justify-center gap-2">
                Sign In
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Skill Handlers
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
        toast.success("🔄 Skill updated successfully!")
      } else {
        const res = await fetch("/api/auth/skills", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error("Failed to add skill")
        const saved = await res.json()
        setSkills([saved, ...skills])
        toast.success("✨ Skill added successfully!")
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
        toast.success("🗑️ Skill removed successfully!")
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

  // Project Handlers
  async function handleSaveProject(e) {
    e.preventDefault()
    try {
      setSavingProject(true)
      let imageUrl = editingProject?.imageUrl || ""
      
      if (projectFile) {
        imageUrl = await uploadToCloudinary(projectFile)
      }
      
      const payload = { 
        title: title || "Untitled Project", 
        description: desc || "", 
        link: link || "", 
        imageUrl 
      }

      if (editingProject) {
        const res = await fetch("/api/auth/projects", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, id: editingProject._id }),
        })
        if (!res.ok) throw new Error("Failed to update project")
        const updated = await res.json()
        setProjects(projects.map((p) => (p._id === updated._id ? updated : p)))
        setEditingProject(null)
        toast.success("🔄 Project updated successfully!")
      } else {
        const res = await fetch("/api/auth/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error("Failed to add project")
        const saved = await res.json()
        setProjects([saved, ...projects])
        toast.success("✨ Project added successfully!")
      }

      setTitle("")
      setDesc("")
      setLink("")
      setProjectFile(null)
      setProjectPreview(null)
    } catch (err) {
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
        toast.success("🗑️ Project removed successfully!")
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

  // Certification Handlers
  async function handleSaveCert(e) {
    e.preventDefault()
    try {
      setSavingCert(true)
      let uploadedUrls = editingCert?.images || []

      if (certFiles.length > 0) {
        const urls = await Promise.all(certFiles.map(uploadToCloudinary))
        uploadedUrls = urls.filter(Boolean)
        if (uploadedUrls.length === 0) throw new Error("Failed to upload images")
      }

      const payload = {
        title: certTitle.trim() || "Untitled Certification",
        description: certDesc.trim() || "",
        images: uploadedUrls,
      }

      const method = editingCert ? "PATCH" : "POST"
      const body = editingCert ? { ...payload, id: editingCert._id } : payload

      const res = await fetch("/api/auth/certifications", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to save certification")

      if (editingCert) {
        setCerts(certs.map((c) => (c._id === data._id ? data : c)))
        setEditingCert(null)
        toast.success("🔄 Certification updated successfully!")
      } else {
        setCerts([data, ...certs])
        toast.success("✨ Certification added successfully!")
      }

      setCertTitle("")
      setCertDesc("")
      setCertFiles([])
      setCertPreviews([])
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSavingCert(false)
    }
  }

  function startEditCert(cert) {
    setEditingCert(cert)
    setCertTitle(cert.title)
    setCertDesc(cert.description || "")
    setCertPreviews(cert.images || [])
    setCertFiles([])
  }

  async function handleRemoveCert(id) {
    try {
      const res = await fetch("/api/auth/certifications", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      if (res.ok) {
        setCerts(certs.filter((c) => c._id !== id))
        toast.success("🗑️ Certification removed successfully!")
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-slate-600 text-sm">Manage your portfolio content</p>
              </div>
            </div>
            <button
              onClick={() => signOut()}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl font-semibold hover:from-red-600 hover:to-red-700 transform hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg flex items-center gap-2 group"
            >
              <span>Sign Out</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Skills Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Add Skill Form */}
          <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-800">
                {editingSkill ? "Edit Skill" : "Add New Skill"}
              </h2>
            </div>
            
            <form onSubmit={handleSaveSkill} className="space-y-6">
              <input
                placeholder="Skill name (e.g., React, Node.js, Python)"
                value={skillName}
                onChange={(e) => setSkillName(e.target.value)}
                className="w-full p-4 bg-white/60 border border-slate-200/60 rounded-2xl focus:outline-none focus:ring-3 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-300 backdrop-blur-sm"
              />
              
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-700">Skill Icon/Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null
                    setSkillFile(file)
                    setSkillPreview(file ? URL.createObjectURL(file) : null)
                  }}
                  className="w-full p-3 bg-white/60 border border-slate-200/60 rounded-2xl file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:bg-gradient-to-r file:from-blue-500 file:to-blue-600 file:text-white file:font-semibold hover:file:from-blue-600 hover:file:to-blue-700 transition-all duration-300 backdrop-blur-sm"
                />
                {skillPreview && (
                  <div className="flex items-center gap-4 p-4 bg-white/40 rounded-2xl border border-white/30">
                    <img src={skillPreview} alt="preview" className="w-16 h-16 object-cover rounded-xl shadow-md" />
                    <span className="text-sm font-medium text-slate-600">Image Preview</span>
                  </div>
                )}
              </div>
              
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={savingSkill}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl font-semibold hover:from-green-600 hover:to-green-700 transform hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {savingSkill ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </span>
                  ) : editingSkill ? "Update Skill" : "Add Skill"}
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
                    className="px-6 py-4 bg-slate-200 text-slate-700 rounded-2xl font-medium hover:bg-slate-300 transform hover:scale-105 transition-all duration-300"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Skills List */}
          <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7H5a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Skills</h2>
                <p className="text-slate-600 text-sm">{skills.length} skills added</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {skills.map((s) => (
                <div key={s._id} className="group relative bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/30 hover:border-white/50">
                  <div className="flex flex-col items-center text-center">
                    <img
                      src={s.imageUrl || "/placeholder.svg"}
                      alt={s.name}
                      className="w-12 h-12 rounded-xl object-cover mb-3 group-hover:scale-110 transition-transform duration-300"
                    />
                    <p className="text-sm font-medium text-slate-800 text-balance leading-tight">{s.name}</p>
                  </div>

                  <div className="absolute -top-2 -right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                      onClick={() => startEditSkill(s)}
                      className="w-7 h-7 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-full hover:scale-110 transition-transform duration-200 shadow-lg flex items-center justify-center"
                      title="Edit skill"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleRemoveSkill(s._id)}
                      className="w-7 h-7 bg-gradient-to-r from-red-400 to-red-500 text-white rounded-full hover:scale-110 transition-transform duration-200 shadow-lg flex items-center justify-center"
                      title="Remove skill"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Add Project Form */}
          <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-800">
                {editingProject ? "Edit Project" : "Add New Project"}
              </h2>
            </div>
            
            <form onSubmit={handleSaveProject} className="space-y-6">
              <input
                placeholder="Project title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-4 bg-white/60 border border-slate-200/60 rounded-2xl focus:outline-none focus:ring-3 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all duration-300 backdrop-blur-sm"
              />
              <textarea
                placeholder="Project description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows={4}
                className="w-full p-4 bg-white/60 border border-slate-200/60 rounded-2xl focus:outline-none focus:ring-3 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all duration-300 resize-none backdrop-blur-sm"
              />
              <input
                placeholder="Project link (optional)"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-full p-4 bg-white/60 border border-slate-200/60 rounded-2xl focus:outline-none focus:ring-3 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all duration-300 backdrop-blur-sm"
              />
              
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-700">Project Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null
                    setProjectFile(file)
                    setProjectPreview(file ? URL.createObjectURL(file) : null)
                  }}
                  className="w-full p-3 bg-white/60 border border-slate-200/60 rounded-2xl file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:bg-gradient-to-r file:from-indigo-500 file:to-indigo-600 file:text-white file:font-semibold hover:file:from-indigo-600 hover:file:to-indigo-700 transition-all duration-300 backdrop-blur-sm"
                />
                {projectPreview && (
                  <div className="p-4 bg-white/40 rounded-2xl border border-white/30">
                    <img src={projectPreview} alt="preview" className="w-full max-w-md h-48 object-cover rounded-xl shadow-md" />
                  </div>
                )}
              </div>
              
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={savingProject}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-2xl font-semibold hover:from-indigo-600 hover:to-indigo-700 transform hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {savingProject ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </span>
                  ) : editingProject ? "Update Project" : "Add Project"}
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
                    className="px-6 py-4 bg-slate-200 text-slate-700 rounded-2xl font-medium hover:bg-slate-300 transform hover:scale-105 transition-all duration-300"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Projects List */}
          <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Projects</h2>
                <p className="text-slate-600 text-sm">{projects.length} projects added</p>
              </div>
            </div>
            
            <div className="grid gap-6 max-h-96 overflow-y-auto pr-2">
              {projects.map((p) => (
                <div key={p._id} className="group relative bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/30 hover:border-white/50">
                  <div className="flex gap-4 p-4">
                    <div className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden">
                      <img src={p.imageUrl || "/placeholder.svg"} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-800 mb-1 truncate">{p.title}</h3>
                      {p.description && <p className="text-sm text-slate-600 line-clamp-2 mb-2">{p.description}</p>}
                      {p.link && (
                        <a href={p.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                          View Project
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                      onClick={() => startEditProject(p)}
                      className="w-8 h-8 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-full hover:scale-110 transition-transform duration-200 shadow-lg flex items-center justify-center"
                      title="Edit project"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleRemoveProject(p._id)}
                      className="w-8 h-8 bg-gradient-to-r from-red-400 to-red-500 text-white rounded-full hover:scale-110 transition-transform duration-200 shadow-lg flex items-center justify-center"
                      title="Remove project"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Add Certification Form */}
          <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-800">
                {editingCert ? "Edit Certification" : "Add New Certification"}
              </h2>
            </div>
            
            <form onSubmit={handleSaveCert} className="space-y-6">
              <input
                placeholder="Certification title"
                value={certTitle}
                onChange={(e) => setCertTitle(e.target.value)}
                className="w-full p-4 bg-white/60 border border-slate-200/60 rounded-2xl focus:outline-none focus:ring-3 focus:ring-rose-500/30 focus:border-rose-400 transition-all duration-300 backdrop-blur-sm"
              />
              <textarea
                placeholder="Description (optional)"
                value={certDesc}
                onChange={(e) => setCertDesc(e.target.value)}
                rows={3}
                className="w-full p-4 bg-white/60 border border-slate-200/60 rounded-2xl focus:outline-none focus:ring-3 focus:ring-rose-500/30 focus:border-rose-400 transition-all duration-300 resize-none backdrop-blur-sm"
              />
              
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-slate-700">Certification Images</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files || [])
                    setCertFiles(files)
                    setCertPreviews(files.map((f) => URL.createObjectURL(f)))
                  }}
                  className="w-full p-3 bg-white/60 border border-slate-200/60 rounded-2xl file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:bg-gradient-to-r file:from-rose-500 file:to-rose-600 file:text-white file:font-semibold hover:file:from-rose-600 hover:file:to-rose-700 transition-all duration-300 backdrop-blur-sm"
                />
                {certPreviews.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 bg-white/40 rounded-2xl border border-white/30">
                    {certPreviews.map((src, idx) => (
                      <img key={idx} src={src} alt="preview" className="w-full h-20 object-cover rounded-lg shadow-md" />
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={savingCert}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-2xl font-semibold hover:from-rose-600 hover:to-rose-700 transform hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {savingCert ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </span>
                  ) : editingCert ? "Update Certification" : "Add Certification"}
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
                    className="px-6 py-4 bg-slate-200 text-slate-700 rounded-2xl font-medium hover:bg-slate-300 transform hover:scale-105 transition-all duration-300"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Certifications List */}
          <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7H5a2 2 0 00-2 2v14c0 1.1.9 2 2 2h14a2 2 0 002-2V6a2 2 0 00-2-2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Certifications</h2>
                <p className="text-slate-600 text-sm">{certs.length} certifications added</p>
              </div>
            </div>
            
            <div className="grid gap-4 max-h-96 overflow-y-auto pr-2">
              {certs.map((c) => (
                <div key={c._id} className="group relative bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/30 hover:border-white/50">
                  <div className="p-4">
                    <h3 className="font-bold text-slate-800 mb-2">{c.title}</h3>
                    {c.description && <p className="text-sm text-slate-600 mb-3">{c.description}</p>}
                    {c.images && c.images.length > 0 && (
                      <div className="grid grid-cols-2 gap-2">
                        {c.images.map((img, idx) => (
                          <img key={idx} src={img} alt="certification" className="w-full h-20 object-cover rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-300" />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                      onClick={() => startEditCert(c)}
                      className="w-8 h-8 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-full hover:scale-110 transition-transform duration-200 shadow-lg flex items-center justify-center"
                      title="Edit certification"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleRemoveCert(c._id)}
                      className="w-8 h-8 bg-gradient-to-r from-red-400 to-red-500 text-white rounded-full hover:scale-110 transition-transform duration-200 shadow-lg flex items-center justify-center"
                      title="Remove certification"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="mt-16"
        toastClassName="rounded-2xl shadow-xl"
        progressClassName="bg-gradient-to-r from-blue-500 to-purple-600"
      />
    </div>
  )
}