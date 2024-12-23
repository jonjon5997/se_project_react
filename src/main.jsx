import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </StrictMode>
);
