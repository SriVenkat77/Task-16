import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "INCREASE_QUANTITY":
      return state.map(item =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    case "DECREASE_QUANTITY":
      return state.map(item =>
        item.id === action.payload && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    default:
      return state;
  }
};

export const CartProvider = ({ children, initialCart }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  const increaseQuantity = id => dispatch({ type: "INCREASE_QUANTITY", payload: id });
  const decreaseQuantity = id => dispatch({ type: "DECREASE_QUANTITY", payload: id });

  return (
    <CartContext.Provider value={{ cart, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
