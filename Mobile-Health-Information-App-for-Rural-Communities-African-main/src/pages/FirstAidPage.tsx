import React from 'react';
import { BandageIcon, ThermometerIcon, ActivityIcon, SparklesIcon } from 'lucide-react';
const FirstAidPage = () => {
  return <div>
      <h1 className="text-2xl font-bold mb-6">First Aid Advice</h1>
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <p className="text-red-600 font-medium mb-2">
          For serious emergencies, seek medical help immediately if available.
        </p>
        <p className="text-gray-700">
          The following advice is for minor injuries and situations where
          immediate medical help is not available.
        </p>
      </div>
      <div className="space-y-6">
        <FirstAidSection title="Cuts and Wounds" icon={<BandageIcon className="text-red-500" size={24} />} steps={['Clean your hands with soap and water', 'Rinse the wound with clean water', 'Apply gentle pressure with a clean cloth to stop bleeding', 'Apply a clean bandage', 'Change the bandage daily or when dirty']} />
        <FirstAidSection title="Fever" icon={<ThermometerIcon className="text-red-500" size={24} />} steps={['Rest and drink plenty of fluids', 'Use a light cloth soaked in room temperature water on the forehead', 'If available, take appropriate medication for fever', 'Seek medical help if fever persists for more than 2 days or is very high']} />
        <FirstAidSection title="Headache" icon={<div className="text-red-500" size={24} />} steps={['Rest in a quiet, dark room', 'Place a cool cloth on your forehead', 'Drink water as dehydration can cause headaches', 'If available, take appropriate pain medication', 'Seek medical help if headache is severe or persistent']} />
        <FirstAidSection title="Sprains" icon={<ActivityIcon className="text-red-500" size={24} />} steps={['Rest the injured area', 'Apply ice wrapped in cloth for 20 minutes several times a day', 'Compress the area with a bandage if available', 'Elevate the injured limb', 'Seek medical help if pain is severe or you cannot move the joint']} />
        <FirstAidSection title="Burns" icon={<SparklesIcon className="text-red-500" size={24} />} steps={['Cool the burn with cool (not cold) running water for 10-15 minutes', 'Do not apply ice directly to a burn', 'Cover with a clean, dry cloth', 'Do not apply creams, ointments, or butter to burns', 'Seek medical help for serious burns or burns on the face']} />
      </div>
    </div>;
};
interface FirstAidSectionProps {
  title: string;
  icon: React.ReactNode;
  steps: string[];
}
const FirstAidSection = ({
  title,
  icon,
  steps
}: FirstAidSectionProps) => {
  return <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-red-50 p-4 flex items-center">
        {icon}
        <h2 className="text-xl font-semibold ml-2">{title}</h2>
      </div>
      <div className="p-4">
        <ol className="list-decimal pl-5 space-y-2">
          {steps.map((step, index) => <li key={index} className="text-gray-700">
              {step}
            </li>)}
        </ol>
      </div>
    </div>;
};
export default FirstAidPage;