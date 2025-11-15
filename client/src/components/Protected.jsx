
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Protected({ children, role }) {
  const { user, loading } = useAuth();

  if (loading) return <div style={{ padding: 16 }}>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  if (role && user.role !== role) {
    return (
      <div style={{ padding: 16, color: "crimson" }}>
        Forbidden (requires {role})
      </div>
    );
  }
  return children;
}
