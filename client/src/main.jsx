import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./AuthContext"; // <--- ADD THIS

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>            {/* <--- WRAP APP */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
);

