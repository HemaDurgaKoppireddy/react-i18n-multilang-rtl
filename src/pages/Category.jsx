// src/pages/Category.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import { useTranslation } from "react-i18next";
import "../styles.css";

/**
 * Matches slug against each product's category translations using same slugify function.
 * This approach is robust for multilingual categories because it compares slugs,
 * not raw language strings.
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

export default function Category() {
  const { slug } = useParams(); // e.g. "mobile-phones"
  const { products } = useProducts();
  const { t, i18n } = useTranslation("common");

  if (!slug) {
    return (
      <div className="container category-page">
        <p>{t("category.noProducts")}</p>
      </div>
    );
  }

  // Filter: create slug for every product's category translations and match
  const filtered = products.filter((p) => {
    const catObj = p.category || {};
    // If category is string, turn into single entry:
    const values =
      typeof catObj === "string" ? [catObj] : Object.values(catObj || {});

    return values.some((val) => slugify(val) === slug);
  });

  // Title: try translation key 'category.<slug>' else show prettified slug
  const translationKey = `category.${slug}`;
  const translatedTitle = t(translationKey);
  const title =
    translatedTitle && translatedTitle !== translationKey
      ? translatedTitle
      : // prettify slug -> Mobile Phones
        slug
          .replace(/-/g, " ")
          .replace(/\b\w/g, (ch) => ch.toUpperCase());

  return (
    <div className="container category-page">
      <h1>{title}</h1>

      {filtered.length === 0 ? (
        <p>{t("category.noProducts")}</p>
      ) : (
        <div className="product-grid">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
