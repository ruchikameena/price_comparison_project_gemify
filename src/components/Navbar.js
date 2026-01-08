import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import "../styles/Profile.css";

const Navbar = () => {
  const { user } = useAuth();
  const auth = getAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [userInfo, setUserInfo] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        await u.reload();
        const createdDate = new Date(
          u.metadata.creationTime
        ).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
        setUserInfo({
          email: u.email,
          createdAt: createdDate,
        });
      } else {
        setUserInfo(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogoutConfirm = async () => {
    try {
      await signOut(auth);
      setUserInfo(null);
      navigate("/login");
      window.location.reload();
    } catch (err) {
      console.error("Logout Error:", err);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="logo" onClick={() => setOpen(false)}>
            Gemify
          </Link>
        </div>
        <div className="navbar-center">
          {user && (
            <>
              <Link to="/" onClick={() => setOpen(false)}>Home</Link>
              <Link to="/products" onClick={() => setOpen(false)}>Products</Link>
              <Link to="/compare" onClick={() => setOpen(false)}>Compare</Link>
              <Link to="/about-us" onClick={() => setOpen(false)}>About Us</Link>
            </>
          )}
        </div>

        <div className="navbar-right">
          {!user && (
            <>
              <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
              <Link to="/register" onClick={() => setOpen(false)}>Register</Link>
            </>
          )}
          {user && (
            <div className="profile-container" ref={dropdownRef}>
              <div className="profile-icon" onClick={() => setOpen(!open)}>
                👤
              </div>
              {open && (
                <div className="profile-dropdown">
                  <div className="mobile-links">
                    <Link to="/" onClick={() => setOpen(false)}>Home</Link>
                    <Link to="/products" onClick={() => setOpen(false)}>Products</Link>
                    <Link to="/compare" onClick={() => setOpen(false)}>Compare</Link>
                    <Link to="/about-us" onClick={() => setOpen(false)}>About Us</Link>
                  </div>

                  {userInfo && (
                    <>
                      <p className="dropdown-item">
                        <strong>{userInfo.email}</strong>
                      </p>
                      <p className="dropdown-item">
                        <strong>Created At:</strong> {userInfo.createdAt}
                      </p>
                    </>
                  )}
                  <p
                    className="dropdown-item logout"
                    onClick={() => {
                      setShowLogoutConfirm(true);
                      setOpen(false);
                    }}
                  >
                    Logout
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
      {showLogoutConfirm && (
        <div className="modal-overlay">
          <div className="modal-box">
            <p>Are you sure you want to logout?</p>
            <div className="modal-actions">
              <button className="btn btn-confirm" onClick={handleLogoutConfirm}>
                Yes
              </button>
              <button
                className="btn btn-cancel"
                onClick={() => setShowLogoutConfirm(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
