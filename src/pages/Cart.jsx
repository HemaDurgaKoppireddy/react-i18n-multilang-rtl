import React from "react";
import { useProducts } from "../context/ProductContext";
import { useTranslation } from "react-i18next";

export default function Cart(){
  const { cart, products, removeFromCart, clearCart } = useProducts();
  const { t, i18n } = useTranslation("common");

  const items = Object.entries(cart).map(([id, qty])=>{
    const p = products.find(x=>x.id===id);
    if(!p) return null;
    const name = p.names[i18n.language] || p.names.en || Object.values(p.names)[0];
    return { id, qty, name, price: p.price };
  }).filter(Boolean);

  const total = items.reduce((s,it)=>s + it.price * it.qty, 0);

  return (
    <div className="container">
      <h2>{t("nav.cart")}</h2>
      <div className="card">
        {items.length===0 ? <p>{t("cart.empty")}</p> :
          <div>
            {items.map(it => (
              <div key={it.id} style={{display:"flex", justifyContent:"space-between", padding:"8px 0"}}>
                <div>{it.name} x {it.qty}</div>
                <div>
                  {new Intl.NumberFormat(i18n.language, {style:"currency", currency: i18n.language==="es"? "EUR": (i18n.language==="ja"? "JPY": (i18n.language==="ar"? "AED":"USD"))}).format(it.price * it.qty)}
                  <button className="btn btn-ghost" onClick={()=>removeFromCart(it.id)} style={{marginLeft:8}}>Remove</button>
                </div>
              </div>
            ))}
            <hr />
            <div style={{display:"flex", justifyContent:"space-between", paddingTop:8}}>
              <strong>{t("total")}</strong>
              <strong>{new Intl.NumberFormat(i18n.language, {style:"currency", currency: i18n.language==="es"? "EUR": (i18n.language==="ja"? "JPY": (i18n.language==="ar"? "AED":"USD"))}).format(total)}</strong>
            </div>
            <div style={{marginTop:10}}>
              <button className="btn btn-primary" onClick={()=>{ alert(t("messages.checkout")); clearCart(); }}>{t("checkout")}</button>
            </div>
          </div>
        }
      </div>
    </div>
  );
}
