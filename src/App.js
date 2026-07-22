
// for session
import React, { useState,useEffect  } from "react";
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
import Chatbot from "./pages/Chatbot/ChatBot";
const App = () => {
  const [notes, setNotes] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [user, setUser] = useState(null);

useEffect(() => {
  fetch(`${process.env.REACT_APP_API_URL}/api/auth/me`, {
    credentials: "include"
  })
    .then(res => res.ok ? res.json() : null)
    .then(data => setUser(data));
}, []);
console.log("user:"+user);

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
       <Route
  path="/chatbot"
  element={
    user ? <Chatbot userId={user.id} /> : <div>Loading...</div>
  }
/>

      </Routes>
    </Router>
    </div>
  );
};

export default App;
