import React from 'react';

const Hero = () => {
  return (
    <div
      className="hero min-h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage: "url(https://images.pexels.com/photos/4086125/pexels-photo-4086125.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load)",
      }}
    >
      <div className="hero-overlay bg-black bg-opacity-60 w-full h-full"></div>
      <div className="hero-content text-neutral-content text-center w-full p-4 sm:p-8 md:p-16">
        <div className="max-w-full mx-auto"> {/* Changed max-w-md to max-w-full */}
          <h1 className="mb-5 text-3xl sm:text-4xl md:text-5xl font-bold">Welcome to Rafia's Flower Shop!</h1>
          <p className="mb-5 text-sm sm:text-base md:text-lg">
            Discover a delightful array of fresh blooms and floral arrangements perfect for every occasion. Whether it's a romantic gesture, a heartfelt apology, or a joyful celebration, our handpicked flowers are sure to convey your sentiments with elegance.
          </p>
          <button className="btn bg-green-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
