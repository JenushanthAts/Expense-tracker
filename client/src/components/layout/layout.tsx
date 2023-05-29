import React from "react";
import { Outlet } from "react-router-dom";
import Topbar from "./topbar/Topbar";

const Layout: React.FC = () => {
  return (
    <div>
      <Topbar />
      <Outlet />
    </div>
  );
};

export default Layout;
