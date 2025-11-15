
import { useEffect, useState } from "react";
import { api } from "../api";
import { useAuth } from "../AuthContext";

export default function Projects() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: "", link: "", description: "" });
  const [editingId, setEditingId] = useState("");

  const canAdmin = user?.role === "admin";
  const load = async () => {
    const { data } = await api.get("/projects");
    setItems(Array.isArray(data) ? data : []);
  };
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!canAdmin) return;
    if (editingId) await api.put(`/projects/${editingId}`, form);
    else await api.post("/projects", form);
    setForm({ title: "", link: "", description: "" });
    setEditingId("");
    load();
  };

  const onEdit = (p) => {
    setEditingId(p._id);
    setForm({ title: p.title || "", link: p.link || "", description: p.description || "" });
  };
  const onDelete = async (id) => {
    if (!canAdmin) return;
    if (!confirm("Delete this project?")) return;
    await api.delete(`/projects/${id}`);
    load();
  };

  return (
    <div style={{ maxWidth: 900, margin: "24px auto", padding: 16 }}>
      <h2>Projects</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((p) => (
          <li key={p._id} style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8, marginBottom: 8 }}>
            <b>{p.title}</b>{" "}
            {p.link && (
              <a href={p.link} target="_blank" rel="noreferrer">
                [link]
              </a>
            )}
            <div>{p.description}</div>
            {canAdmin && (
              <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                <button onClick={() => onEdit(p)}>Edit</button>
                <button onClick={() => onDelete(p._id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {canAdmin && (
        <form onSubmit={submit} style={{ marginTop: 24, display: "grid", gap: 8 }}>
          <h3>{editingId ? "Update Project" : "Create Project"}</h3>
          <input placeholder="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input placeholder="link" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} />
          <textarea placeholder="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <div style={{ display: "flex", gap: 8 }}>
            <button type="submit">{editingId ? "Update" : "Create"}</button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(""); setForm({ title: "", link: "", description: "" }); }}>
                Cancel
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
