import dbConnect from "@/lib/mongodb"
import Project from "@/models/Project"
import { getServerSession } from "next-auth/next"

const authOptions = {
  providers: [
    {
      id: "credentials",
      name: "credentials",
      type: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials?.username === "admin" && credentials?.password === "admin123") {
          return {
            id: "1",
            name: "Admin",
            email: "admin@example.com",
          }
        }
        return null
      },
    },
  ],
  session: {
    strategy: "jwt",
  },
}

export default async function handler(req, res) {
  try {
    console.log("[v0] Projects API called with method:", req.method)
    await dbConnect()
    console.log("[v0] MongoDB connected successfully")

    if (req.method === "GET") {
      const projects = await Project.find({}).sort({ createdAt: -1 })
      console.log("[v0] Found projects:", projects.length)
      return res.status(200).json(projects)
    }

    if (req.method === "POST") {
      const session = await getServerSession(req, res, authOptions)
      console.log("[v0] Session check:", !!session)
      if (!session) {
        return res.status(401).json({ error: "Unauthorized" })
      }

      const { title, description, link, imageUrl } = req.body || {}
      console.log("[v0] Creating project with data:", { title, description, link, imageUrl })

      if (!title) {
        return res.status(400).json({ error: "title is required" })
      }

      const created = await Project.create({
        title,
        description: description || "",
        link: link || "",
        imageUrl: imageUrl || "",
      })
      console.log("[v0] Project created successfully:", created._id)
      return res.status(201).json(created)
    }

    // ADD THIS PATCH METHOD
    if (req.method === "PATCH") {
      const session = await getServerSession(req, res, authOptions)
      console.log("[v0] PATCH - Session check:", !!session)
      if (!session) {
        return res.status(401).json({ error: "Unauthorized" })
      }

      const { id, title, description, link, imageUrl } = req.body || {}
      console.log("[v0] PATCH - Updating project:", { id, title, description, link, imageUrl })
      
      if (!id) {
        return res.status(400).json({ error: "id is required" })
      }

      const updated = await Project.findByIdAndUpdate(
        id,
        { title, description, link, imageUrl },
        { new: true } // This returns the updated document
      )
      
      if (!updated) {
        return res.status(404).json({ error: "Project not found" })
      }
      
      console.log("[v0] Project updated successfully:", updated._id)
      return res.status(200).json(updated)
    }

    if (req.method === "DELETE") {
      const session = await getServerSession(req, res, authOptions)
      if (!session) {
        return res.status(401).json({ error: "Unauthorized" })
      }

      const { id } = req.body || {}
      if (!id) {
        return res.status(400).json({ error: "id is required" })
      }

      await Project.findByIdAndDelete(id)
      console.log("[v0] Project deleted:", id)
      return res.status(200).json({ message: "Project deleted successfully" })
    }

    // UPDATE THIS LINE TO INCLUDE PATCH
    res.setHeader("Allow", ["GET", "POST", "PATCH", "DELETE"])
    return res.status(405).end("Method Not Allowed")
  } catch (err) {
    console.error("❌ API /api/auth/projects error:", err)
    return res.status(500).json({ error: "Internal Server Error", details: err.message })
  }
}