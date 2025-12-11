import React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ProductDetailsPage({ userProducts = [] }) {
  const { id } = useParams();
  const { t } = useTranslation();

  // Get sample products from translations
  const sample = t("sampleProducts", { returnObjects: true }) || [];

  const all = [...sample, ...userProducts];
  const product = all.find(p => p.id === id);

  if (!product) return <h2 style={{ padding:20 }}>Product not found</h2>;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <h1>{product.title}</h1>

      <img
        src={product.image}
        alt={product.title}
        style={{ width: "100%", borderRadius: 12, marginBottom: 20 }}
      />

      <p style={{ fontSize:18 }}>{product.excerpt}</p>

      <div style={{ fontSize:22, fontWeight:700, color:"var(--accent)", marginTop:10 }}>
        ${product.price.toFixed(2)}
      </div>

      <div style={{ marginTop:10, fontSize:16, color:"#555" }}>
        Category: {product.category}
      </div>
    </div>
  );
}
