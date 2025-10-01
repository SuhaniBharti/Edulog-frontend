// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';


// const Routine = ({ onSubjectAdded }) => {
//   const [formData, setFormData] = useState({
//     Sname: "",
//     absent: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//  const handleSubmit = async (e) => {
//   e.preventDefault();
//   if (!formData.Sname || !formData.absent) return;

//   try {
//     const res = await fetch("http://localhost:5000/api/subjects", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" ,
       
//       },
//       body: JSON.stringify({
//         ...formData,
//         absent: Number(formData.absent),
//       }),
//     });

//     const newSubject = await res.json();
//     onSubjectAdded(newSubject);

//     setFormData({ Sname: "", absent: "" });

//     // ✅ Navigate only after successful add
//     navigate("/Sublist");

//   } catch (err) {
//     console.log("error adding subject", err);
//   }
// };


//   return (
//     <form
//       onSubmit={handleSubmit}
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         gap: "1rem",
//         maxWidth: "400px",
//         margin: "10rem",
//       }}
//     >
//       <input
//         type="text"
//         name="Sname"
//         placeholder="Sname"
//         value={formData.Sname}
//         onChange={handleChange}
//       />
//       <input
//         type="number"
//         name="absent"
//         placeholder="absent"
//         value={formData.absent}
//         onChange={handleChange}
//       />
//       <button type="submit">Add subject</button>
//     </form>
//   );
// };

// export default Routine;



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../../components/Navbar';
// const Routine = ({ onSubjectAdded }) => {
//   const [formData, setFormData] = useState({
//     Sname: "",
//     absent: "",
//   });

//   const navigate = useNavigate();

//   // 🔹 Check if user is logged in when page loads
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
//     if (!formData.Sname || !formData.absent) return;

//     try {
//       const user = JSON.parse(localStorage.getItem("user"));
//       if (!user) {
//         alert("You must be logged in.");
//         navigate("/login");
//         return;
//       }

//       const res = await fetch("http://localhost:5000/api/subjects", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...formData,
//           absent: Number(formData.absent),
//           userId: user._id, // ✅ send logged-in user's ID
//         }),
//       });

//       const newSubject = await res.json();
//       onSubjectAdded(newSubject);

//       setFormData({ Sname: "", absent: "" });

//       // ✅ Navigate only after successful add
//       navigate("/Sublist");

//     } catch (err) {
//       console.error("Error adding subject", err);
//     }
//   };

//   return (
//   <>
//   <Navbar/>
  
//     <form
//       onSubmit={handleSubmit}
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         gap: "1rem",
//         maxWidth: "400px",
//         margin: "10rem",
//       }}
//     >
//       <input
//         type="text"
//         name="Sname"
//         placeholder="Sname"
//         value={formData.Sname}
//         onChange={handleChange}
//       />
//       <input
//         type="number"
//         name="absent"
//         placeholder="absent"
//         value={formData.absent}
//         onChange={handleChange}
//       />
//       <button type="submit">Add subject</button>
//     </form>
//     </>
//   );
// };

// export default Routine;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../../components/Navbar";

// const Routine = ({ onSubjectAdded }) => {
//   const [formData, setFormData] = useState({
//     Sname: "",
//     absent: 0,
//     absentDates: [],
//   });
//   const [selectedDate, setSelectedDate] = useState("");

//   const navigate = useNavigate();

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

//   const handleDateAdd = () => {
//     if (selectedDate && !formData.absentDates.includes(selectedDate)) {
//       const newDates = [...formData.absentDates, selectedDate];
//       setFormData({
//         ...formData,
//         absentDates: newDates,
//         absent: newDates.length, // auto update count
//       });
//       setSelectedDate("");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.Sname) return;

//     try {
//       const user = JSON.parse(localStorage.getItem("user"));
//       if (!user) {
//         alert("You must be logged in.");
//         navigate("/login");
//         return;
//       }

//       const res = await fetch("http://localhost:5000/api/subjects", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...formData,
//           user: user._id,
//         }),
//       });

//       const newSubject = await res.json();
//       onSubjectAdded(newSubject);

//       setFormData({ Sname: "", absent: 0, absentDates: [] });

//       navigate("/Sublist");
//     } catch (err) {
//       console.error("Error adding subject", err);
//     }
//   };

//   return (
//     <>
//       <Navbar />
         
//       <form
//         onSubmit={handleSubmit}
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           gap: "1rem",
//           maxWidth: "400px",
//           padding: "10rem",
//         }}
//       >
//         {/* Subject Name */}
//         <input
//           type="text"
//           name="Sname"
//           placeholder="Subject Name"
//           value={formData.Sname}
//           onChange={handleChange}
//         />

//         {/* Pick a date */}
//         <input
//           type="date"
//           value={selectedDate}
//           onChange={(e) => setSelectedDate(e.target.value)}
//         />
//         <button type="button" onClick={handleDateAdd}>
//           Add Absent Date
//         </button>

//         {/* Show added dates */}
//         <ul>
//           {formData.absentDates.map((d, i) => (
//             <li key={i}>{d}</li>
//           ))}
//         </ul>

//         {/* Auto count */}
//         <p>Total Days Absent: {formData.absent}</p>

//         <button type="submit">Add subject</button>
//       </form>
//     </>
//   );
// };

// export default Routine;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Routine = ({ onSubjectAdded }) => {
  const [formData, setFormData] = useState({
    Sname: "",
    absent: 0,
    absentDates: [],
  });
  const [selectedDate, setSelectedDate] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("You must be logged in.");
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateAdd = () => {
    if (selectedDate && !formData.absentDates.includes(selectedDate)) {
      const newDates = [...formData.absentDates, selectedDate];
      setFormData({
        ...formData,
        absentDates: newDates,
        absent: newDates.length,
      });
      setSelectedDate("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.Sname) return;

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        alert("You must be logged in.");
        navigate("/login");
        return;
      }

      const res = await fetch("http://localhost:5000/api/subjects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          user: user._id,
        }),
      });

      const newSubject = await res.json();
      onSubjectAdded(newSubject);

      setFormData({ Sname: "", absent: 0, absentDates: [] });

      navigate("/Sublist");
    } catch (err) {
      console.error("Error adding subject", err);
    }
  };

  return (
    <>
      <Navbar />
      {/* Background wrapper */}
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
        }}
      >
        {/* Glassy box */}
        <div
          style={{
            background: "rgba(0, 123, 255, 0.2)", // bluish glass
            backdropFilter: "blur(10px)",
            borderRadius: "15px",
            padding: "3rem",
            maxWidth: "400px",
            width: "100%",
            boxShadow: "0 8px 32px 0 rgba(0,0,0,0.25)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            color: "#fff",
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            Add Subject
          </h2>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {/* Subject Name */}
            <input
              type="text"
              name="Sname"
              placeholder="Subject Name"
              value={formData.Sname}
              onChange={handleChange}
              style={{
                padding: "0.75rem",
                borderRadius: "8px",
                border: "none",
                outline: "none",
              }}
            />

            {/* Pick a date */}
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{
                padding: "0.5rem",
                borderRadius: "8px",
                border: "none",
                outline: "none",
              }}
            />
            <button
              type="button"
              onClick={handleDateAdd}
              style={{
                padding: "0.75rem",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#007bff",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Add Absent Date
            </button>

            {/* Show added dates */}
            {formData.absentDates.length > 0 && (
              <ul style={{ paddingLeft: "1rem" }}>
                {formData.absentDates.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            )}

            {/* Auto count */}
            <p>Total Days Absent: {formData.absent}</p>

            <button
              type="submit"
              style={{
                padding: "0.75rem",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#28a745",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Add subject
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Routine;
