//didnt used this as we have integrated basic things in the navbar.js, will see if we need any changes, as these are created for advance feature but we will first cover basic requirements first.
import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
// import "../styles/Profile.css";

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);
  const [open, setOpen] = useState(false);

  const [theme, setTheme] = useState("light"); 

const toggleTheme = () => {
  const newTheme = theme === "light" ? "dark" : "light";
  setTheme(newTheme);
  document.body.className = newTheme;
};


  useEffect(() => {
    const fetchUser = async () => {
      if (auth.currentUser) {
        await auth.currentUser.reload();
        const user = auth.currentUser;

        const createdDate = new Date(
          user.metadata.creationTime
        ).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });

        setUserInfo({
          email: user.email,
          createdAt: createdDate,
        });
      }
    };

    fetchUser();
  }, [auth]);

  const handleLogout = async () => {
  try {
    await signOut(auth);
    setUserInfo(null); 
    navigate("/login");
    window.location.reload(); 
  } catch (error) {
    console.error("Logout Error:", error);
  }
};


  return (
    <div className="profile-container">
      <div
        className="profile-icon"
        onClick={() => setOpen(!open)}
        title="Profile"
      >
        👤
      </div>

      {open && (
        <div className="profile-dropdown">
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
          <p className="dropdown-item" onClick={toggleTheme}>
  {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
</p>

          <p className="dropdown-item logout" onClick={handleLogout}>
            Logout
          </p>
          
        </div>
      )}
    </div>
  );
};

export default Profile;
