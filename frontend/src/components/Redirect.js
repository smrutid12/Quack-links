import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchOriginalURL } from "../axios";

function RedirectComponent() {
  const { short_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getAndRedirect = async () => {
      try {
        const originalURL = await fetchOriginalURL(short_id);

        if (originalURL) {
          window.location.replace(originalURL);
        } else {
          navigate("/not-found");
        }
      } catch (error) {
        navigate("/not-found");
      }
    };

    getAndRedirect();
  }, [short_id, navigate]);

  return (
    <div className="ql-redirect-page">
      <div className="ql-redirect-card">
        <div className="ql-redirect-duck">🦆</div>
        <h1>Redirecting...</h1>
        <p>The duck is checking your short link.</p>
      </div>
    </div>
  );
}

export default RedirectComponent;