import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App"; // <-- Removed .tsx extension
import "./index.css";

// Find the root element from index.html
const rootElement = document.getElementById("root");

// Ensure the root element exists before trying to render
if (rootElement) {
  // Create a React root and render the App component
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  // Log an error if the root element is missing
  console.error("Failed to find the root element with ID 'root'. React app cannot mount.");
}