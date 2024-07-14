import React, { useState, useEffect } from 'react';
import { auth } from '../config/Config';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          setUser(currentUser);
        } else {
          setUser(null); 
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src="https://img.freepik.com/free-photo/portrait-young-business-woman-with-glasses-3d-illustration_1142-40629.jpg?t=st=1720937994~exp=1720941594~hmac=24b38e13152eb183773fad5499a9f8eb16bb57a96b9cf4ecc5004a423425a432&w=740"
          className="max-w-sm rounded-lg shadow-2xl"
          alt="Profile"
        />
        <div className="text-white">
          <h1 className="text-5xl font-bold">Profile Information</h1>
          <div className="mx-auto max-w-2xl px-4 py-8">
            {user ? (
              <div className="shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-white bg-opacity-10">
                <div className="mb-4">
                  <label className="block text-white text-sm font-bold mb-2">
                    Name:
                  </label>
                  <p className="text-white">{user.displayName}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-white text-sm font-bold mb-2">
                    Email:
                  </label>
                  <p className="text-white">{user.email}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-white text-sm font-bold mb-2">
                    Phone:
                  </label>
                  <p className="text-white">{user.phone}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-white text-sm font-bold mb-2">
                    Address:
                  </label>
                  <p className="text-white">{user.address}</p>
                </div>
              </div>
            ) : (
              <p className="text-center text-white">Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
