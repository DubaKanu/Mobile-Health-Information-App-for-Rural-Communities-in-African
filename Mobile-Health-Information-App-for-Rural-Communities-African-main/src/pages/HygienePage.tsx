import React from 'react';
import { DropletIcon, BugIcon, UtensilsIcon, HomeIcon, ShirtIcon } from 'lucide-react';
const HygienePage = () => {
  return <div>
      <h1 className="text-2xl font-bold mb-6">Hygiene Tips</h1>
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <p className="text-blue-600 font-medium mb-2">
          Good hygiene practices help prevent the spread of disease.
        </p>
        <p className="text-gray-700">
          Follow these simple tips to keep yourself and your family healthy.
        </p>
      </div>
      <div className="space-y-6">
        <HygieneSection title="Handwashing" icon={<DropletIcon className="text-blue-500" size={24} />} tips={['Wash hands with soap and water for at least 20 seconds', 'Wash hands before eating or preparing food', 'Wash hands after using the toilet', 'Wash hands after coughing, sneezing, or blowing your nose', 'If soap is not available, use ash or sand to scrub hands']} />
        <HygieneSection title="Food Safety" icon={<UtensilsIcon className="text-blue-500" size={24} />} tips={['Keep food preparation areas clean', 'Wash fruits and vegetables with clean water', 'Cook meat thoroughly', 'Store food properly to prevent spoilage', 'Use separate cutting boards for raw meat and vegetables if possible']} />
        <HygieneSection title="Home Cleanliness" icon={<HomeIcon className="text-blue-500" size={24} />} tips={['Clean surfaces regularly, especially in the kitchen and bathroom', 'Keep food covered to protect from flies and insects', 'Dispose of garbage properly', 'Keep water containers clean and covered', 'Improve ventilation by opening windows when possible']} />
        <HygieneSection title="Personal Hygiene" icon={<ShirtIcon className="text-blue-500" size={24} />} tips={['Bathe regularly with soap and water', 'Brush teeth twice daily if possible', 'Keep nails short and clean', 'Wash clothes regularly', 'Use clean towels and bedding']} />
        <HygieneSection title="Disease Prevention" icon={<BugIcon className="text-blue-500" size={24} />} tips={['Use mosquito nets to prevent malaria', 'Keep surroundings free of standing water to prevent mosquito breeding', 'Cover your mouth when coughing or sneezing', 'Avoid close contact with sick people when possible', 'Seek medical help early when ill']} />
      </div>
    </div>;
};
interface HygieneSectionProps {
  title: string;
  icon: React.ReactNode;
  tips: string[];
}
const HygieneSection = ({
  title,
  icon,
  tips
}: HygieneSectionProps) => {
  return <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-50 p-4 flex items-center">
        {icon}
        <h2 className="text-xl font-semibold ml-2">{title}</h2>
      </div>
      <div className="p-4">
        <ul className="list-disc pl-5 space-y-2">
          {tips.map((tip, index) => <li key={index} className="text-gray-700">
              {tip}
            </li>)}
        </ul>
      </div>
    </div>;
};
export default HygienePage;