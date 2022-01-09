import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import Welcome from './components/Welcome';
import Builder from './components/Builder';
import Retriever from './components/Retriever';
import Error from './components/Error';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Welcome />} />
        <Route path='build' element={<Builder />} />
        <Route path='show' element={<Retriever />} />
        <Route path='oops' element={<Error />}></Route>
        <Route path='*' element={<Error />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
