
import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Education", educationSchema);
