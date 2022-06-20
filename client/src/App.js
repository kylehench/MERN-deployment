import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './views/Main';
import Pet from './views/Pet';
import PetUpdate from './components/PetUpdate';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route element={<Main />} path="/" />
        <Route element={<Main />} path="/home" />
        <Route element={<Pet />} path="/:id" />
        <Route element={<PetUpdate />} path="pets/edit/:id" />
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;