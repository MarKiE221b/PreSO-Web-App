import React, { useEffect, useState } from "react";
import LineChart from "../../components/LineChart";
import { useDashboardAdminCount } from "../../hooks/useDashboard";

const Dashboard = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource(
      `http://10.40.2.35:8000/get-notification?token=${localStorage.getItem(
        "ACCESSTOKEN"
      )}`
    );

    eventSource.onmessage = (event) => {
      const newNotification = JSON.parse(event.data);
      setNotifications((prev) => [...prev, newNotification]);
    };

    eventSource.onerror = (error) => {
      console.error("SSE Error:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const { data: adminCountData } = useDashboardAdminCount();

  return (
    <div>
      <div className="flex flex-col gap-5">
        {/* Stats */}
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">No. of Submission</div>
            <div className="stat-value">
              {adminCountData?.data.studentCount}
            </div>
            <div className="stat-desc">{`${
              adminCountData?.dateStart.split("T")[0]
            } - ${adminCountData?.dateEnd.split("T")[0]}`}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Bulk Submission</div>
            <div className="stat-value">{adminCountData?.data.bulkCount}</div>
            <div className="stat-desc">{`${
              adminCountData?.dateStart.split("T")[0]
            } - ${adminCountData?.dateEnd.split("T")[0]}`}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                ></path>
              </svg>
            </div>
            <div className="stat-title">S.O. Received</div>
            <div className="stat-value">
              {adminCountData?.data.studentReceivedCount}
            </div>
            <div className="stat-desc"></div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-8 w-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                ></path>
              </svg>
            </div>
            <div className="stat-title">S.O. Rejected</div>
            <div className="stat-value">0</div>
            <div className="stat-desc"></div>
          </div>
        </div>

        <div className="grid grid-rows-1 gap-5 md:grid-cols-2">
          {/* Notification */}
          <div className="">
            <h3 className="mb-3 px-5 font-semibold">Notifications</h3>
            <div className="overflow-x-auto max-h-[500px]">
              <table className="table ">
                {/* head */}
                <thead></thead>
                <tbody>
                  {/* row 1 */}
                  {notifications.map((row, key) => (
                    <tr key={key}>
                      <td className="py-1">
                        <div
                          role="alert"
                          className="alert bg-base-100 shadow-lg"
                        >
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
                            <div className="text-xs">{row.message}</div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Line Chart */}

          <div className="overflow-x-auto">
            <LineChart fetchedData={adminCountData ? adminCountData : {}} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
