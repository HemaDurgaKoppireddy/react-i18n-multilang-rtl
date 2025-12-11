// src/components/AuthModal.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AuthModal({ open, onClose }) {
  const { register, login } = useAuth();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function doSubmit(e) {
    e.preventDefault();
    try {
      if (mode === "login") {
        login({ email, password });
      } else {
        register({ name, email, password });
      }
      onClose();
    } catch (err) {
      alert(err.message || "Error");
    }
  }

  if (!open) return null;

  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />

      <div className="auth-modal-card">
        <button className="auth-close" onClick={onClose}>✕</button>

        <h2 className="auth-title">
          {mode === "login" ? "Welcome Back" : "Create an Account"}
        </h2>
        <p className="auth-subtitle">
          {mode === "login"
            ? "Login to continue shopping"
            : "Register to start your journey"}
        </p>

        <form onSubmit={doSubmit} className="auth-form">
          {mode === "register" && (
            <div className="auth-field">
              <label>Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your name"
              />
            </div>
          )}

          <div className="auth-field">
            <label>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              type="email"
            />
          </div>

          <div className="auth-field">
            <label>Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              placeholder="••••••••"
            />
          </div>

          <button className="auth-btn primary" type="submit">
            {mode === "login" ? "Login" : "Create Account"}
          </button>

          <button
            type="button"
            className="auth-btn switch-btn"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
          >
            {mode === "login"
              ? "Need an account? Register"
              : "Already have an account? Login"}
          </button>
        </form>
      </div>
    </>
  );
}
