
// src/components/project-details.jsx
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../AuthContext";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setErr("");
        setLoading(true);

        const { data } = await api.get(`/projects/${id}`);

        // backend might send { project: {...} } or just {...}
        const projectData = data.project || data;
        setProject(projectData);
      } catch (e) {
        console.error("Error loading project:", e);
        setErr("Failed to load project.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await api.delete(`/projects/${id}`);
      navigate("/projects");
    } catch (e) {
      console.error("Delete error:", e);
      alert("Failed to delete project");
    }
  };

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  if (err) {
    return (
      <div style={{ maxWidth: 700, margin: "20px auto", textAlign: "center" }}>
        <p style={{ color: "red" }}>{err}</p>
        <p>
          <Link to="/projects">← Back to Projects</Link>
        </p>
      </div>
    );
  }

  if (!project) {
    return (
      <div style={{ maxWidth: 700, margin: "20px auto", textAlign: "center" }}>
        <p>Project not found.</p>
        <p>
          <Link to="/projects">← Back to Projects</Link>
        </p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 700, margin: "20px auto" }}>
      <Link to="/projects">← Back to Projects</Link>

      <h1 style={{ marginTop: 12 }}>{project.title || "Untitled Project"}</h1>

      <p>{project.description || "No description provided."}</p>

      {project.link && (
        <p>
          <a href={project.link} target="_blank" rel="noreferrer">
            View project link
          </a>
        </p>
      )}

      {isAdmin && (
        <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
          <button onClick={() => navigate(`/projects/${id}/edit`)}>
            Edit
          </button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}
