import { createContext, useEffect, useState, useContext } from "react";
import { UserContext } from "./UserContext";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const { user } = useContext(UserContext);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (user && user.id) {
      fetchCart(user.id);
    }
  }, [user]);

  const fetchCart = async (userId) => {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/carts/user/${userId}`
      );
      const data = await response.json();

      if (data.length === 0) {
        setCart([]);
        return;
      }

      const cartItems = await Promise.all(
        data[0].products.map(async (item) => {
          const productDetails = await fetchProductDetails(item.productId);
          return { ...item, ...productDetails };
        })
      );
      setCart(cartItems);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const fetchProductDetails = async (productId) => {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${productId}`
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching product details:", error);
      return null;
    }
  };

  const addToCart = async (product, quantity = 1) => {
    if (user && user.id) {
      try {
        console.log("Current cart state before adding:", cart);

        const response = await fetch("https://fakestoreapi.com/carts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            date: new Date().toISOString(),
            products: [{ productId: product.id, quantity }],
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to add to cart");
        }

        const newCart = await response.json();
        const updatedCart = await Promise.all(
          newCart.products.map(async (item) => {
            const productDetails = await fetchProductDetails(item.productId);
            if (productDetails) {
              return {
                ...item,
                ...productDetails,
              };
            }
            return item;
          })
        );

        const mergedCart = mergeCarts(cart, updatedCart);
        setCart(mergedCart);
        localStorage.setItem("cart", JSON.stringify(mergedCart));

        console.log("New cart state after adding:", mergedCart);
        alert("Item added to cart successfully");
      } catch (error) {
        console.error("Error adding to cart:", error);
        alert("Failed to add item to cart");
      }
    } else {
      console.error("User not logged in");
      alert("User not logged in");
    }
  };

  const removeFromCart = async (productId) => {
    if (user && user.id) {
      try {
        const updatedCart = cart.filter((item) => item.productId !== productId);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        console.log("Updated cart state after removing:", updatedCart);
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    } else {
      console.error("User not logged in");
    }
  };

  const updateCartItemQuantity = async (productId, quantity) => {
    if (user && user.id) {
      try {
        const updatedCart = cart.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        );
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        console.log("Updated cart state after updating quantity:", updatedCart);
      } catch (error) {
        console.error("Error updating cart item quantity:", error);
      }
    } else {
      console.error("User not logged in");
    }
  };

  const mergeCarts = (localCart, apiCart) => {
    const merged = [...localCart];
    apiCart.forEach((apiItem) => {
      const existingIndex = merged.findIndex(
        (item) => item.productId === apiItem.productId
      );
      if (existingIndex !== -1) {
        merged[existingIndex].quantity += apiItem.quantity;
      } else {
        merged.push(apiItem);
      }
    });
    return merged;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
