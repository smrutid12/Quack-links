import React from "react";
import { Link } from "react-router-dom";
import "../css/Header.css";

function DuckLogo() {
  return (
    <svg width="22" height="22" viewBox="0 0 44 44" fill="none">
      <ellipse cx="22" cy="28" rx="13" ry="10" fill="#F5C518" />
      <circle cx="22" cy="16" r="8" fill="#F5C518" />
      <ellipse cx="26" cy="16" rx="4" ry="3" fill="#F0AA10" />
      <circle cx="25" cy="13" r="2" fill="#1A1A1A" />
      <circle cx="25.6" cy="12.4" r="0.6" fill="white" />
      <path d="M29 17 L35 16.5 L33 19 Z" fill="#E8840A" />
      <ellipse cx="16" cy="36" rx="4" ry="2.5" fill="#E8840A" />
      <ellipse cx="28" cy="36" rx="4" ry="2.5" fill="#E8840A" />
    </svg>
  );
}

export default function Header() {
  return (
    <header className="ql-header">
      <div className="ql-header-inner">
        <Link to="/" className="ql-logo">
          <span className="ql-logo-duck">
            <DuckLogo />
          </span>
          <span className="ql-logo-text">QuackLink</span>
        </Link>

        <nav className="ql-nav">
          <a href="#features" className="ql-nav-link">
            Features
          </a>
          <a href="#start" className="ql-nav-cta">
            Quack now
          </a>
        </nav>
      </div>
    </header>
  );
}