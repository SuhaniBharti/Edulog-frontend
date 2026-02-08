// import React, { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import { useNavigate } from "react-router-dom";

// const AddNote = ({ onNoteAdded }) => {
//   const [formData, setFormData] = useState({
//     title: "",
//     date: "",
//     description: ""
//   });
//   const navigate = useNavigate();

//   //  Run once when the component loads
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user) {
//       alert("You must be logged in.");
//       navigate("/login");
//     }
//   }, [navigate]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.title || !formData.date || !formData.description) return;

//     try {
//       const user = JSON.parse(localStorage.getItem("user")); // get logged in user
//       if (!user) {
//         alert("You must be logged in.");
//         navigate("/login");
//         return;
//       }

//       const res = await fetch(`${process.env.REACT_APP_API_URL}/api/notes`, {
//         method: "POST",
//         headers: { 
//           "Content-Type": "application/json",
          
//         },
//         body: JSON.stringify({ ...formData, userId: user._id }) // attach userId if needed
//       });

//       const newNote = await res.json();
//       onNoteAdded(newNote); // notify parent (App.js)
//       navigate("/list");
//       setFormData({ title: "", date: "", description: "" });
//     } catch (err) {
//       console.error("Error adding note:", err);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div style={{ 
//         padding: "10rem",
//         display:"flex",
//         alignItems:"center",
//         justifyContent:"center",
//         // backgroundColor:"#607D8B",
        
//         }}>
//           <div style={{
//         backgroundColor:"rgba(125, 33, 122, 0.6)",
//         height:"400px",
//         width:"500px" ,
//         justifyContent:"center",
//         alignItems:"center",
//         display:"flex",
//         flexDirection:"column",
//         borderRadius:"50px",

//           }}>

         
//         <h2 style={{color:"white"}}>Add Note</h2>
//         <form
//           onSubmit={handleSubmit}
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             gap: "1rem",
//             maxWidth: "400px"
//           }}
//         >
//           <div style={{display:"flex",
          
//           }}>

          
//           <label htmlFor ="title" style={{margin:"10px"}}>Title</label>
//           <input
//             type="text"
//             name="title"
//             placeholder="Title"
//             value={formData.title}
//             onChange={handleChange}
//           />
//           </div>
//           <div>
//              <label htmlFor="date" style={{margin:"10px"}}>Date</label>
//           <input
//             type="date"
//             name="date"
//             value={formData.date}
//             onChange={handleChange}
//           />
//           </div>
          
//           <div>
//             <label htmlFor="description" style={{margin:"10px"}}>Description</label>

//           <textarea
//             name="description"
//             placeholder="Description"
//             value={formData.description}
//             onChange={handleChange}
//           ></textarea>
//           </div>
 
//           <button type="submit">Add Note</button>
//         </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddNote;



// session

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const AddNote = ({ onNoteAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    description: ""
  });
  const navigate = useNavigate();

  //  Run once when the component loads
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   if (!user) {
  //     alert("You must be logged in.");
  //     navigate("/login");
  //   }
  // }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!formData.title || !formData.date || !formData.description) return;

  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // ✅ send session cookie
      body: JSON.stringify(formData), // ✅ no userId
    });

    if (res.status === 401) {
      alert("You must be logged in.");
      navigate("/login");
      return;
    }

    const newNote = await res.json();
    onNoteAdded(newNote); // notify parent (App.js)
    navigate("/list");
    setFormData({ title: "", date: "", description: "" });
  } catch (err) {
    console.error("Error adding note:", err);
  }
};

  return (
    <>
      <Navbar />
      <div style={{ 
        padding: "10rem",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        // backgroundColor:"#607D8B",
        
        }}>
          <div style={{
        backgroundColor:"rgba(125, 33, 122, 0.6)",
        height:"400px",
        width:"500px" ,
        justifyContent:"center",
        alignItems:"center",
        display:"flex",
        flexDirection:"column",
        borderRadius:"50px",

          }}>

         
        <h2 style={{color:"white"}}>Add Note</h2>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            maxWidth: "400px"
          }}
        >
          <div style={{display:"flex",
          
          }}>

          
          <label htmlFor ="title" style={{margin:"10px"}}>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
          />
          </div>
          <div>
             <label htmlFor="date" style={{margin:"10px"}}>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
          </div>
          
          <div>
            <label htmlFor="description" style={{margin:"10px"}}>Description</label>

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
          </div>
 
          <button type="submit">Add Note</button>
        </form>
        </div>
      </div>
    </>
  );
};

export default AddNote;
