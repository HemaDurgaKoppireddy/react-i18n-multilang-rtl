import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Category from "./pages/Category";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./pages/AddProduct";
import Cart from "./pages/Cart";
import Settings from "./pages/Settings";
import Header from "./components/Header";
import { ProductProvider } from "./context/ProductContext";  
import SEO from "./components/SEO";
import "./styles.css";

export default function App() {
  const baseUrl = "https://react-i18n-multilang-rtl.vercel.app"; // replace with your real URL

  const locales = ["en", "es", "ja", "ar"];
  return (
   <>
   <SEO baseUrl={baseUrl} locales={locales} />
    <ProductProvider>    
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />

          {/* Categories */}
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:slug" element={<Category />} />

          {/* Product details */}
          <Route path="/product/:id" element={<ProductDetails />} />

          {/* Add product */}
          <Route path="/add-product" element={<AddProduct />} />

          {/* Cart Page */}
          <Route path="/cart" element={<Cart />} />

          {/* Settings */}
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </ProductProvider>
    </>
  );
}
