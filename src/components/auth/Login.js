import axios from 'axios';
import React, { useState } from 'react';
import config from '../../config.json'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    console.log(config.doamin)
    const handleLogin = async (e) =>{
        e.preventDefault();
        try{    
            const res = await axios.post(`${config?.doamin}/api/login`, {
                username:username,
                password:password
            });
            if (res.status){
                localStorage.setItem('access', res.data.access);
                localStorage.setItem('refresh', res.data.refresh);
                navigate('/admin/config')
            }
        }catch(error){
            console.log(error)
        }
    }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">Sign in to your account</h2>
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="Username" className="font-bold mb-4">Username</label>
              <input
                id="Username"
                name="Username"
                type="text"
                autoComplete="Username"
                required
                onChange={(e)=> setUsername(e.target.value)}
                className="relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Username address"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="font-bold mb-4">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                onChange={(e)=> setPassword(e.target.value)}
                className="relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
