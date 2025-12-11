import React from "react";

export default function Footer(){
  return (
    <footer className="footer">
      <div className="container">
        <div className="container-inner">
          <div className="strip"></div>
          <div className="inner" style={{ display:"flex", justifyContent:"space-between", gap:12, flexWrap:"wrap" }}>
            <div style={{ minWidth: 200 }}>
              <div style={{ fontWeight:700, color:"var(--accent)" }}>Global Shop</div>
              <div className="muted" style={{ marginTop:8 }}>Small e-commerce demo. Built with React + i18n.</div>
            </div>

            <div style={{ display:"flex", gap:24, flexWrap:"wrap" }}>
              <div><div style={{ fontWeight:700 }}>Links</div><div className="muted" style={{ marginTop:8 }}>About • Contact • Privacy • Terms</div></div>
              <div><div style={{ fontWeight:700 }}>Help</div><div className="muted" style={{ marginTop:8 }}>Support • FAQ</div></div>
            </div>

            <div style={{ minWidth:200, textAlign:"right" }}>
              <div style={{ fontWeight:700 }}>Follow</div>
              <div className="muted" style={{ marginTop:8 }}>Twitter • GitHub • LinkedIn</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
