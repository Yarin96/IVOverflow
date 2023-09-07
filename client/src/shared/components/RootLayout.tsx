import React from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "../../shared/components/Navigation/MainNavigation";

const RootLayout: React.FC = () => {
  return (
    <div>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
