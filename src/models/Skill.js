import mongoose from "mongoose"

if (mongoose.models.Skill) {
  delete mongoose.models.Skill
}

const SkillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: false, // Explicitly set to false
      default: "", // Use empty string as default instead of null
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model("Skill", SkillSchema)
