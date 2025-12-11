import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function SearchBar({ onSearch, placeholder }) {
  const { t } = useTranslation("common");
  const [q, setQ] = useState("");
  function submit(e){ e.preventDefault(); onSearch(q); }
  return (
    <form onSubmit={submit} className="search-row">
      <input placeholder={placeholder || t("searchPlaceholder")} value={q} onChange={e=>setQ(e.target.value)} />
      <button className="btn btn-primary" type="submit">{t("search")}</button>
    </form>
  );
}
