import React, { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [menuActive, setMenuActive] = useState(false);
  
  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="left-container">
          <p>Logo</p>
        </div>
        <div className={`middle-container ${menuActive ? 'active' : ''}`}>
          <div className="navbar-content">Home</div>
          <div className="navbar-content">Report content</div>
          <div className="navbar-content">Report</div>
          <div className="navbar-content">Chatbox</div>
        </div>
        <div className="right-container">
          <div className="menu-toggle" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
