const ProductCard = ({ product, onCompare }) => {
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

      <p className="product-name">{product.title}</p>
      <p className="product-price">₹{product.price}</p>
      <span className="product-tag">{product.source}</span>

      <button
        className="compare-btn"
        onClick={() => onCompare(product)}
      >
        Compare
      </button>
      <button
        className="compare-btn"
      >
        visit
      </button>
    </div>
  );
};

export default ProductCard;