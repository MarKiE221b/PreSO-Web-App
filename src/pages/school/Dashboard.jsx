import React from "react";

import { Paper, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

import { IoDocumentAttach } from "react-icons/io5";
import { PiPackageFill } from "react-icons/pi";
import { FaFileDownload, FaChartLine, FaDatabase } from "react-icons/fa";
import { FaFileUpload } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

import { dataset } from "../../data/sampleData";

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center gap-10 ">
      <div className="grid grid-rows-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <Paper
          variant="elevation"
          sx={{
            borderWidth: "2px",
            borderStyle: "solid",
            borderColor: "#1b6297",
            backgroundColor: "#3573a2",
            overflow: "auto",
            padding: "20px",
          }}
        >
          <div className="flex items-center gap-3">
            <div className="sm:block md:hidden lg:block">
              <IoDocumentAttach size={"100px"} color="white" />
            </div>
            <div className="w-full">
              <Typography variant="h3" textAlign={"end"} color="white">
                200
              </Typography>
              <Typography
                variant="body1"
                textAlign={"end"}
                color="white"
                noWrap
              >
                No. of Submission
              </Typography>
            </div>
          </div>
        </Paper>
        <Paper
          variant="elevation"
          sx={{
            borderWidth: "2px",
            borderStyle: "solid",
            borderColor: "#1b9765",
            backgroundColor: "#67b998",
            overflow: "auto",
            padding: "20px",
          }}
        >
          <div className="flex items-center gap-3">
            <div className="sm:block md:hidden lg:block">
              <PiPackageFill size={"100px"} color="white" />
            </div>
            <div className="w-full">
              <Typography variant="h3" textAlign={"end"} color="white">
                30
              </Typography>
              <Typography
                variant="body1"
                color="white"
                textAlign={"end"}
                noWrap
              >
                No. of Bulk Submission
              </Typography>
            </div>
          </div>
        </Paper>
        <Paper
          variant="elevation"
          sx={{
            borderWidth: "2px",
            borderStyle: "solid",
            borderColor: "#ae8e4e",
            backgroundColor: "#b99e67",
            overflow: "auto",
            padding: "20px",
          }}
        >
          <div className="flex items-center gap-3">
            <div className="sm:block md:hidden lg:block">
              <FaFileDownload size={"100px"} color="white" />
            </div>
            <div className="w-full">
              <Typography variant="h3" textAlign={"end"} color="white">
                30
              </Typography>
              <Typography
                variant="body1"
                color="white"
                textAlign={"end"}
                noWrap
              >
                No. of SO Received
              </Typography>
            </div>
          </div>
        </Paper>
        <Paper
          variant="elevation"
          sx={{
            borderWidth: "2px",
            borderStyle: "solid",
            borderColor: "#ae4e4e",
            backgroundColor: "#b96767",
            overflow: "auto",
            padding: "20px",
          }}
        >
          <div className="flex items-center gap-3">
            <div className="sm:block md:hidden lg:block">
              <MdCancel size={"100px"} color="white" />
            </div>
            <div className="w-full">
              <Typography variant="h3" textAlign={"end"} color="white">
                30
              </Typography>
              <Typography
                variant="body1"
                color="white"
                textAlign={"end"}
                noWrap
              >
                No. of SO Rejected
              </Typography>
            </div>
          </div>
        </Paper>
      </div>

      <div className="grid grid-rows-1 lg:grid-cols-2 gap-10">
        <Paper variant="elevation" sx={{ overflow: "auto" }}>
          <div className="px-5 pt-5 flex gap-2 items-center">
            <FaChartLine />
            <Typography variant="body1">Statistics</Typography>
          </div>

          <div className="m-4 px-5 pt-5 rounded-md bg-gray-100 overflow-auto">
            <LineChart
              dataset={dataset}
              xAxis={[
                {
                  id: "Years",
                  dataKey: "date",
                  scaleType: "time",
                  valueFormatter: (date) => date.getFullYear().toString(),
                },
              ]}
              series={[
                {
                  id: "France",
                  label: "French GDP per capita",
                  dataKey: "fr",
                  stack: "total",
                  area: true,
                  showMark: false,
                },
                {
                  id: "Germany",
                  label: "German GDP per capita",
                  dataKey: "dl",
                  stack: "total",
                  area: true,
                  showMark: false,
                },
                {
                  id: "United Kingdom",
                  label: "UK GDP per capita",
                  dataKey: "gb",
                  stack: "total",
                  area: true,
                  showMark: false,
                },
              ]}
              width={620}
              height={400}
              margin={{ left: 70 }}
            />
          </div>
        </Paper>

        <Paper variant="elevation" sx={{ overflow: "auto" }}>
          <div className="px-5 pt-5 flex gap-2 items-center">
            <FaDatabase />
            <Typography variant="body1">List of Incoming Bulk</Typography>
          </div>

          <div className=" flex flex-col gap-2 m-4 p-5 rounded-md bg-gray-100 overflow-auto h-full max-h-[420px]">
            <Paper
              variant="elevation"
              sx={{
                width: "100%",
                maxHeight: "100px",
                padding: "10px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="body1"
                sx={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <FaFileUpload />
                LDCU 100 submission
              </Typography>

              <Typography variant="body1">10 minutes ago</Typography>
            </Paper>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default Dashboard;
