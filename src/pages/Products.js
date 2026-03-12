import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "../styles/Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.category) {
      setSearchTerm(location.state.category.toLowerCase());
    }
  }, [location.state]);
  // this needed to be changed with product API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiList = [
          { url: "https://fakestoreapi.com/products", source: "GEM" },
          { url: "https://dummyjson.com/products", source: "Amazon" },
          {
            url: "https://api.escuelajs.co/api/v1/products",
            source: "Flipkart",
          },
        ];

        const results = await Promise.allSettled(
          apiList.map((api) =>
            fetch(api.url).then((res) => res.json())
          )
        );

        const dataSets = results
          .map((res, i) =>
            res.status === "fulfilled"
              ? { source: apiList[i].source, data: res.value }
              : null
          )
          .filter(Boolean);

        let combined = [];

        dataSets.forEach(({ source, data }) => {
          const products = Array.isArray(data) ? data : data.products || [];

combined.push(
  ...products.map((p) => ({
    id: `${source}-${p.id}`,
    title: p.title,
    price: p.price,
    image: p.image || p.thumbnail || p.images?.[0],
    category: p.category?.name || p.category,
    description: p.description,
    source,
  }))
);
        });

        // Remove duplicates products
        const seen = new Set();
        const unique = combined.filter((p) => {
          if (!p.title || seen.has(p.title.toLowerCase()))
            return false;
          seen.add(p.title.toLowerCase());
          return true;
        });

        setProducts(unique);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCompare = (product) => {
    navigate("/compare", { state: { query: product.title } });
  };

  return (
    <div className="page-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="clear-btn"
          >
            ✖
          </button>
        )}
      </div>

      {loading ? (
        <p className="loading">Fetching products...</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onCompare={handleCompare}
              />
            ))
          ) : (
            <p className="no-items">No items found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;