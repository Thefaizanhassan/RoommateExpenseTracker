import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Include your CSS file here
import App from './App'; // Import the App component

// Create the root element and render the App component into it
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
