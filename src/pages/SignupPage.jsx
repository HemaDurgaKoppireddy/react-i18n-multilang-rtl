import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function SignupPage({ login }){
  const { t } = useTranslation();
  const [fullName,setFullName] = useState("");
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const nav = useNavigate();

  function handleSubmit(e){
    e.preventDefault();
    if(!username.trim()){ alert("enter username"); return;}
    // fake sign up
    localStorage.setItem("fakeUser", username);
    login && login(username);
    nav("/");
  }

  return (
    <div style={{ display:"flex", justifyContent:"center", paddingTop:36 }}>
      <div style={{ width:"100%", maxWidth:520 }}>
        <div style={{ background:"linear-gradient(180deg, rgba(127,90,240,0.06), rgba(127,90,240,0.02))", borderRadius:14, padding:6, marginBottom:12 }} />
        <div className="glass-card">
          <h2 style={{ marginTop:0 }}>Create Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row" style={{ flexDirection:"column" }}>
              <label className="muted">Full Name</label>
              <input className="input" value={fullName} onChange={e=>setFullName(e.target.value)} />
            </div>
            <div className="form-row" style={{ flexDirection:"column" }}>
              <label className="muted">Username</label>
              <input className="input" value={username} onChange={e=>setUsername(e.target.value)} />
            </div>
            <div className="form-row" style={{ flexDirection:"column" }}>
              <label className="muted">Email</label>
              <input className="input" value={email} onChange={e=>setEmail(e.target.value)} />
            </div>
            <div className="form-row" style={{ flexDirection:"column" }}>
              <label className="muted">Password</label>
              <input type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} />
            </div>
            <div style={{ display:"flex", gap:8, marginTop:8 }}>
              <button className="btn btn-primary" type="submit">Sign up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
