

// import React from "react";
// import Navbar from "../components/Navbar";

// const NotesList = ({ notes = [] }) => {
//   return (
//     <>
//       <Navbar />
//       <div style={{ padding: "9rem" }}>
//         <h2>Notes List</h2>
//         {notes.length === 0 ? (
//           <p>No notes yet. Add some!</p>
//         ) : (
//           <ul style={{ listStyle: "none", padding: 0 }}>
//             {notes.map((note) => (
//               <li
//                 key={note._id}
//                 style={{
//                   border: "1px solid #ddd",
//                   marginBottom: "1rem",
//                   padding: "1rem",
//                   borderRadius: "8px",
//                 }}
//               >
//                 <h3>{note.title}</h3>
//                 <p><strong>Date:</strong> {note.date}</p>
//                 <p>{note.description}</p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </>
//   );
// };

// export default NotesList;




// import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import { useNavigate } from "react-router-dom";

// const NotesList = () => {
//   const [notes, setNotes] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user) {
//       alert("You must be logged in.");
//       navigate("/login");
//       return;
//     }

//     // ✅ Fetch notes for this user
//     fetch(`http://localhost:5000/api/notes/${user._id}`)
//       .then((res) => res.json())
//       .then((data) => setNotes(data))
//       .catch((err) => console.error("Error fetching notes:", err));
//   }, [navigate]);

//   return (
//     <>
//       <Navbar />
//       <div style={{ padding: "9rem" }}>
//         <h2>Notes List</h2>
//         {notes.length === 0 ? (
//           <p>No notes yet. Add some!</p>
//         ) : (
//           <ul style={{ listStyle: "none", padding: 0 }}>
//             {notes.map((note) => (
//               <li
//                 key={note._id}
//                 style={{
//                   border: "1px solid #ddd",
//                   marginBottom: "1rem",
//                   padding: "1rem",
//                   borderRadius: "8px",
//                 }}
//               >
//                 <h3>{note.title}</h3>
//                 <p><strong>Date:</strong> {note.date}</p>
//                 <p>{note.description}</p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </>
//   );
// };

// export default NotesList;



import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("You must be logged in.");
      navigate("/login");
      return;
    }

    // ✅ Fetch notes for this user
    fetch(`http://localhost:5000/api/notes/${user._id}`)
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch((err) => console.error("Error fetching notes:", err));
  }, [navigate]);

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this note?")) return;

  try {
    const res = await fetch(`http://localhost:5000/api/notes/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      // Remove the deleted note from the state
      setNotes(notes.filter((note) => note._id !== id));
    } else {
      const data = await res.json();
      alert(data.message || "Failed to delete note");
    }
  } catch (err) {
    console.error("Error deleting note:", err);
    alert("Error deleting note");
  }
};


  return (
    <>
      <Navbar />
     <div style={{ padding: "5rem" }}>
  <h2>Notes List</h2>
  {notes.length === 0 ? (
    <p>No notes yet. Add some!</p>
  ) : (
    <div className="container">
      <div className="row">
        {notes.map((note) => (
          <div key={note._id} className="col-md-4 mb-4">
            <div className="card h-100"
             style={{
      background: "rgba(8, 223, 238, 0.34)", // light glass
      backdropFilter: "blur(10px)",          // glassy blur effect
      borderRadius: "15px",
      border: "1px solid rgba(255,255,255,0.2)",
      boxShadow: "0 8px 32px 0 rgba(0,0,0,0.25)",
      color: "#050218ff",                        // text color
      padding: "1rem",
    }}
            >
              <div className="card-body" >
                <h5 className="card-title">{note.title}</h5>
                <p>{note.date}</p>
                <p className="card-text">{note.description}</p>
               
                <button
  className="btn btn-danger mt-2"
  onClick={() => handleDelete(note._id)}
>
  Delete
</button>

                <button>Update</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )}
</div>

    </>
  );
};

export default NotesList;

