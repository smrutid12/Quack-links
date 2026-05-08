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
        "Sharing a QuackLink"
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
        <span className="ql-share-icon">↗</span>
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