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
          setUser(null); // Ensure user state is cleared if no user is authenticated
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h2>Profile Information</h2>
          <p>Name: {user.displayName}</p>
          <p>Email: {user.email}</p>
          {/* Add more fields as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
