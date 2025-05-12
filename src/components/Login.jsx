import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  let e = useRef(null);
  let p = useRef(null);
  let [flag, setFlag] = useState(null);
  let [submit, Setsubmit] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    Setsubmit(true);
    try {
      const response = await axios.post("http://localhost:3000/Login", {
        email: e.current.value,
        password: p.current.value
      });

      if (response.data === true) {
        navigate("/dashboard");
      } else {
        alert("Invalid credentials. Please try again.");
      }
    } catch (err) {
      alert("Something went wrong, try again later");
    }

    e.current.value = "";
    p.current.value = "";
  };

  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-white">Login</h2>

        <input 
          type="email" 
          placeholder="Enter Your Email" 
          ref={e}
          className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input 
          type="password" 
          placeholder="Enter Your Password" 
          ref={p}
          className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button 
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300"
        >
          Log In
        </button>

        <button
          type="button"
          onClick={handleSignupRedirect}
          className="w-full py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-md transition duration-300"
        >
          Don’t have an account? Sign up
        </button>
      </form>
    </div>
  );
};
