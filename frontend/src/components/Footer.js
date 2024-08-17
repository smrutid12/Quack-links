import { useState } from "react";
import "../css/Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div></div>
      <div className="sd-logo">
        <span>Made with love by </span>
        <a href="https://www.linkedin.com/in/smruti-dash-1210/" target="_blank">
          <img src="Smruti-dash-logo.png" className="sd-logo-image" />
        </a>
      </div>
    </div>
  );
}

export default Footer;
