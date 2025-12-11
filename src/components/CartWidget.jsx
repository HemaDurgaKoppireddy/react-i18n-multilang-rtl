// src/components/CartWidget.jsx
import React, { useState } from "react";
import { useProducts } from "../context/ProductContext";
import { useTranslation } from "react-i18next";

export default function CartWidget() {
  const { cart, products, updateCart, removeFromCart, clearCart, formatPrice } =
    useProducts();
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);

  const lang = i18n.language || "en";

  // build array of cart items
  const items = Object.entries(cart)
    .map(([id, qty]) => {
      const p = products.find((x) => x.id === id);
      return p ? { ...p, qty } : null;
    })
    .filter(Boolean);

  const total = items.reduce((sum, it) => sum + it.price * it.qty, 0);

  return (
    <>
      <button
        className="btn cart-widget"
        onClick={() => setOpen(true)}
        aria-label="Open cart"
      >
        🛒 {t("cart.title")} ({items.length})
      </button>

      <aside className={`cart-drawer ${open ? "open" : ""}`}>
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
                          {t("cart.remove") || "Remove"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Total */}
              <div className="cart-footer">
                <div>
                  <strong>{t("cart.total")}</strong>
                </div>
                <div>
                  <strong>{formatPrice(total, lang)}</strong>
                </div>
              </div>

              {/* Checkout */}
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

      <div
        className={`drawer-backdrop ${open ? "visible" : ""}`}
        onClick={() => setOpen(false)}
      />
    </>
  );
}
