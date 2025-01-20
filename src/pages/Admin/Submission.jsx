import React from "react";
import { FiPackage } from "react-icons/fi";
import { FaRegFileAlt } from "react-icons/fa";

import TableSubmission from "../../components/TableSubmission";
import { BulkModal } from "../../components/BulkModal";
import SingleModal from "../../components/SingleModal";

const Submission = () => {
  return (
    <>
      <BulkModal />
      <SingleModal />
      <div>
        {/* Top panel (dropdown and input search) */}
        <div className="flex flex-col gap-2 md:flex-row md:justify-between overflow-x-auto px-2">
          <div className="flex gap-2">
            <div>
              <label className="input input-bordered flex items-center gap-2">
                <input type="text" className="grow" placeholder="Search" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            </div>

            <div className="w-full max-w-xs">
              <select className="select select-bordered">
                <option disabled selected>
                  Status
                </option>
                <option>Pending</option>
                <option>Received</option>
                <option>Rejected</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              className="btn btn-neutral"
              type="button"
              onClick={() => document.getElementById("my_modal_1").showModal()}
            >
              <FiPackage size="25px" />
              Add Bulk
            </button>

            <button
              className="btn btn-ghost"
              type="button"
              onClick={() => document.getElementById("my_modal_2").showModal()}
            >
              <FaRegFileAlt size="25px" />
              Add Single
            </button>
          </div>
        </div>

        {/* Table */}

        <div className="mt-5">
          <TableSubmission />
        </div>
      </div>
    </>
  );
};

export default Submission;
