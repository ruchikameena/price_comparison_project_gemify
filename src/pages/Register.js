import { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Auth.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }

    if (!passwordRegex.test(password)) {
      return "Password must be at least 6 characters and include 1 letter & 1 number";
    }

    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);

      alert("Verification email sent! Please verify before logging in.");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h1 className="logo">Gemify</h1>

      <div className="avatar">
        <img
          src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
          alt="user"
        />
      </div>

      <form onSubmit={handleRegister}>
        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn">SIGN UP</button>
      </form>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

      <p className="toggle-text">
        Already registered? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;