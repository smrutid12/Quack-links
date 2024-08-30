import { useState, useEffect } from "react";
import "../css/URLPage.css";
import api from "../axios"; // Import your axios instance

function URLPage() {
  const [data, setData] = useState("");
  const [isMoved, setisMoved] = useState(false);
  const [isDisabled, setsDisabled] = useState(true);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState(""); // New state for tooltip message
  const [transitionDuration, setTransitionDuration] = useState("0s");
  const [buttonLabel, setButtonLabel] = useState("→");

  useEffect(() => {
    if (isMoved) {
      const duckElement = document.getElementById("duck");
      const handleTransitionEnd = () => {
        if (tooltipMessage) {
          setIsTooltipVisible(true);
        }
      };
      duckElement.addEventListener("transitionend", handleTransitionEnd);

      return () => {
        duckElement.removeEventListener("transitionend", handleTransitionEnd);
      };
    } else {
      setIsTooltipVisible(false);
    }
  }, [isMoved, tooltipMessage]);

  const handleReverse = () => {
    setTransitionDuration("2s");
    setisMoved(false);
    setData("");
    setButtonLabel("→");
    setTooltipMessage("");
    setsDisabled(true);
  };

  const handleButton = async () => {
    if (buttonLabel === "→") {
      setisMoved(true);
      const startTime = Date.now();
      try {
        const postResponse = await api.post("/quack_link", {
          original_url: data,
        });
        const shortUrl = postResponse?.data?.short_url;

        const endTime = Date.now();
        const loadingTime = endTime - startTime;

        // Set a minimum transition duration, e.g., 2 seconds
        const minTransitionTime = 2000;
        const transitionTime = Math.max(loadingTime, minTransitionTime);

        setTransitionDuration(`${transitionTime / 1000}s`);

        // Delay setting the short URL in the input field to match the transition
        setTimeout(() => {
          setData(shortUrl);
          setButtonLabel("↻");
        }, transitionTime);

        setTooltipMessage("Quack Quack, link is ready!");
      } catch (error) {
        console.error(
          "There was an error shortening the URL:",
          error?.data?.error
        );
        setTooltipMessage("Oops, something went wrong.");
        setButtonLabel("↻");
      }
    } else {
      handleReverse();
    }
  };

  return (
    <div className="url-page">
      <div className="url">
        <input
          type="text"
          className="url-input"
          placeholder="Paste any URL here"
          value={data}
          onChange={(e) => {
            const value = e.target.value;
            setData(value);
            setsDisabled(value === ""); // Disable button if input is empty
          }}
        />
        <button
          className="url-shorten-button"
          disabled={isDisabled}
          onClick={handleButton}
        >
          {buttonLabel}
        </button>
      </div>
      <div className="duck-container">
        <div className="duck">
          <img
            id="duck"
            src="forwardduck.png"
            alt="Duck on Skateboard"
            className={isMoved ? "shrinking-duck" : ""}
            style={{
              width: isMoved ? "170px" : "180px",
              left: isMoved ? "80%" : "0",
              transition: `width ${transitionDuration} ease-in-out, left ${transitionDuration} ease-in-out`,
            }}
          />
        </div>
        {isTooltipVisible && (
          <div className="tooltip">
            <span>{tooltipMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default URLPage;
