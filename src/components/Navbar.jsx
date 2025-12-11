import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageMenu from "./LanguageMenu";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";

export default function Navbar({ search, setSearch, user }) {
  const { t } = useTranslation();

  const [showLang, setShowLang] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const langRef = useRef(null);
  const userRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (langRef.current && !langRef.current.contains(e.target))
        setShowLang(false);

      if (userRef.current && !userRef.current.contains(e.target))
        setShowUser(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
      {/* NAVBAR WRAPPER */}
      <div className="header-wrap">
        <div className="navbar container-inner">

          {/* MOBILE BUTTON */}
          <button
            className="mobile-btn"
            onClick={() => setMobileOpen(true)}
          >
            ☰
          </button>

          {/* LEFT: LOGO */}
          <Link to="/" className="nav-logo">
            Global Shop
          </Link>

          {/* CENTER LINKS */}
          <div className="nav-links">
            <NavLink to="/" className="nav-link">{t("home")}</NavLink>
            <NavLink to="/products" className="nav-link">{t("products")}</NavLink>
            <NavLink to="/categories" className="nav-link">{t("categories")}</NavLink>
          </div>

          {/* RIGHT SIDE */}
          <div className="nav-right">

            {/* SEARCH */}
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
              placeholder={t("searchPlaceholder")}
            />

            {/* LANGUAGE DROPDOWN */}
            <div ref={langRef} className="dropdown-wrap">
              <button
                className="lang-btn"
                onClick={() => setShowLang(!showLang)}
              >
                🌐 <span style={{ fontWeight: 600 }}>EN</span>
              </button>

              {showLang && <LanguageMenu />}
            </div>

            {/* USER DROPDOWN */}
            <div ref={userRef} className="dropdown-wrap">
              {user ? (
                <button
                  className="profile-btn"
                  onClick={() => setShowUser(!showUser)}
                >
                  <div className="avatar">{user[0].toUpperCase()}</div>
                  {user}
                </button>
              ) : (
                <Link to="/login" className="login-button">
                  {t("login")}
                </Link>
              )}

              {showUser && user && <UserMenu />}
            </div>

          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && <MobileMenu close={() => setMobileOpen(false)} user={user} />}
    </>
  );
}
