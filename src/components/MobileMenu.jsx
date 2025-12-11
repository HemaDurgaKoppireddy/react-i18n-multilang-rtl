import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function MobileMenu({ close, user }) {
  const { t } = useTranslation();

  return (
    <div className="mobile-menu">
      <button onClick={close} className="mobile-close-btn">✕</button>

      <Link to="/" onClick={close}>{t("home")}</Link>
      <Link to="/products" onClick={close}>{t("products")}</Link>
      <Link to="/categories" onClick={close}>{t("categories")}</Link>

      {!user && (
        <Link to="/login" onClick={close}>{t("login")}</Link>
      )}
    </div>
  );
}
