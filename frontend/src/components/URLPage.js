import { useState, useEffect } from "react";
import "../css/URLPage.css";

function URLPage() {
  const [isShrunk, setIsShrunk] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [transitionDuration, setTransitionDuration] = useState("0s");

  useEffect(() => {
    if (isShrunk) {
      const duckElement = document.getElementById("duck");
      const handleTransitionEnd = () => {
        if (duckElement.clientWidth === 170) {
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
  }, [isShrunk]);

  const simulateDataLoading = () => {
    return new Promise((resolve) => {
      const loadingTime = Math.random() * 4000 + 1000;
      setTimeout(() => resolve(loadingTime), loadingTime);
    });
  };

  const handleShorten = async () => {
    const loadingTime = await simulateDataLoading();
    setTransitionDuration(`${loadingTime / 1000}s`);
    setIsShrunk(true);
  };

  const handleReverse = () => {
    setTransitionDuration("2s");
    setIsShrunk(false);
  };

  const handleButton = () => {};

  return (
    <div className="url-page">
      <div className="duck-container">
        <div className="duck">
          <img
            id="duck"
            src="forwardduck.png"
            alt="Duck on Skateboard"
            className={isShrunk ? "shrinking-duck" : ""}
            style={{
              width: isShrunk ? "170px" : "180px",
              left: isShrunk ? "80%" : "0",
              transition: `width ${transitionDuration} ease-in-out, left ${transitionDuration} ease-in-out`,
            }}
          />
        </div>
        {isTooltipVisible && (
          <div className="tooltip">
            <span>Quack Quack, link is ready!</span>
          </div>
        )}
      </div>
      <div className="url">
        <input
          type="text"
          className="url-input"
          placeholder="Paste any URL here"
        />
        <button
          className="url-shorten-button"
          onClick={() => {
            handleShorten();
          }}
        >
          →
        </button>
      </div>
    </div>
  );
}

export default URLPage;
