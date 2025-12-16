import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { getUser } from "../../store/API/userApis";
import { useAppDispatch } from "../../store/hooks";

const Layout = () => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch])
  return (
    <div className="dark:bg-gray-800">
      <div x-data="{ isMobileMainMenuOpen : true }" className="main_sec">
        <Header setOpenSidebar={setOpenSidebar} openSidebar={openSidebar} />
        <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
          <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
          <div
            className={`relative w-full h-full overflow-y-auto bg-gray-50 lg:pl-64 dark:bg-gray-900 flex-1 transition-all ${
              openSidebar ? " lg:ml-[-200px]" : "lg:ml-16"
            }`}
          >
            {/* {`flex-1 transition-all${openSidebar ? "ml-64" : "ml-16"}`} */}
            <Outlet />
            {/* <Footer /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
