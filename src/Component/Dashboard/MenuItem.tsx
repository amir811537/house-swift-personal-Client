import React from 'react';
import { NavLink } from 'react-router-dom';

interface MenuItemProps {
  label: string;
  address: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }: { isActive: boolean }) =>
        `flex items-center px-4 py-2 my-3 transition-colors duration-300 transform hover:bg-gray-200 hover:text-gray-700 rounded ${
          isActive ? 'bg-gray-200 rounded text-[#FCA129]' : 'text-white'
        }`
      }
    >
      <Icon className='w-5 h-5' />
      <span className='mx-4 font-medium'>{label}</span>
    </NavLink>
  );
};

export default MenuItem;
