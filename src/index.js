import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


import CookieConsent from "react-cookie-consent";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}>
    <PayPalScriptProvider
      options={{
        "client-id": process.env.REACT_APP_PAYPAL_AUTH_CLIENT_ID,
        "currency": "USD"
      }}
    >
      <React.StrictMode>
          <App />


          <CookieConsent style={{ background: "#232131" ,fontSize:"14px"}}
                          buttonStyle={{ color: "#4e503b", fontSize: "13px" ,fontWeight:"700"}}>
            Songcosmos.com utilizes cookies and third-party tools to guarantee the seamless operation of our platform and accomplish the specific goals laid out in our cookie policy.
            
          </CookieConsent>


      </React.StrictMode>
    </PayPalScriptProvider>
  </GoogleOAuthProvider>
);

reportWebVitals();
