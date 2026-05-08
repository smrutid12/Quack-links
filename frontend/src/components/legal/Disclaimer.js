import React from "react";
import { Link } from "react-router-dom";
import "../../css/LegalPage.css";

export default function Disclaimer() {
  return (
    <section className="ql-legal-page">
      <div className="ql-legal-shell">
        <Link to="/" className="ql-legal-back">
          ← Back to QuackLink
        </Link>

        <div className="ql-legal-card">
          <p className="ql-legal-eyebrow">Legal</p>
          <h1>Disclaimer</h1>
          <p className="ql-legal-updated">Last updated: January 2026</p>

          <p>
            QuackLink is a personal URL shortener project created by Smruti
            Dash. This Disclaimer explains important limitations about the use of
            the service.
          </p>

          <h2>1. General Information</h2>
          <p>
            QuackLink is provided for general use as a URL shortening tool. It is
            not intended to provide legal, security, business, or professional
            advice.
          </p>

          <h2>2. No Guarantee of Link Safety</h2>
          <p>
            QuackLink shortens URLs, but it does not guarantee that every
            destination link is safe, accurate, trustworthy, or appropriate.
            Users should be careful before opening shortened links, especially
            links received from unknown sources.
          </p>

          <h2>3. Third-Party Content</h2>
          <p>
            Shortened URLs may redirect to third-party websites. QuackLink does
            not own, control, review, or endorse those third-party websites and
            is not responsible for their content, policies, security, or
            behavior.
          </p>

          <h2>4. User-Generated Links</h2>
          <p>
            Links shortened through QuackLink are created by users. The user who
            shortens or shares a link is responsible for that link and how it is
            used.
          </p>

          <h2>5. Service Availability</h2>
          <p>
            QuackLink may experience downtime, bugs, database issues, deployment
            issues, or other technical problems. The service is provided without
            any guarantee of continuous availability or error-free operation.
          </p>

          <h2>6. No Liability</h2>
          <p>
            Smruti Dash and QuackLink are not liable for any loss, damage,
            security issue, data issue, or harm resulting from use of the
            service, shortened links, third-party websites, or misuse of the
            platform.
          </p>

          <h2>7. Abuse and Unsafe Links</h2>
          <p>
            QuackLink may remove, disable, or block links that appear to be
            harmful, abusive, misleading, illegal, spam-related, or unsafe.
          </p>

          <h2>8. Contact</h2>
          <p>
            To report an issue or unsafe link, contact:
            <br />
            <a href="mailto:smrutid12@gmail.com">smrutid12@gmail.com</a>
          </p>

          <p className="ql-legal-note">
            This Disclaimer is written for a personal project and is not formal
            legal advice.
          </p>
        </div>
      </div>
    </section>
  );
}