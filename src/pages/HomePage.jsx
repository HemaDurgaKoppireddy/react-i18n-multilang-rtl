import React from "react";
import ProductGrid from "../components/ProductGrid";
import { useTranslation } from "react-i18next";

export default function HomePage({ search, userProducts }) {
  const { t } = useTranslation();

  // Load sample products from translation JSON
  let sampleProducts = t("sampleProducts", { returnObjects: true });

  if (!Array.isArray(sampleProducts)) sampleProducts = [];

  // Merge sample + user products
  const all = [...sampleProducts, ...(userProducts || [])];

  // Search filter
  const q = search ? search.toLowerCase() : "";

  const filtered = q
    ? all.filter((p) =>
        p.title?.toLowerCase().includes(q) ||
        p.excerpt?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
      )
    : all;

  return (
    <div>
      <h1 className="page-title">{t("home")}</h1>
      <ProductGrid items={filtered} />
    </div>
  );
}
