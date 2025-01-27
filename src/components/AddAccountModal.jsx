import React, { useEffect, useRef, useState } from "react";
import { useAddUser } from "../hooks/useSchoolUsers";
import SelectWithSearch from "./SelectWithSearch";
import "./css/checkmark.css";

const AddAccountModal = ({ schoolList }) => {
  const formRef = useRef(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    lastname: "",
    firstname: "",
    middlename: "",
    extension: "",
    school_UID: "",
    access: true,
  });

  const {
    mutate: addSchoolUserHook,
    error: mutationError,
    isPending: mutationPending,
    isSuccess: mutationSuccess,
  } = useAddUser(setFormData);

  useEffect(() => {
    if (mutationSuccess) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [mutationSuccess]);

  const handleAddAccount = (e) => {
    e.preventDefault();

    addSchoolUserHook(formData);
  };

  return (
    <dialog id="add_account" className="modal">
      <div className="modal-box w-11/12 max-w-xl">
        <h3 className="font-bold text-lg">Add Account</h3>

        {mutationPending && (
          <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-[#FFFFFF80]">
            <span className="loading loading-ring loading-lg"></span>
          </div>
        )}

        {showSuccess && (
          <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-[#FFFFFF80]">
            <svg
              className="checkmark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                className="checkmark__circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                className="checkmark__check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
          </div>
        )}

        <div>
          {/* modal body */}
          <form onSubmit={handleAddAccount} ref={formRef}>
            <div className="md:grid md:grid-cols-2 md:gap-3 mt-2 overflow-y-auto p-2">
              <div className="">
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text">Username</span>
                  </div>
                  <input
                    required
                    type="text"
                    value={formData.username}
                    placeholder=""
                    className="input input-bordered w-full"
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                    }
                  />
                </label>
              </div>

              <div className="">
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text">Password</span>
                  </div>
                  <input
                    required
                    type="password"
                    value={formData.password}
                    placeholder="***********"
                    className="input input-bordered w-full "
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                  />
                </label>
              </div>

              <div className="md:col-span-2">
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text">Email</span>
                  </div>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    placeholder=""
                    className="input input-bordered w-full "
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </label>
              </div>

              <div className="">
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text">Lastname</span>
                  </div>
                  <input
                    value={formData.lastname}
                    required
                    type="text"
                    placeholder=""
                    className="input input-bordered w-full "
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        lastname: e.target.value,
                      }))
                    }
                  />
                </label>
              </div>

              <div className="">
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text">Firstname</span>
                  </div>
                  <input
                    required
                    value={formData.firstname}
                    type="text"
                    placeholder=""
                    className="input input-bordered w-full "
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        firstname: e.target.value,
                      }))
                    }
                  />
                </label>
              </div>

              <div className="">
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text">Middlename</span>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    className="input input-bordered w-full "
                    value={formData.middlename}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        middlename: e.target.value,
                      }))
                    }
                  />
                </label>
              </div>

              <div className="">
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text">Extension</span>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    value={formData.extension}
                    className="input input-bordered w-full "
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        extension: e.target.value,
                      }))
                    }
                  />
                </label>
              </div>

              <div className="col-span-2">
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text">School</span>
                  </div>
                  <SelectWithSearch
                    options={schoolList}
                    onSelect={setFormData}
                  />
                </label>
              </div>

              <div className="mt-4 md:col-span-2">
                <div className="flex items-center gap-2">
                  <p>Access: </p>
                  <input
                    type="checkbox"
                    className="toggle"
                    value={formData.access}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        access: e.target.checked,
                      }))
                    }
                    defaultChecked
                  />
                </div>
              </div>
            </div>
          </form>

          {mutationError && (
            <div role="alert" className="alert alert-error mt-2">
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
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{mutationError.response.data.message}</span>
            </div>
          )}

          {/* modal footer */}
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-neutral">Close</button>
            </form>

            <button
              className="btn btn-outline btn-success text-green-800"
              onClick={() => {
                if (formRef.current.checkValidity()) {
                  handleAddAccount(
                    new Event("submit", { bubbles: true, cancelable: true })
                  );
                } else {
                  formRef.current.reportValidity();
                }
              }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default AddAccountModal;
