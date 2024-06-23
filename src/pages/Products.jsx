import { getProducts } from "../api";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";

export default function Products() {
  const [searchValue, setSearchValue] = useState("");
  const [productsSet, setProductsSet] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      const fetchedProducts = await getProducts();
      setProductsSet(fetchedProducts);
    }
    fetchProducts();
  }, []);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const filteredProducts = productsSet.filter((product) => {
    return (
      (category === "" || product.category === category) &&
      (searchValue === "" ||
        product.title.toLowerCase().includes(searchValue.toLowerCase())) &&
      (minPrice === "" || product.price >= parseFloat(minPrice)) &&
      (maxPrice === "" || product.price <= parseFloat(maxPrice))
    );
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOption === "name") {
      return a.title.localeCompare(b.title);
    } else if (sortOption === "price") {
      return a.price - b.price;
    }
    return 0;
  });

  return (
    <div className="container">
      <div className="filter-container">
        <input
          className="homeInput"
          placeholder="Search"
          name="search"
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
        />
        <select value={category} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelry</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={handleMinPriceChange}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={handleMaxPriceChange}
        />
        <div className="sort-options">
          <label htmlFor="sort">Sort by: </label>
          <select id="sort" value={sortOption} onChange={handleSortChange}>
            <option value="">Select</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </div>
      </div>
      <div>
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
}
