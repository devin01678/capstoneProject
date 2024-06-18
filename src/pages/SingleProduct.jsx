import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { getSingleProduct } from "../api";
import { CartContext } from "../contexts/CartContext";

export default function SingleProduct() {
  const { productId } = useParams();
  const [singleProduct, setSingleProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      const product = await getSingleProduct(productId);
      console.log(product);
      setSingleProduct(product);
    })();
  }, [productId]);

  if (!singleProduct && !singleProduct?.id) {
    return <div>Loading...</div>;
  }

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="product container">
        <div>
          <h1>{singleProduct.title}</h1>
          <img src={singleProduct.image} />
        </div>

        <div>Description: {singleProduct.description}</div>

        <div>Price: ${singleProduct.price}</div>

        <div>Category: {singleProduct.category}</div>

        <div>Rating: {singleProduct.rating.rate}</div>

        <div>
          <button onClick={() => addToCart(singleProduct)}>Add to Cart</button>
        </div>
        <div>
          <button onClick={() => handleBack()}>Back</button>
        </div>
      </div>
    </>
  );
}
