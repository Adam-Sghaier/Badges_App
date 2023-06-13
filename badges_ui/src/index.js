import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CookiesProvider } from 'react-cookie';
import { AuthContextProvider } from './context/AuthContext';
import { DarkModeContextProvider } from './context/darkModeContext';
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthContextProvider>
    <DarkModeContextProvider>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </DarkModeContextProvider>
  </AuthContextProvider>
);
