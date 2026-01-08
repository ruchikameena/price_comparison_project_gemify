import { useNavigate } from "react-router-dom";
import {
  FaInstagram,
  FaTelegramPlane,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";
import "../styles/Footer.css";

const Footer = () => {
  const navigate = useNavigate();

  // function to go to products with category pre-filled
  const goToCategory = (term) => {
    navigate("/products", { state: { category: term } });
    window.scrollTo(0, 0); // optional: scroll top
  };

  return (
    <footer className="footer">
      <div className="footer-section logo-section">
        <h2 className="footer-logo">Gemify</h2>
        <img
          src="/logo192.png"
          alt="Gemify Logo"
          className="footer-img"
        />
      </div>

      {/* Platforms Section */}
      <div className="footer-section">
        <h3>Platforms</h3>
        <ul>
          <li onClick={() => goToCategory("gem")}>GEM</li>
          <li onClick={() => goToCategory("flipkart")}>Flipkart</li>
          <li onClick={() => goToCategory("amazon")}>Amazon</li>
        </ul>
      </div>

      {/* Category Section */}
      <div className="footer-section">
        <h3>Category</h3>
        <ul>
          <li onClick={() => goToCategory("electronics")}>Electronics</li>
          <li onClick={() => goToCategory("grocery")}>Grocery</li>
          <li onClick={() => goToCategory("clothing")}>Cloths</li>
          <li onClick={() => goToCategory("medical")}>Medical</li>
          <li onClick={() => goToCategory("furniture")}>See More</li>
        </ul>
      </div>

      {/* Company Section */}
      <div className="footer-section">
        <h3>Company</h3>
        <ul>
          <li onClick={() => goToCategory("hp")}>HP</li>
          <li onClick={() => goToCategory("samsung")}>Samsung</li>
          <li onClick={() => goToCategory("nike")}>Nike</li>
          <li onClick={() => goToCategory("gucci")}>Gucci</li>
          <li onClick={() => goToCategory("brand")}>See More</li>
        </ul>
      </div>

      {/* Social Links */}
      <div className="footer-section social-section">
        <h3>Social Links</h3>
        <div className="social-icons">
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram />
          </a>
          <a href="https://t.me" target="_blank" rel="noreferrer">
            <FaTelegramPlane />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <FaFacebook />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
