import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // 👈 added useLocation
import "../styles/Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    // agar home se category ayi hai toh usko search box me daal do
    if (location.state?.category) {
      setSearchTerm(location.state.category.toLowerCase());
    }
  }, [location.state]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiList = [
          { url: "https://fakestoreapi.com/products", source: "FakeStore" },
          { url: "https://dummyjson.com/products", source: "DummyJSON" },
          {
            url: "https://dummyjson.com/products/category/smartphones",
            source: "ElectronicsAPI",
          },
        ];

        const results = await Promise.allSettled(
          apiList.map((api) => fetch(api.url).then((res) => res.json()))
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
          const products =
            source === "FakeStore"
              ? data
              : data.products || [];

          combined.push(
            ...products.map((p) => ({
              id: `${source}-${p.id}`,
              title: p.title,
              price: p.price,
              image: p.image || p.thumbnail,
              category: p.category,
              description: p.description,
              source,
            }))
          );
        });

        const seen = new Set();
        const unique = combined.filter((p) => {
          if (!p.title || seen.has(p.title.toLowerCase())) return false;
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

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCompare = (product) => {
    navigate("/compare", { state: { query: product.title } });
  };

  return (
    <div className="page-container">
      <h1 className="heading">🛍️ Product Explorer</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button onClick={() => setSearchTerm("")} className="clear-btn">
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
              <div
                key={p.id}
                className={`product-card ${
                  p.source === "FakeStore"
                    ? "card-blue1"
                    : p.source === "DummyJSON"
                    ? "card-blue2"
                    : "card-blue3"
                }`}
              >
                <img
                  src={
                    p.image ||
                    "https://via.placeholder.com/150/1E90FF/FFFFFF?text=No+Image"
                  }
                  alt={p.title}
                  className="product-image"
                />
                <p className="product-name">{p.title}</p>
                <p className="product-price">₹{p.price}</p>
                <span className="product-tag">{p.source}</span>
                <button
                  className="compare-btn"
                  onClick={() => handleCompare(p)}
                >
                  Compare
                </button>
              </div>
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
