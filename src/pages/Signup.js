import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Signup successful!");
      navigate("/login");
    } else {
      alert(data.message);
    }
  };

  return (
    <div style={{
           minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",  

    }}>
        <div style={{
          background: "rgba(255, 0, 0, 0.2)", // glass effect
          backdropFilter: "blur(10px)",
          borderRadius: "15px",
          padding:"2rem 3rem",
          
          width:"500px",
          boxShadow: "0 8px 32px 0 rgba(0,0,0,0.25)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}>
            <h2 style={{color:"black",}}>Sign Up</h2>
      <form onSubmit={handleSubmit}style={{display:"flex",
        flexDirection:"column",
        gap:"10px"
      }}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
         <button
            type="submit"
            style={{
              padding: "0.75rem",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#ff00008e",
           
              color: "#fff",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#b30000ff")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#ff0000ff")}
          >Signup</button>
        <p>already have an account? <button onClick={()=>navigate("/login")}>Login</button></p>
      </form>
        </div>
     
    </div>
  );
}
