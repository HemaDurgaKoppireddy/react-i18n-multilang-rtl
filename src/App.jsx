import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import ProductDetails from "./pages/ProductDetails";
import Category from "./pages/Category";  // Make sure this file exists
import Cart from "./pages/Cart";
import Settings from "./pages/Settings";

import { loadLanguage } from "./i18n";

export default function App() {
  useEffect(() => {
    const lng =
      localStorage.getItem("appLng") ||
      navigator.language.split("-")[0] ||
      "en";
    loadLanguage(lng);
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <main style={{ paddingTop: 16 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/category/:cat" element={<Category />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
