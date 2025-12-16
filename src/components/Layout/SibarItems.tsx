interface ExpandableItem {
  key: string;
  label: string;
  url?: string;
  subItems?: {
    name: string;
    url: string;
    permission?: string;
  }[];
  icon?: React.ReactNode;
}
import { AiOutlineGift } from "react-icons/ai";
import { BiPurchaseTag } from "react-icons/bi";
import { GiExpense } from "react-icons/gi";
import { RiStockFill } from "react-icons/ri";
import { TbCoinTaka } from "react-icons/tb";
import { HiOutlineDocumentReport } from "react-icons/hi";

export const SidebarItems: ExpandableItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    url: "/",
    icon: (
      <svg
        className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
      </svg>
    ),
  },
  {
    key: "products",
    label: "Products",
    subItems: [
      {
        name: "Products List",
        url: "/products",
        permission: "view_products",
      },
      {
        name: "Add Products",
        url: "/product/create",
        permission: "create_products",
      },
      {
        name: "Products Category",
        url: "/products/category",
        permission: "view_products_category",
      },
      {
        name: "Products Brands",
        url: "/products/brands",
        permission: "view_products_brands",
      },
    ],
    icon: (
      <AiOutlineGift className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
    ),
  },
  {
    key: "purchases",
    label: "Purchases",
    subItems: [
      {
        name: "Purchases List",
        url: "/purchase",
        permission: "view_purchases",
      },
      {
        name: "New Purchases",
        url: "/purchase/create",
        permission: "create_purchases",
      },
      // {
      //   name: "Purchases Return List",
      //   url: "/purchases/return/list",
      //   permission: "view_purchases_returns",
      // },
      // {
      //   name: "Purchases Due",
      //   url: "/purchases/due",
      //   permission: "view_purchases_due",
      // },
    ],
    icon: (
      <BiPurchaseTag className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
    ),
  },
  {
    key: "sales",
    label: "Sales",
    subItems: [
      {
        name: "Sales List",
        url: "/sale",
        permission: "view_sales",
      },
      {
        name: "Add Sale",
        url: "/sale/create",
        permission: "create_sales",
      },
    ],
    icon: (
      <GiExpense className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
    ),
  },
  
  {
    key: "stock",
    label: "Stock",
    subItems: [
      {
        name: "Products Stocks",
        url: "/products/stock",
        permission: "stocks",
      },
    ],
    icon: (
      <RiStockFill className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
    ),
  },
  {
    key: "expenses",
    label: "Expenses",
    subItems: [
      {
        name: "Expenses List",
        url: "/expenses/list",
        permission: "expenses",
      }
    ],
    icon: (
      <TbCoinTaka className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
    ),
  },
  {
    key: "report",
    label: "Report",
    subItems: [
      {
        name: "Report",
        url: "/report/list",
        permission: "view_report",
      },
      
    ],
    icon: (
      <HiOutlineDocumentReport className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
    ),
  },
  // {
  //   key: "user",
  //   label: "User",
  //   subItems: [
  //     {
  //       name: "User List",
  //       url: "/user/list",
  //       permission: "view_users",
  //     },
  //     {
  //       name: "Add User",
  //       url: "/user/create",
  //       permission: "create_users",
  //     },
  //     {
  //       name: "Role List",
  //       url: "/role/list",
  //       permission: "view_roles",
  //     },
  //     {
  //       name: "Permissions",
  //       url: "/permission",
  //       permission: "manage_permissions",
  //     },
  //   ],
  //   icon: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       fill="none"
  //       viewBox="0 0 24 24"
  //       strokeWidth="1.5"
  //       stroke="currentColor"
  //       className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
  //     >
  //       <path
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
  //       />
  //     </svg>
  //   ),
  // },
];
