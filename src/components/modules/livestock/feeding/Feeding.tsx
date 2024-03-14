import React, { useState } from "react";
import InventoryList from "./InventoryList";
import RecipeBuilder from "./recipeBuilder/RecipeBuilder";
import Rations from "./rations/Rations";

const Menu = [
  {
    id: 1,
    title: "Inventory List",
    active: true,
  },
  {
    id: 2,
    title: "Ration",
    active: false,
  },
  {
    id: 3,
    title: "Recipe Builder",
    active: false,
  },
];

const Feeding = () => {
  const [activeMenu, setActiveMenu] = useState(Menu);
  const handleTabChange = (id: number) => {
    setActiveMenu((prevMenu) =>
      prevMenu.map((menu) => ({
        ...menu,
        active: menu.id === id,
      }))
    );
  };

  const active = activeMenu.find((menu) => menu.active);

  return (
    <div className="bg-white flex flex-col pt-6 pb-12 px-8 max-md:px-5">
      <div className="w-[400px] flex flex-row items-center bg-[#CCE6DA] p-2 rounded-lg">
        {activeMenu.map((menu, index) => (
          <div key={index} className="flex-auto text-center">
            <span
              className={`flex w-full cursor-pointer items-center justify-center rounded-lg px-0 py-2.5 transition-all ease-in-out ${
                menu.active
                  ? "bg-white rounded-xl text-[#1B9C5C]"
                  : "text-black"
              }`}
              onClick={() => handleTabChange(menu.id)}
            >
              <span className="ml-1">{menu.title}</span>
            </span>
          </div>
        ))}
      </div>

      <div>
        {active?.id === 1 && <InventoryList />}
        {active?.id === 2 && <Rations />}
        {active?.id === 3 && <RecipeBuilder />}
      </div>
    </div>
  );
};

export default Feeding;
