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
  const currentYear = new Date().getFullYear();

  return (
    <footer className="ql-footer">
      <div className="ql-footer-inner">
        <div className="ql-footer-brand">
          <div className="ql-footer-logo">
            <SmallDuck />
            QuackLink
          </div>

          <p className="ql-footer-tag">
            A personal URL shortener project.
            <br />
            Built with React, Flask, and a little quack.
          </p>
        </div>

        <div className="ql-footer-links">
          <div className="ql-footer-col">
            <span className="ql-footer-title">Product</span>
            <a href="#features">Features</a>
            <a href="#start">Shorten URL</a>
            <a href="/">QR Code</a>
          </div>

          <div className="ql-footer-col">
            <span className="ql-footer-title">Creator</span>
            <a
              href="https://smrutidash.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Portfolio
            </a>
            <a
              href="https://github.com/smrutid12"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/smrutid12"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>

          <div className="ql-footer-col">
            <span className="ql-footer-title">Project</span>
            <a
              href="https://github.com/smrutid12/Quack-links"
              target="_blank"
              rel="noopener noreferrer"
            >
              About QuackLink
            </a>
            <a
              href="https://www.smrutidash.com/contact"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact
            </a>
            <a
              href="https://www.smrutidash.com/projects"
              target="_blank"
              rel="noopener noreferrer"
            >
              More Projects
            </a>
          </div>

          <div className="ql-footer-col">
            <span className="ql-footer-title">Legal</span>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Use</a>
            <a href="/disclaimer">Disclaimer</a>
          </div>
        </div>
      </div>

      <div className="ql-footer-bottom">
        <span>© {currentYear} QuackLink. All rights reserved.</span>
        <span>
          Project by{" "}
          <a
            href="https://smrutidash.com"
            target="_blank"
            rel="noopener noreferrer"
            className="ql-footer-credit"
          >
            Smruti Dash
          </a>{" "}
          🦆
        </span>
      </div>
    </footer>
  );
}
