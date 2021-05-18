import dotenv from 'dotenv';
import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import { RecoilRoot } from 'recoil';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './styles/index.scss';

dotenv.config();

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Router>
        <HelmetProvider>
          <ToastProvider
            placement="bottom-center"
            autoDismiss
            autoDismissTimeout={5000}
          >
            <App />
          </ToastProvider>
        </HelmetProvider>
      </Router>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
