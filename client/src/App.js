import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './views/Main';
import Product from './views/Product';
import Update from './components/Update';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route element={<Main />} path="" />
        <Route element={<Main />} path="/home" />
        <Route element={<Product />} path="/:id" />
        <Route element={<Update />} path="products/edit/:id" />
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
