import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";
import { sidebarItems } from "../../constantdata";
import Logo from "../Logo";
import { FiLogOut } from "react-icons/fi";
import logout from "../../assets/images/logout.png";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState(1);
  const [openSubItems, setOpenSubItems] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSidebarOpen]);

  return (
    <>
      {/*  Smaller Screens */}
      <button
        className="lg:hidden fixed top-[26px] left-4 z-[9999] max-sm:block"
        onClick={toggleSidebar}
      >
        <FiMenu size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-[280px] bg-white p-4 shadow-lg border border-gray-200 transition-transform duration-300 lg:transition-none lg:relative lg:transform-none ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:w-[280px] lg:block z-[9]`}
      >
        <div className="flex justify-between items-center mb-[30px] border-b pb-[28px] pt-[15px]">
          <Logo sidebarlogo />
          <button
            onClick={toggleSidebar}
            className="lg:hidden fixed top-[12px] right-[8px]"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <nav>
          <ul>
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <div className="relative">
                  <NavLink
                    to={item.path || "#"}
                    className={`flex items-center mb-[10px] text-sm font-medium rounded-lg p-[14px] ${activeItem === item.id
                      ? "bg-custom-gradient text-white"
                      : "hover:bg-custom-gradient hover:text-white"
                      }`}
                    onClick={() => handleItemClick(item)}
                  >
                    <span className="mr-[10px]">{item.icon}</span>
                    <span className="lg:inline">{item.label}</span>
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
                        className={`border-l-2 pl-2 ${activeItem === subItem.id
                          ? "border-black"
                          : "border-gray-300 hover:border-black"
                          }`}
                      >
                        <NavLink
                          to={subItem.path}
                          className={`flex items-center text-sm rounded-lg pt-[6px] pb-[5px] ${activeItem === subItem.id
                            ? "text-[#202224] font-medium"
                            : "hover:text-[#202224] font-medium"
                            }`}
                          onClick={() => setActiveItem(subItem.id)}
                        >
                          <span
                            className={`ml-2 ${activeItem === subItem.id
                              ? "text-black"
                              : "text-[#4F4F4F] hover:text-black"
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

        {/* Logout */}
        <div className="absolute bottom-4 left-4 w-full mt-[15px] h-[-50%]">
          <div className="border border-[#F4F4F4] mt-[200px] mr-[34px]"></div>
          <NavLink
            to="/login"
            className="flex items-center mb-[10px] text-[16px] font-medium rounded-lg p-[14px] text-[#E74C3C]"
          >
            <img src={logout} alt="" className="mr-[12px]" />
            Logout
          </NavLink>
        </div>
      </aside>

      {/* Sidebar screen*/}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden z-50"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}
