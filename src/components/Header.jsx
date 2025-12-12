// src/components/Header.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { loadLanguage } from "../i18n";
import CartWidget from "./CartWidget";
import AuthModal from "./AuthModal";
import { useAuth } from "../context/AuthContext";
import "../styles.css";

/* ICON HEXCODES */
const ICON_MENU = "≡";  
const ICON_CLOSE = "✕";

export default function Header() {
  const { t, i18n } = useTranslation("common");
  const navigate = useNavigate();
  const location = useLocation();
  const { current, logout } = useAuth();

  const [query, setQuery] = useState("");
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  const langRef = useRef();

  /* CLOSE LANGUAGE DROPDOWN ON OUTSIDE CLICK */
  useEffect(() => {
    function onClick(e) {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    }
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  /* RTL SWITCH */
  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  /* CLEAR SEARCH WHEN NAVIGATING */
  useEffect(() => {
    setQuery("");
  }, [location.pathname]);

  async function changeLanguage(lng) {
    await loadLanguage(lng);
    setLangOpen(false);
  }

  function handleSearch(e) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    navigate(`/products?search=${encodeURIComponent(q)}`);
    setMobileOpen(false);
  }

  return (
    <>
      {/* ==================== DESKTOP / TABLET HEADER ==================== */}
      <header className="site-header">
        {/* LEFT SIDE */}
        <div className="header-left">
          {/* MOBILE MENU BUTTON */}
          <button className="hamburger" onClick={() => setMobileOpen(true)}>
            {ICON_MENU}
          </button>

          {/* BRAND NAME (TRANSLATED) */}
          <Link to="/" className="brand">
            <span className="brand-mark">{t("app_name")}</span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="main-nav desktop-only">
            <NavLink to="/" className="nav-link">
              {t("nav.home")}
            </NavLink>

            <NavLink to="/products" className="nav-link">
              {t("nav.products")}
            </NavLink>

            <NavLink to="/categories" className="nav-link">
              {t("nav.categories")}
            </NavLink>
          </nav>
        </div>

        {/* SEARCH (DESKTOP ONLY) */}
        <form className="header-search desktop-only" onSubmit={handleSearch}>
          <input
            type="search"
            value={query}
            placeholder={t("search.placeholder")}
            onChange={(e) => {
              const value = e.target.value;
              setQuery(value);

              // LIVE SEARCH NAVIGATION
              navigate(`/products?search=${encodeURIComponent(value)}`);
            }}
          />
        </form>

        {/* RIGHT SIDE */}
        <div className="header-right">
          {/* LANGUAGE SWITCHER */}
          <div className="lang-wrap desktop-only" ref={langRef}>
            <button
              className="lang-toggle"
              onClick={(e) => {
                e.stopPropagation();
                setLangOpen(!langOpen);
              }}
            >
              🌐 {t(`languages.${i18n.language}`)}
            </button>

            {langOpen && (
              <div className="lang-dropdown">
                {["en", "es", "ar", "ja"].map((lng) => (
                  <div
                    key={lng}
                    className="lang-item"
                    onClick={() => changeLanguage(lng)}
                  >
                    {t(`languages.${lng}`)}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* USER PROFILE DROPDOWN */}
          {current ? (
            <div className="user-profile desktop-only">
              <div
                className="user-name"
                onClick={() => setUserDropdown((p) => !p)}
              >
                {t("nav.hello")}, {current.name.split(" ")[0]} ▼
              </div>

              {userDropdown && (
                <div className="user-dropdown">
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      navigate("/add-product");
                      setUserDropdown(false);
                    }}
                  >
                    {t("nav.addProduct")}
                  </button>

                  <button className="dropdown-item" onClick={logout}>
                    {t("nav.logout")}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="login-link desktop-only"
              onClick={() => setAuthOpen(true)}
            >
              {t("nav.login")}
            </button>
          )}

          {/* CART */}
          <CartWidget mobileLabel={t("nav.cart")} />
        </div>
      </header>

      {/* ==================== MOBILE MENU DRAWER ==================== */}
      <aside className={`mobile-drawer ${mobileOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <div className="brand">{t("app_name")}</div>
          <button className="drawer-close" onClick={() => setMobileOpen(false)}>
            {ICON_CLOSE}
          </button>
        </div>

        <div className="drawer-content">
          {/* SEARCH */}
          <form className="drawer-search" onSubmit={handleSearch}>
            <input
              type="search"
              placeholder={t("search.placeholder")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>

          {/* NAVIGATION */}
          <nav className="drawer-nav">
            <Link to="/" onClick={() => setMobileOpen(false)}>
              {t("nav.home")}
            </Link>

            <Link to="/products" onClick={() => setMobileOpen(false)}>
              {t("nav.products")}
            </Link>

            <Link to="/categories" onClick={() => setMobileOpen(false)}>
              {t("nav.categories")}
            </Link>

            <Link to="/cart" onClick={() => setMobileOpen(false)}>
              {t("nav.cart")}
            </Link>
          </nav>

          {/* LANGUAGE */}
          <div className="drawer-section">
            <div className="drawer-title">{t("nav.language")}</div>
            <div className="drawer-lang-list">
              {["en", "es", "ar", "ja"].map((lng) => (
                <button
                  key={lng}
                  className="chip"
                  onClick={() => changeLanguage(lng)}
                >
                  {lng.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* USER ACTIONS */}
          {current && (
            <div className="drawer-section">
              <p>
                {t("nav.hello")}, {current.name}
              </p>

              <button
                className="btn ghost"
                onClick={() => {
                  navigate("/add-product");
                  setMobileOpen(false);
                }}
              >
                {t("nav.addProduct")}
              </button>

              <button
                className="btn ghost"
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
              >
                {t("nav.logout")}
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* BACKDROP */}
      <div
        className={`drawer-backdrop ${mobileOpen ? "visible" : ""}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* AUTH MODAL */}
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
