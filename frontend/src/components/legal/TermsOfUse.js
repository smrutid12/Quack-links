import React from "react";
import { Link } from "react-router-dom";
import "../../css/LegalPage.css";

export default function TermsOfUse() {
  return (
    <section className="ql-legal-page">
      <div className="ql-legal-shell">
        <Link to="/" className="ql-legal-back">
          ← Back to QuackLink
        </Link>

        <div className="ql-legal-card">
          <p className="ql-legal-eyebrow">Legal</p>
          <h1>Terms of Use</h1>
          <p className="ql-legal-updated">Last updated: January 2026</p>

          <p>
            These Terms of Use apply to your use of QuackLink, a personal URL
            shortener project created by Smruti Dash. By using QuackLink, you
            agree to these terms.
          </p>

          <h2>1. About QuackLink</h2>
          <p>
            QuackLink allows users to shorten long URLs into cleaner, shareable
            links. The project is available at{" "}
            <a href="https://quacklinks.com/" target="_blank" rel="noreferrer">
              https://quacklinks.com/
            </a>
            .
          </p>

          <h2>2. No Login Required</h2>
          <p>
            QuackLink does not currently require users to create an account or
            log in. You can shorten URLs without submitting personal account
            information.
          </p>

          <h2>3. User Responsibility</h2>
          <p>
            You are fully responsible for the links you shorten, copy, open, or
            share using QuackLink. You must not use QuackLink for any illegal,
            harmful, abusive, deceptive, or malicious purpose.
          </p>

          <h2>4. Prohibited Use</h2>
          <p>You agree not to use QuackLink to shorten or distribute links that:</p>
          <ul>
            <li>Contain malware, viruses, or harmful software.</li>
            <li>Are used for phishing, scams, spam, or fraud.</li>
            <li>Promote illegal, abusive, hateful, or harmful activity.</li>
            <li>Violate the rights, privacy, or security of others.</li>
            <li>Mislead users about the destination or purpose of a link.</li>
          </ul>

          <h2>5. Link Removal</h2>
          <p>
            QuackLink may remove, disable, or block any shortened URL at any time
            if it appears to be unsafe, abusive, illegal, misleading, or harmful
            to users or the service.
          </p>

          <h2>6. Availability</h2>
          <p>
            QuackLink is provided as a personal project. While efforts may be
            made to keep the service available and reliable, there is no
            guarantee that the service will always be available, error-free, or
            uninterrupted.
          </p>

          <h2>7. Third-Party Websites</h2>
          <p>
            Shortened links may redirect users to third-party websites.
            QuackLink does not control those websites and is not responsible for
            their content, privacy practices, security, or actions.
          </p>

          <h2>8. Analytics and Browser Storage</h2>
          <p>
            QuackLink may use Vercel Analytics to understand usage and
            performance. QuackLink may also use browser storage or cookies in the
            future to store recent link history for convenience.
          </p>

          <h2>9. Limitation of Liability</h2>
          <p>
            QuackLink is provided on an “as is” and “as available” basis.
            Smruti Dash and QuackLink are not responsible for losses, damages,
            security issues, or problems caused by shortened links, third-party
            websites, service interruptions, or misuse of the platform.
          </p>

          <h2>10. Changes to These Terms</h2>
          <p>
            These Terms of Use may be updated from time to time. Continued use
            of QuackLink after updates means you accept the revised terms.
          </p>

          <h2>11. Governing Law</h2>
          <p>
            These terms are governed by the applicable laws of the United Arab
            Emirates.
          </p>

          <h2>12. Contact</h2>
          <p>
            For questions about these terms, contact:
            <br />
            <a href="mailto:smrutid12@gmail.com">smrutid12@gmail.com</a>
          </p>

          <p className="ql-legal-note">
            These Terms of Use are written for a personal project and are not
            formal legal advice.
          </p>
        </div>
      </div>
    </section>
  );
}