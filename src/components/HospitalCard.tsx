import React from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, PhoneIcon, ArrowRightIcon } from 'lucide-react';
import { Hospital } from '../context/AppointmentContext';
interface HospitalCardProps {
  hospital: Hospital;
}
const HospitalCard: React.FC<HospitalCardProps> = ({
  hospital
}) => {
  return <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img src={hospital.image} alt={hospital.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {hospital.name}
        </h3>
        <div className="flex items-start mb-2">
          <MapPinIcon size={18} className="text-green-600 mt-1 mr-2 flex-shrink-0" />
          <p className="text-gray-600">{hospital.location}</p>
        </div>
        <div className="flex items-start mb-3">
          <PhoneIcon size={18} className="text-green-600 mt-1 mr-2 flex-shrink-0" />
          <p className="text-gray-600">{hospital.phone}</p>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {hospital.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {hospital.departments.length} departments
          </span>
          <Link to={`/hospitals/${hospital.id}`} className="flex items-center text-green-600 font-medium hover:text-green-700">
            View Details
            <ArrowRightIcon size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>;
};
export default HospitalCard;