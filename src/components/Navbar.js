import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  const lastScrollY = useRef(0);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    
   
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
   <header className={`custom-navbar ${showNavbar ? "show" : "hide"}`}>
  <div className="container d-flex align-items-center justify-content-center flex-col">
    {/* Brand + Links (Desktop) */}
  <nav className="align-items-center flex-row" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
  <div className="brand-text">EduLog</div>
  <ul className="nav-links-1">
    <li><Link to="/user" className="custom-nav-btn">Home</Link></li>
    <li><Link to="/add" className="custom-nav-btn">Add Note</Link></li>
    <li><Link to="/list" className="custom-nav-btn">NoteList</Link></li>
    <li><Link to="/subjects" className="custom-nav-btn">Add Subjects</Link></li>
    <li><Link to="/Sublist" className="custom-nav-btn">SubList</Link></li>
    <li><Link to="/login" className="custom-nav-btn">Login</Link></li>
    <li><Link to="/signup" className="custom-nav-btn">Signup</Link></li>
  </ul>



    {/* Hamburger (Mobile only, controlled via CSS media query) */}
  
    <button className="hamburger" onClick={toggleMenu} >
      <span className="bar"></span>
      <span className="bar"></span>
      <span className="bar"></span>
    </button>
     
    
</nav>
    {/* Mobile Menu */}
    {menuOpen && (
      <ul className="nav-links w-100 ">
        <li><Link to="/user" className="custom-nav-btn">Home</Link></li>
        <li><Link to="/add" className="custom-nav-btn">Add Note</Link></li>
        <li><Link to="/list" className="custom-nav-btn">NoteList</Link></li>
        <li><Link to="/subjects" className="custom-nav-btn">Add Subjects</Link></li>
        <li><Link to="/Sublist" className="custom-nav-btn">SubList</Link></li>
      </ul>
    )}
  </div>
</header>

  );
};

export default Navbar;
