import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SocialMediaProvider } from "./Context/SocialMediaContext"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SocialMediaProvider>
      <App />
    </SocialMediaProvider>
  </React.StrictMode>
);

