// src/AuthContext.jsx
import { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // login(email, password) -> calls backend, stores token
  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const receivedToken = res.data.token;
      if (!receivedToken) throw new Error("No token in response");

      localStorage.setItem("token", receivedToken);
      setToken(receivedToken);
      // navigate from the caller (or use window.location.href)
      return { success: true, token: receivedToken };
    } catch (err) {
      console.error("AuthContext login error:", err.response?.data || err.message);
      return { success: false, error: err.response?.data || err.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


