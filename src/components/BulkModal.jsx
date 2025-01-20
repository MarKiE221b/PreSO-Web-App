import React from "react";
import DragAndDropFileUpload from "./DragAndDropFileUpload";

export const BulkModal = () => {
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg">Bulk Submission</h3>

        {/* modal body */}

        <input
          type="text"
          placeholder="Program / Course"
          className="my-4 input input-bordered w-full"
        />

        <DragAndDropFileUpload />

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
