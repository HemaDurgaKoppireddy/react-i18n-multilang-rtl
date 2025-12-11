import React, { useState, useEffect } from "react";
import ProductGrid from "../components/ProductGrid";
import Pagination from "../components/Pagination";
import { useTranslation } from "react-i18next";

export default function ProductsPage({
  search,
  userProducts,
  editProduct,
  deleteProduct
}) {
  const { t } = useTranslation();

  // Safety fallback
  const items = userProducts || [];

  // Handle search query (case-insensitive)
  const q = search ? search.toLowerCase() : "";

  const filtered = q
    ? items.filter((p) =>
        p.title.toLowerCase().includes(q) ||
        (p.excerpt || "").toLowerCase().includes(q) ||
        (p.category || "").toLowerCase().includes(q)
      )
    : items;

  // Pagination
  const [page, setPage] = useState(1);
  const perPage = 6;

  // Reset page to 1 when search changes
  useEffect(() => {
    setPage(1);
  }, [search]);

  const start = (page - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  return (
    <div className="page-container">
      <h1 className="page-title">{t("products")}</h1>

      {/* Product grid */}
      <ProductGrid
        items={paginated}
        onEdit={editProduct}
        onDelete={deleteProduct}
      />

      {/* Pagination */}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
