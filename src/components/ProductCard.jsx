const ProductCard = ({ product, onCompare, onGoCompare }) => {
  const handleVisit = () => {
    if (product.product_url) {
      window.open(product.product_url, "_blank");
    } else {
      alert("Product link not available");
    }
  };

  const truncateText = (text, limit) => {
  if (!text) return "";
  return text.length > limit
    ? text.substring(0, limit) + "..."
    : text;
};

  const extractDiscount = (offer) => {
    if (!offer) return 0;

    const match = offer.match(/(\d+)%/); // sirf % wala number nikalega
    if (match) {
      const value = parseInt(match[1]);
      return value >= 1 && value <= 100 ? value : 0;
    }

    return 0;
  };

  return (
    <div className="product-card card-blue">
      <img
        src={
          product.image ||
          "https://via.placeholder.com/150/1E90FF/FFFFFF?text=No+Image"
        }
        alt={product.title}
        className="product-image"
      />

      <p className="product-name">
  {truncateText(product.title, 100)}
</p>
      <p className="product-price">
        ₹{product.price}
        {extractDiscount(product.description) > 0 && (
          <span style={{ marginLeft: "8px", color: "white" }}>
            ({extractDiscount(product.description)}% off)
          </span>
        )}
      </p>

      <span className="product-tag">{product.source}</span>

      <div style={{ ...styles.buttonContainer, marginTop: "auto" }}>

        {/* ✅ Add to Compare */}
        <button
          style={styles.compareBtn}
          onClick={() => onCompare(product)}
        >
          Add to List
        </button>

        {/* ✅ Visit */}
        <button
          style={styles.visitBtn}
          onClick={handleVisit}
          onMouseOver={(e) => (e.target.style.background = "#218838")}
          onMouseOut={(e) => (e.target.style.background = "#28a745")}
        >
          For More Info
        </button>

      </div>
    </div>
  );
};

export default ProductCard;
const styles = {
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    marginTop: "10px",
  },

  compareBtn: {
    flex: 1,
    padding: "8px",
    border: "none",
    borderRadius: "8px",
    background: "#ffffff",
    color: "#050505",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
    transition: "0.2s",
  },

  visitBtn: {
    flex: 1,
    padding: "8px",
    border: "none",
    borderRadius: "8px",
    background: "#28a745",
    color: "#fff",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
    transition: "0.2s",
  },
};