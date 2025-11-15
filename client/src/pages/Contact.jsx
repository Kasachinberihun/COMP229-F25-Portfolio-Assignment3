
import { useState } from "react";
import { api } from "../api";
import { useAuth } from "../AuthContext";

export default function Contact() {
  const { user } = useAuth();
  const [form, setForm] = useState({ name:"", email:"", subject:"", message:"" });
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      await api.post("/contact", form);
      setForm({ name:"", email:"", subject:"", message:"" });
      setMsg("Message sent ✅");
    } catch (e) {
      setMsg(e?.response?.data?.message || "Error sending");
    }
  };

  return (
    <div style={{maxWidth:520, margin:"24px auto"}}>
      <h2>Contact</h2>
      <form onSubmit={submit} style={{display:"grid", gap:8}}>
        {["name","email","subject","message"].map(k=>(
          k === "message" ? 
          <textarea key={k} placeholder={k} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} rows={5}/> :
          <input key={k} placeholder={k} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})}/>
        ))}
        <button type="submit">Send</button>
      </form>

      {msg && <div style={{marginTop:8}}>{msg}</div>}

      {user?.role === "admin" && <a href="/admin/contacts" style={{display:"inline-block", marginTop:16}}>Admin: view submissions</a>}
    </div>
  );
}
