import { useState } from "react";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import {
  FaInstagram,
  FaTelegramPlane,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";
import "../styles/Footer.css";
import logo from "../assets/logo.png"
const Footer = () => {
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);

  // function to go to products with category pre-filled
  const goToCategory = (term) => {
    if (auth.currentUser) {
      navigate("/products", { state: { category: term } });
      window.scrollTo(0, 0);
    } else {
      setShowPopup(true);
    }
  };

  {
    showPopup && (
      <div className="popup-overlay">
        <div className="popup-box">
          <h3>Access Denied</h3>
          <p>You must login first to view products.</p>
          <div className="popup-actions">
            <button onClick={() => setShowPopup(false)}>Close</button>
            <button onClick={() => { setShowPopup(false); navigate("/login"); }}>
              Go to login
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <footer className="footer">
        <div className="logo-section">
          <img src={logo} alt="Gemify Logo" className="footer-img" />
        </div>

        {/* Platforms */}
        <div className="footer-section">
          <h3>Platforms</h3>
          <ul>
            <li onClick={() => goToCategory("gem")}>GEM</li>
            <li onClick={() => goToCategory("flipkart")}>Flipkart</li>
            <li onClick={() => goToCategory("amazon")}>Amazon</li>
          </ul>
        </div>

        {/* Category */}
        <div className="footer-section">
          <h3>Category</h3>
          <ul>
            <li onClick={() => goToCategory("electronics")}>Electronics</li>
            <li onClick={() => goToCategory("grocery")}>Grocery</li>
            <li onClick={() => goToCategory("clothing")}>Cloths</li>
            <li onClick={() => goToCategory("medical")}>Medical</li>
            <li onClick={() => goToCategory("")}>See More</li>
          </ul>
        </div>

        {/* Company */}
        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li onClick={() => goToCategory("hp")}>HP</li>
            <li onClick={() => goToCategory("samsung")}>Samsung</li>
            <li onClick={() => goToCategory("nike")}>Nike</li>
            <li onClick={() => goToCategory("gucci")}>Gucci</li>
            <li onClick={() => goToCategory("")}>See More</li>
          </ul>
        </div>

        {/* Social */}
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

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Access Denied</h3>
            <p>You must login first to view products.</p>
            <div className="popup-actions">
              <button onClick={() => setShowPopup(false)}>Close</button>
              <button
                onClick={() => {
                  setShowPopup(false);
                  navigate("/login");
                }}
              >
                Go to login
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
