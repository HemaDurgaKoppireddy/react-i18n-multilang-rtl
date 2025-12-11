import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ item, onEdit, onDelete }) {
  const nav = useNavigate();

  // 🚨 Prevent crash if item is missing or invalid
  if (!item || typeof item !== "object") {
    return null; // do not render anything
  }

  const {
    id,
    title = "Untitled Product",
    price = 0,
    excerpt = "",
    image = "https://via.placeholder.com/300x200?text=No+Image",
    category = "",
  } = item;

  return (
    <div className="card">
      <img className="prod-img" src={image} alt={title} />

      <div className="prod-title">{title}</div>

      <div className="muted" style={{ marginTop: 6 }}>{excerpt}</div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 12,
        }}
      >
        <div style={{ color: "var(--accent)", fontWeight: 700 }}>
          ${Number(price).toFixed(2)}
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn" onClick={() => nav(`/products/${id}`)}>
            View
          </button>

          {onEdit && (
            <button className="btn" onClick={() => onEdit(item)}>
              Edit
            </button>
          )}

          {onDelete && (
            <button
              className="btn"
              style={{ background: "#f87171", color: "white" }}
              onClick={() => onDelete(id)}
            >
              Delete
            </button>
          )}
        </div>
      </div>

      <div className="muted" style={{ marginTop: 8 }}>{category}</div>
    </div>
  );
}
