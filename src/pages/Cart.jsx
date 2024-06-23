import { CartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router";
import { useContext, useEffect } from "react";

export default function Cart() {
  const { cart, removeFromCart, updateCartItemQuantity } =
    useContext(CartContext);
  const navigate = useNavigate();

  async function handleChange(productId, quantity) {
    if (quantity > 0) {
      await updateCartItemQuantity(productId, quantity);
    }
  }

  const handleClick = () => {
    navigate("/checkout");
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  console.log("Cart data:", cart);

  return (
    <div className="cart container">
      <h1>Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((cartItem, index) => (
          <div key={index} className="cart-item">
            <h2>{cartItem.title}</h2>
            <img
              src={cartItem.image}
              alt={cartItem.title}
              className="cart-item-image"
              style={{ width: "300px" }}
            />
            <div className="cart-item-details">
              <span className="cart-item-price">Price: ${cartItem.price}</span>
              <label className="cart-item-quantity">
                Quantity:
                <input
                  type="number"
                  value={cartItem.quantity}
                  onChange={(e) =>
                    handleChange(cartItem.productId, parseInt(e.target.value))
                  }
                  min="1"
                />
              </label>
            </div>
            <button
              className="remove-button"
              onClick={() => removeFromCart(cartItem.productId)}
            >
              Remove
            </button>
          </div>
        ))
      )}
      <h2>Total: ${total.toFixed(2)}</h2>
      <button onClick={handleClick}>Proceed to Checkout</button>
    </div>
  );
}
