// src/pages/ContactAdmin.jsx
import { useState } from "react";

export default function ContactAdmin() {
  // Sample messages just for display / screenshot
  const [contacts] = useState([
    {
      _id: "1",
      name: "John Doe",
      email: "john@example.com",
      subject: "Portfolio Inquiry",
      message: "Hello, I would like to know more about your projects.",
    },
    {
      _id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      subject: "Job Opportunity",
      message: "We are interested in your web development skills.",
    },
  ]);

  return (
    <div style={{ maxWidth: 700, margin: "40px auto" }}>
      <h2>Contact Messages (Admin)</h2>
      <p>All messages submitted from the Contact form.</p>

      {contacts.length === 0 && <p>No messages yet.</p>}

      {contacts.map((c) => (
        <div
          key={c._id}
          style={{
            padding: 12,
            border: "1px solid #ddd",
            marginBottom: 12,
            borderRadius: 6,
          }}
        >
          <h3>{c.subject}</h3>
          <p>
            <b>Name:</b> {c.name}
          </p>
          <p>
            <b>Email:</b> {c.email}
          </p>
          <p>{c.message}</p>
        </div>
      ))}
    </div>
  );
}

