
import { useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      await signup(name, email, password);  // correct order
      navigate("/login");                  // redirect to login
    } catch (e) {
      setErr(e?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{
        maxWidth: 380,
        margin: "60px auto",
        display: "grid",
        gap: 12,
      }}
    >
      <h2>Create Account</h2>

      <input
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        placeholder="Email address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Sign Up</button>

      {err && <div style={{ color: "red" }}>{err}</div>}

      <a href="/login">Already have an account? Log in</a>
    </form>
  );
}
