import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";

export default function Login() {
  const { login } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Login response data:", data);
        // Assuming the API returns the user ID in the token payload
        const userId = JSON.parse(atob(data.token.split(".")[1])).sub;
        login({ token: data.token, id: userId });
        alert("User logged in successfully");
      } else {
        alert("Error logging in user");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error logging in user");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
