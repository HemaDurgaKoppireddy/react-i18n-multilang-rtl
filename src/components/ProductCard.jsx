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

  /*  ADD-TO-CART FLYING ANIMATION  */
  const handleAddToCart = (e) => {
    addToCart(product.id);

    const img = e.target.closest(".e-card").querySelector("img");
    const cartIcon = document.querySelector(".cart-icon");

    if (!img || !cartIcon) return;

    const flyingImg = img.cloneNode(true);
    flyingImg.classList.add("flying-img");
    document.body.appendChild(flyingImg);

    const imgRect = img.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    flyingImg.style.left = imgRect.left + "px";
    flyingImg.style.top = imgRect.top + "px";

    requestAnimationFrame(() => {
      flyingImg.style.transform = `translate(${cartRect.left - imgRect.left}px, ${
        cartRect.top - imgRect.top
      }px) scale(0.1)`;
      flyingImg.style.opacity = "0";
    });

    setTimeout(() => flyingImg.remove(), 900);
  };

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

            <button
              className="btn primary"
              onClick={handleAddToCart}
            >
              {t("product.addToCart")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
