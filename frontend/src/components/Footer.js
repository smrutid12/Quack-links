import React from "react";
import "../css/Footer.css";

function SmallDuck() {
  return (
    <svg width="20" height="20" viewBox="0 0 44 44" fill="none">
      <ellipse cx="22" cy="28" rx="13" ry="10" fill="#F5C518" />
      <circle cx="22" cy="16" r="8" fill="#F5C518" />
      <path d="M29 17 L35 16.5 L33 19 Z" fill="#E8840A" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="ql-footer">
      <div className="ql-footer-inner">
        <div className="ql-footer-brand">
          <div className="ql-footer-logo">
            <SmallDuck />
            QuackLink
          </div>
          <p className="ql-footer-tag">
            Short links. Happy ducks.
            <br />
            Zero fuss.
          </p>
        </div>

        <div className="ql-footer-links">
          <div className="ql-footer-col">
            <span className="ql-footer-title">Product</span>
            <a href="#features">Features</a>
            <a href="#start">Shorten URL</a>
          </div>

          <div className="ql-footer-col">
            <span className="ql-footer-title">Company</span>
            <a href="/">About</a>
            <a href="/">Contact</a>
          </div>

          <div className="ql-footer-col">
            <span className="ql-footer-title">Legal</span>
            <a href="/">Privacy</a>
            <a href="/">Terms</a>
          </div>
        </div>
      </div>

      <div className="ql-footer-bottom">
        <span>© 2026 QuackLink. All rights reserved.</span>
        <span>🦆 Made with quack</span>
      </div>
    </footer>
  );
}