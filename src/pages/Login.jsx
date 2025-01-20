import React from "react";
import logo from "../assets/preSo_logo.png";

const Login = () => {
  return (
    <div className="flex justify-center mt-10">
      <div className="card lg:card-side w-full max-w-[900px] bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Login</h2>

          <p className="prose">Hi, Welcome back!</p>

          <div className="flex flex-col gap-2 h-full">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input type="text" className="grow" placeholder="Username" />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input type="password" className="grow" placeholder="Password"/>
            </label>
          </div>

          <div>
            <button className="btn btn-neutral w-full">LOGIN</button>
          </div>
        </div>
        <figure className="p-4">
          <img className="w-64" src={logo} alt="Album" />
        </figure>
      </div>
    </div>
  );
};

export default Login;
