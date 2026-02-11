import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import "../styles/Home.css";
import welcome from "../assets/welcome.png";
import compare from "../assets/compare.png";
import better_result from "../assets/better_result.png";
import hr24_7 from "../assets/24_7.png";
import listing from "../assets/listing.png";
import health from "../assets/health.png";
import tool_icon from "../assets/Tools_icon.png";
import grocery from "../assets/grocery.png";
import fashion from "../assets/fashion.png";
import beauty from "../assets/beauty.png";
import electronics from "../assets/electronics.png";
import furniture from "../assets/furniture.png";
import automotive from "../assets/automobiles.png";
import stationery from "../assets/stationary.png";
import textile from "../assets/textile.png";
import sanitary from "../assets/sanitary.png";
import decor from "../assets/decor.png";
import games from "../assets/games.png";
import fragnance from "../assets/fragnance.png";
import pets from "../assets/pets.png";
import sports from "../assets/sports.png";
import jewels from "../assets/jewels.png";
import farming from "../assets/farming.png";

const Home = () => {
  const slides = [
    { type: "text", content: "Welcome to Gemify Portal" },
    { type: "image", content: welcome },
    { type: "text", content: "Compare products before buying" },
    { type: "image", content: compare },
    { type: "text", content: "Listing products from different portals at one place" },
    { type: "image", content: listing},
    { type: "text", content: "Better comparison as per your needs" },
    { type: "image", content: better_result },
    { type: "text", content: "24/7 Support & Help through our chatbot" },
    { type: "image", content: hr24_7 },
  ];

  const pairedslides = [];
  for (let i = 0; i < slides.length; i += 2) {
    pairedslides.push({
      text: slides[i].content,
      image: slides[i + 1].content
    });
  }

  const [current, setCurrent] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % pairedslides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleCategoryClick = (category) => {
    if (auth.currentUser) {
      navigate("/products", { state: { category } });
    } else {
      setShowPopup(true);
    }
  };


  return (
    <div className="home">
      <div className="carousel">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {pairedslides.map((s, i) => (
            <div className="carousel-slide" key={i}>
              <div className="slide-content">

                <img
                  src={s.image}
                  alt="slide-img"
                />

                <h2>
                  {s.text}
                </h2>

              </div>
            </div>
          ))}
        </div>

        <div className="carousel-indicators">
          {pairedslides.map((_, index) => (
            <span
              key={index}
              className={index === current ? "active" : ""}
              onClick={() => setCurrent(index)}
            ></span>
          ))}
        </div>
      </div>
          {/* these images will be stored and accessed later from the assets folder in src, to control network dependency. */}
      <div className="categories">
        <h2>Pick Your Perfect Category</h2>
        <div className="category-grid">
          <div className="category-card" onClick={() => handleCategoryClick("health")}>
            <img src={health} alt="health" />
            <p>Health</p>
          </div>

          <div className="category-card" onClick={() => handleCategoryClick("tools")}>
            <img src={tool_icon} alt="tools" />
            <p>Tools</p>
          </div>

          <div className="category-card" onClick={() => handleCategoryClick("grocery")}>
            <img src={grocery} alt="grocery" />
            <p>Grocery</p>
          </div>

          <div className="category-card" onClick={() => handleCategoryClick("fashion")}>
            <img src={fashion} alt="fashion" />
            <p>Fashion</p>
          </div>

          <div className="category-card" onClick={() => handleCategoryClick("beauty")}>
            <img src={beauty} alt="beauty" />
            <p>Beauty</p>
          </div>

          <div className="category-card" onClick={() => handleCategoryClick("electronics")}>
            <img src={electronics}alt="electronics" />
            <p>Electronics</p>
          </div>

          <div className="category-card" onClick={() => handleCategoryClick("furniture")}>
            <img src={furniture} alt="Furniture" />
            <p>Furniture</p>
          </div>

          <div className="category-card" onClick={() => handleCategoryClick("automotive")}>
            <img src={automotive} alt="automotive" />
            <p>Automotive</p>
          </div>

          <div className="category-card" onClick={() => handleCategoryClick("stationery")}>
            <img src={stationery} alt="stationery" />
            <p>Stationery</p>
          </div>

          <div className="category-card" onClick={() => handleCategoryClick("textile")}>
            <img src={textile} alt="textile" />
            <p>Textile</p>
          </div>

          <div className="category-card" onClick={() => handleCategoryClick("sanitary")}>
            <img src={sanitary} alt="Sanitary" />
            <p>Sanitary</p>
          </div>

          <div className="category-card" onClick={() => handleCategoryClick("decor")}>
            <img src={decor} alt="Decor" />
            <p>Decor</p>
          </div>

          <div className="category-card" onClick={() => handleCategoryClick("games")}>
            <img src={games} alt="Games" />
            <p>Games</p>
          </div>

          <div className="category-card" onClick={() => handleCategoryClick("fragrance")}>
            <img src={fragnance} alt="Fragrance" />
            <p>Fragrance</p>
          </div>

          <div className="category-card" onClick={() => handleCategoryClick("pet supply")}>
            <img src={pets} alt="Pet supply" />
            <p>Pet supply</p>
          </div>

          <div className="category-card" onClick={() => handleCategoryClick("sports")}>
            <img src={sports} alt="Sports" />
            <p>Sports</p>
          </div>

          <div className="category-card" onClick={() => handleCategoryClick("jewelry")}>
            <img src={jewels} alt="Jewelry" />
            <p>Jewelry</p>
          </div>

          <div className="category-card" onClick={() => handleCategoryClick("farming")}>
            <img src={farming} alt="Farming" />
            <p>Farming</p>
          </div>
        </div>

        <div className="see-more">
          <span onClick={() => handleCategoryClick("")} style={{ cursor: "pointer", color: "#081724" }}>
            Still searching? Discover more options →
          </span>
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>⚠️ Access Denied</h3>
            <p>You must login first to view products.</p>
            <div className="popup-actions">
              <button onClick={() => setShowPopup(false)}>Close</button>
              <button onClick={() => { setShowPopup(false); navigate("/login"); }}>Go to login</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
