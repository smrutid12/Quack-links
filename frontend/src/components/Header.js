// src/components/Header.js
import React from "react";
import "../css/Header.css";

function Header() {
  return (
    <div className="header">
      <div className="logo">
        <span>QuackLink</span>
      </div>

      <div className="icon-dropdown">
        <img
          src="forwardduck.png"
          className="icon-image"
          alt="duck moving forward"
        />
      </div>
    </div>
  );
}

export default Header;
