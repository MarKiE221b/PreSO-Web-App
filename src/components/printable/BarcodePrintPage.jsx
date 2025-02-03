import React, { forwardRef } from "react";
import { LuScissors } from "react-icons/lu";

const BarcodePrintPage = forwardRef(({ data }, ref) => {
  return (
    <div className="flex">
      <div ref={ref} className="h-[210mm] w-[297mm]">
        <div className="grid grid-cols-2 gap-4 px-5 pt-2">
          <div className="col-span-2 flex flex-col justify-center items-center pb-2">
            <div className="absolute left-[85mm] top-0">
              <LuScissors size={"20px"} />
            </div>
            <div className="px-7 py-3 border border-dashed border-black flex flex-col items-center gap-1">
              <img
                className="w-[450px] h-[20px]"
                src={data.barcode_image}
                alt="barcode-bulk"
              />

              <p className="text-sm">
                Bulk ID : <span>{data.id}</span>
              </p>
            </div>
          </div>
          {data.students.map((student, i) => (
            <div
              key={i}
              className={`flex flex-col items-center border border-dashed border-black py-3 gap-1 px-2 ${
                (i + 1) % 12 === 0 ? "break-after-page" : ""
              }`}
            >
              <img
                className="w-[450px] h-[20px]"
                src={student.barcode_image}
                alt={`barcode-${student.lastname}`}
              />
              <p className="text-nowrap text-sm">
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
