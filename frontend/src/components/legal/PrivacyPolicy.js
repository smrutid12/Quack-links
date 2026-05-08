import React from "react";
import { Link } from "react-router-dom";
import "../../css/LegalPage.css";

export default function PrivacyPolicy() {
  return (
    <section className="ql-legal-page">
      <div className="ql-legal-shell">
        <Link to="/" className="ql-legal-back">
          ← Back to QuackLink
        </Link>

        <div className="ql-legal-card">
          <p className="ql-legal-eyebrow">Legal</p>
          <h1>Privacy Policy</h1>
          <p className="ql-legal-updated">Last updated: January 2026</p>

          <p>
            QuackLink is a personal URL shortener project created by Smruti
            Dash. This Privacy Policy explains how QuackLink collects, uses, and
            stores information when you use the service.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            When you shorten a URL, QuackLink stores the original URL, the
            generated short URL identifier, and the status of the shortened link.
            This is required for the service to redirect short links to their
            original destination.
          </p>

          <h2>2. No Account Required</h2>
          <p>
            QuackLink does not currently require users to create an account,
            log in, or provide personal profile information to shorten links.
          </p>

          <h2>3. Link History and Cookies</h2>
          <p>
            QuackLink may use browser storage or cookies in the future to save
            your recent link history on your device. This helps you quickly view
            links you recently shortened. This feature is intended for convenience
            and may not be available in all versions of the app.
          </p>

          <h2>4. Analytics</h2>
          <p>
            QuackLink may use Vercel Analytics to understand basic usage,
            performance, and traffic patterns. Analytics data may include
            information such as page views, device type, browser type, country or
            region, and general usage activity. This helps improve the project
            and user experience.
          </p>

          <h2>5. How We Use Information</h2>
          <p>Information collected by QuackLink may be used to:</p>
          <ul>
            <li>Create and manage shortened URLs.</li>
            <li>Redirect short links to their original destination.</li>
            <li>Improve performance, reliability, and user experience.</li>
            <li>Prevent misuse, spam, abuse, or harmful activity.</li>
          </ul>

          <h2>6. Sharing Links to Other Platforms</h2>
          <p>
            QuackLink may allow users to copy or share shortened links to other
            platforms. Once a link is shared outside QuackLink, the handling of
            that link may be subject to the privacy policies and terms of those
            third-party platforms.
          </p>

          <h2>7. Third-Party Services</h2>
          <p>
            QuackLink may rely on third-party hosting, deployment, database,
            analytics, or infrastructure providers. These providers may process
            limited technical information necessary to operate the service.
          </p>

          <h2>8. Data Retention</h2>
          <p>
            Shortened URLs may be stored permanently unless they are removed by
            the project owner or deleted as part of maintenance, abuse prevention,
            or system updates.
          </p>

          <h2>9. User Responsibility</h2>
          <p>
            Users are responsible for the URLs they shorten and share.
            QuackLink should not be used to shorten links that are illegal,
            harmful, misleading, abusive, malicious, or used for spam,
            phishing, malware, or other unsafe activity.
          </p>

          <h2>10. Contact</h2>
          <p>
            For privacy-related questions, you can contact:
            <br />
            <a href="mailto:smrutid12@gmail.com">smrutid12@gmail.com</a>
          </p>

          <p className="ql-legal-note">
            This Privacy Policy is written for a personal project and is not
            formal legal advice.
          </p>
        </div>
      </div>
    </section>
  );
}