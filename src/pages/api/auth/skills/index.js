import dbConnect from "@/lib/mongodb"
import Skill from "@/models/Skill"
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
          return { id: "1", name: "Admin", email: "admin@example.com" }
        }
        return null
      },
    },
  ],
  session: { strategy: "jwt" },
}

export default async function handler(req, res) {
  try {
    await dbConnect()

    // GET: fetch all skills
    if (req.method === "GET") {
      const skills = await Skill.find({}).sort({ createdAt: -1 })
      return res.status(200).json(skills)
    }

    // Auth required for POST, PATCH, DELETE
    const session = await getServerSession(req, res, authOptions)
    if (!session) return res.status(401).json({ error: "Unauthorized" })

    // POST: add new skill
    if (req.method === "POST") {
      const { name, imageUrl } = req.body || {}
      if (!name) return res.status(400).json({ error: "name is required" })
      const created = await Skill.create({ name, imageUrl: imageUrl || "" })
      return res.status(201).json(created)
    }

    // PATCH: edit existing skill
    if (req.method === "PATCH") {
      const { id, name, imageUrl } = req.body || {}
      if (!id || !name) return res.status(400).json({ error: "id and name required" })
      const updated = await Skill.findByIdAndUpdate(id, { name, imageUrl: imageUrl || "" }, { new: true })
      return res.status(200).json(updated)
    }

    // DELETE: remove skill
    if (req.method === "DELETE") {
      const { id } = req.body || {}
      if (!id) return res.status(400).json({ error: "id is required" })
      await Skill.findByIdAndDelete(id)
      return res.status(200).json({ message: "Skill deleted successfully" })
    }

    res.setHeader("Allow", ["GET", "POST", "PATCH", "DELETE"])
    return res.status(405).end("Method Not Allowed")
  } catch (err) {
    console.error("API /api/auth/skills error:", err)
    return res.status(500).json({ error: "Internal Server Error", details: err.message })
  }
}
