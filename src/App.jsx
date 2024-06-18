import React, { useEffect, useState, useContext } from "react";
import { getProducts } from "./api";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CartProvider from "./contexts/CartContext";
import UserProvider, { UserContext } from "./contexts/UserContext";
import Register from "./pages/Register";
import Login from "./pages/Login";

const AppContent = () => {
  const { user, logout } = useContext(UserContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function makeRequest() {
      const productsResult = await getProducts();
      setProducts(productsResult);
    }

    makeRequest();
  }, []);
  return (
    <>
      <BrowserRouter>
        <header>
          <h1> My E-commerce Store</h1>
        </header>
        <div className="menu container">
          <a href="/">Home</a>
          <a href="/cart">Cart</a>
          {user ? (
            <a href="#" onClick={logout}>
              Logout
            </a>
          ) : (
            <>
              <a href="/login">Login</a>
              <a href="/register">Register</a>
            </>
          )}
        </div>
        <main className="container">
          <Routes>
            <Route path="/" element={<Products products={products} />} />
            <Route
              path="/products/:productId"
              element={<SingleProduct products={products} />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </BrowserRouter>
      ;
    </>
  );
};

const App = () => {
  return (
    <UserProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </UserProvider>
  );
};

export default App;
