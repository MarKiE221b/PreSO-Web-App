import React, { useEffect, useState } from "react";
import { FaEye, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { useSchoolUser } from "../hooks/useSchoolUsers";

const TableAccount = ({
  filterStatus,
  searchQuery,
  currentPage,
  setCurrentPage,
}) => {
  // useSchoolUser hook to fetch data
  const { data: useUserListData } = useSchoolUser();
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(useUserListData?.data || []);
  }, [useUserListData]);

  // State for sorting

  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const statusColors = {
    Received: "bg-green-300 text-green-800",
    Pending: "bg-yellow-300 text-yellow-800",
    Rejected: "bg-red-300 text-red-800",
  };

  const rowsPerPage = 10;

  // Filter and paginate data
  const filteredData = data.filter((user) => {
    const matchesStatus =
      !filterStatus || user.School.school_UID === filterStatus;
    const matchesSearch = Object.values(user).some((value) =>
      value
        .toString()
        .toLowerCase()
        .includes(searchQuery.toString().toLowerCase())
    );

    return matchesStatus && matchesSearch;
  });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  //   sorting function

  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setData(sortedData);
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort />;
    return sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />;
  };

  return (
    <div className="p-4 bg-base-100 rounded-xl shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Submissions</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* Table header */}
          <thead>
            <tr>
              <th>
                <p className="flex items-center">Name</p>
              </th>
              <th
                onClick={() => sortData("username")}
                className="cursor-pointer"
              >
                <p className="flex items-center">
                  Username{" "}
                  <span className="ml-2">{getSortIcon("username")}</span>
                </p>
              </th>
              <th className="cursor-pointer">
                <p className="flex items-center">Institution </p>
              </th>
              <th
                onClick={() => sortData("createdAt")}
                className="cursor-pointer"
              >
                <p className="flex items-center">
                  Created At{" "}
                  <span className="ml-2">{getSortIcon("createdAt")}</span>
                </p>
              </th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {paginatedData.map((user, index) => (
              <tr key={user.school_id}>
                <th>{`${user.lastname}, ${user.firstname} ${
                  user.middlename ? user.middlename : ""
                } ${user.extname ? user.extname : ""}`}</th>
                <td>{user.username}</td>
                <td>{user.School.school_name}</td>
                <td>{user.createdAt}</td>

                <td>
                  <div className="tooltip tooltip-left" data-tip="View Details">
                    <button className="btn btn-sm btn-circle btn-outline">
                      <FaEye />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="btn btn-sm btn-outline"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <div>
          Page <span className="font-bold">{currentPage}</span> of{" "}
          <span className="font-bold">{totalPages}</span>
        </div>
        <button
          className="btn btn-sm btn-outline"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableAccount;
