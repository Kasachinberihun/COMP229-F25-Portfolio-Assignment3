 
 // src/App.jsx
import { Routes, Route, Navigate, Link } from "react-router-dom";
import "./App.css";

import ProjectList from "./components/project-list";
import ProjectDetails from "./components/project-details";
import ProjectCreate from "./components/project-create";
import ProjectEdit from "./components/project-edit";

import Login from "./components/Login";
import Signup from "./components/Signup";

import Education from "./pages/Education";
import Contact from "./pages/Contact";
import ContactAdmin from "./pages/ContactAdmin"; // 👈 admin messages page

import { useAuth } from "./AuthContext";

function App() {
  const { user, signout } = useAuth();
  const isAdmin = user?.role === "admin";

  return (
    <div>
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 16px",
          borderBottom: "1px solid #ddd",
          marginBottom: 16,
        }}
      >
        <div style={{ display: "flex", gap: 12 }}>
          <Link to="/projects">Projects</Link>
          <Link to="/education">Education</Link>
          <Link to="/contact">Contact</Link>

          {/* Simple link to messages page so you can take screenshot */}
          <Link to="/contact/admin" style={{ fontSize: 12 }}>
            Contact Messages
          </Link>
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {user ? (
            <>
              <span>Hi, {user.name || user.email}</span>
              <button onClick={signout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign up</Link>
            </>
          )}
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        {/* default redirect */}
        <Route path="/" element={<Navigate to="/projects" replace />} />

        {/* projects list */}
        <Route path="/projects" element={<ProjectList />} />

        {/* create project (admin only – still guarded) */}
        <Route
          path="/projects/new"
          element={
            isAdmin ? <ProjectCreate /> : <Navigate to="/projects" replace />
          }
        />

        {/* project details */}
        <Route path="/projects/:id" element={<ProjectDetails />} />

        {/* edit project (admin only – still guarded) */}
        <Route
          path="/projects/:id/edit"
          element={
            isAdmin ? <ProjectEdit /> : <Navigate to="/projects" replace />
          }
        />

        {/* other pages */}
        <Route path="/education" element={<Education />} />
        <Route path="/contact" element={<Contact />} />

        {/* admin contact messages page – NOT guarded, no token needed */}
        <Route path="/contact/admin" element={<ContactAdmin />} />

        {/* auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/projects" replace />} />
      </Routes>
    </div>
  );
}

export default App;
