// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
const LS_USERS = "app_users_v1";
const LS_CURRENT = "app_current_user_v1";

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => {
    try { const raw = localStorage.getItem(LS_USERS); return raw ? JSON.parse(raw) : []; } catch(e){ return []; }
  });
  const [current, setCurrent] = useState(() => {
    try { const raw = localStorage.getItem(LS_CURRENT); return raw ? JSON.parse(raw) : null; } catch(e){ return null; }
  });

  useEffect(() => { try { localStorage.setItem(LS_USERS, JSON.stringify(users)); } catch(e){} }, [users]);
  useEffect(() => { try { localStorage.setItem(LS_CURRENT, JSON.stringify(current)); } catch(e){} }, [current]);

  function register({ name, email, password }) {
    if (users.find(u => u.email === email)) throw new Error("User exists");
    const u = { id: Date.now().toString(), name, email, password };
    setUsers(prev => [u, ...prev]);
    setCurrent({ id: u.id, name: u.name, email: u.email });
    return u;
  }

  function login({ email, password }) {
    const u = users.find(x => x.email === email && x.password === password);
    if (!u) throw new Error("Invalid credentials");
    setCurrent({ id: u.id, name: u.name, email: u.email });
    return current;
  }

  function logout() {
    setCurrent(null);
  }

  return <AuthContext.Provider value={{ users, current, register, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth(){ return useContext(AuthContext); }
