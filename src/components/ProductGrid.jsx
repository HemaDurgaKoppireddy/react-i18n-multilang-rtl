import React from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ items, onEdit, onDelete }) {
  if (!items || items.length === 0) return <p className="muted">No products yet.</p>;
  return (
    <div className="grid">
      {items.map((p) => <ProductCard key={p.id} product={p} onEdit={onEdit} onDelete={onDelete} />)}
    </div>
  );
}
