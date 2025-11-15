import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const API_URL = "http://localhost:4000/api"; // backend URL

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load user from localStorage on page refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // SIGN IN FUNCTION (this is what Login.jsx calls)
  const signin = async (email, password) => {
    const res = await axios.post(`${API_URL}/auth/signin`, {
      email,
      password,
    });

    const { token, user } = res.data;

    // Save login info
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setUser(user);
    return user;
  };

  // SIGN OUT
  const signout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

