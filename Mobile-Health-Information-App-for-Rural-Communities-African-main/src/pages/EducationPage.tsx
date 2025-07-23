import React from 'react';
import { BookOpenIcon, ShieldIcon, HeartIcon, BabyIcon } from 'lucide-react';
const EducationPage = () => {
  return <div>
      <h1 className="text-2xl font-bold mb-6">Health Education</h1>
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <p className="text-purple-600 font-medium mb-2">
          Understanding common health conditions can help you prevent illness
          and seek treatment early.
        </p>
        <p className="text-gray-700">
          Learn about common diseases, their symptoms, prevention, and when to
          seek medical help.
        </p>
      </div>
      <div className="space-y-6">
        <EducationSection title="Malaria" icon={<ShieldIcon className="text-purple-500" size={24} />} content={{
        description: 'Malaria is a serious disease spread by mosquitoes that can cause fever, chills, and flu-like symptoms.',
        symptoms: ['Fever and chills', 'Headache and body aches', 'Fatigue', 'Nausea, vomiting, and diarrhea', 'In severe cases: seizures, confusion, difficulty breathing'],
        prevention: ['Sleep under insecticide-treated mosquito nets', 'Use insect repellent if available', 'Wear long sleeves and pants at dawn and dusk', 'Remove standing water where mosquitoes breed', 'Take preventive medication if prescribed'],
        whenToSeekHelp: ['High fever (above 38°C/100.4°F)', 'Persistent vomiting', 'Difficulty breathing', 'Confusion or seizures', 'Any symptoms in pregnant women, children, or elderly']
      }} />
        <EducationSection title="Diarrheal Diseases" icon={<HeartIcon className="text-purple-500" size={24} />} content={{
        description: 'Diarrheal diseases are infections of the intestines that can cause loose, watery stools and dehydration.',
        symptoms: ['Loose, watery stools', 'Abdominal cramps and pain', 'Fever and chills', 'Blood in stool (in some cases)', 'Dehydration: thirst, dry mouth, little urination, dizziness'],
        prevention: ['Wash hands with soap and water, especially before eating and after using the toilet', 'Drink clean, safe water (boiled or treated)', 'Wash fruits and vegetables thoroughly', 'Cook food thoroughly', 'Proper disposal of human waste'],
        whenToSeekHelp: ['Blood in stool', 'High fever', 'Severe abdominal pain', 'Signs of dehydration (decreased urination, dry mouth, dizziness)', 'Diarrhea lasting more than 3 days']
      }} />
        <EducationSection title="Respiratory Infections" icon={<div className="text-purple-500" size={24} />} content={{
        description: 'Respiratory infections affect the airways and lungs, causing symptoms like cough, congestion, and difficulty breathing.',
        symptoms: ['Cough', 'Sore throat', 'Runny or stuffy nose', 'Fever', 'Difficulty breathing (in severe cases)'],
        prevention: ['Wash hands regularly', 'Cover mouth and nose when coughing or sneezing', 'Avoid close contact with sick people', 'Keep living spaces well-ventilated', 'Get vaccinated for preventable respiratory diseases when available'],
        whenToSeekHelp: ['Difficulty breathing or rapid breathing', "High fever that doesn't improve with medication", 'Chest pain', 'Coughing up blood', 'Symptoms that worsen after initially improving']
      }} />
        <EducationSection title="Malnutrition" icon={<BabyIcon className="text-purple-500" size={24} />} content={{
        description: "Malnutrition occurs when the body doesn't get enough nutrients, affecting growth, development, and overall health.",
        symptoms: ['In children: poor growth, thin limbs, swollen belly', 'Fatigue and weakness', 'Frequent infections', 'Slow wound healing', 'Hair loss and dry skin'],
        prevention: ['Eat a varied diet with fruits, vegetables, and protein when possible', 'Breastfeed infants exclusively for the first 6 months', 'Introduce nutritious complementary foods at 6 months', 'Continue breastfeeding until 2 years or beyond', 'Seek food assistance programs if available'],
        whenToSeekHelp: ['Visible weight loss or failure to gain weight in children', 'Swelling in the feet, ankles, or belly', 'Extreme fatigue or weakness', 'Frequent infections', 'Changes in mental state']
      }} />
        <EducationSection title="Typhoid Fever" icon={<BookOpenIcon className="text-purple-500" size={24} />} content={{
        description: 'Typhoid fever is a bacterial infection spread through contaminated food and water that causes high fever and digestive problems.',
        symptoms: ['Gradually increasing fever', 'Headache', 'Weakness and fatigue', 'Abdominal pain', 'Constipation or diarrhea'],
        prevention: ['Drink only safe (boiled or treated) water', 'Wash hands with soap and water', 'Avoid raw foods and street foods', 'Eat thoroughly cooked foods', 'Use clean utensils and dishes'],
        whenToSeekHelp: ["High fever that doesn't improve", 'Severe abdominal pain', 'Extreme fatigue', 'Confusion or altered mental state', 'Rash of small, flat, rose-colored spots']
      }} />
      </div>
    </div>;
};
interface EducationSectionProps {
  title: string;
  icon: React.ReactNode;
  content: {
    description: string;
    symptoms: string[];
    prevention: string[];
    whenToSeekHelp: string[];
  };
}
const EducationSection = ({
  title,
  icon,
  content
}: EducationSectionProps) => {
  return <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-purple-50 p-4 flex items-center">
        {icon}
        <h2 className="text-xl font-semibold ml-2">{title}</h2>
      </div>
      <div className="p-4">
        <p className="text-gray-700 mb-4">{content.description}</p>
        <h3 className="font-semibold text-purple-700 mb-2">Common Symptoms:</h3>
        <ul className="list-disc pl-5 space-y-1 mb-4">
          {content.symptoms.map((symptom, index) => <li key={index} className="text-gray-700">
              {symptom}
            </li>)}
        </ul>
        <h3 className="font-semibold text-purple-700 mb-2">Prevention:</h3>
        <ul className="list-disc pl-5 space-y-1 mb-4">
          {content.prevention.map((tip, index) => <li key={index} className="text-gray-700">
              {tip}
            </li>)}
        </ul>
        <h3 className="font-semibold text-purple-700 mb-2">
          When to Seek Medical Help:
        </h3>
        <ul className="list-disc pl-5 space-y-1">
          {content.whenToSeekHelp.map((sign, index) => <li key={index} className="text-gray-700">
              {sign}
            </li>)}
        </ul>
      </div>
    </div>;
};
export default EducationPage;