// src/pages/Home.jsx
import React from "react";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../context/ProductContext";
import { useTranslation } from "react-i18next";
import { useLocation, Link } from "react-router-dom";

export default function Home() {
  const { products, searchProducts } = useProducts();
  const { t } = useTranslation();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const searchQuery = params.get("search") || "";

  const displayedProducts = searchQuery
    ? searchProducts(searchQuery)
    : products;

  return (
    <div className="container home-page">
      {/* Hero Section */}
      <div className="hero-banner">
        <div className="hero-text">
          <h1>{t("home.welcome")}</h1>
          <p>{t("home.subtitle")}</p>
        </div>
      </div>

      {/* Category Chips */}
      <h2 className="section-title">{t("home.categories")}</h2>
      <div className="category-row">
        <Link to="/category/mobile-phones" className="category-chip">
          {t("category.mobile-phones")}
        </Link>
        <Link to="/category/laptops" className="category-chip">
          {t("category.laptops")}
        </Link>
        <Link to="/category/headphones" className="category-chip">
          {t("category.headphones")}
        </Link>
        <Link to="/category/fashion" className="category-chip">
          {t("category.fashion")}
        </Link>
        <Link to="/category/sports" className="category-chip">
          {t("category.sports")}
        </Link>
        <Link to="/category/home-kitchen" className="category-chip">
          {t("category.home-kitchen")}
        </Link>
      </div>

      {/* Products Listing */}
      <h2 className="section-title">
        {searchQuery
          ? `${t("home.searchResults")} "${searchQuery}"`
          : t("home.trending")}
      </h2>

      <div className="product-grid">
        {displayedProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
