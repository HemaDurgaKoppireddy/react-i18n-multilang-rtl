import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function LoginPage({ login }) {
  const { t } = useTranslation();
  const nav = useNavigate();
  const loc = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!username.trim()) return;

    localStorage.setItem("fakeUser", username);
    login(username);

    const to = loc.state?.from || "/";
    nav(to);
  }

  return (
    <div
      style={{
        minHeight: "calc(100vh - 120px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div
          style={{
            height: 6,
            background: "linear-gradient(90deg, #7F5AF0, #a78bfa)",
            borderRadius: 12,
            marginBottom: 20,
          }}
        />

        <div className="glass-card">
          <h2 style={{ marginTop: 0 }}>{t("login")}</h2>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 12 }}>
              <label className="muted">Username</label>
              <input
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div style={{ marginBottom: 12 }}>
              <label className="muted">Password</label>
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="btn btn-primary" style={{ width: "100%" }}>
              {t("login")}
            </button>

            <div style={{ marginTop: 10, textAlign: "center" }}>
              <Link to="/signup">Create Account</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
