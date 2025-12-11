import React from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { useProducts } from "../context/ProductContext";
import { useTranslation } from "react-i18next";

export default function AddProduct(){
  const { addProduct } = useProducts();
  const navigate = useNavigate();
  const { t } = useTranslation("common");

  function submit(data){
    addProduct(data);
    alert(t("messages.added"));
    navigate("/products");
  }

  return (
    <div className="container">
      <h2>{t("nav.addProduct")}</h2>
      <div className="card">
        <ProductForm onSubmit={submit} />
      </div>
    </div>
  );
}
