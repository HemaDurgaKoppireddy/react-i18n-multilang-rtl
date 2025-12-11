import React from "react";
import { useTranslation } from "react-i18next";
import { loadLanguage } from "../i18n";

export default function Settings(){
  const { t, i18n } = useTranslation("common");
  const lng = i18n.language;

  async function change(l){ await loadLanguage(l); }

  return (
    <div className="container">
      <h2>{t("settings")}</h2>
      <div className="card">
        <p>{t("currentLang")}: {lng}</p>
        <div style={{display:"flex", gap:8, marginTop:8}}>
          {["en","es","ar","ja"].map(l => (
            <button key={l} className="btn btn-ghost" onClick={()=>change(l)}>{l.toUpperCase()}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
