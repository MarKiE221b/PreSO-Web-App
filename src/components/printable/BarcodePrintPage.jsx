import React, { forwardRef } from "react";

const BarcodePrintPage = forwardRef(({ data }, ref) => {
  return (
    <div className="flex">
      <div ref={ref} className="w-[210mm] h-[297mm]">
        <div className="grid grid-cols-2 gap-4 p-10 ">
          <div className="col-span-2 flex flex-col items-center">
            <p>
              Bulk ID : <span>{data.id}</span>
            </p>
            <div className="divider"></div>
            <img className="w-72" src={data.barcode_image} alt="barcode-bulk" />
          </div>
          {data.students.map((student, i) => (
            <div
              key={i}
              className="flex flex-col items-center border border-solid p-3 gap-2"
            >
              <img className="w-72" src={student.barcode_image} />
              <p className="text-nowrap font-semibold">
                {`${student.lastname}, ${student.firstname} ${
                  student.middlename ? student.middlename : ""
                } ${student.extname ? student.extname : ""}`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default BarcodePrintPage;
