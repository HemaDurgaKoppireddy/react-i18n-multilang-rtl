import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";

export default function LoginForm({ onLogin }) {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const loc = useLocation();

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!username.trim()) {
      setError(t("nameRequired") || "Username is required");
      return;
    }
    // Fake auth: accept any password for demo but require non-empty username
    localStorage.setItem("fakeUser", username);
    onLogin(username);

    // redirect back to where user came from or to add-product
    const redirectTo = (loc.state && loc.state.from) || "/add-product";
    navigate(redirectTo);
  }

  return (
    <form className="form" onSubmit={handleSubmit} style={{ maxWidth: 420 }}>
      <h2>{t("login")}</h2>

      <div style={{ marginBottom: 10 }}>
        <label className="muted">Username</label>
        <input className="input" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Username"/>
      </div>

      <div style={{ marginBottom: 10 }}>
        <label className="muted">Password</label>
        <input type="password" className="input" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password (any)"/>
      </div>

      {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}

      <div style={{ display: "flex", gap: 8 }}>
        <button className="btn btn-primary" type="submit">{t("login")}</button>
        <button type="button" className="btn" onClick={()=> { setUsername(""); setPassword(""); }}>
          {t("cancel") || "Cancel"}
        </button>
      </div>
    </form>
  );
}
