import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, ClockIcon, BuildingIcon, UserIcon, CheckIcon, XIcon, ClockIcon as PendingIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { useAppointments, Appointment } from '../context/AppointmentContext';
const AppointmentsPage = () => {
  const {
    userAppointments,
    getHospitalById,
    getDoctorById,
    cancelAppointment
  } = useAppointments();
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'completed'>('all');
  // Filter appointments based on status
  const filteredAppointments = userAppointments.filter(appointment => {
    if (filter === 'all') return true;
    return appointment.status === filter;
  });
  // Sort appointments by date (most recent first)
  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.timeSlot}`);
    const dateB = new Date(`${b.date} ${b.timeSlot}`);
    return dateB.getTime() - dateA.getTime();
  });
  // Format date for display
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  // Check if appointment is upcoming
  const isUpcoming = (appointment: Appointment): boolean => {
    const appointmentDate = new Date(`${appointment.date} ${appointment.timeSlot}`);
    const now = new Date();
    return appointmentDate > now;
  };
  return <div>
      <div className="bg-green-50 rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-green-800 mb-2 flex items-center">
          <CalendarIcon className="mr-2" size={24} />
          My Appointments
        </h1>
        <p className="text-gray-700">
          View and manage your upcoming and past appointments.
        </p>
      </div>
      <div className="flex justify-between items-center mb-6">
        {/* Filter buttons */}
        <div className="flex space-x-2">
          <button onClick={() => setFilter('all')} className={`py-1 px-3 rounded-md text-sm ${filter === 'all' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            All
          </button>
          <button onClick={() => setFilter('pending')} className={`py-1 px-3 rounded-md text-sm ${filter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            Pending
          </button>
          <button onClick={() => setFilter('approved')} className={`py-1 px-3 rounded-md text-sm ${filter === 'approved' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            Approved
          </button>
          <button onClick={() => setFilter('completed')} className={`py-1 px-3 rounded-md text-sm ${filter === 'completed' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            Completed
          </button>
        </div>
        {/* Book new appointment button */}
        <Link to="/hospitals" className="flex items-center text-green-600 hover:text-green-700">
          <PlusIcon size={16} className="mr-1" />
          Book New
        </Link>
      </div>
      {/* Appointments list */}
      {sortedAppointments.length > 0 ? <div className="space-y-4">
          {sortedAppointments.map(appointment => {
        const hospital = getHospitalById(appointment.hospitalId);
        const doctor = getDoctorById(appointment.doctorId);
        if (!hospital || !doctor) return null;
        return <div key={appointment.id} className={`bg-white rounded-lg shadow-md overflow-hidden border-l-4 ${appointment.status === 'pending' ? 'border-yellow-500' : appointment.status === 'approved' ? 'border-blue-500' : appointment.status === 'rejected' ? 'border-red-500' : 'border-gray-500'}`}>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center mb-1">
                        {appointment.status === 'pending' && <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded mr-2">
                            Pending
                          </span>}
                        {appointment.status === 'approved' && <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded mr-2">
                            Approved
                          </span>}
                        {appointment.status === 'rejected' && <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded mr-2">
                            Rejected
                          </span>}
                        {appointment.status === 'completed' && <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded mr-2">
                            Completed
                          </span>}
                        {isUpcoming(appointment) && <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
                            Upcoming
                          </span>}
                      </div>
                      <h3 className="font-semibold text-lg mb-2">
                        {doctor.name}
                      </h3>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-start">
                          <UserIcon size={16} className="text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                          <p className="text-gray-600">
                            {doctor.specialization}
                          </p>
                        </div>
                        <div className="flex items-start">
                          <BuildingIcon size={16} className="text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                          <p className="text-gray-600">{hospital.name}</p>
                        </div>
                        <div className="flex items-start">
                          <CalendarIcon size={16} className="text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                          <p className="text-gray-600">
                            {formatDate(appointment.date)}
                          </p>
                        </div>
                        <div className="flex items-start">
                          <ClockIcon size={16} className="text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                          <p className="text-gray-600">
                            {appointment.timeSlot}
                          </p>
                        </div>
                      </div>
                      {appointment.reason && <div className="mt-3 pt-3 border-t border-gray-100">
                          <p className="text-sm text-gray-500">
                            Reason for visit:
                          </p>
                          <p className="text-sm text-gray-700">
                            {appointment.reason}
                          </p>
                        </div>}
                    </div>
                    {/* Status icon */}
                    <div className="ml-4">
                      {appointment.status === 'pending' && <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                          <PendingIcon size={20} className="text-yellow-500" />
                        </div>}
                      {appointment.status === 'approved' && <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <CheckIcon size={20} className="text-blue-500" />
                        </div>}
                      {appointment.status === 'rejected' && <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                          <XIcon size={20} className="text-red-500" />
                        </div>}
                      {appointment.status === 'completed' && <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <CheckIcon size={20} className="text-gray-500" />
                        </div>}
                    </div>
                  </div>
                  {/* Actions */}
                  {(appointment.status === 'pending' || appointment.status === 'approved') && isUpcoming(appointment) && <div className="mt-4 flex justify-end">
                        <button onClick={() => cancelAppointment(appointment.id)} className="flex items-center text-red-600 hover:text-red-700 text-sm">
                          <TrashIcon size={14} className="mr-1" />
                          Cancel Appointment
                        </button>
                      </div>}
                </div>
              </div>;
      })}
        </div> : <div className="text-center py-8 bg-gray-50 rounded-lg">
          <CalendarIcon size={40} className="mx-auto text-gray-400 mb-2" />
          <p className="text-gray-500 mb-4">
            You don't have any appointments yet.
          </p>
          <Link to="/hospitals" className="bg-green-600 text-white py-2 px-4 rounded-md font-medium hover:bg-green-700 inline-flex items-center">
            <PlusIcon size={16} className="mr-1" />
            Book an Appointment
          </Link>
        </div>}
    </div>;
};
export default AppointmentsPage;