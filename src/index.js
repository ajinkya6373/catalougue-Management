import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ProductContextProvider } from "./context/productContext"
ReactDOM.render(
  <React.StrictMode>
    <ProductContextProvider>
      <App />
    </ProductContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

