import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { loadLanguage } from "../i18n";
import CartWidget from "./CartWidget";
import AuthModal from "./AuthModal";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { i18n } = useTranslation("common");
  const navigate = useNavigate();
  const { current, logout } = useAuth();

  const [query, setQuery] = useState("");
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  const langRef = useRef();

  useEffect(() => {
    function onClick(e) {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    }
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  async function changeLanguage(lng) {
    await loadLanguage(lng);
    setLangOpen(false);
  }

  function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;

    navigate(`/products?search=${encodeURIComponent(query.trim())}`);
    setMobileOpen(false);
  }

  return (
    <>
      {/* HEADER */}
      <header className="site-header">
        <div className="header-left">
          <button className="hamburger" onClick={() => setMobileOpen(true)}>
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
          </button>

          <Link to="/" className="brand">
            <span className="brand-mark">Global Shop</span>
          </Link>

          <nav className="main-nav">
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/products" className="nav-link">Products</NavLink>
            <NavLink to="/category/Mobile%20Phones" className="nav-link">Categories</NavLink>
          </nav>
        </div>

        {/* SEARCH */}
        <form className="header-search" onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="Search for products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>

        {/* RIGHT SIDE */}
        <div className="header-right">
          {/* LANGUAGE */}
          <div className="lang-wrap" ref={langRef}>
            <button
              className="lang-toggle"
              onClick={(e) => {
                e.stopPropagation();
                setLangOpen(!langOpen);
              }}
            >
              🌐 {i18n.language.toUpperCase()}
            </button>

            {langOpen && (
              <div className="lang-dropdown">
                <div className="lang-item" onClick={() => changeLanguage("en")}>English</div>
                <div className="lang-item" onClick={() => changeLanguage("es")}>Español</div>
                <div className="lang-item" onClick={() => changeLanguage("ar")}>العربية</div>
                <div className="lang-item" onClick={() => changeLanguage("ja")}>日本語</div>
              </div>
            )}
          </div>

          {/* USER */}
          {current ? (
            <div className="user-profile desktop-only">
              <div
                className="user-name"
                onClick={() => setUserDropdown((prev) => !prev)}
                style={{ cursor: "pointer", fontWeight: 600 }}
              >
                Hello, {current.name.split(" ")[0]} ▼
              </div>

              {userDropdown && (
                <div className="user-dropdown">
                  <button className="dropdown-item" onClick={logout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="login-link" onClick={() => setAuthOpen(true)}>
              Login
            </button>
          )}

          <CartWidget />
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <aside className={`mobile-drawer ${mobileOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <div className="brand">Global Shop</div>
          <button className="drawer-close" onClick={() => setMobileOpen(false)}>✕</button>
        </div>

        <div className="drawer-content">
          <form className="drawer-search" onSubmit={handleSearch}>
            <input
              type="search"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>

          <nav className="drawer-nav">
            <Link to="/" className="drawer-link" onClick={() => setMobileOpen(false)}>Home</Link>
            <Link to="/products" className="drawer-link" onClick={() => setMobileOpen(false)}>Products</Link>
            <Link to="/category/Mobile%20Phones" className="drawer-link" onClick={() => setMobileOpen(false)}>Categories</Link>
          </nav>

          <div className="drawer-section">
            <div className="drawer-title">Language</div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="chip" onClick={() => changeLanguage("en")}>EN</button>
              <button className="chip" onClick={() => changeLanguage("es")}>ES</button>
              <button className="chip" onClick={() => changeLanguage("ar")}>AR</button>
              <button className="chip" onClick={() => changeLanguage("ja")}>JA</button>
            </div>
          </div>

          {current ? (
            <div className="drawer-section">
              <p>Hello, {current.name}</p>
              <button className="btn ghost" onClick={() => { logout(); setMobileOpen(false); }}>
                Logout
              </button>
            </div>
          ) : (
            <button className="drawer-cta" onClick={() => { setMobileOpen(false); setAuthOpen(true); }}>
              Login
            </button>
          )}
        </div>
      </aside>

      <div
        className={`drawer-backdrop ${mobileOpen ? "visible" : ""}`}
        onClick={() => setMobileOpen(false)}
      />

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
