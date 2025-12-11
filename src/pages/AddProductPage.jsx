import React from "react";
import ProductForm from "../components/ProductForm";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function AddProductPage({ addProduct, user }){
  const { t } = useTranslation();
  const nav = useNavigate();

  if(!user){
    return (
      <div style={{ maxWidth:760 }}>
        <div className="glass-card">
          <h2>{t("addProduct")}</h2>
          <p className="muted">Please log in to add products. Your username will be shown as the creator.</p>
          <div style={{ display:"flex", gap:8 }}>
            <button className="btn btn-primary" onClick={()=>nav("/login")}>{t("login")}</button>
            <button className="btn" onClick={()=>nav("/")}>{t("home")}</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth:900 }}>
      <h1 style={{ fontSize:32 }}>{t("addProduct")}</h1>
      <ProductForm onSubmit={addProduct} initial={null} />
    </div>
  );
}
