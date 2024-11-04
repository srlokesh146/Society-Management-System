import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { sidebarItems } from "../../constantdata";
import Logo from "../Logo";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState(1);
  const [openSubItems, setOpenSubItems] = useState({});

  const handleItemClick = (item) => {
    if (item.subItems) {
      setOpenSubItems((prev) => ({
        [item.id]: !prev[item.id],
      }));
    } else {
      setOpenSubItems({});
    }
    setActiveItem(item.id);
  };

  return (
    <aside className="w-[280px] h-full bg-white p-4 shadow-lg lg:block rounded border border-gray-200">
      <div className="flex justify-center items-center mb-[30px] border-b pb-[28px] pt-[15px]">
        <Logo sidebarlogo />
      </div>
      <nav>
        <ul>
          {sidebarItems.map((item) => (
            <li key={item.id}>
              <div className="relative">
                <NavLink
                  to={item.path || "#"}
                  className={`flex items-center mb-[10px] text-sm font-medium rounded-lg p-[14px] ${
                    activeItem === item.id ? "bg-custom-gradient text-white" : "hover:bg-custom-gradient hover:text-white"
                  }`}
                  onClick={() => handleItemClick(item)}
                >
                 <span className="mr-[10px]">{item.icon}</span> 
                  <span>{item.label}</span>
                </NavLink>
                {activeItem === item.id && (
                  <div className="sidebar-border sidebar-border-active"></div>
                )}
              </div>
              {item.subItems && openSubItems[item.id] && (
                <ul className="ml-4 mt-2 mb-2">
                  {item.subItems.map((subItem) => (
                    <li
                      key={subItem.id}
                      className={`border-l-2 pl-2 ${
                        activeItem === subItem.id
                          ? "border-black"
                          : "border-gray-300 hover:border-black"
                      }`}
                    >
                      <NavLink
                        to={subItem.path}
                        className={`flex items-center text-sm rounded-lg pt-[6px] pb-[5px] ${
                          activeItem === subItem.id ? "text-[#202224] font-medium" : "hover:text-[#202224] font-medium"
                        }`}
                        onClick={() => setActiveItem(subItem.id)}
                      >
                        <span
                          className={`ml-2 ${
                            activeItem === subItem.id ? "text-black" : "text-[#4F4F4F]"
                          }`}
                        >
                          {subItem.label}
                        </span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
