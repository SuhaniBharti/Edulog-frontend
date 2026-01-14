
import React, { useState } from "react";
import bgImage from "../../assets/bgimage.jpg";
import "./UserPage.css";
import Navbar from '../../components/Navbar';
import Chatbot from "../Chatbot/ChatBot";
// import { useNavigate } from 'react-router-dom';

const Home = () => {
  // const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // State to toggle chatbot visibility
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <>
      <Navbar />

      <div
        className="home"
        style={{
          height: "100vh",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="overlay">
          <h1 className="title">Welcome to EduLog 📘</h1>
          <p className="subtitle">
            Your personal companion to keep track of attendance and stay on top of your routine.
          </p>
          {/* <button className="get-started">Get started</button> */}
        </div>

        {/* Chatbot footer button */}
        {!showChatbot && 
        <div className="chatbot-footer">
          <button
            className="chatbot-button"
            onClick={() => setShowChatbot(!showChatbot)}
          >
             Chatbot
          </button>
        </div>
        }

        {/* Render chatbot only when showChatbot is true */}
        {/* {showChatbot && 
        <div>
        <button
        onClick={()=>setShowChatbot(!showChatbot)}>close</button>
        <Chatbot userId={user?._id} />
        </div>
        } */}

        {showChatbot && (
  <div className="chatbot-container">
    <button
      className="chatbot-close"
      onClick={() => setShowChatbot(false)}
    >
      ✖
    </button>

    <Chatbot userId={user?._id} />
  </div>
)}

      </div>
    </>
  );
};

export default Home;
