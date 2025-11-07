import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext'; // <-- 1. Import AuthProvider

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AuthProvider> {/* <-- 2. Wrap the App component */}
        <App />
      </AuthProvider>
    </React.StrictMode>,
  );
} else {
  console.error("Fatal Error: The root element with ID 'root' was not found in index.html. React cannot mount the application.");
}