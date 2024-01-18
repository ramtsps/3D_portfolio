import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../firebase/config";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Data, setData] = useState("");

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const collectionRef = collection(db, "login");

    getDocs(collectionRef)
      .then((snapshot) => {
        const logindata = snapshot.docs.map((doc) => doc.data());
        setData(logindata);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(Data);
  const handleLogin = async () => {
    const foundUser = Data.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      navigate("/auth");
    } else {
      setError("Invalid Email or Password!");
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Login</h2>
      {error && <p style={errorStyle}>{error}</p>}
      <label style={labelStyle}>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
      </label>
      <label style={labelStyle}>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
      </label>
      <button style={buttonStyle} onClick={handleLogin}>
        <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
          Login
        </Link>
      </button>
    </div>
  );
};

const containerStyle = {
  textAlign: "center",
  maxWidth: "400px",
  margin: "auto",
  marginTop: "50px",
  backgroundColor: "#3498db",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
};

const headingStyle = {
  color: "#fff",
  marginBottom: "20px",
  fontSize: "24px",
};

const labelStyle = {
  textAlign: "left",
  width: "100%",
  marginBottom: "10px",
  fontSize: "16px",
  color: "#fff",
};

const inputStyle = {
  padding: "10px",
  width: "100%",
  borderRadius: "5px",
  border: "1px solid #2980b9",
  marginBottom: "20px",
  fontSize: "16px",
};

const buttonStyle = {
  backgroundColor: "#2980b9",
  color: "#fff",
  padding: "15px",
  borderRadius: "5px",
  cursor: "pointer",
  border: "none",
  fontSize: "18px",
  width: "100%",
};

const errorStyle = {
  color: "red",
  marginBottom: "10px",
};

export default LoginPage;
