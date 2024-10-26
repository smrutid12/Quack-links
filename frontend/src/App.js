// App.js
import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import URLPage from './components/URLPage';
import RedirectComponent from './components/Redirect'; // Import the RedirectComponent
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="App-header">
          <Header />
          
          {/* Routes Configuration */}
          <Routes>
            {/* Route for short URL redirection */}
            <Route path="/:short_id" element={<RedirectComponent />} />
            
            {/* Default Route */}
            <Route path="/" element={<URLPage />} />
          </Routes>
          
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
