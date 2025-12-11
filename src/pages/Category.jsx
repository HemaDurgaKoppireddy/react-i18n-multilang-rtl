// src/pages/Category.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import { useTranslation } from "react-i18next";

export default function Category() {
  const { cat } = useParams(); // expects category slug or translated name
  const { getByCategory } = useProducts();
  const { i18n, t } = useTranslation();

  // getByCategory matches against any translation values
  const items = getByCategory(cat);

  return (
    <div className="page">
      <h1>{cat}</h1>

      {items.length === 0 && <p>{t ? t("categories.noProducts") : "No products available in this category"}</p>}

      <div className="product-grid">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
