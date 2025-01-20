import React from "react";
import logo from "../assets/preSo_logo.png";
import chedLogo from "../assets/CHED-LOGO_orig (1).png"
import ThemeController from "../components/ThemeController";

const MainLayout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col">
      {/* Nav */}
      <div className="navbar bg-base-100">
        <div className="flex-1"></div>
        <div className="flex-none">
          <div>
            <ul className="menu menu-horizontal bg-base-200 rounded-box">
              <li>
                <ThemeController />
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* body */}
      <>{children}</>

      {/* footer */}

      <footer className="footer bg-base-300  items-center p-4 mt-auto">
        <aside className="grid-flow-col items-center">
          <img src={chedLogo} alt="ched-logo" className="h-[25px]"/>
          <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
        </aside>
      </footer>
    </div>
  );
};

export default MainLayout;
