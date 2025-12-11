import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

function fileToBase64(file){ return new Promise((res, rej)=>{ const r=new FileReader(); r.onload=()=>res(r.result); r.onerror=rej; r.readAsDataURL(file); }); }

export default function ProductForm({ onSubmit, initial=null }){
  const { t, i18n } = useTranslation();
  const [title,setTitle]=useState("");
  const [excerpt,setExcerpt]=useState("");
  const [price,setPrice]=useState("");
  const [imageUrl,setImageUrl]=useState("");
  const [file, setFile] = useState(null);
  const [category,setCategory]=useState("");
  const [errors,setErrors]=useState({});

  useEffect(()=>{ if(initial){ setTitle(initial.title||""); setExcerpt(initial.excerpt||""); setPrice(initial.price||""); setImageUrl(initial.image||""); setCategory(initial.category||""); } },[initial]);

  async function handleSubmit(e){
    e.preventDefault();
    const errs={};
    if(!title.trim()) errs.title = t("nameRequired") || "Name required";
    if(!price || isNaN(Number(price))) errs.price = t("invalidPrice") || "Invalid price";
    setErrors(errs); if(Object.keys(errs).length) return;

    let finalImage = imageUrl;
    if(file) finalImage = await fileToBase64(file);
    const id = initial?.id || `u${Date.now()}`;
    const product = { id, title, excerpt, price: Number(price), image: finalImage, category, locale: i18n.resolvedLanguage || i18n.language || "en" };
    onSubmit(product);
    if(!initial){ setTitle(""); setExcerpt(""); setPrice(""); setImageUrl(""); setFile(null); setCategory(""); }
  }

  return (
    <form className="glass-card" onSubmit={handleSubmit}>
      <div className="form-row">
        <input className="input" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Product name" />
        <input className="input" value={price} onChange={e=>setPrice(e.target.value)} placeholder="Price" />
      </div>
      <div className="form-row">
        <input className="input" value={category} onChange={e=>setCategory(e.target.value)} placeholder="Category" />
      </div>
      <div className="form-row">
        <textarea className="input" value={excerpt} onChange={e=>setExcerpt(e.target.value)} placeholder="Short description" />
      </div>
      <div className="form-row">
        <input className="input" value={imageUrl} onChange={e=>setImageUrl(e.target.value)} placeholder="Image URL (or upload)" />
        <input type="file" onChange={e=>setFile(e.target.files[0])} />
      </div>

      {errors.title && <div style={{ color:"red" }}>{errors.title}</div>}
      {errors.price && <div style={{ color:"red" }}>{errors.price}</div>}

      <div style={{ display:"flex", gap:8 }}>
        <button className="btn btn-primary" type="submit">{initial ? t("save") : t("add")}</button>
        <button type="button" className="btn" onClick={()=>{ /* no-op */ }}>Cancel</button>
      </div>
    </form>
  );
}
