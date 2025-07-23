import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, ClockIcon } from 'lucide-react';
import { Doctor } from '../context/AppointmentContext';
interface DoctorCardProps {
  doctor: Doctor;
  hospitalId: string;
  departmentId: string;
}
const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
  hospitalId,
  departmentId
}) => {
  // Format working days for display
  const formatWorkingDays = (days: string[]): string => {
    if (days.length === 7) return 'Every day';
    if (days.length > 3) {
      return `${days.slice(0, 3).join(', ')} and more`;
    }
    return days.join(', ');
  };
  return <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{doctor.name}</h3>
        <p className="text-green-600 font-medium mb-3">
          {doctor.specialization}
        </p>
        <div className="space-y-2 mb-4">
          <div className="flex items-start">
            <CalendarIcon size={18} className="text-gray-500 mt-1 mr-2 flex-shrink-0" />
            <p className="text-gray-600">
              {formatWorkingDays(doctor.availability.days)}
            </p>
          </div>
          <div className="flex items-start">
            <ClockIcon size={18} className="text-gray-500 mt-1 mr-2 flex-shrink-0" />
            <p className="text-gray-600">
              {doctor.availability.startTime} - {doctor.availability.endTime}
            </p>
          </div>
        </div>
        <Link to={`/book-appointment/${hospitalId}/${departmentId}/${doctor.id}`} className="block w-full bg-green-600 text-white text-center py-2 px-4 rounded-md font-medium hover:bg-green-700 transition-colors">
          Book Appointment
        </Link>
      </div>
    </div>;
};
export default DoctorCard;