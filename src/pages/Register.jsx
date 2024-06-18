import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [phone, setPhone] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const response = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
          name: {
            firstname: firstName,
            lastname: lastName,
          },
          address: {
            city,
            street,
            number: parseInt(number),
            zipcode,
            geolocation: {
              lat,
              long,
            },
          },
          phone,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      const userData = await response.json();
      console.log("User registered successfully:", userData);
      alert("User registered successfully");
    } catch (error) {
      console.error("Error:", error);
      alert("Error registering user");
    }
  }

  return (
    <form onSubmit={handleRegister} className="container">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="input"
        required
      />
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="input"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="input"
        required
      />
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
        required
      />
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
        required
      />
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="City"
        required
      />
      <input
        type="text"
        value={street}
        onChange={(e) => setStreet(e.target.value)}
        placeholder="Street"
        required
      />
      <input
        type="text"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Number"
        required
      />
      <input
        type="text"
        value={zipcode}
        onChange={(e) => setZipcode(e.target.value)}
        placeholder="Zipcode"
        required
      />
      <input
        type="text"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
        placeholder="Latitude"
        required
      />
      <input
        type="text"
        value={long}
        onChange={(e) => setLong(e.target.value)}
        placeholder="Longitude"
        required
      />
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
        required
      />
      <button type="submit" className="button">
        Register
      </button>
    </form>
  );
}
