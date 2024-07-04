import { useState } from "react";
import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import AddProducts from "./components/AddProducts";
import Footer from "./components/Footer";
import Profile from "./components/Profile";


function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addproducts" element={<AddProducts />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" component={<Profile/>} />
      </Routes>
    </BrowserRouter>
  
  );
}

export default App;
