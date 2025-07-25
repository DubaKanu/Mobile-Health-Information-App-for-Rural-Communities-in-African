import React from 'react';
import { TimeSlot } from '../context/AppointmentContext';
interface TimeSlotPickerProps {
  timeSlots: TimeSlot[];
  selectedTime: string;
  onSelectTime: (time: string) => void;
}
const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  timeSlots,
  selectedTime,
  onSelectTime
}) => {
  if (timeSlots.length === 0) {
    return <div className="text-center py-4">
        <p className="text-gray-500">
          No available time slots for the selected date.
        </p>
        <p className="text-gray-500 text-sm mt-1">
          Please select another date or doctor.
        </p>
      </div>;
  }
  return <div className="grid grid-cols-3 gap-2 mt-2">
      {timeSlots.map(slot => <button key={slot.time} onClick={() => !slot.isBooked && onSelectTime(slot.time)} disabled={slot.isBooked} className={`py-2 px-4 rounded-md text-center transition-colors ${slot.isBooked ? 'bg-red-100 text-red-400 cursor-not-allowed' : selectedTime === slot.time ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
          {slot.time}
        </button>)}
    </div>;
};
export default TimeSlotPicker;