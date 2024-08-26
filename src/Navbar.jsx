import React from "react";
import { useCart } from "./CartContext";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const { cart } = useCart();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="navbar-logo">MyShop</div>
      <div className="navbar-cart">
        <FaShoppingCart style={{ fontSize: '3rem' }} />
        <span className="navbar-cart-count">{totalItems}</span>
      </div>
    </nav>

  );
};

export default Navbar;
