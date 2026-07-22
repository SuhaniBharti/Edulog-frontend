

import React, { useState, useEffect } from "react";
import bgImage from "../../assets/bgimage.jpg";
import "./UserPage.css";
import Navbar from "../../components/Navbar";
import Chatbot from "../Chatbot/ChatBot";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false);

  //  Check session + get logged-in user
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/auth/me`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => navigate("/login"));
  }, [navigate]);

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
            Your personal companion to keep track of attendance and stay on top
            of your routine.
          </p>
        </div>

        {/* Chatbot button */}
        {!showChatbot && (
          <div className="chatbot-footer">
            <button
              className="chatbot-button"
              onClick={() => setShowChatbot(true)}
            >
              Chatbot
            </button>
          </div>
        )}

        {/* Chatbot */}
        {showChatbot && (
          <div className="chatbot-container">
            <button
              className="chatbot-close"
              onClick={() => setShowChatbot(false)}
            >
              ✖
            </button>

            {/*  use user.id, NOT user._id */}
            <Chatbot userId={user?.id} />
          </div>
        )}
      </div>
    </>
  );
};

export default Home;

