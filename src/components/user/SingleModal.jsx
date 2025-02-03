import React, { useEffect, useRef, useState } from "react";
import { useUploadSingle } from "../../hooks/useSubmission";

const SingleModal = () => {
  const formRef = useRef(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    school_id: localStorage.getItem("_id"),
    course: "",
    lastname: "",
    firstname: "",
    middlename: "",
    extname: "",
    suffix: "",
    date_graduated: "",
  });

  const {
    mutateAsync: singleUploadMutate,
    isSuccess: mutationSuccess,
    isPending: mutationPending,
    error: mutationError,
  } = useUploadSingle();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await singleUploadMutate(formData);

    setFormData({
      school_id: localStorage.getItem("_id"),
      course: "",
      lastname: "",
      firstname: "",
      middlename: "",
      extname: "",
      suffix: "",
      date_graduated: "",
    });
  };

  useEffect(() => {
    if (mutationSuccess) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
        formRef.current.reset();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [mutationSuccess]);

  return (
    <div>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Single Submission</h3>
          {/* Body */}

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

          <div role="alert" className="alert my-2 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-info h-6 w-6 shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <div>
              <p>
                Please fill in the details. Fields with{" "}
                <span className="text-red-700">(*)</span> are required{" "}
              </p>
            </div>
          </div>
          {/* Form */}
          <form id="submitFormSingle" onSubmit={handleSubmit} ref={formRef}>
            <div className="grid grid-rows-1 gap-2 my-2">
              <p>Student's program/course</p>

              <input
                type="text"
                placeholder="Course*"
                value={formData.course}
                className="input input-bordered w-full max-w-64"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, course: e.target.value }))
                }
                required
              />

              <div className="grid grid-cols-2 gap-2">
                <p className="col-span-2">Student's Info</p>

                <input
                  type="text"
                  placeholder="Lastname"
                  value={formData.lastname}
                  className="input input-bordered w-full "
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      lastname: e.target.value,
                    }))
                  }
                  required
                />

                <input
                  type="text"
                  placeholder="Firstname"
                  value={formData.firstname}
                  className="input input-bordered w-full "
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      firstname: e.target.value,
                    }))
                  }
                  required
                />

                <input
                  type="text"
                  placeholder="Middlename"
                  value={formData.middlename}
                  className="input input-bordered w-full"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      middlename: e.target.value,
                    }))
                  }
                />

                <input
                  type="text"
                  placeholder="Extension Name"
                  value={formData.extname}
                  className="input input-bordered w-full"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      extname: e.target.value,
                    }))
                  }
                />

                <input
                  type="text"
                  placeholder="Suffix"
                  value={formData.suffix}
                  className="input input-bordered w-full"
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, suffix: e.target.value }))
                  }
                />
              </div>

              <p>Student's date of graduation</p>
              <input
                type="date"
                placeholder="Date Graduated"
                value={formData.date_graduated}
                className="input input-bordered w-full max-w-64"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    date_graduated: e.target.value,
                  }))
                }
                required
              />
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

          {/* footer buttons */}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-neutral">Close</button>
            </form>
            <button
              className="btn btn-outline btn-success"
              onClick={() => {
                if (formRef.current.checkValidity()) {
                  handleSubmit(
                    new Event("submit", { bubbles: true, cancelable: true })
                  );
                } else {
                  formRef.current.reportValidity();
                }
              }}
            >
              submit
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default SingleModal;
