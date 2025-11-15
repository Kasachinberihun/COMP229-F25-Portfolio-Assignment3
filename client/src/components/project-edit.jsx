// src/components/project-edit.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api";

export default function ProjectEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    const loadProject = async () => {
      try {
        const { data } = await api.get(`/projects/${id}`);
        setTitle(data.title);
        setDescription(data.description);
        setLink(data.link || "");
      } catch (err) {
        console.error(err);
        alert("Failed to load project");
      }
    };
    loadProject();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/projects/${id}`, {
        title,
        description,
        link,
      });
      alert("Project updated!");
      navigate(`/projects/${id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to update project");
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "20px auto" }}>
      <h1>Edit Project</h1>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          style={{ width: "100%", marginBottom: 12 }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Description:</label>
        <textarea
          style={{ width: "100%", height: 120, marginBottom: 12 }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Project Link (optional):</label>
        <input
          style={{ width: "100%", marginBottom: 12 }}
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="https://..."
        />

        <button style={{ width: "100%" }}>Save Changes</button>
      </form>
    </div>
  );
}

