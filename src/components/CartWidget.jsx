// src/components/CartWidget.jsx
import React, { useState } from "react";
import { useProducts } from "../context/ProductContext";
import { useTranslation } from "react-i18next";

export default function CartWidget({ mobileLabel }) {
  const { cart, products, updateCart, removeFromCart, clearCart, formatPrice } =
    useProducts();
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);

  const lang = i18n.language || "en";

  // Build cart item list
  const items = Object.entries(cart)
    .map(([id, qty]) => {
      const p = products.find((x) => x.id === id);
      return p ? { ...p, qty } : null;
    })
    .filter(Boolean);

  const total = items.reduce((sum, it) => sum + it.price * it.qty, 0);

  return (
    <>
      {/* CART BUTTON */}
      <button
        className="btn cart-widget cart-icon"
        onClick={() => setOpen(true)}
        aria-label="Open cart"
      >
        🛒 {mobileLabel ? mobileLabel : t("cart.title")} ({items.length})
      </button>

      {/* CART DRAWER */}
      <aside
        className={`cart-drawer ${open ? "open" : ""}`}
        onClick={(e) => e.stopPropagation()}  // ✅ FIX: prevent unwanted closing
      >
        <div className="cart-head">
          <h3>{t("cart.title")}</h3>

          <button
            onClick={() => setOpen(false)}
            className="drawer-close"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        <div className="cart-body">
          {items.length === 0 ? (
            <p>{t("cart.empty")}</p>
          ) : (
            <>
              {items.map((it) => {
                const itemName =
                  it.names?.[lang] || it.names?.en || "No name";
                const itemCategory =
                  it.category?.[lang] || it.category?.en || "";

                return (
                  <div key={it.id} className="cart-line">
                    <div className="cart-left">
                      <img
                        src={it.image || "/products/placeholder.png"}
                        alt={itemName}
                      />

                      <div>
                        <div style={{ fontWeight: 600 }}>{itemName}</div>

                        <div style={{ color: "#666", fontSize: 13 }}>
                          {itemCategory}
                        </div>
                      </div>
                    </div>

                    <div className="cart-right">
                      <div>
                        <input
                          type="number"
                          min="1"
                          value={it.qty}
                          onChange={(e) =>
                            updateCart(it.id, Number(e.target.value))
                          }
                          style={{ width: 60 }}
                        />
                      </div>

                      <div style={{ marginTop: 8 }}>
                        <button
                          className="btn btn-ghost"
                          onClick={() => removeFromCart(it.id)}
                        >
                          {t("cart.remove")}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* TOTAL */}
              <div className="cart-footer">
                <strong>{t("cart.total")}</strong>
                <strong>{formatPrice(total, lang)}</strong>
              </div>

              {/* CHECKOUT */}
              <div style={{ marginTop: 12 }}>
                <button
                  className="btn primary"
                  onClick={() => {
                    alert("Checkout (demo)");
                    clearCart();
                    setOpen(false);
                  }}
                >
                  {t("cart.checkout")}
                </button>
              </div>
            </>
          )}
        </div>
      </aside>

      {/* BACKDROP — Clicking closes the cart */}
      <div
        className={`drawer-backdrop ${open ? "visible" : ""}`}
        onClick={() => setOpen(false)}
      />
    </>
  );
}
