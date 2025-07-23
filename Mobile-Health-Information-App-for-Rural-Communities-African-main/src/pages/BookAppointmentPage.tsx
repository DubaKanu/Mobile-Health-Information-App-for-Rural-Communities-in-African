import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CalendarIcon, ClockIcon, ArrowLeftIcon, CheckIcon, AlertCircleIcon } from 'lucide-react';
import { useAppointments } from '../context/AppointmentContext';
import TimeSlotPicker from '../components/TimeSlotPicker';
const BookAppointmentPage = () => {
  const {
    hospitalId,
    departmentId,
    doctorId
  } = useParams<{
    hospitalId: string;
    departmentId: string;
    doctorId: string;
  }>();
  const navigate = useNavigate();
  const {
    getHospitalById,
    getDoctorById,
    getAvailableTimeSlots,
    bookAppointment
  } = useAppointments();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'success' | 'error'>('idle');
  // Get hospital and doctor data
  const hospital = getHospitalById(hospitalId || '');
  const doctor = getDoctorById(doctorId || '');
  if (!hospital || !doctor) {
    return <div className="text-center py-8">
        <p className="text-gray-500">Hospital or doctor not found.</p>
        <Link to="/hospitals" className="text-green-600 hover:underline mt-2 inline-block">
          Back to hospitals
        </Link>
      </div>;
  }
  // Get available time slots for the selected date
  const timeSlots = selectedDate ? getAvailableTimeSlots(doctor.id, selectedDate) : [];
  // Format working days for display
  const formatWorkingDays = (days: string[]): string => {
    return days.join(', ');
  };
  // Get minimum date (today)
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];
  // Get maximum date (3 months from now)
  const maxDate = new Date(today.setMonth(today.getMonth() + 3)).toISOString().split('T')[0];
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      setBookingStatus('error');
      return;
    }
    bookAppointment({
      hospitalId: hospital.id,
      departmentId: departmentId || '',
      doctorId: doctor.id,
      date: selectedDate,
      timeSlot: selectedTime,
      reason
    });
    setBookingStatus('success');
    // Reset form
    setSelectedDate('');
    setSelectedTime('');
    setReason('');
    // Redirect to appointments page after a delay
    setTimeout(() => {
      navigate('/appointments');
    }, 2000);
  };
  return <div>
      <Link to={`/hospitals/${hospitalId}`} className="inline-flex items-center text-green-600 hover:text-green-700 mb-4">
        <ArrowLeftIcon size={16} className="mr-1" />
        Back to hospital
      </Link>
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="bg-green-50 p-4">
          <h1 className="text-xl font-bold text-green-800">Book Appointment</h1>
        </div>
        <div className="p-6">
          {/* Doctor info */}
          <div className="flex items-start mb-6">
            <div className="w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0">
              <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">{doctor.name}</h2>
              <p className="text-green-600">{doctor.specialization}</p>
              <p className="text-gray-600 text-sm mt-1">{hospital.name}</p>
            </div>
          </div>
          {/* Doctor availability */}
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <h3 className="font-medium mb-2">Availability</h3>
            <div className="space-y-2">
              <div className="flex items-start">
                <CalendarIcon size={18} className="text-gray-500 mt-1 mr-2 flex-shrink-0" />
                <p className="text-gray-600">
                  Works on {formatWorkingDays(doctor.availability.days)}
                </p>
              </div>
              <div className="flex items-start">
                <ClockIcon size={18} className="text-gray-500 mt-1 mr-2 flex-shrink-0" />
                <p className="text-gray-600">
                  From {doctor.availability.startTime} to{' '}
                  {doctor.availability.endTime}
                </p>
              </div>
            </div>
          </div>
          {/* Booking status message */}
          {bookingStatus === 'success' && <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
              <div className="flex">
                <CheckIcon className="text-green-500 mr-2" size={20} />
                <div>
                  <p className="font-medium text-green-800">
                    Appointment Booked Successfully!
                  </p>
                  <p className="text-green-700 text-sm">
                    Redirecting to your appointments...
                  </p>
                </div>
              </div>
            </div>}
          {bookingStatus === 'error' && <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <div className="flex">
                <AlertCircleIcon className="text-red-500 mr-2" size={20} />
                <div>
                  <p className="font-medium text-red-800">
                    Please select both date and time
                  </p>
                </div>
              </div>
            </div>}
          {/* Booking form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Date
                </label>
                <input type="date" id="date" min={minDate} max={maxDate} value={selectedDate} onChange={e => {
                setSelectedDate(e.target.value);
                setSelectedTime('');
              }} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500" required />
              </div>
              {selectedDate && <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Time
                  </label>
                  <TimeSlotPicker timeSlots={timeSlots} selectedTime={selectedTime} onSelectTime={setSelectedTime} />
                </div>}
              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for Visit (Optional)
                </label>
                <textarea id="reason" value={reason} onChange={e => setReason(e.target.value)} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="Briefly describe your symptoms or reason for the appointment"></textarea>
              </div>
              <button type="submit" className="w-full bg-green-600 text-white py-2 px-4 rounded-md font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Book Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>;
};
export default BookAppointmentPage;