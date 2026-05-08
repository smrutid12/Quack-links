import React from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import URLPage from "./components/URLPage";
import RedirectComponent from "./components/Redirect";
import NotFound from "./components/NotFound";
import PrivacyPolicy from "./components/legal/PrivacyPolicy";
import TermsOfUse from "./components/legal/TermsOfUse";
import Disclaimer from "./components/legal/Disclaimer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <main className="App-main">
          <Routes>
            <Route path="/" element={<URLPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfUse />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="/:short_id" element={<RedirectComponent />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;