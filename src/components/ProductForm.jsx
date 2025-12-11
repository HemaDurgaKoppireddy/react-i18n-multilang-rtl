import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ProductForm({ onSubmit, initial }) {
  const { t, i18n } = useTranslation("common");
  const [price, setPrice] = useState(initial?.price || "");
  const [category, setCategory] = useState(initial?.category || "");
  const [names, setNames] = useState(initial?.names || { en: "", es: "", ar: "", ja: "" });

  function setName(lang, val){
    setNames(prev => ({ ...prev, [lang]: val }));
  }

  function submit(e){
    e.preventDefault();
    // minimum: at least one name provided
    const hasName = Object.values(names).some(v => v && v.trim());
    if(!hasName){ alert(t("errors.nameRequired")); return; }
    onSubmit({ price, category, names });
  }

  return (
    <form onSubmit={submit}>
      <div className="form-group">
        <label>{t("labels.price")}</label>
        <input value={price} onChange={e=>setPrice(e.target.value)} type="number" step="0.01" />
      </div>
      <div className="form-group">
        <label>{t("labels.category")}</label>
        <input value={category} onChange={e=>setCategory(e.target.value)} />
      </div>

      <fieldset style={{border:"1px solid #eee", padding:10, marginBottom:10}}>
        <legend>{t("labels.translations")}</legend>
        <div className="form-group">
          <label>English</label>
          <input value={names.en} onChange={e=>setName("en", e.target.value)} />
        </div>
        <div className="form-group">
          <label>Español</label>
          <input value={names.es} onChange={e=>setName("es", e.target.value)} />
        </div>
        <div className="form-group">
          <label>العربية</label>
          <input value={names.ar} onChange={e=>setName("ar", e.target.value)} />
        </div>
        <div className="form-group">
          <label>日本語</label>
          <input value={names.ja} onChange={e=>setName("ja", e.target.value)} />
        </div>
      </fieldset>

      <button className="btn btn-primary" type="submit">{t("save")}</button>
    </form>
  );
}
