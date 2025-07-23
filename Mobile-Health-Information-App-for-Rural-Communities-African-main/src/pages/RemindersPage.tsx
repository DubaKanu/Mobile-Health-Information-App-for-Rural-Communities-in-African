import React, { useEffect, useState, Children } from 'react';
import { BellIcon, BabyIcon, UserIcon, HeartIcon, PillIcon, CalendarIcon, PlusIcon, TrashIcon } from 'lucide-react';
const RemindersPage = () => {
  // State for managing scheduled visits
  const [scheduledVisits, setScheduledVisits] = useState(() => {
    const saved = localStorage.getItem('scheduledVisits');
    return saved ? JSON.parse(saved) : [];
  });
  const [newVisit, setNewVisit] = useState({
    title: '',
    date: '',
    time: '',
    notes: ''
  });
  // Save scheduled visits to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('scheduledVisits', JSON.stringify(scheduledVisits));
  }, [scheduledVisits]);
  // Handle form input changes
  const handleInputChange = e => {
    const {
      name,
      value
    } = e.target;
    setNewVisit(prev => ({
      ...prev,
      [name]: value
    }));
  };
  // Handle form submission to add a new visit
  const handleSubmit = e => {
    e.preventDefault();
    // Basic validation
    if (!newVisit.title || !newVisit.date) {
      alert('Please enter a title and date for your visit');
      return;
    }
    // Add new visit to the list
    setScheduledVisits(prev => [...prev, {
      ...newVisit,
      id: Date.now(),
      createdAt: new Date().toISOString()
    }]);
    // Reset form
    setNewVisit({
      title: '',
      date: '',
      time: '',
      notes: ''
    });
  };
  // Handle deletion of a scheduled visit
  const handleDelete = id => {
    setScheduledVisits(prev => prev.filter(visit => visit.id !== id));
  };
  // Format date for display
  const formatDate = dateString => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  // Check if a visit is upcoming (within the next 7 days)
  const isUpcoming = dateString => {
    const visitDate = new Date(dateString);
    const today = new Date();
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(today.getDate() + 7);
    return visitDate >= today && visitDate <= sevenDaysFromNow;
  };
  return <div>
      <h1 className="text-2xl font-bold mb-6">Health Reminders</h1>
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <p className="text-yellow-600 font-medium mb-2">
          Regular check-ups and vaccinations are important for staying healthy.
        </p>
        <p className="text-gray-700">
          Keep track of these important health reminders for you and your
          family.
        </p>
      </div>

      {/* Schedule a Visit Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="bg-yellow-50 p-4 flex items-center">
          <CalendarIcon className="text-yellow-500" size={24} />
          <h2 className="text-xl font-semibold ml-2">Schedule a Visit</h2>
        </div>
        <div className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Visit Purpose
              </label>
              <input type="text" id="title" name="title" value={newVisit.title} onChange={handleInputChange} placeholder="e.g., Child Vaccination, Prenatal Check-up" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input type="date" id="date" name="date" value={newVisit.date} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" />
              </div>
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                  Time (if known)
                </label>
                <input type="time" id="time" name="time" value={newVisit.time} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" />
              </div>
            </div>
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea id="notes" name="notes" value={newVisit.notes} onChange={handleInputChange} rows={3} placeholder="Any additional information about the visit" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" />
            </div>
            <button type="submit" className="flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md font-medium">
              <PlusIcon size={18} className="mr-1" />
              Add Visit
            </button>
          </form>
        </div>
      </div>

      {/* Upcoming Visits Section */}
      {scheduledVisits.length > 0 && <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="bg-yellow-50 p-4 flex items-center">
            <BellIcon className="text-yellow-500" size={24} />
            <h2 className="text-xl font-semibold ml-2">
              Your Scheduled Visits
            </h2>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {scheduledVisits.sort((a, b) => new Date(a.date) - new Date(b.date)).map(visit => <div key={visit.id} className={`border rounded-md p-3 flex justify-between items-start ${isUpcoming(visit.date) ? 'border-yellow-300 bg-yellow-50' : 'border-gray-200'}`}>
                    <div>
                      <div className="flex items-center">
                        {isUpcoming(visit.date) && <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded mr-2">
                            Upcoming
                          </span>}
                        <h3 className="font-medium">{visit.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {formatDate(visit.date)}
                        {visit.time && ` at ${visit.time}`}
                      </p>
                      {visit.notes && <p className="text-sm text-gray-600 mt-1">
                          {visit.notes}
                        </p>}
                    </div>
                    <button onClick={() => handleDelete(visit.id)} className="text-red-500 hover:text-red-700" aria-label="Delete visit">
                      <TrashIcon size={18} />
                    </button>
                  </div>)}
            </div>
          </div>
        </div>}

      {/* Standard Health Reminders Sections */}
      <div className="space-y-6">
        <ReminderSection title="Child Immunizations" icon={<BabyIcon className="text-yellow-500" size={24} />} reminders={['Birth: BCG, OPV0, Hep B', '6 weeks: OPV1, Penta1, PCV1, Rota1', '10 weeks: OPV2, Penta2, PCV2, Rota2', '14 weeks: OPV3, Penta3, PCV3, IPV', '9 months: Measles, Yellow Fever', '15 months: Measles 2nd dose']} />
        <ReminderSection title="Maternal Health" icon={<UserIcon className="text-yellow-500" size={24} />} reminders={['First trimester (1-3 months): First antenatal visit', 'Second trimester (4-6 months): Monthly antenatal visits', 'Third trimester (7-9 months): Bi-weekly or weekly antenatal visits', 'After delivery: Postnatal check-up within 48 hours, 7 days, and 6 weeks', 'Family planning consultation after delivery']} />
        <ReminderSection title="Chronic Conditions" icon={<HeartIcon className="text-yellow-500" size={24} />} reminders={['Hypertension: Regular blood pressure checks', 'Diabetes: Regular blood sugar monitoring', 'HIV: Regular medication and check-ups', 'TB: Complete full course of treatment', 'Asthma: Regular use of prescribed inhalers']} />
        <ReminderSection title="Medication Reminders" icon={<PillIcon className="text-yellow-500" size={24} />} reminders={['Take medications at the same time each day', 'Complete the full course of antibiotics even if feeling better', 'Store medications in a cool, dry place away from children', 'Check expiration dates before taking medications', 'Do not share prescription medications with others']} />
        <ReminderSection title="General Health Check-ups" icon={<BellIcon className="text-yellow-500" size={24} />} reminders={['Adults: Annual health check-up if possible', 'Children: Growth monitoring every 3-6 months', 'Dental check-up annually if possible', 'Eye examination every 2 years if possible', 'Mental health check-in regularly with community health worker']} />
      </div>
    </div>;
};
interface ReminderSectionProps {
  title: string;
  icon: React.ReactNode;
  reminders: string[];
}
const ReminderSection = ({
  title,
  icon,
  reminders
}: ReminderSectionProps) => {
  return <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-yellow-50 p-4 flex items-center">
        {icon}
        <h2 className="text-xl font-semibold ml-2">{title}</h2>
      </div>
      <div className="p-4">
        <ul className="list-disc pl-5 space-y-2">
          {reminders.map((reminder, index) => <li key={index} className="text-gray-700">
              {reminder}
            </li>)}
        </ul>
      </div>
    </div>;
};
export default RemindersPage;