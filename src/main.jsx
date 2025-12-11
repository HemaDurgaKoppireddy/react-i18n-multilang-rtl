import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./i18n";
import "./styles.css";

import { ProductProvider } from "./context/ProductContext";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProductProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ProductProvider>
  </React.StrictMode>
);
