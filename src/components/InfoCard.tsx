import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
interface InfoCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  link: string;
  color?: string;
}
const InfoCard = ({
  title,
  description,
  icon,
  link,
  color = 'bg-blue-500'
}: InfoCardProps) => {
  return <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className={`${color} p-4 text-white flex items-center justify-center`}>
        {icon}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link to={link} className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
          Learn more
          <ArrowRightIcon size={16} className="ml-1" />
        </Link>
      </div>
    </div>;
};
export default InfoCard;