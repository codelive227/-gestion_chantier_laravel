import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setEmail('');
    setPassword('')

    try {
      const response = await axios.post(
        '/api/login',
        { email, password },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (response.data?.errors) {
        setError("Email ou mot de passe incorrect");
      } else {
        setSuccess("Connexion réussie !");
        
        // ✅ Stocker token et user dans localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // ✅ Redirection vers le dashboard
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Connexion</h2>

        {error && (
          <div className="flex items-center p-3 text-sm text-red-700 bg-red-100 border border-red-300 rounded">
            <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-11.707a1 1 0 00-1.414 0L8 8.586 6.707 7.293a1 1 0 00-1.414 1.414L6.586 10l-1.293 1.293a1 1 0 101.414 1.414L8 11.414l1.293 1.293a1 1 0 001.414-1.414L9.414 10l1.293-1.293a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        {success && (
          <div className="flex items-center p-3 text-sm text-green-700 bg-green-100 border border-green-300 rounded">
            <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 10-1.414 1.414L9 13.414l4.707-4.707z" clipRule="evenodd" />
            </svg>
            {success}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
              Adresse Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
            />
          </div>

          <button
            type="submit"
            className="bg-[#0F1C2E] hover:bg-[#4DA6FF] text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-colors duration-300 w-full"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
