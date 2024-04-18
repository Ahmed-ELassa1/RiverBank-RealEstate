import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { I18nextProvider } from 'react-i18next';
// import i18n from "./contexts/i18Configration";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./contexts/UserContext";
import i18n from "./contexts/i18Configration";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <UserProvider>
        <App />
      </UserProvider>
    </I18nextProvider>
  </React.StrictMode>
);

reportWebVitals();
