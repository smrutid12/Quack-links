// RedirectComponent.js
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchOriginalURL } from '../axios'; // Import the API function

function RedirectComponent() {
  const { short_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getAndRedirect = async () => {
      try {
        const originalURL = await fetchOriginalURL(short_id);
        if (originalURL) {
          window.location.href = originalURL; // Redirect to the original URL
        } else {
          navigate('/not-found'); // Handle URL not found
        }
      } catch (error) {
        navigate('/error'); // Handle error
      }
    };

    getAndRedirect();
  }, [short_id, navigate]);

  return <div>Redirecting...</div>;
}

export default RedirectComponent;
