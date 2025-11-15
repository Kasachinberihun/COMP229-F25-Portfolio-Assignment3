
// src/components/project-create.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

export default function ProjectCreate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const { data } = await api.post("/projects", {
        title: title.trim(),
        description: description.trim(),
        link: link.trim(),
      });

      setSuccess(data.message || "Project created successfully!");

      // go back to projects list after short delay
      setTimeout(() => {
        navigate("/projects");
      }, 1500);
    } catch (err) {
      console.error("Create project error:", err?.response?.data || err);
      setError(
        err?.response?.data?.message ||
          "Failed to create project. Please try again."
      );
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h1>Create New Project</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ width: "100%", padding: 8, marginTop: 4 }}
            />
          </label>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              style={{ width: "100%", padding: 8, marginTop: 4 }}
            />
          </label>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>
            Project Link (optional):
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://..."
              style={{ width: "100%", padding: 8, marginTop: 4 }}
            />
          </label>
        </div>

        <button type="submit" style={{ padding: 10, width: "100%" }}>
          Save Project
        </button>
      </form>

      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
      {success && <p style={{ color: "green", marginTop: 10 }}>{success}</p>}
    </div>
  );
}
