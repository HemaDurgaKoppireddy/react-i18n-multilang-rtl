import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

const LANGS = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "ar", label: "العربية" }
];

export default function LanguageDropdown({ inMobile=false, onChangeHook=null }){
  const { i18n } = useTranslation();
  const current = i18n.resolvedLanguage || i18n.language || "en";
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(()=>{
    function docClick(e){ if(ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener("click", docClick);
    return ()=> document.removeEventListener("click", docClick);
  },[]);

  function change(l){
    i18n.changeLanguage(l);
    document.documentElement.lang = l;
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
    localStorage.setItem("i18nextLng", l);
    setOpen(false);
    if(onChangeHook) onChangeHook(l);
  }

  return (
    <div ref={ref} style={{ position:"relative", display: inMobile ? "block" : "inline-block" }}>
      <button className="lang-btn" onClick={()=>setOpen(s=>!s)} aria-haspopup="true" aria-expanded={open}>
        <span style={{ fontSize:14 }}>🌐</span><span style={{ fontWeight:700 }}>{current.toUpperCase()}</span>
      </button>

      {open && (
        <div className="drop-panel" style={{ right: inMobile ? "auto" : 0, left: inMobile ? 0 : "auto" }}>
          <div style={{ fontWeight:700, padding:"6px 8px" }}>Choose language</div>
          <div style={{ display:"flex", flexDirection:"column", gap:6, padding:6 }}>
            {LANGS.map(l=>(
              <button key={l.code} onClick={()=>change(l.code)} style={{
                padding:"8px 10px", textAlign:"left", borderRadius:8, background: l.code===current ? "linear-gradient(90deg, rgba(127,90,240,0.08), rgba(127,90,240,0.02))" : "transparent", border:"none", cursor:"pointer"
              }}>
                <span>{l.label}</span>
                {l.code===current && <span style={{ color:"var(--accent)", marginLeft:8 }}>●</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
