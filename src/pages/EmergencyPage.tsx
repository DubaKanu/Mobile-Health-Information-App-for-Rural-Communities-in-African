import React from 'react';
import { PhoneIcon, AlertTriangleIcon, AmbulanceIcon, HospitalIcon, StethoscopeIcon } from 'lucide-react';
const EmergencyPage = () => {
  return <div>
      <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6">
        <div className="flex items-center">
          <AlertTriangleIcon className="text-red-600 mr-2" size={24} />
          <h1 className="text-2xl font-bold text-red-600">
            Emergency Information
          </h1>
        </div>
        <p className="mt-2 text-gray-700">
          For serious medical emergencies, seek help immediately. Use this
          information to get assistance.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <EmergencyContact title="National Emergency Hotline" contact="999" icon={<PhoneIcon className="text-red-500" size={24} />} />
        <EmergencyContact title="Ambulance Service" contact="999 or 117" icon={<AmbulanceIcon className="text-red-500" size={24} />} />
        <EmergencyContact title="Nearest Hospital" contact="[Set in your local area]" icon={<HospitalIcon className="text-red-500" size={24} />} />
        <EmergencyContact title="Community Health Worker" contact="[Set in your local area]" icon={<StethoscopeIcon className="text-red-500" size={24} />} />
      </div>
      <h2 className="text-xl font-bold mb-4">When to Seek Emergency Help</h2>
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <ul className="list-disc pl-5 space-y-2">
          <li className="text-gray-700">
            Difficulty breathing or shortness of breath
          </li>
          <li className="text-gray-700">
            Chest or upper abdominal pain or pressure
          </li>
          <li className="text-gray-700">
            Fainting, sudden dizziness, weakness
          </li>
          <li className="text-gray-700">
            Severe or persistent vomiting or diarrhea
          </li>
          <li className="text-gray-700">
            Bleeding that doesn't stop after applying pressure
          </li>
          <li className="text-gray-700">Large open wounds or severe burns</li>
          <li className="text-gray-700">Sudden severe headache or confusion</li>
          <li className="text-gray-700">Serious injuries from accidents</li>
          <li className="text-gray-700">Seizures</li>
          <li className="text-gray-700">Severe abdominal pain</li>
        </ul>
      </div>
      <h2 className="text-xl font-bold mb-4">While Waiting for Help</h2>
      <div className="bg-white rounded-lg shadow-md p-4">
        <ul className="list-disc pl-5 space-y-2">
          <li className="text-gray-700">Stay calm and reassure the person</li>
          <li className="text-gray-700">
            Do not move someone with a serious injury unless they are in
            immediate danger
          </li>
          <li className="text-gray-700">
            If the person is unconscious but breathing, place them in the
            recovery position (on their side)
          </li>
          <li className="text-gray-700">
            If there is bleeding, apply direct pressure to the wound
          </li>
          <li className="text-gray-700">
            Keep the person warm with a blanket or clothing
          </li>
          <li className="text-gray-700">
            Do not give food or drink to a seriously injured person
          </li>
          <li className="text-gray-700">
            If possible, send someone to guide the emergency services to your
            location
          </li>
        </ul>
      </div>
    </div>;
};
interface EmergencyContactProps {
  title: string;
  contact: string;
  icon: React.ReactNode;
}
const EmergencyContact = ({
  title,
  icon,
  contact
}: EmergencyContactProps) => {
  return <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-red-50 p-4 flex items-center">
        {icon}
        <h2 className="text-lg font-semibold ml-2">{title}</h2>
      </div>
      <div className="p-4">
        <a href={`tel:${contact.replace(/\D/g, '')}`} className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-md font-medium">
          <PhoneIcon size={18} className="mr-2" />
          {contact}
        </a>
      </div>
    </div>;
};
export default EmergencyPage;