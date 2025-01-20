import React, { useState } from "react";
import { FaEye, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

const TableSubmission = () => {
  const [data, setData] = useState(
    Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      Institution: `User ${i + 1}`,
      Course: `Course${i + 1}`,
      ESIncharge: `ES In-charge${i + 1}`,
      DateSubmitted: new Date().toLocaleDateString(),
      status: i % 3 === 0 ? "Received" : i % 3 === 1 ? "Pending" : "Rejected",
    }))
  );

  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const statusColors = {
    Received: "badge-success bg-[#32CD32]",
    Pending: "badge-warning",
    Rejected: "badge-error",
  };

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Calculate total pages
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Paginate data
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + rowsPerPage);

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
              <th onClick={() => sortData("id")} className="cursor-pointer">
                <p className="flex items-center">
                  # <span className="ml-2">{getSortIcon("id")}</span>
                </p>
              </th>
              <th
                onClick={() => sortData("Institution")}
                className="cursor-pointer"
              >
                <p className="flex items-center">
                  Institution{" "}
                  <span className="ml-2">{getSortIcon("Institution")}</span>
                </p>
              </th>
              <th onClick={() => sortData("Course")} className="cursor-pointer">
                <p className="flex items-center">
                  Course <span className="ml-2">{getSortIcon("Course")}</span>
                </p>
              </th>
              <th
                onClick={() => sortData("ESIncharge")}
                className="cursor-pointer"
              >
                <p className="flex items-center">
                  ES In-charge{" "}
                  <span className="ml-2">{getSortIcon("ESIncharge")}</span>
                </p>
              </th>
              <th
                onClick={() => sortData("DateSubmitted")}
                className="cursor-pointer"
              >
                <p className="flex items-center">
                  Date Submitted{" "}
                  <span className="ml-2">{getSortIcon("DateSubmitted")}</span>
                </p>
              </th>
              <th>
                <p className="flex items-center">Status</p>
              </th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {paginatedData.map((user, index) => (
              <tr key={user.id}>
                <th>{user.id}</th>
                <td>{user.Institution}</td>
                <td>{user.Course}</td>
                <td>{user.ESIncharge}</td>
                <td>{user.DateSubmitted}</td>
                <td>
                  <span className={`badge ${statusColors[user.status]} `}>
                    {user.status}
                  </span>
                </td>
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

export default TableSubmission;
