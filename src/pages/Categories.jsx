// src/pages/Categories.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useTranslation } from "react-i18next";
import "../styles.css";

/**
 * Shows a list of categories (derived from products).
 * Each category links to /category/<slug>
 */

function slugify(text = "") {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/["'’`]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function Categories() {
  const { products } = useProducts();
  const { t } = useTranslation("common");

  // Build unique english categories (fall back if product has no category)
  const cats = Array.from(
    new Map(
      (products || []).map((p) => {
        // prefer 'en' string if category is object, else fallback to string value
        const raw = (p.category && (p.category.en || p.category)) || "";
        const label = String(raw).trim();
        const slug = slugify(label);
        return [slug, { label, slug }];
      })
    ).values()
  );

  return (
    <div className="container categories-page">
      <h1>{t("categories.title") || "All Categories"}</h1>

      <div className="categories-grid">
        {cats.map((c) => (
          <Link key={c.slug} to={`/category/${c.slug}`} className="category-card">
            <div className="category-card-body">
              <div className="category-title">{c.label}</div>
              <div className="category-cta">View {t("products.title") || "Products"}</div>
            </div>
          </Link>
        ))}
      </div>

      {cats.length === 0 && <p>{t("categories.noProducts")}</p>}
    </div>
  );
}
