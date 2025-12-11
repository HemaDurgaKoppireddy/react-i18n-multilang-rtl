import React, { useState, useEffect } from "react";

export default function AddPost({ onAdd }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    const newPost = {
      id: Date.now(),
      title,
      body,
      comments: 0
    };

    onAdd(newPost);

    setTitle("");
    setBody("");
  }

  return (
    <form onSubmit={handleSubmit} className="card" style={{ marginTop: 20 }}>
      <h3>Add New Post</h3>

      <input
        type="text"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />

      <textarea
        placeholder="Write your post..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={3}
        style={{ width: "100%", padding: 10 }}
      ></textarea>

      <button
        type="submit"
        style={{
          marginTop: 12,
          padding: "8px 12px",
          borderRadius: "8px",
          background: "#0ea5a3",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        Add Post
      </button>
    </form>
  );
}
