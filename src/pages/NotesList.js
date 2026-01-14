
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState("all"); // "all", "completed", "incomplete"
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("You must be logged in.");
      navigate("/login");
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/api/notes/${user._id}`)
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch((err) => console.error("Error fetching notes:", err));
  }, [navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/notes/${id}`, {
        method: "DELETE",
      });

      if (res.ok) setNotes(notes.filter((note) => note._id !== id));
      else {
        const data = await res.json();
        alert(data.message || "Failed to delete note");
      }
    } catch (err) {
      console.error("Error deleting note:", err);
      alert("Error deleting note");
    }
  };

  const toggleComplete = async (note) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/notes/${note._id}/complete`,
        {
          method:"PATCH",
          headers:{ "Content-Type": "application/json" },
          body:JSON.stringify({ completed: !note.completed }),
        }
      );
      const updatedNote = await res.json();
      setNotes(notes.map((n) => (n._id === note._id ? updatedNote : n)));
    } catch (err) {
      console.error("Error updating note:", err);
    }
  };

  // Filter notes based on sidebar selection
  const filteredNotes = notes.filter((note) => {
    if (filter === "completed") return note.completed;
    if (filter === "incomplete") return !note.completed;
    return true; // all
  });

  return (
    <>
      <Navbar />
      <div style={{ display: "flex", padding: "5rem", gap: "2rem" }}>
        {/* Sidebar / Dashboard */}
        <div
          style={{
            width: "200px",
            borderRight: "1px solid rgba(0,0,0,0.1)",
            paddingRight: "1rem",
          }}
        >
          <h4>Dashboard</h4>
          <ul style={{ listStyle: "none", padding: 0, marginTop: "1rem" }}>
            <li
              style={{
                padding: "0.5rem 1rem",
                cursor: "pointer",
                backgroundColor: filter === "all" ? "#00bcd4" : "transparent",
                color: filter === "all" ? "#fff" : "#000",
                borderRadius: "5px",
                marginBottom: "0.5rem",
              }}
              onClick={() => setFilter("all")}
            >
              All Tasks
            </li>
            <li
              style={{
                padding: "0.5rem 1rem",
                cursor: "pointer",
                backgroundColor: filter === "completed" ? "green" : "transparent",
                color: filter === "completed" ? "#fff" : "#000",
                borderRadius: "5px",
                marginBottom: "0.5rem",
              }}
              onClick={() => setFilter("completed")}
            >
              Completed Tasks
            </li>
            <li
              style={{
                padding: "0.5rem 1rem",
                cursor: "pointer",
                backgroundColor: filter === "incomplete" ? "red" : "transparent",
                color: filter === "incomplete" ? "#fff" : "#000",
                borderRadius: "5px",
                marginBottom: "0.5rem",
              }}
              onClick={() => setFilter("incomplete")}
            >
              Incomplete Tasks
            </li>
          </ul>
        </div> 

        {/* Notes Section */}
        <div style={{ flex: 1 }}>
          <h2>Notes List</h2>
          {filteredNotes.length === 0 ? (
            <p>No notes yet. Add some!</p>
          ) : (
            <div className="container">
              <div className="row">
                {filteredNotes.map((note) => (
                  <div key={note._id} className="col-md-4 mb-4">
                    <div
                      className="card h-100"
                      style={{
                        background: "rgba(8, 223, 238, 0.34)",
                        backdropFilter: "blur(10px)",
                        borderRadius: "15px",
                        border: "1px solid rgba(255,255,255,0.2)",
                        boxShadow: "0 8px 32px 0 rgba(0,0,0,0.25)",
                        color: "#050218ff",
                        padding: "1rem",
                      }}
                    >
                      <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p>{note.date}</p>
                        <p className="card-text">{note.description}</p>

                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "0.5rem",
                            marginTop: "0.5rem",
                          }}
                        >
                          <button
                            className="btn btn-danger"
                            style={{ flex: "1 1 auto", minWidth: "100px" }}
                            onClick={() => handleDelete(note._id)}
                          >
                            Delete
                          </button>

                          <button
                            onClick={() => navigate(`/edit/${note._id}`)}
                            style={{
                              backgroundColor: "#ffc107",
                              border: "none",
                              padding: "0.5rem 1rem",
                              borderRadius: "5px",
                              cursor: "pointer",
                              flex: "1 1 auto",
                              minWidth: "100px",
                            }}
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => toggleComplete(note)}
                            style={{
                              backgroundColor: note.completed ? "green" : "red",
                              color: "#fff",
                              border: "none",
                              padding: "0.5rem 1rem",
                              borderRadius: "5px",
                              cursor: "pointer",
                              flex: "1 1 auto",
                              minWidth: "100px",
                            }}
                          >
                            {note.completed ? "Completed" : "Incomplete"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NotesList;
