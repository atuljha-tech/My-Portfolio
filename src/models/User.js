import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6, // safer minimum
    },
    role: {
      type: String,
      enum: ["admin", "user"], // restricts values
      default: "admin",
    },
  },
  { timestamps: true } // adds createdAt & updatedAt
);

// Avoid recompiling model on hot reload in Next.js
export default mongoose.models.User || mongoose.model("User", UserSchema);
