import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <>
      <div id="navigation">
        <div id="navigation-links">
          <Link to="/">Home</Link>
        </div>

        <div id="navigation-links">
          <Link to="/cart">Cart</Link>
        </div>

        <div id="navigation-links">
          <Link to="/checkout">Check Out</Link>
        </div>
      </div>
    </>
  );
}
