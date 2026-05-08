import React from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import URLPage from "./components/URLPage";
import RedirectComponent from "./components/Redirect";
import NotFound from "./components/NotFound";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <main className="App-main">
          <Routes>
            <Route path="/" element={<URLPage />} />
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