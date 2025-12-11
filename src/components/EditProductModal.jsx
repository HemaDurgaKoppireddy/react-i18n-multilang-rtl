import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ProductForm from "./ProductForm";

export default function EditProductModal({ product, onClose, onSave }) {
  const { t } = useTranslation();

  if (!product) return null;

  function handleSubmit(updated) {
    onSave(product.id, updated);
    onClose();
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{t("edit")}</h2>

        <ProductForm initial={product} onSubmit={handleSubmit} />

        <button className="btn btn-secondary" onClick={onClose}>
          {t("cancel")}
        </button>
      </div>
    </div>
  );
}
