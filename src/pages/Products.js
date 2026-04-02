import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "../styles/Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState("");
  const [compareList, setCompareList] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 category autofill
  useEffect(() => {
    if (location.state && location.state.category !== undefined) {
      setSearchTerm(location.state.category.toLowerCase());
    }
  }, [location.state]);

  // 🔥 FUZZY MATCH FUNCTION
  const isFuzzyMatch = (title, query) => {
    const titleWords = title.toLowerCase().split(" ");
    const queryWords = query.toLowerCase().split(" ");

    return queryWords.every((qWord) =>
      titleWords.some((tWord) =>
        tWord.includes(qWord) || levenshtein(tWord, qWord) <= 2
      )
    );
  };

  // 🔥 LEVENSHTEIN DISTANCE (typo handling)
  const levenshtein = (a, b) => {
    const matrix = [];

    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b[i - 1] === a[j - 1]) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[b.length][a.length];
  };

  // 🔥 API CALL
  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `http://localhost:4000/api/products/refresh?keyword=${query}`
        );

        const data = await res.json();
        const listings = data.listings?.all || [];

        const formatted = listings.map((p, index) => ({
          id: `${p.platform}-${index}`,
          title: p.title,
          price: p.price,
          image: p.image_url,
          category: p.platform,
          description: p.offer || "",
          source: p.platform,
          product_url: p.product_url,
        }));

        // 🔥 SMART FILTER
        const filtered = formatted.filter((p) => {
  const fullText = `
    ${p.title}
    ${p.image_url}
    ${p.source}
    ${p.product_url}
  `.toLowerCase();

  const queryWords = query.toLowerCase().split(" ");

  let score = 0;

  queryWords.forEach((word) => {
    // strong match (title)
    if (p.title.toLowerCase().includes(word)) {
      score += 3;
    }

    // medium match (description / url)
    else if (fullText.includes(word)) {
      score += 1;
    }
  });

  // ✅ threshold (adjustable)
  return score >= Math.max(2, queryWords.length);
});

        setProducts(filtered);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  // 🔍 search
  const handleSearch = () => {
    setQuery(searchTerm.trim());
  };

  // 🔥 compare
  const handleCompare = (product) => {
    setCompareList((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const handleGoCompare = () => {
    navigate("/compare", { state: { compareList } });
  };

  return (
    <div className="page-container">
      
      {/* 🔍 SEARCH */}
      <div className="search-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="search-input"
          />

          <button onClick={handleSearch} className="search-btn">
            Search
          </button>
        </div>
      </div>

      {/* 🔥 Compare Sticky */}
      {compareList.length > 0 && (
        <button className="compare-sticky" onClick={handleGoCompare}>
          Compare ({compareList.length})
        </button>
      )}

      {/* 📦 PRODUCTS */}
      {loading ? (
        <p className="loading">Fetching products...</p>
      ) : (
        <div className="product-grid">
          {products.length > 0 ? (
            products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onCompare={handleCompare}
                onGoCompare={handleGoCompare}
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