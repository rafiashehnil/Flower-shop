import { useState } from 'react';
import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Home from './components/Home'; 
import SignUp from './components/SignUp';
import Login from './components/Login';
import Navbar from './components/Navbar';





function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/navbar" element={<Navbar />} />

      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
