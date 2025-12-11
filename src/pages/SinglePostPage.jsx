import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function SinglePostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem("userPosts") || "[]");
    const found = posts.find((p) => p.id == id);
    setPost(found);
  }, [id]);

  function addComment() {
    if (!comment.trim()) return;

    const posts = JSON.parse(localStorage.getItem("userPosts") || "[]");

    const updated = posts.map((p) =>
      p.id == id
        ? {
            ...p,
            comments: p.comments + 1
          }
        : p
    );

    localStorage.setItem("userPosts", JSON.stringify(updated));
    setPost({ ...post, comments: post.comments + 1 });
    setComment("");
  }

  if (!post) return <p>Post not found.</p>;

  return (
    <div className="app">
      <h1>{post.title}</h1>
      <p>{post.body}</p>

      <h3>Comments: {post.comments}</h3>

      <textarea
        placeholder="Add comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows="3"
        style={{ width: "100%", padding: 10 }}
      ></textarea>

      <button
        onClick={addComment}
        style={{ marginTop: 12, padding: "8px 12px" }}
      >
        Add Comment
      </button>

      <Link to="/" style={{ display: "block", marginTop: 20 }}>
        ← Back to Home
      </Link>
    </div>
  );
}
