import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";

import { FiPackage } from "react-icons/fi";
import { FaRegFileAlt } from "react-icons/fa";

import TableSubmission from "../../components/user/TableSubmission";
import TableSubmissionStudents from "../../components/user/TableSubmissionStudents";
import SingleModal from "../../components/user/SingleModal";
import { BulkModal } from "../../components/user/BulkModal";
import { useFetchBulkPerUser } from "../../hooks/useSubmission";

const SubmissionUser = () => {
  // state for main panel
  const [filterStatus, setFilterStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // state for dynamic panel
  const [filterStatus2nd, setFilterStatus2nd] = useState("");
  const [searchQuery2nd, setSearchQuery2nd] = useState("");
  const [currentPage2nd, setCurrentPage2nd] = useState(1);
  const [filteredData, setFilteredData] = useState({});

  // url search params
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");

  // fetch query
  const { data: bulkData, isSuccess: queryFetchIsSuccess } =
    useFetchBulkPerUser();

  // setting up filtered Data
  useEffect(() => {
    if (bulkData && queryFetchIsSuccess) {
      const filtered = bulkData.data.find((obj) => obj.bulk_id === page);
      setFilteredData(filtered);
    }
  }, [page, bulkData, queryFetchIsSuccess]);

  return (
    <>
      <BulkModal />
      <SingleModal />
      {/* Breadcrumbs */}
      <div className="breadcrumbs text-sm mb-2 ml-3">
        <ul>
          <li>
            <Link to="/user/submission">Submission</Link>
          </li>
          <li>
            <p>{page}</p>
          </li>
        </ul>
      </div>

      {!page ? (
        // main panel
        <div>
          {/* Top panel (dropdown and input search) */}
          <div className="flex flex-col gap-2 md:flex-row md:justify-between overflow-x-auto px-2">
            <div className="flex flex-col md:flex-row gap-2">
              <div>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    type="text"
                    className="grow"
                    placeholder="Search"
                  />
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

              <div className="w-full md:max-w-xs">
                <select
                  value={filterStatus}
                  onChange={(e) => {
                    setFilterStatus(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="select select-bordered w-full"
                >
                  <option value="">
                    All
                  </option>
                  <option value="pending">Pending</option>
                  <option value="received">Received</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                className="btn btn-neutral"
                type="button"
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
              >
                <FiPackage size="25px" />
                Add Bulk
              </button>

              <button
                className="btn btn-ghost"
                type="button"
                onClick={() =>
                  document.getElementById("my_modal_2").showModal()
                }
              >
                <FaRegFileAlt size="25px" />
                Add Single
              </button>
            </div>
          </div>

          {/* Table */}

          <div className="mt-5">
            <TableSubmission
              filterStatus={filterStatus}
              searchQuery={searchQuery}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              fetchData={bulkData}
              fetchStatus={queryFetchIsSuccess}
              setSearchParams={setSearchParams}
            />
          </div>
        </div>
      ) : (
        // dynamic panel
        <div>
          {/* Top panel (dropdown and input search) */}
          <div className="flex flex-col gap-2 md:flex-row md:justify-between overflow-x-auto px-2">
            <div className="flex gap-2">
              <div>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    value={searchQuery2nd}
                    onChange={(e) => {
                      setSearchQuery2nd(e.target.value);
                      setCurrentPage2nd(1);
                    }}
                    type="text"
                    className="grow"
                    placeholder="Search"
                  />
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
                <select
                  value={filterStatus2nd}
                  onChange={(e) => {
                    setFilterStatus2nd(e.target.value);
                    setCurrentPage2nd(1);
                  }}
                  className="select select-bordered"
                >
                  <option value="" selected>
                    All
                  </option>
                  <option value="pending">Pending</option>
                  <option value="received">Received</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table */}

          <div className="mt-5">
            <TableSubmissionStudents
              filterStatus={filterStatus2nd}
              searchQuery={searchQuery2nd}
              currentPage={currentPage2nd}
              setCurrentPage={setCurrentPage2nd}
              dataFiltered={filteredData}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SubmissionUser;
