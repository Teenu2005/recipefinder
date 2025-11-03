import React, { useState } from "react";
import { registerUser, loginUser, uploadImage } from "../service/Api";
import { useNavigate } from 'react-router-dom';


export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    imgUrl: null,
  });

  //  handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const validateForm = () => {
    let newErrors = {};

    if (!isLogin && !formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isLogin && file && !file.type.startsWith("image/")) {
      newErrors.file = "File must be an image";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //  handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      if (isLogin) {
        // LOGIN
        const loginBody = {
          username: formData.email,
          password: formData.password,
        };

        const res = await loginUser(loginBody);

        if (res && res.token) {
          localStorage.setItem("token", res.token); //  save token
          setMessage(" Login successful! Token saved.");
          nav('/');
          window.location.reload();
        } else {
          setMessage(" Login failed: " + (res.error || "Invalid credentials"));
        }
      } else {
        //  REGISTER
        let imageUrl = null;

        const registerBody = {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          imgUrl: imageUrl,
        };

        const res = await registerUser(registerBody);

        if (res && res.success !== false) {
          setMessage("✅ Registration successful! You can now log in.");
          setIsLogin(true);
        } else {
          setMessage(" Registration failed: " + (res.error || "Unknown error"));
        }
      }
    } catch (err) {
      setMessage(" Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>{isLogin ? "Login" : "Register"}</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        {!isLogin && (
          <>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <span style={styles.error}>{errors.username}</span>}
          </>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span style={styles.error}>{errors.email}</span>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <span style={styles.error}>{errors.password}</span>}

        <button type="submit" disabled={loading}>
          {loading ? (isLogin ? "Logging in..." : "Registering...") : isLogin ? "Login" : "Register"}
        </button>
      </form>

      <p style={{ marginTop: "10px" }}>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <span
          onClick={() => {
            setIsLogin(!isLogin);
            setErrors({});
            setMessage("");
          }}
          style={styles.link}
        >
          {isLogin ? "Register here" : "Login here"}
        </span>
      </p>

      {message && <p style={{ marginTop: "10px", color: "#444" }}>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    width: "340px",
    margin: "60px auto",
    padding: "25px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  link: {
    color: "#007BFF",
    cursor: "pointer",
    textDecoration: "underline",
  },
  error: {
    color: "red",
    fontSize: "0.85rem",
  },
};
