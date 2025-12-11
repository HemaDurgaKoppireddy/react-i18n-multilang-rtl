import React from "react";

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const goPrev = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const goNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  return (
    <div
      style={{
        marginTop: "30px",
        marginBottom: "30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
      }}
    >
      {/* Prev */}
      <button
        onClick={goPrev}
        disabled={page === 1}
        style={{
          padding: "6px 14px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          background: page === 1 ? "#eee" : "white",
          cursor: page === 1 ? "not-allowed" : "pointer",
        }}
      >
        Prev
      </button>

      {/* Page number */}
      <span style={{ fontSize: "14px", color: "#444" }}>
        Page {page} of {totalPages}
      </span>

      {/* Next */}
      <button
        onClick={goNext}
        disabled={page === totalPages}
        style={{
          padding: "6px 14px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          background: page === totalPages ? "#eee" : "white",
          cursor: page === totalPages ? "not-allowed" : "pointer",
        }}
      >
        Next
      </button>
    </div>
  );
}
