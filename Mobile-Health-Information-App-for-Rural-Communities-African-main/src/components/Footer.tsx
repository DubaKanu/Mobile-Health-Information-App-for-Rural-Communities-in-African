import React from 'react';
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="bg-gray-800 text-white py-4 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {currentYear} QuickCare Sierra Leone. All rights reserved.
        </p>
        <p className="text-xs mt-1">
          Providing accessible health information to rural communities.
        </p>
      </div>
    </footer>;
};
export default Footer;