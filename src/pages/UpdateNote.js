// src/pages/EditNote.js

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const EditNote = () => {
  const { id } = useParams(); // get note ID from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    description: ""
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("You must be logged in.");
      navigate("/login");
      return;
    }

    // Fetch the existing note
    fetch(`${process.env.REACT_APP_API_URL}/api/notes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched note:", data); 
        setFormData({
          title: data.title,
          date: data.date ? data.date.slice(0, 10) : "",
          description: data.description
        });
      })
    .catch((err) => console.error("Error fetching note:", err));
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/notes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error("Failed to update note");
      navigate("/list");
    } catch (err) {
      console.error("Error updating note:", err);
      alert("Failed to update note");
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "10rem", display: "flex", justifyContent: "center" }}>
        <div
          style={{
            backgroundColor: "rgba(125, 33, 122, 0.6)",
            height: "400px",
            width: "500px",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            borderRadius: "50px"
          }}
        >
          <h2 style={{ color: "white" }}>Edit Note</h2>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              maxWidth: "400px"
            }}
          >
            <div>
              <label style={{ margin: "10px" }}>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div>
              <label style={{ margin: "10px" }}>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
            <div>
              <label style={{ margin: "10px" }}>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <button type="submit">Update Note</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditNote;
