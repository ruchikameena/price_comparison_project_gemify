import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import "../styles/Home.css";

const Home = () => {
  const slides = [
    { type: "text", content: "Welcome to Gemify Portal" },
    { type: "image", content: "https://t3.ftcdn.net/jpg/01/27/38/98/360_F_127389862_pMUoWAQMoKsq6QOrF8kq8S9KaXOCjlHP.jpg" },
    { type: "text", content: "Compare products before buying" },
    { type: "image", content: "https://www.freeiconspng.com/thumbs/compare-icon/compare-icon-9.png" },
    { type: "text", content: "Listing products from different portals at one place" },
    { type: "image", content: "https://www.pngall.com/wp-content/uploads/4/Idea-Solution-PNG-HD-Image.png" },
    { type: "text", content: "Better comparison as per your needs" },
    { type: "image", content: "https://cdn-icons-png.flaticon.com/512/4410/4410211.png" },
    { type: "text", content: "24/7 Support & Help through our chatbot" },
    { type: "image", content: "https://cdn-icons-png.flaticon.com/512/2020/2020773.png" },
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
              <div className="slide-content" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "50px" }}>

                <img
                  src={s.image}
                  alt="slide-img"
                  style={{ width: "350px", height: "auto", borderRadius: "10px" }}
                />

                <h2 style={{ maxWidth: "400px", fontSize: "2rem", textAlign: "left" }}>
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
        <h2>Find What You Need</h2>
        <div className="category-grid">
          <div className="category-card" onClick={() => handleCategoryClick("health")}>
            <img src="https://static.thenounproject.com/png/1236334-200.png" alt="health" />
            <p>Health</p>
          </div>

          <div className="category-card" onClick={() => handleCategoryClick("tools")}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Tools_icon.png" alt="tools" />
            <p>Tools</p>
          </div>

          <div className="category-card" onClick={() => handleCategoryClick("grocery")}>
            <img src="https://cdn-icons-png.flaticon.com/512/3724/3724720.png" alt="grocery" />
            <p>Grocery</p>
          </div>

          <div className="category-card" onClick={() => handleCategoryClick("fashion")}>
            <img src="https://static.thenounproject.com/png/337564-200.png" alt="fashion" />
            <p>Fashion</p>
          </div>

          <div className="category-card" onClick={() => handleCategoryClick("beauty")}>
            <img src="https://cdn-icons-png.flaticon.com/512/755/755967.png" alt="beauty" />
            <p>Beauty</p>
          </div>

          <div className="category-card" onClick={() => handleCategoryClick("electronics")}>
            <img src="https://static.thenounproject.com/png/1180247-200.png" alt="electronics" />
            <p>Electronics</p>
          </div>

          <div className="category-card" onClick={() => handleCategoryClick("furniture")}>
            <img src="https://cdn-icons-png.flaticon.com/512/8694/8694414.png" alt="Furniture" />
            <p>Furniture</p>
          </div>

          <div className="category-card" onClick={() => handleCategoryClick("automotive")}>
            <img src="https://cdn-icons-png.flaticon.com/512/4682/4682932.png" alt="automotive" />
            <p>Automotive</p>
          </div>

          <div className="category-card" onClick={() => handleCategoryClick("stationery")}>
            <img src="https://cdn-icons-png.flaticon.com/512/3348/3348741.png" alt="stationery" />
            <p>Stationery</p>
          </div>

          <div className="category-card" onClick={() => handleCategoryClick("textile")}>
            <img src="https://cdn-icons-png.flaticon.com/512/6481/6481961.png" alt="textile" />
            <p>Textile</p>
          </div>

          <div className="category-card" onClick={() => handleCategoryClick("sanitary")}>
            <img src="https://cdn-icons-png.flaticon.com/512/1122/1122442.png" alt="Sanitary" />
            <p>Sanitary</p>
          </div>

          <div className="category-card" onClick={() => handleCategoryClick("decor")}>
            <img src="https://static.thenounproject.com/png/4694903-200.png" alt="Decor" />
            <p>Decor</p>
          </div>

          <div className="category-card" onClick={() => handleCategoryClick("games")}>
            <img src="https://cdn-icons-png.flaticon.com/512/7708/7708371.png" alt="Games" />
            <p>Games</p>
          </div>

          <div className="category-card" onClick={() => handleCategoryClick("fragrance")}>
            <img src="https://cdn-icons-png.flaticon.com/512/1957/1957709.png" alt="Fragrance" />
            <p>Fragrance</p>
          </div>

          <div className="category-card" onClick={() => handleCategoryClick("pet supply")}>
            <img src="https://static.thenounproject.com/png/4729907-200.png" alt="Pet supply" />
            <p>Pet supply</p>
          </div>

          <div className="category-card" onClick={() => handleCategoryClick("sports")}>
            <img src="https://static.thenounproject.com/png/1176751-200.png" alt="Sports" />
            <p>Sports</p>
          </div>

          <div className="category-card" onClick={() => handleCategoryClick("jewelry")}>
            <img src="https://cdn-icons-png.flaticon.com/512/2237/2237677.png" alt="Jewelry" />
            <p>Jewelry</p>
          </div>

          <div className="category-card" onClick={() => handleCategoryClick("farming")}>
            <img src="https://cdn-icons-png.flaticon.com/512/2917/2917740.png" alt="Farming" />
            <p>Farming</p>
          </div>
        </div>

        <div className="see-more">
          <span onClick={() => handleCategoryClick("")} style={{ cursor: "pointer", color: "#2a7ecb" }}>
            See More →
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
