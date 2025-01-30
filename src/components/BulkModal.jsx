import React, { useEffect, useState } from "react";
import DragAndDropFileUpload from "./DragAndDropFileUpload";
import { useUploadBulk } from "../hooks/useSubmission";

export const BulkModal = () => {
  const formRef = React.useRef(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    school_id: "6796e5e390762393165e4c48",
    course: "",
    excelFile: null,
  });

  const {
    mutate: useUploadForm,
    error: mutationError,
    isSuccess: mutationSuccess,
    isPending: mutationPending,
  } = useUploadBulk(setFormData);

  const handleAddAccount = (e) => {
    e.preventDefault();

    useUploadForm(formData);
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
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg">Bulk Submission</h3>

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
          <form ref={formRef} onSubmit={handleAddAccount}>
            <input
              type="text"
              value={formData.course}
              placeholder="Program / Course"
              className="my-4 input input-bordered w-full"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, course: e.target.value }))
              }
              required
            />

            <DragAndDropFileUpload
              file={formData.excelFile}
              setFile={setFormData}
            />
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
