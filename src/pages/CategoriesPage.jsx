import React from "react";
import CategoryList from "../components/CategoryList";
import { useTranslation } from "react-i18next";

export default function CategoriesPage({ search, userProducts }) {
  const { t } = useTranslation();

  // sample products from translations
  const sample = t("sampleProducts", { returnObjects: true }) || [];
  const allProducts = [...sample, ...(userProducts || [])];

  // list of unique categories
  const categories = [...new Set(allProducts.map((p) => p.category || ""))];

  // safe search
  const q = search ? search.toLowerCase() : "";

  const filteredCategories = q
    ? categories.filter((cat) => cat.toLowerCase().includes(q))
    : categories;

  // structure: { category: [...products] }
  const categoryMap = {};
  filteredCategories.forEach((cat) => {
    categoryMap[cat] = allProducts.filter((p) => p.category === cat);
  });

  return (
    <div className="page-container">
      <h1 className="page-title">{t("categories")}</h1>

      <CategoryList categories={categoryMap} />
    </div>
  );
}
