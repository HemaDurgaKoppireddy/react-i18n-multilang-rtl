import React, { useState } from "react";
import { useProducts } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const { addNewProduct } = useProducts();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    description: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.price) {
      alert("Product name & price are required!");
      return;
    }

    const names = {
      en: form.name,
      es: form.name,
      ar: form.name,
      ja: form.name,
    };

    const categories = {
      en: form.category,
      es: form.category,
      ar: form.category,
      ja: form.category,
    };

    addNewProduct({
      names,
      category: categories,
      price: Number(form.price),
      image: form.image,
      description: form.description,
    });

    alert("Product added successfully!");
    navigate("/products");
  }

  return (
    <div className="add-product-container">
      <div className="add-product-card">
        <h1 className="add-title">Add New Product</h1>

        <form className="add-form" onSubmit={handleSubmit}>
          {/* LEFT SIDE */}
          <div className="add-left">
            <div className="form-group">
              <label>Product Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Mobile Phones, Laptops, Fashion…"
                required
              />
            </div>

            <div className="form-group">
              <label>Price (USD)</label>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                placeholder="999"
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Write a short product description..."
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="add-right">
            <label>Product Image</label>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Paste image URL"
            />

            <div className="image-preview">
              {form.image ? (
                <img src={form.image} alt="preview" />
              ) : (
                <div className="placeholder">Image Preview</div>
              )}
            </div>

            <button className="btn primary add-btn" type="submit">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
