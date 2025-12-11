// src/components/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useTranslation } from "react-i18next";

export default function ProductCard({ product }) {
  const { addToCart, formatPrice } = useProducts();
  const { t, i18n } = useTranslation();

  const lang = i18n.language || "en";

  const name = product.names?.[lang] || product.names?.en || "";
  const category = product.category?.[lang] || product.category?.en || "";
  const priceText = formatPrice(product.price, lang);

  return (
    <div className="e-card">
      <div className="e-card-media">
        <img src={product.image} alt={name} />
      </div>

      <div className="e-card-body">
        <h3 className="e-card-title">{name}</h3>
        <p className="e-card-category">{category}</p>

        <div className="e-card-bottom">
          <div className="price-block">
            <span className="price">{priceText}</span>
          </div>

          <div className="e-card-actions">
            <Link to={`/product/${product.id}`} className="btn ghost">
              {t("product.view")}
            </Link>

            <button className="btn primary" onClick={() => addToCart(product.id)}>
              {t("product.addToCart")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
