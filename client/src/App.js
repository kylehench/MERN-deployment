import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './views/Main';
import Pet from './views/Pet';
import PetUpdate from './views/PetUpdate';
import PetCreate from './views/PetCreate';
import io from 'socket.io-client';


function App() {
  const [socket] = useState(() => io(':80'))
  // const [socket] = useState(() => io(':8000'))
  
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route element={<Main socket={socket} />} path="/" />
        <Route element={<PetCreate />} path="pets/new" />
        <Route element={<Pet socket={socket} />} path="/pets/:id" />
        <Route element={<PetUpdate socket={socket} />} path="pets/:id/edit" />
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;