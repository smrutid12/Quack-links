import React, { useEffect, useRef, useState } from "react";
import "../css/ShareButton.css";

export default function ShareButton({ shortUrl }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const shareText = "Check out this QuackLink:";
  const encodedUrl = encodeURIComponent(shortUrl);
  const encodedText = encodeURIComponent(`${shareText} ${shortUrl}`);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleNativeShare = async () => {
    if (!shortUrl) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "QuackLink",
          text: shareText,
          url: shortUrl,
        });
        setOpen(false);
      } catch {
        // User cancelled native share
      }
    } else {
      setOpen((value) => !value);
    }
  };

  const shareOptions = [
    {
      label: "WhatsApp",
      icon: "🟢",
      href: `https://wa.me/?text=${encodedText}`,
    },
    {
      label: "Email",
      icon: "✉️",
      href: `mailto:?subject=${encodeURIComponent(
        "Sharing a QuackLink",
      )}&body=${encodedText}`,
    },
    {
      label: "Facebook",
      icon: "🔵",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: "Twitter / X",
      icon: "𝕏",
      href: `https://twitter.com/intent/tweet?text=${encodedText}`,
    },
    {
      label: "LinkedIn",
      icon: "in",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
  ];

  return (
    <div className="ql-share-wrap" ref={menuRef}>
      <button
        type="button"
        className="ql-share-main-btn"
        onClick={handleNativeShare}
        disabled={!shortUrl}
      >
        <span className="ql-share-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-share"
            viewBox="0 0 16 16"
          >
            <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3" />
          </svg>
        </span>
        Share
      </button>

      {!navigator.share && (
        <button
          type="button"
          className="ql-share-arrow-btn"
          onClick={() => setOpen((value) => !value)}
          disabled={!shortUrl}
          aria-label="Open share menu"
        >
          ▾
        </button>
      )}

      {open && (
        <div className="ql-share-menu">
          {shareOptions.map((option) => (
            <a
              key={option.label}
              className="ql-share-menu-item"
              href={option.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              <span className="ql-share-menu-icon">{option.icon}</span>
              <span>{option.label}</span>
            </a>
          ))}
        </div>
      )}

      {navigator.share && (
        <button
          type="button"
          className="ql-share-arrow-btn"
          onClick={() => setOpen((value) => !value)}
          disabled={!shortUrl}
          aria-label="Open share menu"
        >
          ▾
        </button>
      )}

      {open && navigator.share && (
        <div className="ql-share-menu">
          {shareOptions.map((option) => (
            <a
              key={option.label}
              className="ql-share-menu-item"
              href={option.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              <span className="ql-share-menu-icon">{option.icon}</span>
              <span>{option.label}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
