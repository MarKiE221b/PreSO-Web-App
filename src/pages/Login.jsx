import React, { useRef, useState } from "react";
import logo from "../assets/preSo_logo.png";
import { useLogin } from "../hooks/useAuthentication";
import { useNavigate } from "react-router";

const Login = () => {
  const [formdata, setFormdata] = useState({
    username: "",
    password: "",
  });

  const formRef = useRef(null);
  const navigate = useNavigate();

  const {
    mutateAsync: mutateLogin,
    isError: loginError,
    error: errorDetLogin,
  } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await mutateLogin(formdata);

      if (localStorage.getItem("ROLE") === "Admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="card lg:card-side w-full max-w-[900px] bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Login</h2>

          <p className="prose">Hi, Welcome back!</p>

          <form onSubmit={handleLogin} ref={formRef}>
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
                <input
                  type="text"
                  value={formdata.username}
                  onChange={(e) =>
                    setFormdata((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                  required
                  className="grow"
                  placeholder="Username"
                />
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
                <input
                  type="password"
                  value={formdata.password}
                  onChange={(e) =>
                    setFormdata((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  required
                  className="grow"
                  placeholder="Password"
                />
              </label>
            </div>
          </form>

          {loginError && (
            <div role="alert" className="alert alert-warning">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{errorDetLogin.response.data.message}</span>
            </div>
          )}

          <div>
            <button
              onClick={() => {
                if (formRef.current.checkValidity()) {
                  handleLogin(
                    new Event("submit", { bubbles: true, cancelable: true })
                  );
                } else {
                  formRef.current.reportValidity();
                }
              }}
              className="btn btn-neutral w-full"
            >
              LOGIN
            </button>
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
