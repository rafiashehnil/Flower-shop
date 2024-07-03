import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/Config'; // Assuming this is your Firebase auth instance

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Optional: Loading state for better user experience

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          setUser(currentUser);
        } else {
          setUser(null); // Clear user if no authenticated user found
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUser(null); // Set user to null on error
      } finally {
        setLoading(false); // Set loading state to false regardless of success or failure
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Optional: Show loading indicator while fetching user data
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-semibold mb-4">Profile Information</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {user ? (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
              <span className="text-gray-900">{user.displayName}</span>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
              <span className="text-gray-900">{user.email}</span>
            </div>
            {/* Add additional fields as needed (address, phone, etc.) */}
          </>
        ) : (
          <p>No user data found.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
