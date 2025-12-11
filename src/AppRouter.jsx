import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./AppLayout";

import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import AddProductPage from "./pages/AddProductPage";
import LoginPage from "./pages/LoginPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CategoriesPage from "./pages/CategoriesPage";

import { useTranslation } from "react-i18next";

export default function AppRouter() {
  const { t } = useTranslation();
  const translatedSamples = t("sampleProducts", { returnObjects: true }) || [];

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout><HomePage allProducts={translatedSamples} /></AppLayout>} />
        <Route path="/products" element={<AppLayout><ProductsPage /></AppLayout>} />
        <Route path="/add-product" element={<AppLayout><AddProductPage /></AppLayout>} />
        <Route path="/login" element={<AppLayout><LoginPage /></AppLayout>} />
        <Route path="/product/:id" element={<AppLayout><ProductDetailsPage allProducts={translatedSamples} /></AppLayout>} />
        <Route path="/categories/:category?" element={<AppLayout><CategoriesPage allProducts={translatedSamples} /></AppLayout>} />
      </Routes>
    </BrowserRouter>
  );
}
