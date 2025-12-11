import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import FullBlogPage from "../pages/FullBlogPage";
import SinglePostPage from "../pages/SinglePostPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blogs" element={<FullBlogPage />} />
        <Route path="/blogs/:id" element={<SinglePostPage />} />
      </Routes>
    </BrowserRouter>
  );
}
