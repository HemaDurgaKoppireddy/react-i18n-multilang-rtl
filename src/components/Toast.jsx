import React, { useEffect } from "react";
export default function Toast({ message, onClose, type="info" }){
  useEffect(()=>{ if(!message) return; const id=setTimeout(()=>onClose && onClose(), 3500); return ()=>clearTimeout(id); }, [message, onClose]);
  if(!message) return null;
  const bg = type==="error" ? "#fee2e2" : "#f3e8ff"; const color = type==="error" ? "#9b1c1c" : "#4c1d95";
  return <div style={{ position:"fixed", right:18, bottom:18, zIndex:1400, background:bg, color, padding:"10px 14px", borderRadius:8, boxShadow:"0 8px 30px rgba(16,24,40,0.12)" }}>{message}</div>;
}
