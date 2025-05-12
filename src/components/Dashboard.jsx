import React, { useState, useRef, useEffect } from 'react';
import axios from "axios";

export const Dashboard = () => {
  let [post, setPost] = useState([]);
  let d = useRef(null);
  let n = useRef(null);

  const handleEffect = async () => {
    const response = await axios.get("http://localhost:3000/Post");
    setPost(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const send = await axios.post("http://localhost:3000/newPost", {
      name: n.current.value,
      description: d.current.value
    });
    n.current.value = "";
    d.current.value = "";
    handleEffect();
  }

  useEffect(() => {
    handleEffect();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Social Dashboard
          </h1>
          <p className="text-gray-400">Share your thoughts with the community</p>
        </div>

        {/* Post Form */}
        <div className="bg-gray-800 rounded-xl p-6 mb-10 shadow-lg border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-white">Create New Post</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              ref={n}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400 transition-all"
            />
            <input
              type="text"
              placeholder="Post Description"
              ref={d}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400 transition-all min-h-[100px]"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              Post Now
            </button>
          </form>
        </div>

        {/* Posts Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4 text-white">Recent Posts</h2>
          
          {post.length === 0 ? (
            <div className="bg-gray-800 rounded-xl p-6 text-center text-gray-400 border border-gray-700">
              No posts yet. Be the first to share!
            </div>
          ) : (
            post.map((item, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg group"
              >
                <p className="text-gray-200 mb-4 group-hover:text-white transition-colors">
                  {item.description}
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold mr-3">
                    {item.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    Posted by {item.name}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};