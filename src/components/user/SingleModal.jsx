import React, { useRef } from "react";

const SingleModal = () => {
  const formRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <div>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Single Submission</h3>
          {/* Body */}
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
                className="input input-bordered w-full max-w-64"
                required
              />

              <div className="grid grid-cols-2 gap-2">
                <p className="col-span-2">Student's Info</p>

                <input
                  type="text"
                  placeholder="Lastname"
                  className="input input-bordered w-full "
                  required
                />

                <input
                  type="text"
                  placeholder="Firstname"
                  className="input input-bordered w-full "
                  required
                />

                <input
                  type="text"
                  placeholder="Middlename"
                  className="input input-bordered w-full"
                />

                <input
                  type="text"
                  placeholder="Extension Name"
                  className="input input-bordered w-full"
                />

                <input
                  type="text"
                  placeholder="Suffix"
                  className="input input-bordered w-full"
                />
              </div>

              <p>Student's date of graduation</p>
              <input
                type="text"
                placeholder="Date Graduated"
                className="input input-bordered w-full max-w-64"
                required
              />
            </div>
          </form>

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
