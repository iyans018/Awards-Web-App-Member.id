import React from 'react';
import { Routes, Route  } from 'react-router-dom'

import Welcome from "./Pages/Welcome";
import Home from './Pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
