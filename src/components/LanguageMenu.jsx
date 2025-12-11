import React from "react";
import { useTranslation } from "react-i18next";

export default function LanguageMenu() {
  const { i18n } = useTranslation();

  return (
    <div className="drop-panel">
      <button onClick={() => i18n.changeLanguage("en")}>English</button>
      <button onClick={() => i18n.changeLanguage("fr")}>Français</button>
      <button onClick={() => i18n.changeLanguage("es")}>Español</button>
      <button onClick={() => i18n.changeLanguage("ar")}>العربية</button>
    </div>
  );
}
