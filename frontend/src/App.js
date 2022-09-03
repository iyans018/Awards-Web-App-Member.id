import React from 'react';
import { Routes, Route, Navigate  } from 'react-router-dom';

import Welcome from "./Pages/Welcome";
import Home from './Pages/Home';

function App() {
  const authToken = localStorage.getItem('authToken');

  return (
    <Routes>
      <Route path="/" element={authToken ? <Navigate to="/home" /> : <Welcome />} />
      <Route path="/home" element={!authToken ? <Navigate to="/" /> : <Home />} />
    </Routes>
  );
}

export default App;
