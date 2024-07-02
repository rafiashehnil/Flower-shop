import React from "react";
import Navbar from "./Navbar";
import Products from "./Products";
import Hero from "./Hero";
import Footer from "./Footer";


const Home = () => {
  return (
    <div>
   <Navbar/>
   <Hero/>
   <Products/>
   <Footer/>
    </div>
    
  );
};

export default Home;
