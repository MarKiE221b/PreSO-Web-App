import React, { useEffect } from "react";
import logo from "../assets/preSo_logo.png";
import chedLogo from "../assets/CHED-LOGO_orig (1).png";
import { BsCloudUpload } from "react-icons/bs";

import ThemeController from "../components/user/ThemeController";
import { Link, Outlet, useNavigate } from "react-router";
import { useVerifyToken } from "../hooks/useAuthentication";

const UserLayout = () => {
  const {
    mutateAsync: verifyMutation,
    isPending: pendingMutation,
    isSuccess: successfulMutate,
  } = useVerifyToken();

  const navigate = useNavigate();

  useEffect(() => {
    const verifyFunction = async () => {
      try {
        const payload = await verifyMutation({
          token: localStorage.getItem("ACCESSTOKEN"),
        });
        if (payload.payload.role !== "User") {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
        navigate("/");
      }
    };

    verifyFunction();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (pendingMutation)
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );

  if (successfulMutate)
    return (
      <div className="h-screen flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-100 px-4">
          <div className="flex-1">
            <div className="text-xl">
              <img src={logo} className="h-14 w-14" alt="logo" />
            </div>
          </div>
          <div className="flex-none gap-2">
            <div>
              <ul className="menu menu-horizontal bg-base-200 rounded-box">
                <li>
                  <ThemeController />
                </li>
              </ul>
            </div>

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <button type="button" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Menu bar */}
        <div className="mx-4 mt-4">
          <ul className="menu bg-base-200 lg:menu-horizontal rounded-box">
            <li>
              <Link to="/user/dashboard">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Dashboard
                <span className="badge badge-sm">99+</span>
              </Link>
            </li>
            <li>
              <Link to="/user/submission">
                <BsCloudUpload size="20px" />
                Submissions
              </Link>
            </li>
          </ul>
        </div>

        {/* Page */}
        <div className="mt-5 bg-base-200 rounded-box p-5 mx-4 mb-4">
          <Outlet />
        </div>

        {/* footer */}

        <footer className="footer bg-base-300 items-center p-4 mt-auto">
          <aside className="grid-flow-col items-center">
            <img src={chedLogo} alt="ched-logo" className="h-[25px]" />

            <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
          </aside>
        </footer>
      </div>
    );
};

export default UserLayout;
