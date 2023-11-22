import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated import
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import {Provider}  from 'react-redux'
import store from './redux/store/store';

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Provider store={store}>
  <App />
  </Provider>
   
  </BrowserRouter>
);
