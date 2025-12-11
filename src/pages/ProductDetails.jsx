// src/pages/ProductView.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useTranslation } from "react-i18next";

export default function ProductView() {
  const { id } = useParams();
  const { products, addToCart, formatPrice } = useProducts();
  const { i18n } = useTranslation();

  const lang = i18n.language || "en";
  const product = products.find((p) => p.id === id);

  if (!product) return <h2>Product not found</h2>;

  const name = product.names?.[lang] || product.names?.en;
  const category = product.category?.[lang] || product.category?.en;
  const description = product.description?.[lang] || product.description?.en;

  const priceText = formatPrice(product.price, lang);

  return (
    <div className="container product-details">

      <div className="pd-wrapper">
        
        {/* Left: Product Image */}
        <div className="pd-image">
          <img src={product.image} alt={name} />
        </div>

        {/* Right: Info */}
        <div className="pd-info">
          <h1 className="pd-title">{name}</h1>

          <div className="pd-meta">
            <strong>Category:</strong> {category}
          </div>

          <div className="pd-price">{priceText}</div>

          <div className="pd-desc">
            <strong>Description:</strong>
            <p>{description}</p>
          </div>

          <button
            className="btn primary"
            onClick={() => addToCart(product.id)}
            style={{ marginTop: 20 }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
