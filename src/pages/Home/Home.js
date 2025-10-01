
import React from 'react';
import bgImage from "../../assets/bgimage.jpg"; // ← make sure this exists
import "./Home.css";
// import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home" style={{ 
        height: "100vh",
         backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
    }}>
      <div className="overlay">
        <h1 className="title">Welcome to EduLog 📘</h1>
        <p className="subtitle">
          Your personal companion to keep track of attendance and stay on top of your routine.
        </p>
        <button className="get-started" onClick={()=>{navigate("/login")}}>Login</button>
        <p>Donot have an account?<button className="get" onClick={()=>{navigate("/signup")}}>Signup</button></p>

      </div>
    </div>
  )
}

export default Home;
