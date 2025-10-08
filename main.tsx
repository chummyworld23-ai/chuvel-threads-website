import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import App from "./src/App";  // <-- Correct relative path
import './src/index.css';


const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
    <Toaster
      position="bottom-right"
      richColors
      closeButton
    />
  </StrictMode>
);
