import mongoose from "mongoose"

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      required: false,
      default: "",
    },
  },
  {
    timestamps: true,
  },
)

delete mongoose.models.Project
export default mongoose.model("Project", ProjectSchema)
