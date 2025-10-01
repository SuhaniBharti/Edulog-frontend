// import React from 'react';
// import Navbar from '../../components/Navbar';

// const SubjectList = ({ subjects }) => {
//   return (
//     <>
//       {/* <Navbar /> */}
//       <div style={{ padding: "9rem" }}>
//         <h2>Subject List</h2>
//         {subjects.length === 0 ? (
//           <p>No subjects yet. Add some!</p>
//         ) : (
//           <ul style={{ listStyle: "none", padding: 0 }}>
//             {subjects.map((subject) => (
//               <li
//                 key={subject._id}
//                 style={{
//                   border: "1px solid #ddd",
//                   marginBottom: "1rem",
//                   padding: "1rem",
//                   borderRadius: "8px"
//                 }}
//               >
//                 <h3>{subject.Sname}</h3>
//                 <p>
//                   <strong>Absent:</strong> {subject.absent}
//                 </p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </>
//   );
// };

// export default SubjectList;

import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("You must be logged in.");
      navigate("/login");
      return;
    }

    // ✅ Fetch subjects for this user
    fetch(`http://localhost:5000/api/subjects/${user._id}`)
      .then((res) => res.json())
      .then((data) => setSubjects(data))
      .catch((err) => console.error("Error fetching subjects:", err));
  }, [navigate]);
 const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this subject?")) return;

  try {
    const res = await fetch(`http://localhost:5000/api/subjects/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      // Update state after successful deletion
      setSubjects((prevSubjects) => prevSubjects.filter((s) => s._id !== id));
      alert("Subject deleted successfully");
    } else {
      const data = await res.json();
      alert(data.message || "Failed to delete subject");
    }
  } catch (err) {
    console.error("Error deleting subject:", err);
    alert("Error deleting subject");
  }
};


  return (
    <>
      <Navbar />
      <div style={{ padding: "9rem" }}>
        <h2>Subject List</h2>
        {subjects.length === 0 ? (
          <p>No subjects yet. Add some!</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {subjects.map((subject) => (
              <li
                key={subject._id}
                style={{
                  border: "2px solid #0b0909ff",
                  marginBottom: "1rem",
                  padding: "1rem",
                  borderRadius: "8px",
                  backgroundColor:"rgba(120, 9, 116, 0.5)"
                }}
                onClick={() => navigate(`/calendar/${subject._id}`)}
              >
                <h3>{subject.Sname}</h3>
                <p><strong>Absent:</strong> {subject.absent}</p>
                <button
  onClick={(e) => {
    e.stopPropagation(); // prevent navigating to calendar
    handleDelete(subject._id);
  }}
>
  Delete
</button>

              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default SubjectList;



