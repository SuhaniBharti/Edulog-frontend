


// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Home from "./pages/Home/Home";
// import UserPage from "./pages/UserPage/UserPage";
// import AddNote from "./pages/AddNote";
// import NotesList from "./pages/NotesList";
// import Routine from "./pages/Attendance/Routine";
// import SubjectList from "./pages/Attendance/SubjectList";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";

// const App = () => {
//   const [notes, setNotes] = useState([]);
//   const [subjects, setSubjects] = useState([]);

//   // Fetch notes
//   useEffect(() => {
//     fetch("http://localhost:5000/api/notes")
//       .then((res) => res.json())
//       .then((data) => setNotes(data))
//       .catch((err) => console.error("Error fetching notes:", err));
//   }, []);

//   // Fetch subjects
//   useEffect(() => {
//     fetch("http://localhost:5000/api/subjects")
//       .then((res) => res.json())
//       .then((data) => setSubjects(data))
//       .catch((err) => console.error("Error fetching subjects:", err));
//   }, []);

//   const handleNoteAdded = (newNote) => {
//     setNotes((prev) => [...prev, newNote]);
//   };

//   const handleSubjectAdded = (newSubject) => {
//     setSubjects((prev) => [...prev, newSubject]);
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/user" element={<UserPage />} />
//         <Route path="/list" element={<NotesList notes={notes} />} />
//         <Route path="/Sublist" element={<SubjectList subjects={subjects} />} />
//         <Route path="/add" element={<AddNote onNoteAdded={handleNoteAdded} />} />
//         <Route path="/subjects" element={<Routine onSubjectAdded={handleSubjectAdded} />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;




import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import background from "./assets/back2.webp";
import Home from "./pages/Home/Home";
import UserPage from "./pages/UserPage/UserPage";
import AddNote from "./pages/AddNote";
import NotesList from "./pages/NotesList";
import Routine from "./pages/Attendance/Routine";
import SubjectList from "./pages/Attendance/SubjectList";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import SubjectCalendar from "./pages/SubjectCalendar";
import EditNote from "./pages/UpdateNote";
const App = () => {
  const [notes, setNotes] = useState([]);
  const [subjects, setSubjects] = useState([]);

  // Fetch notes
  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return;

  fetch(`http://localhost:5000/api/notes/${user._id}`)
    .then((res) => res.json())
    .then((data) => setNotes(data));
}, []);

useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return;

  fetch(`http://localhost:5000/api/subjects/${user._id}`)
    .then((res) => res.json())
    .then((data) => setSubjects(data));
}, []);

  const handleNoteAdded = (newNote) => {
    setNotes((prev) => [...prev, newNote]);
  };

  const handleSubjectAdded = (newSubject) => {
    setSubjects((prev) => [...prev, newSubject]);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/list" element={<NotesList notes={notes} />} />
        <Route path="/Sublist" element={<SubjectList subjects={subjects} />} />
        <Route path="/add" element={<AddNote onNoteAdded={handleNoteAdded} />} />
        <Route path="/subjects" element={<Routine onSubjectAdded={handleSubjectAdded} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
          <Route path="/calendar/:subjectId" element={<SubjectCalendar />} />
          <Route path="/edit/:id" element={<EditNote />} />

      </Routes>
    </Router>
    </div>
  );
};

export default App;
