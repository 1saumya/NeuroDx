import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './home.jsx';  // Import the Home page
import App from './App.jsx';    // Import the Diagnostic Assistant
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />  {/* Home as Default */}
        <Route path="/predict" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
