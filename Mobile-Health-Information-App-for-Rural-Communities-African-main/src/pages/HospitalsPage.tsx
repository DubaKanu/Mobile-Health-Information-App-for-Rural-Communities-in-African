import React, { useState } from 'react';
import { BuildingIcon, SearchIcon } from 'lucide-react';
import { useAppointments } from '../context/AppointmentContext';
import HospitalCard from '../components/HospitalCard';
const HospitalsPage = () => {
  const {
    hospitals
  } = useAppointments();
  const [searchTerm, setSearchTerm] = useState('');
  // Filter hospitals based on search term
  const filteredHospitals = hospitals.filter(hospital => hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) || hospital.location.toLowerCase().includes(searchTerm.toLowerCase()));
  return <div>
      <div className="bg-green-50 rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-green-800 mb-2 flex items-center">
          <BuildingIcon className="mr-2" size={24} />
          Hospitals in Sierra Leone
        </h1>
        <p className="text-gray-700">
          Select a hospital to view departments and book an appointment with a
          doctor.
        </p>
      </div>
      {/* Search bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon size={18} className="text-gray-400" />
        </div>
        <input type="text" placeholder="Search hospitals by name or location..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
      </div>
      {/* Hospital listings */}
      {filteredHospitals.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHospitals.map(hospital => <HospitalCard key={hospital.id} hospital={hospital} />)}
        </div> : <div className="text-center py-8">
          <p className="text-gray-500">
            No hospitals found matching your search.
          </p>
        </div>}
    </div>;
};
export default HospitalsPage;