import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PhoneIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
const LoginPage = () => {
  const {
    login
  } = useAuth();
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
    setError(''); // Clear error when user types
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) {
      setError('Phone number is required');
      return;
    }
    const success = login(phoneNumber);
    if (success) {
      navigate('/');
    } else {
      setError('No account found with this phone number');
    }
  };
  return <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-600">QuickCare</h1>
          <p className="text-gray-600">Login to access health resources</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <PhoneIcon size={18} className="text-gray-400" />
                </div>
                <input type="tel" id="phoneNumber" value={phoneNumber} onChange={handleChange} className={`w-full pl-10 pr-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500`} placeholder="Enter your phone number" />
              </div>
              {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            </div>
            <button type="submit" className="w-full bg-green-600 text-white py-2 px-4 rounded-md font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Log In
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-green-600 hover:text-green-500 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>;
};
export default LoginPage;