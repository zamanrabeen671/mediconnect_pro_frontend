/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link } from "react-router";
import { SidebarItems } from "./SibarItems";
import { useAppSelector } from "../../store/hooks";

type PropsType = {
  openSidebar: boolean;
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = (props: PropsType) => {
  const { user } = useAppSelector(state => state.auth)

  const [openItems, setOpenItems] = useState<Record<string, boolean>>({}); // Use an object to track open state of items
  const toggleItem = (itemKey: string) => {
    // Toggle the open state of the item
    setOpenItems((prevOpenItems) => ({
      ...prevOpenItems,
      [itemKey]: !prevOpenItems[itemKey],
    }));
  };

  const role = user?.role;
  const userPermissions =
    role?.permissions?.map((perm: any) => perm.name) || [];

  const hasPermission = (item: any) => {
    return !item.permission || userPermissions.includes(item.permission);
  };

  return (
    <aside
      x-show="isMobileMainMenuOpen"
      className={`fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 w-64 h-full pt-16 font-normal duration-75 lg:flex transition-width ${props.openSidebar ? "lg:w-12" : "hidden lg:block lg:w-64"
        }`}
      aria-label="Sidebar"
    >
      <div className="relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto scrollbar-thin">
          <div className="flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            <ul className="pb-2 space-y-2">
              <li>
                <form action="#" method="GET" className="lg:hidden">
                  <label htmlFor="mobile-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="email"
                      id="mobile-search"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Search"
                    />
                  </div>
                </form>
              </li>
              {/* scrollable list */}

              {SidebarItems?.filter(
                (item) => item.url || (item.subItems?.filter(hasPermission) ?? []).length > 0
              )?.map((item: any) => (
                <li key={item?.key}>
                  {item.key === "dashboard" ? (
                    // Direct Link for Dashboard
                    <Link
                      to={item?.url}
                      className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                    >
                      <span className="w-6 h-6 flex items-center justify-center">
                        {item.icon}
                      </span>
                      <span className="flex-1 ml-3 text-left whitespace-nowrap">
                        {item.label}
                      </span>
                    </Link>
                  ) : (
                    // Dropdown Button for Other Items
                    <button
                      type="button"
                      className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                      aria-haspopup="true"
                      onClick={() => toggleItem(item.key)}
                      aria-expanded={openItems[item.key]}
                    >
                      <span className="w-6 h-6 flex items-center justify-center">
                        {item.icon}
                      </span>
                      <span className="flex-1 ml-3 text-left whitespace-nowrap">
                        {item.label}
                      </span>
                      {item.subItems && item.subItems.length > 0 && (
                        <svg
                          className={`w-5 h-5 transition-transform transform ${openItems[item.key] ? "rotate-180" : ""
                            }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      )}
                    </button>
                  )}

                  {item.key !== "dashboard" && item.subItems && item.subItems.length > 0 && (
                    <ul
                      role="menu"
                      className={`py-2 space-y-2 ${openItems[item.key] ? "" : "hidden"}`}
                    >
                      {item.subItems.filter(hasPermission).map((subItem:any) => (
                        <li key={subItem.name} onClick={() => props.setOpenSidebar(false)}>
                          <Link
                            to={subItem.url}
                            className="flex items-center p-2 text-base text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}

            </ul>
          </div>
          
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
