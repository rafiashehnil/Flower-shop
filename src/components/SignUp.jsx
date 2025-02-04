import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../config/Config'; // Import db from your config file
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });

      // Add user data to Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        uid: userCredential.user.uid,
        name,
        email,
      });

      console.log('User signed up:', email);

      // Clear form fields after submission
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError('');
      setSuccessMessage('Signup successful! You can now log in.');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Email already in use. Please use a different email.');
      } else {
        setError(error.message);
      }
      setSuccessMessage('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="container mx-auto max-w-md bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-4 text-center text-white">Sign Up</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col text-left">
            <label htmlFor="name" className="text-sm font-medium text-gray-200">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="form-control mt-1 w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col text-left">
            <label htmlFor="email" className="text-sm font-medium text-gray-200">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="form-control mt-1 w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col text-left">
            <label htmlFor="password" className="text-sm font-medium text-gray-200">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control mt-1 w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col text-left">
            <label htmlFor="confirm-password" className="text-sm font-medium text-gray-200">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              className="form-control mt-1 w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="text-left">
            <button
              type="submit"
              className="btn btn-primary w-full px-4 py-2 rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Sign Up
            </button>
          </div>
          <div className="text-center mt-4">
            <span className="text-sm text-gray-400">Already have an account? </span>
            <Link to="/login" className="text-sm text-blue-400 hover:underline">
              Login Here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;


