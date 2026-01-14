// Chatbot.js
import React, { useState} from "react";
import "./Chatbot.css";

function Chatbot({ userId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMsg = {sender: "user", text: input };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/chatbot`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ message: input, userId }),
      });

      const data = await res.json();

      // Add bot message
      const botMsg = {sender:"bot", text: data.reply || "No response from chatbot." };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Error fetching chatbot response:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Server error. Please try again later." },
      ]);
    }
  };

  return (
    <div className="chatbot">
      
      <div className="messages">
        
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.sender}`}>
            {m.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me about your tasks..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot;
