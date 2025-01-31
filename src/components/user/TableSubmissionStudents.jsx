import React, { useEffect, useState } from "react";
import { FaEye, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

const TableSubmissionStudents = ({
  filterStatus,
  searchQuery,
  currentPage,
  setCurrentPage,
  dataFiltered,
}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (dataFiltered?.students && Array.isArray(dataFiltered.students)) {
      const formattedData = dataFiltered.students.map((data) => {
        return {
          id: data.student_id,
          name: `${data.lastname}, ${data.firstname} ${
            data.middlename ? data.middlename : ""
          } ${data.extname ? data.extname : ""}.`,
          date_graduated: data.date_graduated,
          status: data.status,
        };
      });

      setData(formattedData || []);
    } else {
      setData([]);
    }
  }, [dataFiltered]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const statusColors = {
    received: "bg-green-300 text-green-800",
    pending: "bg-yellow-300 text-yellow-800",
    rejected: "bg-red-300 text-red-800",
  };

  const rowsPerPage = 10;

  // Filter and paginate data
  const filteredData = data.filter((user) => {
    const matchesStatus = !filterStatus || user.status === filterStatus;
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
              <th onClick={() => sortData("id")} className="cursor-pointer">
                <p className="flex items-center">
                  # <span className="ml-2">{getSortIcon("id")}</span>
                </p>
              </th>
              <th onClick={() => sortData("name")} className="cursor-pointer">
                <p className="flex items-center">
                  Name <span className="ml-2">{getSortIcon("name")}</span>
                </p>
              </th>
              <th
                onClick={() => sortData("date_graduated")}
                className="cursor-pointer"
              >
                <p className="flex items-center">
                  Date Graduated{" "}
                  <span className="ml-2">{getSortIcon("date_graduated")}</span>
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
                <td>{user.name}</td>
                <td>{user.date_graduated}</td>
                <td>
                  <span className={`badge ${statusColors[user.status]} `}>
                    {user.status}
                  </span>
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

export default TableSubmissionStudents;
