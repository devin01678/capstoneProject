import { useContext, useState, useEffect } from "react";
import { CartContext } from "../contexts/CartContext";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router";

export default function Checkout() {
  const { cart, setCart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const [purchasedItems, setPurchasedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.id) {
      setPurchasedItems(cart);
      setCart([]);
      localStorage.removeItem("cart");
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (cart.length === 0 && purchasedItems.length === 0) {
      navigate("/cart");
    }
  }, [cart, purchasedItems, navigate]);

  return (
    <div className="container">
      <h1>Checkout</h1>
      <h2>Your items were successfully purchased!</h2>
      <ul>
        {purchasedItems.map((item, index) => (
          <li key={index}>
            <h3>{item.title}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.price}</p>
            <img src={item.image} style={{ width: "100px" }} />
          </li>
        ))}
      </ul>
    </div>
  );
}
