import { CircularProgress } from "@mui/material";

import React from "react";

const Loading = () => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-white z-50 transition-opacity duration-1000 opacity-100`}
    >
      <CircularProgress />
    </div>
  );
};

export default Loading;
