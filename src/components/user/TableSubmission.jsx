import React, { useEffect, useRef, useState } from "react";
import { FaEye, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import BarcodePrintPage from "../printable/BarcodePrintPage";

import { TiPrinter } from "react-icons/ti";

const TableSubmission = ({
  filterStatus,
  searchQuery,
  currentPage,
  setCurrentPage,
  fetchData,
  fetchStatus,
  setSearchParams,
}) => {
  const [data, setData] = useState([]);
  const [printData, setPrintData] = useState(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (fetchData?.data && Array.isArray(fetchData.data)) {
      const formattedData = fetchData.data.map((data) => {
        return {
          id: data.bulk_id,
          Institution: data.school_user.School.school_name,
          Course: data.course,
          ESIncharge: "",
          DateSubmitted: data.createdAt,
          status: data.status,
          barcode_image: data.barcode_image,
          students: data.students,
        };
      });

      setData(formattedData || []);
    } else {
      setData([]);
    }
  }, [fetchData, fetchStatus]);

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
    const matchesSearch = Object.entries(user).some(([key, value]) => {
      if (key === "barcode_image" || key === "students") return false;
      return value
        .toString()
        .toLowerCase()
        .includes(searchQuery.toString().toLowerCase());
    });

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

  // view row function
  const handleViewRow = (newPage) => {
    setSearchParams({ page: newPage });
  };

  const handePrintBarcodeDoc = (values) => {
    setPrintData(values);

    setTimeout(() => {
      print();
    }, 1000);
  };

  const print = useReactToPrint({
    contentRef,
    documentTitle: "Application Leave Form",
  });

  return (
    <>
      <div className="hidden">
        {printData && <BarcodePrintPage ref={contentRef} data={printData} />}
      </div>

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
                <th
                  onClick={() => sortData("Course")}
                  className="cursor-pointer"
                >
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
                <th>
                  <p className="flex items-center">Actions</p>
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
                  <td className="flex gap-2">
                    <div
                      className="tooltip tooltip-left"
                      data-tip="View Details"
                    >
                      <button
                        className="btn btn-sm btn-circle btn-outline"
                        type="button"
                        onClick={() => handleViewRow(user.id)}
                      >
                        <FaEye />
                      </button>
                    </div>
                    <div
                      className="tooltip tooltip-left"
                      data-tip="Print Barcodes"
                    >
                      <button
                        className="btn btn-sm btn-circle btn-outline"
                        type="button"
                        onClick={() => handePrintBarcodeDoc(user)}
                      >
                        <TiPrinter />
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
    </>
  );
};

export default TableSubmission;
