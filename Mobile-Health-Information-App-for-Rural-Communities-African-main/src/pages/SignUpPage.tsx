import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
const SignUpPage = () => {
  const {
    register
  } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phoneNumber: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    address: '',
    phoneNumber: ''
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      address: '',
      phoneNumber: ''
    };
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
      valid = false;
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
      valid = false;
    } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      register(formData);
    }
  };
  return <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-600">QuickCare</h1>
          <p className="text-gray-600">Create your account to get started</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon size={18} className="text-gray-400" />
                </div>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={`w-full pl-10 pr-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500`} placeholder="Enter your full name" />
              </div>
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPinIcon size={18} className="text-gray-400" />
                </div>
                <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className={`w-full pl-10 pr-3 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500`} placeholder="Enter your address" />
              </div>
              {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <PhoneIcon size={18} className="text-gray-400" />
                </div>
                <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className={`w-full pl-10 pr-3 py-2 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500`} placeholder="Enter your phone number" />
              </div>
              {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">
                  {errors.phoneNumber}
                </p>}
            </div>
            <button type="submit" className="w-full bg-green-600 text-white py-2 px-4 rounded-md font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Sign Up
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-green-600 hover:text-green-500 font-medium">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>;
};
export default SignUpPage;