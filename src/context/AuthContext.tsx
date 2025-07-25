import React, { useEffect, useState, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
type User = {
  name: string;
  address: string;
  phoneNumber: string;
};
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  register: (user: User) => void;
  login: (phoneNumber: string) => boolean;
  logout: () => void;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);
  // Register a new user
  const register = (newUser: User) => {
    // Store users in localStorage (in a real app, this would be a backend API call)
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    // Check if phone number already exists
    const userExists = users.some((u: User) => u.phoneNumber === newUser.phoneNumber);
    if (userExists) {
      alert('A user with this phone number already exists');
      return;
    }
    // Add new user to the list
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    // Redirect to login
    navigate('/login');
  };
  // Login with phone number
  const login = (phoneNumber: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: User) => u.phoneNumber === phoneNumber);
    if (foundUser) {
      setUser(foundUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };
  // Logout
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    navigate('/login');
  };
  return <AuthContext.Provider value={{
    user,
    isAuthenticated,
    register,
    login,
    logout
  }}>
      {children}
    </AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};