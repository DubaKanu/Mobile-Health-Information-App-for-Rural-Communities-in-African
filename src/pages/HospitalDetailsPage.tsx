import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BuildingIcon, MapPinIcon, PhoneIcon, ArrowLeftIcon, UsersIcon } from 'lucide-react';
import { useAppointments } from '../context/AppointmentContext';
import DoctorCard from '../components/DoctorCard';
const HospitalDetailsPage = () => {
  const {
    hospitalId,
    departmentId
  } = useParams<{
    hospitalId: string;
    departmentId?: string;
  }>();
  const {
    getHospitalById,
    getHospitalDepartments,
    getDoctorsByDepartment
  } = useAppointments();
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | undefined>(departmentId);
  // Get hospital data
  const hospital = getHospitalById(hospitalId || '');
  if (!hospital) {
    return <div className="text-center py-8">
        <p className="text-gray-500">Hospital not found.</p>
        <Link to="/hospitals" className="text-green-600 hover:underline mt-2 inline-block">
          Back to hospitals
        </Link>
      </div>;
  }
  // Get departments for this hospital
  const departments = getHospitalDepartments(hospital.id);
  // Get doctors for selected department
  const doctors = selectedDepartmentId ? getDoctorsByDepartment(hospital.id, selectedDepartmentId) : [];
  return <div>
      <Link to="/hospitals" className="inline-flex items-center text-green-600 hover:text-green-700 mb-4">
        <ArrowLeftIcon size={16} className="mr-1" />
        Back to hospitals
      </Link>
      {/* Hospital header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="h-64 overflow-hidden">
          <img src={hospital.image} alt={hospital.name} className="w-full h-full object-cover" />
        </div>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {hospital.name}
          </h1>
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-start">
              <MapPinIcon size={18} className="text-green-600 mt-1 mr-2 flex-shrink-0" />
              <p className="text-gray-600">{hospital.location}</p>
            </div>
            <div className="flex items-start">
              <PhoneIcon size={18} className="text-green-600 mt-1 mr-2 flex-shrink-0" />
              <p className="text-gray-600">{hospital.phone}</p>
            </div>
          </div>
          <p className="text-gray-700">{hospital.description}</p>
        </div>
      </div>
      {/* Departments section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <BuildingIcon size={20} className="mr-2 text-green-600" />
          Departments
        </h2>
        <div className="flex flex-wrap gap-2">
          {departments.map(department => <button key={department.id} onClick={() => setSelectedDepartmentId(department.id)} className={`py-2 px-4 rounded-md ${selectedDepartmentId === department.id ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              {department.name}
            </button>)}
        </div>
      </div>
      {/* Doctors section */}
      {selectedDepartmentId ? <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <UsersIcon size={20} className="mr-2 text-green-600" />
            Doctors in{' '}
            {departments.find(d => d.id === selectedDepartmentId)?.name}
          </h2>
          {doctors.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map(doctor => <DoctorCard key={doctor.id} doctor={doctor} hospitalId={hospital.id} departmentId={selectedDepartmentId} />)}
            </div> : <div className="text-center py-6 bg-gray-50 rounded-lg">
              <p className="text-gray-500">
                No doctors available in this department.
              </p>
            </div>}
        </div> : <div className="text-center py-6 bg-gray-50 rounded-lg">
          <p className="text-gray-500">
            Please select a department to see available doctors.
          </p>
        </div>}
    </div>;
};
export default HospitalDetailsPage;