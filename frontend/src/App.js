import React, { useState } from 'react';
import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import URLPage from './components/URLPage'

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Header/>
        <URLPage/>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
