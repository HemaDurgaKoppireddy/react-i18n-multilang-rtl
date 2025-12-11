import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function AppLayout({ children }) {
  return (
    <div className="layout">
      <Navbar />

      <main className="container-inner content-area">
        {children}
      </main>

      <Footer />
    </div>
  );
}
