import dbConnect from "@/lib/mongodb";
import Certification from "@/models/Certification";

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;

  if (method === "POST") {
    try {
      const { title, images, description } = req.body;
      if (!title) {
        return res.status(400).json({ success: false, message: "Title is required" });
      }
      const newCertification = new Certification({
        title,
        images: images || [],
        description: description || "",
      });
      const savedCertification = await newCertification.save();
      return res.status(201).json({ success: true, data: savedCertification });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Failed to add certification" });
    }
  } 
  else if (method === "GET") {
    try {
      const certs = await Certification.find({});
      return res.status(200).json(certs);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Failed to fetch certifications" });
    }
  } 
  else if (method === "PATCH") {
    try {
      const { id, title, description, images } = req.body;
      if (!id) return res.status(400).json({ success: false, message: "Certification ID is required" });

      const updated = await Certification.findByIdAndUpdate(
        id,
        { title, description, images },
        { new: true }
      );

      if (!updated) return res.status(404).json({ success: false, message: "Certification not found" });

      return res.status(200).json({ success: true, data: updated });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Failed to update certification" });
    }
  } 
  else if (method === "DELETE") {
    try {
      const { id } = req.body;
      if (!id) return res.status(400).json({ success: false, message: "Certification ID is required" });

      const deleted = await Certification.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ success: false, message: "Certification not found" });

      return res.status(200).json({ success: true, message: "Certification deleted" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Failed to delete certification" });
    }
  } 
  else {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
