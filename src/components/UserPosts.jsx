import React, { useState } from "react";

export default function UserPosts({ posts, onEdit, onDelete }) {
  /* -------------------------------------------
     Pagination Logic
  --------------------------------------------*/
  const [page, setPage] = useState(1);
  const perPage = 3; // Number of posts per page

  const totalPages = Math.ceil(posts.length / perPage);

  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paginated = posts.slice(start, end);

  /* -------------------------------------------
     No Posts Case
  --------------------------------------------*/
  if (posts.length === 0)
    return <p style={{ marginTop: 20 }}>No user posts yet.</p>;

  return (
    <section style={{ marginTop: 30 }}>
      <h2>Your Posts</h2>

      {paginated.map((post) => (
        <div key={post.id} className="card" style={{ marginTop: 16 }}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>

          <p style={{ color: "#64748b" }}>
            {post.comments} comments
          </p>

          {/* Edit & Delete Buttons */}
          <div style={{ marginTop: 10, display: "flex", gap: "10px" }}>
            <button
              onClick={() => onEdit(post.id)}
              style={{
                padding: "6px 10px",
                background: "#0ea5a3",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(post.id)}
              style={{
                padding: "6px 10px",
                background: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* -------------------------------------------
         Pagination Controls
      --------------------------------------------*/}
      <div style={{ marginTop: 20, textAlign: "center" }}>
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          style={{
            padding: "6px 10px",
            marginRight: "10px",
            cursor: page === 1 ? "not-allowed" : "pointer"
          }}
        >
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          style={{
            padding: "6px 10px",
            marginLeft: "10px",
            cursor: page === totalPages ? "not-allowed" : "pointer"
          }}
        >
          Next
        </button>
      </div>
    </section>
  );
}
