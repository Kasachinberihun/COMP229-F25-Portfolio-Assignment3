
import { useAuth } from "./AuthContext";

export default function Home() {
  const { user } = useAuth();

  // Prevent crash if user hasn't loaded yet
  if (!user) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Hi, {user.name}</h1>
      <p>Role: {user.role}</p>
      <p>You are successfully logged in.</p>
    </div>
  );
}
