import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const SubjectCalendar = () => {
  const { subjectId } = useParams();
  const [dates, setDates] = useState([]);
  const [subjectName, setSubjectName] = useState("");

   useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/subjects/${subjectId}/dates`)
      .then(res => res.json())
      .then(data => {
         console.log("Fetched dates:", data);
        setDates(data.map(d => new Date(d)));
      })
      .catch(err => console.error("Error fetching absent dates:", err));

 
    fetch(`${process.env.REACT_APP_API_URL}/api/subject/${subjectId}`)
  .then(res => res.json())
  .then(data => {
    console.log("Fetched subject:", data); // 👀 check shape
    setSubjectName(data.Sname  || "Unknown Subject");
  })
  .catch(err => console.error("Error fetching subject:", err));

  }, [subjectId]);

  const tileClassName = ({ date, view }) => {
    if (view === "month" && dates.some(d => d.toDateString() === date.toDateString())) {
      return "absent-day";
    }
  };

  return (
    <div style={{ padding: "5rem" }}>
      <h2>{subjectName} - Absent Dates</h2>
      <Calendar tileClassName={tileClassName} />
    </div>
  );
};

export default SubjectCalendar;
