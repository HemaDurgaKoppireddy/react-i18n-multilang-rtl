import React from "react";
import { useProducts } from "../context/ProductContext";
import { useTranslation } from "react-i18next";

export default function CartDrawer({ isOpen, closeCart }) {
  const { cart, products, removeFromCart, updateCart } = useProducts();
  const { t, i18n } = useTranslation("common");

  const items = Object.entries(cart)
    .map(([id, qty]) => {
      const p = products.find((x) => x.id === id);
      if (!p) return null;
      return {
        id,
        qty,
        name: p.names[i18n.language] || p.names.en,
        price: p.price,
        category: p.category[i18n.language] || p.category.en,
        image: p.image,
      };
    })
    .filter(Boolean);

  const total = items.reduce((sum, it) => sum + it.price * it.qty, 0);

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay ${isOpen ? "open" : ""}`}
        onClick={closeCart}
      ></div>

      {/* Drawer */}
      <div className={`cart-drawer ${isOpen ? "open" : ""}`}>
        {/* Header */}
        <div className="cart-head">
          <h3>{t("nav.cart")}</h3>
          <button className="drawer-close" onClick={closeCart}>
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="cart-body">
          {items.length === 0 ? (
            <p>{t("cart.empty")}</p>
          ) : (
            items.map((it) => (
              <div key={it.id} className="cart-line">
                <div className="cart-left">
                  <img src={it.image} alt={it.name} />
                  <div>
                    <strong>{it.name}</strong>
                    <div className="cart-category">{it.category}</div>
                  </div>
                </div>

                <div className="cart-right">
                  <input
                    type="number"
                    value={it.qty}
                    min="1"
                    className="qty-input"
                    onChange={(e) =>
                      updateCart(it.id, Number(e.target.value))
                    }
                  />
                  <button
                    className="btn btn-ghost"
                    onClick={() => removeFromCart(it.id)}
                  >
                    {t("remove")}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="cart-footer">
          <strong>{t("total")}</strong>
          <strong>
            {new Intl.NumberFormat(i18n.language, {
              style: "currency",
              currency:
                i18n.language === "es"
                  ? "EUR"
                  : i18n.language === "ja"
                  ? "JPY"
                  : i18n.language === "ar"
                  ? "AED"
                  : "USD",
            }).format(total)}
          </strong>
        </div>
      </div>
    </>
  );
}
