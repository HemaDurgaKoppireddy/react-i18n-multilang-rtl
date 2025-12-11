import React from "react";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();
  return (
    <section style={{
      background: "linear-gradient(90deg, rgba(14,165,163,0.06), rgba(16,185,129,0.03))",
      borderRadius: 12,
      padding: "28px 20px",
      marginBottom: 18
    }}>
      <div style={{ maxWidth: 980, margin: "0 auto", display: "flex", gap: 20, alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h2 style={{ margin: 0 }}>{t("siteName")}</h2>
          <p className="muted" style={{ marginTop: 6 }}>
            {t("heroSubtitle") || "Shop the best products from around the world."}
          </p>
          <div style={{ marginTop: 12 }}>
            <a href="#products" className="btn btn-primary">{t("shopNow") || "Shop Now"}</a>
            <span style={{ marginLeft: 12 }} className="muted">{t("freeShipping") || "Free shipping on orders over $50"}</span>
          </div>
        </div>
        <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&q=60" alt="hero" style={{ width: 320, height: 180, objectFit: "cover", borderRadius: 12 }} />
      </div>
    </section>
  );
}
