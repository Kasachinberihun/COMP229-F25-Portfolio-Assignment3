
// src/components/project-list.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../AuthContext";

export default function ProjectList() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setErr("");
        setLoading(true);

        const { data } = await api.get("/projects");

        // your backend might return { projects: [...] } or just [...]
        const list = Array.isArray(data.projects) ? data.projects : data;
        setProjects(list || []);
      } catch (e) {
        console.error("Error loading projects:", e);
        setErr("Failed to load projects.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  if (err) {
    return (
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <p style={{ color: "red" }}>{err}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Projects</h1>
      <p>Welcome to the Projects page. You are logged in.</p>

      {isAdmin && (
        <div style={{ marginBottom: 16 }}>
          <Link to="/projects/new">+ Create New Project</Link>
        </div>
      )}

      {projects.length === 0 ? (
        <p>No projects to display yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {projects.map((project) => {
            const id = project._id || project.id;
            return (
              <li
                key={id}
                style={{
                  border: "1px solid #ddd",
                  padding: 12,
                  marginBottom: 8,
                }}
              >
                <h3>{project.title || "Untitled Project"}</h3>
                <p>{project.description || "No description."}</p>
                <Link to={`/projects/${id}`}>View Details</Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
