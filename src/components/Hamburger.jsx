import React from "react";

export default function Hamburger({ open, onToggle }) {
  return (
    <button onClick={onToggle} aria-expanded={open} style={{ border: "none", background: "transparent", cursor: "pointer" }}>
      <div style={{ width: 22, height: 2, background: "#0f172a", marginBottom: 4, transform: open ? "rotate(45deg) translateY(6px)" : "none", transition: "0.2s" }} />
      <div style={{ width: 22, height: 2, background: "#0f172a", opacity: open ? 0 : 1, transition: "0.2s" }} />
      <div style={{ width: 22, height: 2, background: "#0f172a", marginTop: 4, transform: open ? "rotate(-45deg) translateY(-6px)" : "none", transition: "0.2s" }} />
    </button>
  );
}
