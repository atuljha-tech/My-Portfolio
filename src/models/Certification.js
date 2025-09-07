import mongoose from "mongoose";

const CertificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },     // heading/name (required)
    description: { type: String, default: "" },  // optional
    images: { type: [String], default: [] },     // optional array of image URLs
  },
  { timestamps: true }
);

export default mongoose.models.Certification ||
  mongoose.model("Certification", CertificationSchema);
