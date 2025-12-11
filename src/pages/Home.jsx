// src/pages/Home.jsx
import React from "react";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../context/ProductContext";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

export default function Home() {
  const { products, searchProducts } = useProducts();
  const { t } = useTranslation();
  const location = useLocation();

  // Read search parameter from URL
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get("search") || "";

  // If search exists → filter products
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

      {/* Categories */}
      <h2 className="section-title">{t("home.categories")}</h2>
      <div className="category-row">
        <button className="category-chip">{t("category.mobilePhones")}</button>
        <button className="category-chip">{t("category.laptops")}</button>
        <button className="category-chip">{t("category.headphones")}</button>
        <button className="category-chip">{t("category.fashion")}</button>
        <button className="category-chip">{t("category.sports")}</button>
        <button className="category-chip">{t("category.homeKitchen")}</button>
      </div>

      {/* Products */}
      <h2 className="section-title">
        {searchQuery ? `${t("home.searchResults")} "${searchQuery}"` : t("home.trending")}
      </h2>

      <div className="product-grid">
        {displayedProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

    </div>
  );
}
