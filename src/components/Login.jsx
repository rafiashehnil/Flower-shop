import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../config/Config';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', email);
      navigate('/home'); // Route to the home page upon successful login
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen flex items-center justify-center">
      <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-4xl p-4">
        <div className="text-center lg:text-left lg:w-1/2">
          <h1 className="text-5xl font-bold">Welcome to Rafia's Flower Shop!</h1>
          <p className="py-6">
            <em>Login Now to Access Your Account!</em> We’re thrilled to see you again! Please enter your email and password to sign in and continue shopping with us.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Login
              </button>
            </div>
            <div className="form-control mt-4 text-center">
              <span className="label-text-alt">Don't have an account?</span>
              <Link to="/signup" className="label-text-alt link link-hover text-blue-500">Register here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
