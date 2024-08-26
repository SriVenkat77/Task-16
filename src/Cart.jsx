import React from "react";
import { useCart } from "./CartContext";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity } = useCart();

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = cart.reduce((total, item) => total + (item.quantity * (item.price || 0)), 0);

  const renderStars = (rate) => {
    const fullStars = Math.floor(rate);
    const halfStar = rate % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {Array(fullStars)
          .fill()
          .map((_, i) => (
            <FaStar key={`full-${i}`} style={{ color: 'gold' }} />
          ))}
        {halfStar && <FaStarHalfAlt key="half" style={{ color: 'gold' }} />}
        {Array(emptyStars)
          .fill()
          .map((_, i) => (
            <FaRegStar key={`empty-${i}`} style={{ color: 'gold' }} />
          ))}
      </>
    );
  };

  return (
    <div className="cart">
      {cart.map(item => {
        const price = item.price || 0;
        const rating = item.rating || { rate: 0, count: 0 };

        return (
          <div key={item.id} className="cart-item">
            <div>
              <img src={item.image} alt={item.name} />
              <div> <h2>{item.name} </h2> </div>
              <div className="rating">
              <h1> {renderStars(rating.rate)} </h1>
                <span> <h4>({rating.count} reviews) </h4> </span>
              </div>
              <div>{item.description}</div>
            </div>
            <div>
              <button  className="extra" onClick={() => decreaseQuantity(item.id)}>-</button>
              <span className="extra"> {item.quantity}</span>
              <button  className="extra" onClick={() => increaseQuantity(item.id)}>+</button>
            </div>
            <div className="extra">${price.toFixed(2)}</div>
            <div className="extra">${(price * item.quantity).toFixed(2)}</div>
          </div>
        );
      })}
      <div className="cart-summary">
        <div className="extratotal" >Total Quantity: {totalQuantity}</div>
        <div className="extratotal">Total Amount: ${isNaN(totalAmount) ? "0.00" : totalAmount.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default Cart;
