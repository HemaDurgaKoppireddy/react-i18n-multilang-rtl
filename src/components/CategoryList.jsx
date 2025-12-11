import React from "react";
import ProductCard from "./ProductCard";

export default function CategoryList({ categories }) {
  if (!categories || Object.keys(categories).length === 0) {
    return <p style={{ padding: 20 }}>No categories found.</p>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      {Object.entries(categories).map(([category, products]) => (
        <div key={category}>
          <h2
            style={{
              marginBottom: "16px",
              fontSize: "24px",
              color: "var(--accent)",
              fontWeight: 700,
            }}
          >
            {category}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            {products.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
