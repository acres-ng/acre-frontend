import React, { useState } from 'react';
import UsersTable from './UsersTable';
import { usersData } from './users-data';
import InventoryList from './InventoryList';
import RecipeBuilder from './RecipeBuilder';
import Rations from './Rations';

const Menu = [
  {
    id: 1,
    title: 'Inventory List',
    active: true,
  },
  {
    id: 2,
    title: 'Recipe Builder',
    active: false,
  },
  {
    id: 3,
    title: 'Ration',
    active: false,
  },
];

const Feeding = () => {
  const [activeMenu, setActiveMenu] = useState(Menu);

  const handleTabChange = (id: number) => {
    const newMenu = activeMenu.map((menu) => ({
      ...menu,
      active: menu.id === id,
    }));
    setActiveMenu(newMenu);
  };

  const active = activeMenu.find((menu) => menu.active);

  return (
    <div>
      <div className="flex items-center justify-between gap-8 mt-[4rem]">
        <div className="flex items-center gap-8">
          {activeMenu.map((menu) => (
            <div key={menu.id} className="cursor-pointer" onClick={() => handleTabChange(menu.id)}>
              <h1 className={menu.active ? 'text-blue-500' : 'text-gray-500'}>{menu.title}</h1>
              {menu.active && <div className="w-6 h-1 bg-blue-500 rounded-full"></div>}
            </div>
          ))}
        </div>
      </div>
      <div>
        {active?.id === 1 && <InventoryList />}
        {active?.id === 2 && <RecipeBuilder />}
        {active?.id === 3 && <Rations />}
      </div>
    
    </div>
  );
};

export default Feeding;
