import React from "react";
import { useTranslation } from "react-i18next";

export default function Blog() {
  const { t } = useTranslation();

  // Dynamic content fetched from translation file
  // (You can also fetch from API later)
  const posts = t("blogPosts", { returnObjects: true });

  return (
    <section style={{ marginTop: "30px" }}>
      <h2>{t("postsTitle")}</h2>

      {posts.length === 0 && <p>{t("noPosts")}</p>}

      {posts.map((post, index) => (
        <div key={index} className="card" style={{ marginTop: "16px" }}>
          <h3>{post.title}</h3>
          <p className="muted">{post.excerpt}</p>
          <p>
            {t("commentsCount", { count: post.comments })}
          </p>
          <button style={{ marginTop: "8px" }}>
            {t("readMore")}
          </button>
        </div>
      ))}
    </section>
  );
}
