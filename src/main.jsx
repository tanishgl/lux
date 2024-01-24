import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { MatrixProvider } from "./providers/MatrixProvider.jsx";
import { AuthProvider } from "./providers/AuthProvider.jsx";
import { DbProvider } from "./providers/DbProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <MatrixProvider>
        <DbProvider>
          <App />
        </DbProvider>
      </MatrixProvider>
    </AuthProvider>
  </React.StrictMode>
);
