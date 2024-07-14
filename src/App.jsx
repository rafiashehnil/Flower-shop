import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login"; // Added
import AddFlower from "./components/AddFlower";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import Hero from './components/Hero';
import Shop from './components/Shop';
import AdminDashboard from './components/AdminDashboard';
import { auth, db } from './config/Config';
import { doc, getDoc } from 'firebase/firestore';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRoleDoc = await getDoc(doc(db, 'roles', user.uid));
        if (userRoleDoc.exists() && userRoleDoc.data().role === 'admin') {
          setIsAdmin(true);
        }
      }
      setLoading(false);
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        checkAdminStatus();
      } else {
        setIsAdmin(false);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addflower" element={isAdmin ? <AddFlower /> : <Navigate to="/" />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Hero />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;