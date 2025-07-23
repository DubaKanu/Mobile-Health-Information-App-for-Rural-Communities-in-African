import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneIcon } from 'lucide-react';
const EmergencyButton = () => {
  return <div className="fixed bottom-4 right-4 z-50">
      <Link to="/emergency" className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold rounded-full w-16 h-16 shadow-lg" aria-label="Emergency assistance">
        <PhoneIcon size={28} />
      </Link>
    </div>;
};
export default EmergencyButton;