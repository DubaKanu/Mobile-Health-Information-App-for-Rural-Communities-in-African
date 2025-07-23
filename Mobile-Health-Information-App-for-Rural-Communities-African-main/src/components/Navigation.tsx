import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulseIcon, DropletIcon, BellIcon, AlertCircleIcon, HomeIcon, BuildingIcon, CalendarIcon } from 'lucide-react';
interface NavigationProps {
  mobile?: boolean;
  closeMenu?: () => void;
}
const Navigation = ({
  mobile = false,
  closeMenu
}: NavigationProps) => {
  const handleClick = () => {
    if (mobile && closeMenu) {
      closeMenu();
    }
  };
  const navItems = [{
    to: '/',
    icon: <HomeIcon size={20} />,
    label: 'Home'
  }, {
    to: '/hospitals',
    icon: <BuildingIcon size={20} />,
    label: 'Hospitals'
  }, {
    to: '/appointments',
    icon: <CalendarIcon size={20} />,
    label: 'Appointments'
  }, {
    to: '/first-aid',
    icon: <HeartPulseIcon size={20} />,
    label: 'First Aid'
  }, {
    to: '/hygiene',
    icon: <DropletIcon size={20} />,
    label: 'Hygiene'
  }, {
    to: '/reminders',
    icon: <BellIcon size={20} />,
    label: 'Reminders'
  }, {
    to: '/emergency',
    icon: <AlertCircleIcon size={20} />,
    label: 'Emergency'
  }];
  return <ul className={`flex ${mobile ? 'flex-col space-y-2' : 'space-x-4'}`}>
      {navItems.map(item => <li key={item.to}>
          <Link to={item.to} className={`flex items-center ${mobile ? 'space-x-2 p-2 hover:bg-green-700 rounded' : 'hover:underline'}`} onClick={handleClick}>
            {item.icon}
            <span className={mobile ? 'ml-2' : 'ml-1'}>{item.label}</span>
          </Link>
        </li>)}
    </ul>;
};
export default Navigation;