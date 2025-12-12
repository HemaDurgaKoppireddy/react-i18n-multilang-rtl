import React from "react";
import { useLocation } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import { useTranslation } from "react-i18next";

export default function Products() {
  const { products, searchProducts } = useProducts();
  const location = useLocation();
  const { t } = useTranslation("common");

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search")?.toLowerCase() || "";

  const filtered = searchQuery ? searchProducts(searchQuery) : products;

  return (
    <div className="container products-page">
      <h1>{t("products.title")}</h1>

      {/* NO extra search bar here */}

      <div className="product-grid">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
