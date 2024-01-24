import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { MatrixProvider } from "./providers/MatrixProvider.jsx";
import { AuthProvider } from "./providers/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <MatrixProvider>
        <App />
      </MatrixProvider>
    </AuthProvider>
  </React.StrictMode>
);
