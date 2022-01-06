import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import Builder from './components/Builder';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='build' element={<Builder />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
