import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Compare from "./pages/Compare";
// import Contact from "./pages/Contact";
// import Help from "./pages/Help";
import AboutUs from "./pages/AboutUs";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/compare" element={<Compare />} />
        {/* <Route path="/contact" element={<Contact />} /> - will be removed later if not used */}
        {/* <Route path="/help" element={<Help />} /> - will be removed later if not used */}
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Chatbot />
      <Footer />
    </Router>
  );
}

export default App;
