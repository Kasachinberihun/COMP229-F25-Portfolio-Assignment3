
import Education from "../models/education.js";

// CREATE (admin)
export const createEducation = async (req, res) => {
  try {
    const edu = await Education.create(req.body);
    res.status(201).json(edu);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// READ ALL (public)
export const getEducations = async (_req, res) => {
  try {
    const list = await Education.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ ONE (public)
export const getEducation = async (req, res) => {
  try {
    const edu = await Education.findById(req.params.id);
    if (!edu) return res.status(404).json({ message: "Not found" });
    res.json(edu);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE (admin)
export const updateEducation = async (req, res) => {
  try {
    const edu = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!edu) return res.status(404).json({ message: "Not found" });
    res.json(edu);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE (admin)
export const deleteEducation = async (req, res) => {
  try {
    const edu = await Education.findByIdAndDelete(req.params.id);
    if (!edu) return res.status(404).json({ message: "Not found" });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
