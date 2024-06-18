import { getProducts } from "../api";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";

// List all products
export default function Products({ products }) {
  const [searchValue, setSearchValue] = useState("");
  const [productsSet, setProductsSet] = useState([]);
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      const fetchedProducts = await getProducts();
      setProductsSet(fetchedProducts);
    }
    fetchProducts();
  }, []);

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const sortedProducts = [...productsSet].sort((a, b) => {
    if (sortOption === "name") {
      return a.title.localeCompare(b.title);
    } else if (sortOption === "price") {
      return a.price - b.price;
    }
    return 0;
  });

  const searchResults = sortedProducts.filter((product) => {
    if (searchValue.length < 1) {
      return true;
    }
    const lowercaseName = product.title.toLowerCase();
    return lowercaseName.includes(searchValue.toLowerCase());
  });
  return (
    <>
      <div className="container">
        <div>
          <input
            className="homeInput"
            placeholder="Search"
            name="search"
            type="text"
            value={searchValue}
            onChange={handleChange}
          />
        </div>
        <div className="sort-options">
          <label htmlFor="sort">Sort by: </label>
          <select id="sort" value={sortOption} onChange={handleSortChange}>
            <option value="">Select</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </div>
        <div>
          {searchResults.length > 0
            ? searchResults.map((result) => {
                return <ProductCard key={result.id} product={result} />;
              })
            : products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      </div>
    </>
  );
}
