import React, { useState, useRef, useEffect } from "react";
import { useUpdateStudentStatus } from "../hooks/useSubmission";
import { useNavigate } from "react-router";

const BarcodeScanStudentModal = () => {
  const navigate = useNavigate();
  const [barcode, setBarcode] = useState("");
  const [status, setStatus] = useState("");
  const inputRef = useRef(null);

  const { mutateAsync: mutateStudentStatus, data: mutationStudentResponse } =
    useUpdateStudentStatus();

  // Auto-focus input when modal opens
  useEffect(() => {
    setBarcode(""); // Reset barcode on open
    setStatus("");
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  // Handle barcode scan (Enter key submits)
  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && barcode) {
      e.preventDefault();

      try {
        await mutateStudentStatus({ barcode: barcode });
        setStatus("✅ Successfully updated ID: " + barcode);

        setBarcode(""); // Clear input for next scan
      } catch (error) {
        setBarcode("");
        setStatus(`❌ ${error.response.data.message} `);
        console.error(error); // Log error for debugging
      }
      inputRef.current?.focus(); // Refocus input field
    }
  };

  return (
    <dialog id="barcode_modal_student" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Scan Barcode</h3>

        <input
          ref={inputRef}
          type="text"
          className="input input-bordered w-full mt-4"
          placeholder="Scan barcode..."
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />

        {status && <p className="mt-3 text-center text-gray-700">{status}</p>}

        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-neutral">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default BarcodeScanStudentModal;
