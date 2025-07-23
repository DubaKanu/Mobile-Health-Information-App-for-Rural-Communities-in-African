import React from 'react';
import { HeartPulseIcon, DropletIcon, BellIcon, AlertCircleIcon, BookOpenIcon } from 'lucide-react';
import InfoCard from '../components/InfoCard';
const HomePage = () => {
  return <div>
      <section className="bg-green-50 rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-green-800 mb-2">
          Welcome to QuickCare Sierra Leone
        </h1>
        <p className="text-gray-700">
          Access important health information, first-aid advice, and reminders
          to keep you and your family healthy.
        </p>
      </section>
      <h2 className="text-xl font-semibold mb-4">How can we help you today?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <InfoCard title="First Aid Advice" description="Learn how to handle common injuries and medical emergencies." icon={<HeartPulseIcon size={32} />} link="/first-aid" color="bg-red-500" />
        <InfoCard title="Hygiene Tips" description="Discover best practices for keeping yourself and your home clean and healthy." icon={<DropletIcon size={32} />} link="/hygiene" color="bg-blue-500" />
        <InfoCard title="Health Reminders" description="Important reminders for vaccinations, check-ups, and medication." icon={<BellIcon size={32} />} link="/reminders" color="bg-yellow-500" />
        <InfoCard title="Emergency Information" description="Critical contacts and steps to take during health emergencies." icon={<AlertCircleIcon size={32} />} link="/emergency" color="bg-red-600" />
        <InfoCard title="Health Education" description="Learn about common diseases, prevention, and treatment options." icon={<BookOpenIcon size={32} />} link="/education" color="bg-purple-500" />
      </div>
    </div>;
};
export default HomePage;