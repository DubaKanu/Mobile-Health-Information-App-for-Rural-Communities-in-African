import React, { useEffect, useState, createContext, useContext } from 'react';
import { useAuth } from './AuthContext';
// Types
export type Department = {
  id: string;
  name: string;
};
export type Doctor = {
  id: string;
  name: string;
  departmentId: string;
  specialization: string;
  image: string;
  availability: {
    days: string[];
    startTime: string;
    endTime: string;
  };
};
export type Hospital = {
  id: string;
  name: string;
  location: string;
  image: string;
  description: string;
  phone: string;
  departments: Department[];
};
export type TimeSlot = {
  time: string;
  isBooked: boolean;
};
export type Appointment = {
  id: string;
  userId: string;
  hospitalId: string;
  departmentId: string;
  doctorId: string;
  date: string;
  timeSlot: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  reason: string;
  createdAt: string;
};
type AppointmentContextType = {
  hospitals: Hospital[];
  doctors: Doctor[];
  appointments: Appointment[];
  userAppointments: Appointment[];
  getHospitalById: (id: string) => Hospital | undefined;
  getDoctorById: (id: string) => Doctor | undefined;
  getDoctorsByDepartment: (hospitalId: string, departmentId: string) => Doctor[];
  getAvailableTimeSlots: (doctorId: string, date: string) => TimeSlot[];
  bookAppointment: (appointmentData: Omit<Appointment, 'id' | 'userId' | 'status' | 'createdAt'>) => void;
  cancelAppointment: (appointmentId: string) => void;
  getHospitalDepartments: (hospitalId: string) => Department[];
};
const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);
// Sample data for hospitals in Sierra Leone
const hospitalsData: Hospital[] = [{
  id: '1',
  name: 'Connaught Hospital',
  location: 'Freetown',
  image: 'https://images.unsplash.com/photo-1587351021759-3e566b3db4f1?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  description: 'The main referral hospital in Sierra Leone, offering a wide range of medical services.',
  phone: '+232 76 123456',
  departments: [{
    id: '101',
    name: 'General Medicine'
  }, {
    id: '102',
    name: 'Pediatrics'
  }, {
    id: '103',
    name: 'Obstetrics & Gynecology'
  }, {
    id: '104',
    name: 'Surgery'
  }, {
    id: '105',
    name: 'Dentistry'
  }]
}, {
  id: '2',
  name: 'Cottage Hospital',
  location: 'Bo',
  image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2553&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  description: 'A community hospital serving the Bo district with essential healthcare services.',
  phone: '+232 76 234567',
  departments: [{
    id: '201',
    name: 'General Medicine'
  }, {
    id: '202',
    name: 'Pediatrics'
  }, {
    id: '203',
    name: 'Maternity'
  }, {
    id: '204',
    name: 'Dentistry'
  }]
}, {
  id: '3',
  name: 'Makeni Government Hospital',
  location: 'Makeni',
  image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2573&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  description: 'The main hospital in Makeni, providing healthcare services to the northern region.',
  phone: '+232 76 345678',
  departments: [{
    id: '301',
    name: 'General Medicine'
  }, {
    id: '302',
    name: 'Pediatrics'
  }, {
    id: '303',
    name: 'Surgery'
  }]
}, {
  id: '4',
  name: 'Kenema Government Hospital',
  location: 'Kenema',
  image: 'https://images.unsplash.com/photo-1580281657702-257584239a42?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  description: 'A major hospital in the eastern region, serving Kenema and surrounding areas.',
  phone: '+232 76 456789',
  departments: [{
    id: '401',
    name: 'General Medicine'
  }, {
    id: '402',
    name: 'Pediatrics'
  }, {
    id: '403',
    name: 'Obstetrics & Gynecology'
  }]
}, {
  id: '5',
  name: 'Lumley Government Hospital',
  location: 'Freetown',
  image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  description: 'A government hospital in the western area of Freetown, providing primary healthcare services.',
  phone: '+232 76 567890',
  departments: [{
    id: '501',
    name: 'General Medicine'
  }, {
    id: '502',
    name: 'Pediatrics'
  }, {
    id: '503',
    name: 'Maternity'
  }]
}];
// Sample data for doctors
const doctorsData: Doctor[] = [{
  id: '1001',
  name: 'Dr. Aminata Conteh',
  departmentId: '101',
  specialization: 'Internal Medicine',
  image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  availability: {
    days: ['Monday', 'Wednesday', 'Friday'],
    startTime: '09:00',
    endTime: '15:00'
  }
}, {
  id: '1002',
  name: 'Dr. Mohamed Kamara',
  departmentId: '102',
  specialization: 'Pediatrician',
  image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  availability: {
    days: ['Monday', 'Tuesday', 'Thursday'],
    startTime: '08:00',
    endTime: '14:00'
  }
}, {
  id: '1003',
  name: 'Dr. Fatmata Sesay',
  departmentId: '103',
  specialization: 'Obstetrician',
  image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  availability: {
    days: ['Tuesday', 'Wednesday', 'Friday'],
    startTime: '10:00',
    endTime: '16:00'
  }
}, {
  id: '1004',
  name: 'Dr. Ibrahim Koroma',
  departmentId: '104',
  specialization: 'General Surgeon',
  image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  availability: {
    days: ['Monday', 'Thursday', 'Friday'],
    startTime: '09:00',
    endTime: '15:00'
  }
}, {
  id: '1005',
  name: 'Dr. Isatu Bangura',
  departmentId: '105',
  specialization: 'Dentist',
  image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  availability: {
    days: ['Tuesday', 'Wednesday', 'Thursday'],
    startTime: '08:30',
    endTime: '14:30'
  }
}, {
  id: '2001',
  name: 'Dr. Samuel Johnson',
  departmentId: '201',
  specialization: 'General Practitioner',
  image: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  availability: {
    days: ['Monday', 'Wednesday', 'Friday'],
    startTime: '09:00',
    endTime: '15:00'
  }
}, {
  id: '2002',
  name: 'Dr. Mariama Turay',
  departmentId: '202',
  specialization: 'Pediatrician',
  image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  availability: {
    days: ['Tuesday', 'Thursday', 'Friday'],
    startTime: '10:00',
    endTime: '16:00'
  }
}, {
  id: '2003',
  name: 'Dr. Abdul Kargbo',
  departmentId: '203',
  specialization: 'Obstetrician',
  image: 'https://images.unsplash.com/photo-1612531386530-97286d97c2d2?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  availability: {
    days: ['Monday', 'Wednesday', 'Thursday'],
    startTime: '08:00',
    endTime: '14:00'
  }
}, {
  id: '2004',
  name: 'Dr. Hawa Barrie',
  departmentId: '204',
  specialization: 'Dentist',
  image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  availability: {
    days: ['Tuesday', 'Wednesday', 'Friday'],
    startTime: '09:30',
    endTime: '15:30'
  }
},
// Add more doctors for other hospitals and departments
{
  id: '3001',
  name: 'Dr. Joseph Sankoh',
  departmentId: '301',
  specialization: 'General Practitioner',
  image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  availability: {
    days: ['Monday', 'Tuesday', 'Thursday'],
    startTime: '09:00',
    endTime: '15:00'
  }
}, {
  id: '3002',
  name: 'Dr. Aisha Jalloh',
  departmentId: '302',
  specialization: 'Pediatrician',
  image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  availability: {
    days: ['Wednesday', 'Thursday', 'Friday'],
    startTime: '10:00',
    endTime: '16:00'
  }
}];
export const AppointmentProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const {
    user
  } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('appointments');
    return saved ? JSON.parse(saved) : [];
  });
  // Save appointments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);
  // Get appointments for the current user
  const userAppointments = appointments.filter(appointment => appointment.userId === user?.phoneNumber);
  // Get hospital by ID
  const getHospitalById = (id: string): Hospital | undefined => {
    return hospitalsData.find(hospital => hospital.id === id);
  };
  // Get doctor by ID
  const getDoctorById = (id: string): Doctor | undefined => {
    return doctorsData.find(doctor => doctor.id === id);
  };
  // Get departments for a specific hospital
  const getHospitalDepartments = (hospitalId: string): Department[] => {
    const hospital = getHospitalById(hospitalId);
    return hospital ? hospital.departments : [];
  };
  // Get doctors for a specific department in a hospital
  const getDoctorsByDepartment = (hospitalId: string, departmentId: string): Doctor[] => {
    // First check if the department belongs to the hospital
    const hospital = getHospitalById(hospitalId);
    if (!hospital) return [];
    const departmentExists = hospital.departments.some(dept => dept.id === departmentId);
    if (!departmentExists) return [];
    // Return doctors for this department
    return doctorsData.filter(doctor => doctor.departmentId === departmentId);
  };
  // Generate time slots for a doctor on a specific date
  const getAvailableTimeSlots = (doctorId: string, date: string): TimeSlot[] => {
    const doctor = getDoctorById(doctorId);
    if (!doctor) return [];
    // Check if doctor works on this day
    const selectedDate = new Date(date);
    const dayOfWeek = selectedDate.toLocaleDateString('en-US', {
      weekday: 'long'
    });
    if (!doctor.availability.days.includes(dayOfWeek)) {
      return [];
    }
    // Generate time slots based on doctor's working hours
    const startTime = parseInt(doctor.availability.startTime.split(':')[0]);
    const endTime = parseInt(doctor.availability.endTime.split(':')[0]);
    const slots: TimeSlot[] = [];
    for (let hour = startTime; hour < endTime; hour++) {
      const timeString = `${hour.toString().padStart(2, '0')}:00`;
      // Check if this slot is already booked
      const isBooked = appointments.some(appointment => appointment.doctorId === doctorId && appointment.date === date && appointment.timeSlot === timeString && (appointment.status === 'approved' || appointment.status === 'pending'));
      slots.push({
        time: timeString,
        isBooked
      });
    }
    return slots;
  };
  // Book a new appointment
  const bookAppointment = (appointmentData: Omit<Appointment, 'id' | 'userId' | 'status' | 'createdAt'>) => {
    if (!user) return;
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      userId: user.phoneNumber,
      ...appointmentData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setAppointments(prev => [...prev, newAppointment]);
  };
  // Cancel an appointment
  const cancelAppointment = (appointmentId: string) => {
    setAppointments(prev => prev.filter(appointment => appointment.id !== appointmentId));
  };
  return <AppointmentContext.Provider value={{
    hospitals: hospitalsData,
    doctors: doctorsData,
    appointments,
    userAppointments,
    getHospitalById,
    getDoctorById,
    getDoctorsByDepartment,
    getAvailableTimeSlots,
    bookAppointment,
    cancelAppointment,
    getHospitalDepartments
  }}>
      {children}
    </AppointmentContext.Provider>;
};
export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error('useAppointments must be used within an AppointmentProvider');
  }
  return context;
};