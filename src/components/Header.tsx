import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, LogOutIcon } from 'lucide-react';
import Navigation from './Navigation';
import { useAuth } from '../context/AuthContext';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    isAuthenticated,
    user,
    logout
  } = useAuth();
  return <header className="bg-green-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">QuickCare</span>
          <span className="text-sm">Sierra Leone</span>
        </Link>
        {isAuthenticated && <>
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              <MenuIcon size={24} />
            </button>
            <div className="hidden md:flex items-center space-x-4">
              <nav className="mr-4">
                <Navigation />
              </nav>
              <div className="flex items-center">
                <span className="text-sm mr-2">
                  Hello, {user?.name?.split(' ')[0]}
                </span>
                <button onClick={logout} className="flex items-center text-white hover:text-green-200" aria-label="Log out">
                  <LogOutIcon size={18} />
                </button>
              </div>
            </div>
          </>}
      </div>
      {isAuthenticated && isMenuOpen && <div className="md:hidden px-4 pb-4">
          <Navigation mobile={true} closeMenu={() => setIsMenuOpen(false)} />
          <div className="mt-3 pt-3 border-t border-green-500 flex justify-between items-center">
            <span className="text-sm">Hello, {user?.name?.split(' ')[0]}</span>
            <button onClick={logout} className="flex items-center space-x-1 text-white hover:text-green-200" aria-label="Log out">
              <LogOutIcon size={18} />
              <span>Log out</span>
            </button>
          </div>
        </div>}
    </header>;
};
export default Header;