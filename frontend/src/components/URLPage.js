import { useState, useRef, useCallback, useEffect } from "react";
import { createQuackLink } from "../axios";
import ShareButton from "./ShareButton";
import "../css/URLPage.css";

const HISTORY_CACHE_KEY = "quacklink_recent_history";
const MAX_HISTORY_ITEMS = 8;

function ShareIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3" />
    </svg>
  );
}

const DuckSVG = ({ size = 44 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse cx="22" cy="28" rx="13" ry="10" fill="#F5C518" />
    <circle cx="22" cy="16" r="8" fill="#F5C518" />
    <ellipse cx="26" cy="16" rx="4" ry="3" fill="#F0AA10" />
    <circle cx="25" cy="13" r="2" fill="#1A1A1A" />
    <circle cx="25.6" cy="12.4" r="0.6" fill="white" />
    <path d="M29 17 L35 16.5 L33 19 Z" fill="#E8840A" />
    <ellipse cx="16" cy="36" rx="4" ry="2.5" fill="#E8840A" />
    <ellipse cx="28" cy="36" rx="4" ry="2.5" fill="#E8840A" />
    <circle cx="14" cy="28" r="2" fill="#E8840A" opacity="0.5" />
  </svg>
);

function isValidUrl(str) {
  try {
    const url = new URL(str);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function HistoryShareButton({ item }) {
  const [open, setOpen] = useState(false);
  const shareRef = useRef(null);

  const shareText = `Check out this QuackLink: ${item.short}`;
  const encodedUrl = encodeURIComponent(item.short);
  const encodedText = encodeURIComponent(shareText);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareRef.current && !shareRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "QuackLink",
          text: "Check out this QuackLink:",
          url: item.short,
        });
        setOpen(false);
      } catch {
        // User cancelled share
      }
    } else {
      setOpen((value) => !value);
    }
  };

  const shareOptions = [
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodedText}`,
    },
    {
      label: "Email",
      href: `mailto:?subject=${encodeURIComponent(
        "Sharing a QuackLink",
      )}&body=${encodedText}`,
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: "Twitter / X",
      href: `https://twitter.com/intent/tweet?text=${encodedText}`,
    },
  ];

  return (
    <div className="ql-history-share-wrap" ref={shareRef}>
      <button
        type="button"
        className="ql-history-share"
        onClick={handleNativeShare}
        title="Share link"
      >
        <ShareIcon />
      </button>

      <button
        type="button"
        className="ql-history-share-arrow"
        onClick={() => setOpen((value) => !value)}
        title="Open share menu"
      >
        ▾
      </button>

      {open && (
        <div className="ql-history-share-menu">
          {shareOptions.map((option) => (
            <a
              key={option.label}
              href={option.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              {option.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function HistoryItem({ item }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(item.short);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  const handleRedirect = () => {
    window.open(item.short, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="ql-history-item">
      <span className="ql-history-short">{item.short}</span>
      <span className="ql-history-original">{item.original}</span>

      <div className="ql-history-actions">
        <button className="ql-history-copy" onClick={handleCopy} title="Copy">
          {copied ? "✓" : "⧉"}
        </button>

        <button
          className="ql-history-redirect"
          onClick={handleRedirect}
          title="Open link"
        >
          ↗
        </button>

        <HistoryShareButton item={item} />
      </div>
    </div>
  );
}

function getCachedHistory() {
  try {
    const cached = localStorage.getItem(HISTORY_CACHE_KEY);

    if (!cached) {
      return [];
    }

    const parsed = JSON.parse(cached);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed;
  } catch {
    return [];
  }
}

function saveHistoryToCache(history) {
  try {
    localStorage.setItem(HISTORY_CACHE_KEY, JSON.stringify(history));
  } catch {
    // Ignore localStorage errors
  }
}

function clearHistoryCache() {
  try {
    localStorage.removeItem(HISTORY_CACHE_KEY);
  } catch {
    // Ignore localStorage errors
  }
}

export default function URLPage() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDuckMoving, setIsDuckMoving] = useState(false);
  const [bubbleText, setBubbleText] = useState("Quack quack!");
  const [shortUrl, setShortUrl] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [error, setError] = useState("");
  const [copyMsg, setCopyMsg] = useState("");
  const [history, setHistory] = useState(() => getCachedHistory());
  const [totalSaved, setTotalSaved] = useState(0);

  const transitionRef = useRef("2s");

  const resetDuck = useCallback(() => {
    transitionRef.current = "0.35s";
    setIsDuckMoving(false);
    setBubbleText("Quack quack!");
  }, []);

  const addToHistory = useCallback((newItem) => {
    setHistory((currentHistory) => {
      const withoutDuplicate = currentHistory.filter(
        (item) =>
          item.short !== newItem.short && item.original !== newItem.original,
      );

      const updatedHistory = [newItem, ...withoutDuplicate].slice(
        0,
        MAX_HISTORY_ITEMS,
      );

      saveHistoryToCache(updatedHistory);

      return updatedHistory;
    });
  }, []);

  const handleShorten = useCallback(async () => {
    const url = inputValue.trim();

    if (!url || isLoading) return;

    if (!isValidUrl(url)) {
      setError("Please enter a valid URL starting with https:// or http://");
      return;
    }

    setIsLoading(true);
    setError("");
    setCopyMsg("");
    setShowResult(false);
    setShowReset(false);
    setShortUrl("");
    setBubbleText("Quack quack!");
    transitionRef.current = "2s";

    const minDuration = 2000;
    const start = Date.now();

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsDuckMoving(true);
      });
    });

    try {
      const data = await createQuackLink(url);
      const result = data.short_url;

      const elapsed = Date.now() - start;
      const wait = Math.max(0, minDuration - elapsed);

      setTimeout(() => {
        setBubbleText("Quack quack, link is ready! 🎉");
        setShortUrl(result);
        setShowResult(true);
        setShowReset(true);

        const saved = url.length - result.length;
        if (saved > 0) {
          setTotalSaved((value) => value + saved);
        }

        addToHistory({
          short: result,
          original: url,
          createdAt: new Date().toISOString(),
        });

        setIsLoading(false);
      }, wait + 250);
    } catch (err) {
      const elapsed = Date.now() - start;
      const wait = Math.max(0, minDuration - elapsed);

      setTimeout(() => {
        resetDuck();
        setError(
          err?.response?.data?.error ||
            "Oops, something went wrong. Please try again.",
        );
        setIsLoading(false);
      }, wait);
    }
  }, [inputValue, isLoading, resetDuck, addToHistory]);

  const handleReset = useCallback(() => {
    setInputValue("");
    setShowResult(false);
    setShowReset(false);
    setError("");
    setCopyMsg("");
    setShortUrl("");
    setIsLoading(false);
    resetDuck();
  }, [resetDuck]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopyMsg("✓ Copied to clipboard!");
    } catch {
      const input = document.createElement("input");
      input.value = shortUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopyMsg("✓ Copied to clipboard!");
    }

    setTimeout(() => setCopyMsg(""), 2000);
  }, [shortUrl]);

  const scrollToStart = () => {
    document.getElementById("start")?.scrollIntoView({ behavior: "smooth" });
  };

  const isDisabled = inputValue.trim() === "" || isLoading;

  return (
    <div className="ql-page">
      <section className="ql-hero" id="start">
        <div className="ql-badge">
          <DuckSVG size={14} />
          Free forever · No sign-up needed
        </div>

        <h1>
          The URL shortener
          <br />
          <span>that goes quack</span> 🦆
        </h1>

        <p className="ql-subtitle">
          Paste any long URL and get a clean, shareable short link instantly. No
          account. No fuss. Just quack.
        </p>

        <div className="ql-card">
          <div className="ql-input-row">
            <input
              type="text"
              className="ql-url-input"
              placeholder="https://your-very-long-url.com/paste/it/here..."
              value={inputValue}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              onChange={(event) => {
                setInputValue(event.target.value);
                setError("");
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !isDisabled) {
                  handleShorten();
                }
              }}
            />

            <button
              className="ql-btn ql-btn-shorten"
              disabled={isDisabled}
              onClick={handleShorten}
            >
              {isLoading ? "Quacking..." : "Quack it!"}
            </button>
          </div>

          {(isLoading || showResult) && (
            <div className="ql-track-area">
              <div className="ql-track">
                <div
                  className="ql-track-fill"
                  style={{
                    width: isDuckMoving ? "100%" : "0%",
                    transition: `width ${transitionRef.current} ease-in-out`,
                  }}
                />
              </div>

              <div
                className={`ql-duck-wrap${isDuckMoving ? " moving" : ""}`}
                style={{
                  transition: `left ${transitionRef.current} ease-in-out`,
                }}
              >
                <div className={`ql-bubble${isDuckMoving ? " show" : ""}`}>
                  {bubbleText}
                </div>
                <DuckSVG />
              </div>
            </div>
          )}

          {showResult && (
            <div className="ql-result-box">
              <div className="ql-result-label">✓ Link shortened!</div>

              <div className="ql-result-row">
                <input
                  type="text"
                  className="ql-short-url"
                  value={shortUrl}
                  readOnly
                />

                <button
                  className="ql-icon-btn"
                  onClick={handleCopy}
                  title="Copy link"
                >
                  ⧉
                </button>

                <a
                  className="ql-icon-btn"
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open link"
                >
                  ↗
                </a>
                <ShareButton shortUrl={shortUrl} />
              </div>

              {copyMsg && <div className="ql-copy-feedback">{copyMsg}</div>}
            </div>
          )}

          {error && <div className="ql-error-box">⚠ {error}</div>}

          {showReset && (
            <div className="ql-reset-row">
              <button className="ql-reset-btn" onClick={handleReset}>
                ↺ Shorten another link
              </button>
            </div>
          )}
        </div>

        <div className="ql-trust">
          <span>✓ No sign-up</span>
          <span className="ql-dot">·</span>
          <span>✓ Free forever</span>
          <span className="ql-dot">·</span>
          <span>✓ No tracking</span>
        </div>

        {history.length > 0 && (
          <div className="ql-stats">
            <div className="ql-stat">
              <div className="ql-stat-num">{history.length}</div>
              <div className="ql-stat-label">Links today</div>
            </div>

            <div className="ql-divider" />

            <div className="ql-stat">
              <div className="ql-stat-num">∞</div>
              <div className="ql-stat-label">Happy ducks</div>
            </div>
          </div>
        )}

        {history.length > 0 && (
          <div className="ql-history">
            <div className="ql-history-head">
              <div className="ql-history-title">Recent links</div>

              <button
                type="button"
                className="ql-history-clear"
                onClick={() => {
                  setHistory([]);
                  clearHistoryCache();
                }}
              >
                Clear
              </button>
            </div>

            {history.map((item, index) => (
              <HistoryItem key={`${item.short}-${index}`} item={item} />
            ))}
          </div>
        )}
      </section>

      <section className="ql-band">
        <div className="ql-band-inner">
          <div>
            <div className="ql-band-num">2M+</div>
            <div className="ql-band-label">Links shortened</div>
          </div>
          <div>
            <div className="ql-band-num">180+</div>
            <div className="ql-band-label">Countries</div>
          </div>
          <div>
            <div className="ql-band-num">99.9%</div>
            <div className="ql-band-label">Uptime</div>
          </div>
          <div>
            <div className="ql-band-num">0ms</div>
            <div className="ql-band-label">Extra tracking</div>
          </div>
        </div>
      </section>

      <section className="ql-features" id="features">
        <div className="ql-section-head">
          <h2>
            Everything you need.
            <br />
            Nothing you don't.
          </h2>
          <p>Built for speed, simplicity, and the occasional quack.</p>
        </div>

        <div className="ql-feature-grid">
          <div className="ql-feature-card">
            <div className="ql-feature-icon">⚡</div>
            <div className="ql-feature-title">Instant shortening</div>
            <div className="ql-feature-desc">
              Paste any URL and get a short link in under a second.
            </div>
          </div>

          <div className="ql-feature-card">
            <div className="ql-feature-icon">🔗</div>
            <div className="ql-feature-title">Clean short links</div>
            <div className="ql-feature-desc">
              Beautiful short links that you'd actually want to share.
            </div>
          </div>

          <div className="ql-feature-card">
            <div className="ql-feature-icon">📋</div>
            <div className="ql-feature-title">One-click copy</div>
            <div className="ql-feature-desc">
              Copy your short link instantly and share it anywhere.
            </div>
          </div>

          <div className="ql-feature-card">
            <div className="ql-feature-icon">📱</div>
            <div className="ql-feature-title">Mobile friendly</div>
            <div className="ql-feature-desc">
              Shorten and open links smoothly on every screen size.
            </div>
          </div>

          <div className="ql-feature-card">
            <div className="ql-feature-icon">🕓</div>
            <div className="ql-feature-title">Session history</div>
            <div className="ql-feature-desc">
              Your recent shortened links stay handy while you work.
            </div>
          </div>

          <div className="ql-feature-card">
            <div className="ql-feature-icon">🦆</div>
            <div className="ql-feature-title">Duck-approved</div>
            <div className="ql-feature-desc">
              Our duck personally celebrates every shortened link.
            </div>
          </div>
        </div>
      </section>

      <section className="ql-cta">
        <div className="ql-cta-duck">
          <DuckSVG size={56} />
        </div>

        <h2>Ready to shorten your first link?</h2>
        <p>Scroll up and paste your URL. The duck is waiting.</p>

        <button className="ql-cta-btn" onClick={scrollToStart}>
          Get started free ↑
        </button>
      </section>
    </div>
  );
}
