import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import UserPosts from "../components/UserPosts";
import Blog from "../components/Blog";
import { Link } from "react-router-dom";

export default function FullBlogPage() {
  const { t } = useTranslation();
  const [posts, setPosts] = useState(
    JSON.parse(localStorage.getItem("userPosts") || "[]")
  );

  return (
    <div className="app">
      <h1>{t("postsTitle")}</h1>

      <Blog />

      <h2 style={{ marginTop: 30 }}>User Posts</h2>
      <UserPosts posts={posts} fullPage />

      <Link to="/" style={{ marginTop: 20, display: "block" }}>
        ← Back to Home
      </Link>
    </div>
  );
}
