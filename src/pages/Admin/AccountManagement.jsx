import React, { useState } from "react";
import TableAccount from "../../components/TableAccount";
import AddAccountModal from "../../components/AddAccountModal";

import { CiCirclePlus } from "react-icons/ci";
import { useSchoolList } from "../../hooks/useSchoolUsers";

const AccountManagement = () => {
  const [filterStatus, setFilterStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: schoolList } = useSchoolList();

  return (
    <>
      <AddAccountModal schoolList={schoolList} />
      <div>
        {/* Top panel (dropdown and input search) */}
        <div className="flex flex-col gap-2 md:flex-row md:justify-between overflow-x-auto px-2">
          <div className="flex gap-2">
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

            <div className="w-full max-w-xs">
              <select
                value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value);
                  setCurrentPage(1);
                }}
                className="select select-bordered"
              >
                <option value="" selected>
                  All
                </option>
                {schoolList?.map((list, i) => (
                  <option key={i} value={list.school_UID}>
                    {list.school_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              className="btn btn-ghost"
              type="button"
              onClick={() => document.getElementById("add_account").showModal()}
            >
              <CiCirclePlus size="25px" />
              Add Account{" "}
            </button>
          </div>
        </div>

        <div className="mt-5">
          <TableAccount
            filterStatus={filterStatus}
            searchQuery={searchQuery}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
};

export default AccountManagement;
