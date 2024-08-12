import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LoaderProvider } from './context/Loading';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <LoaderProvider>
    <App />
  </LoaderProvider>
);
