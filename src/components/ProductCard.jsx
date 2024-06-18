import { useNavigate, useParams } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { productId } = useParams();

  function handleClick() {
    productId ? navigate("/") : navigate(`/products/${product.id}`);
  }

  return (
    <div className="product">
      <div>
        <h1>{product.title}</h1>
        <img src={product.image} />
        <div>{product.description}</div>
        <div>
          <button onClick={handleClick} className="btn">
            {productId ? "Back" : "Details"}
          </button>
        </div>
      </div>
    </div>
  );
}
