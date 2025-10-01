
import React from 'react';
import bgImage from "../../assets/bgimage.jpg"; // ← make sure this exists
import "./UserPage.css";
import Navbar from '../../components/Navbar';
// import { Navigate } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";
const Home = () => {
  // const navigate = useNavigate();
  return (
    <>
    <Navbar/>
   
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
        <button className="get-started">Get started</button>
        
      </div>
    </div>
     </>
  )
}

export default Home;
