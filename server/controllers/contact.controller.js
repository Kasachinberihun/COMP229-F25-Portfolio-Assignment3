
import Contact from "../models/contact.js";

export const createContact = async (req, res) => {
  try {
    const doc = await Contact.create(req.body);
    res.status(201).json(doc);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const getContacts = async (_req, res) => {
  const docs = await Contact.find().sort({ createdAt: -1 });
  res.json(docs);
};

export const getContact = async (req, res) => {
  const doc = await Contact.findById(req.params.id);
  if (!doc) return res.status(404).json({ message: "Not found" });
  res.json(doc);
};

export const updateContact = async (req, res) => {
  const doc = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!doc) return res.status(404).json({ message: "Not found" });
  res.json(doc);
};

export const deleteContact = async (req, res) => {
  const doc = await Contact.findByIdAndDelete(req.params.id);
  if (!doc) return res.status(404).json({ message: "Not found" });
  res.json({ ok: true });
};
