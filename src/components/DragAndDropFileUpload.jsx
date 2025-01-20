import React, { useState } from "react";

const DragAndDropFileUpload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    validateFile(uploadedFile);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    validateFile(droppedFile);
  };

  const validateFile = (file) => {
    if (file) {
      const validExtensions = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
      ];
      if (validExtensions.includes(file.type)) {
        setFile(file);
        setError("");
      } else {
        setFile(null);
        setError("Only Excel files are allowed!");
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="p-6 bg-base-200 rounded-xl shadow-lg w-full mx-auto">
      <h2 className="text-lg font-bold mb-4">Drag and Drop File Upload</h2>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          error ? "border-error" : "border-base-300"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {file ? (
          <div className="text-success">
            <p className="font-bold">File Selected:</p>
            <p>{file.name}</p>
          </div>
        ) : (
          <div>
            <p className="font-bold text-gray-500">
              Drag & Drop your Excel file here
            </p>
            <p className="text-sm text-gray-400 mt-2">or</p>
            <label
              htmlFor="file-upload"
              className="btn btn-primary mt-2 cursor-pointer"
            >
              Browse File
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".xlsx,.xls"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        )}
      </div>
      {error && <p className="text-error mt-2">{error}</p>}
    </div>
  );
};

export default DragAndDropFileUpload;
