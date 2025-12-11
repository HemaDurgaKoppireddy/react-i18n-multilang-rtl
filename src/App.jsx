import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CategoriesPage from "./pages/CategoriesPage";
import AddProductPage from "./pages/AddProductPage";
import LoginPage from "./pages/LoginPage";

export default function App() {
  const { t } = useTranslation();

  // SEARCH STATE
  const [search, setSearch] = useState("");

  // USER PRODUCTS
  const [userProducts, setUserProducts] = useState(
    JSON.parse(localStorage.getItem("userProducts") || "[]")
  );

  // SAVE TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("userProducts", JSON.stringify(userProducts));
  }, [userProducts]);

  // ADD PRODUCT
  function addProduct(product) {
    const updated = [...userProducts, product];
    setUserProducts(updated);
  }

  // EDIT PRODUCT
  function editProduct(id, updatedData) {
    const updated = userProducts.map((p) =>
      p.id === id ? { ...p, ...updatedData } : p
    );
    setUserProducts(updated);
  }

  // DELETE PRODUCT
  function deleteProduct(id) {
    const updated = userProducts.filter((p) => p.id !== id);
    setUserProducts(updated);
  }

  return (
    <div>
      <Navbar search={search} setSearch={setSearch} />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              search={search}
              userProducts={userProducts}
            />
          }
        />

        <Route
          path="/products"
          element={
            <ProductsPage
              search={search}
              userProducts={userProducts}
              editProduct={editProduct}
              deleteProduct={deleteProduct}
            />
          }
        />

        <Route
          path="/categories"
          element={<CategoriesPage search={search} />}
        />

        <Route
          path="/add-product"
          element={<AddProductPage addProduct={addProduct} />}
        />

        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}
