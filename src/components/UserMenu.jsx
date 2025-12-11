import React from "react";
import { Link } from "react-router-dom";

export default function UserMenu() {
  return (
    <div className="drop-panel">
      <Link to="/profile">Profile</Link>
      <Link to="/my-products">My Products</Link>
      <Link to="/logout">Logout</Link>
    </div>
  );
}
