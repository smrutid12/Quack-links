import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="ql-redirect-page">
      <div className="ql-redirect-card">
        <div className="ql-redirect-duck">🦆</div>
        <h1>Link not found</h1>
        <p>This QuackLink may be wrong, expired, or deleted.</p>
        <Link className="ql-not-found-btn" to="/">
          Create a new QuackLink
        </Link>
      </div>
    </div>
  );
}