import React from "react";

const SingleModal = () => {
  return (
    <div>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Single Submission</h3>

          {/* Body */}
          <div className="grid grid-rows-1 md:grid-cols-5 gap-2 my-2">
            <input
              type="text"
              placeholder="Course"
              className="input input-bordered w-full md:col-span-5"
            />

            <input
              type="text"
              placeholder="Lastname"
              className="input input-bordered w-full "
            />

            <input
              type="text"
              placeholder="Firstname"
              className="input input-bordered w-full "
            />

            <input
              type="text"
              placeholder="Middlename"
              className="input input-bordered w-full"
            />

            <input
              type="text"
              placeholder="Extension Name"
              className="input input-bordered w-full"
            />

            <input
              type="text"
              placeholder="Suffix"
              className="input input-bordered w-full"
            />

            <input
              type="text"
              placeholder="Date Graduated"
              className="input input-bordered w-full md:col-span-2"
            />
          </div>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-neutral">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default SingleModal;
