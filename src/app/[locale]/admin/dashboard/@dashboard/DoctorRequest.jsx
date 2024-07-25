import { Image } from "@nextui-org/react";

const DoctorRequestTable = ({ doctorRequests }) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-lg text-black bg-light-gray capitalize">
          <tr>
            {["Doctor Name", "Specialty", "Actions"].map((header, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 text-center items-center"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {doctorRequests.map((request, index) => (
            <tr key={index} className="bg-white border-b">
              <td
                scope="row"
                className="px-6 py-4 font-medium  whitespace-nowrap dark:text-white"
              >
                <div className="flex items-center gap-2 justify-center">
                  <Image
                    src="/svg/user.svg"
                    className="h-8 w-8"
                    alt="User Icon"
                  />
                  {request.name}
                </div>
              </td>
              <td className="px-6  pt-7 flex items-center justify-center">
                {request.specialty}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 justify-center">
                  <button className="bg-lime-green rounded-lg p-2.5 text-white max-sm:text-[12px] max-sm:px-2 max-sm:py-2 tracking-wider text-[14px] px-9 max-lg:px-3 flex items-center gap-2">
                    <span className="max-sm:hidden block">Accept</span>
                    <img
                      src="/svg/check.svg"
                      sizes="24px"
                      className="max-sm:block text-inherit hidden"
                    />
                  </button>
                  <button className="bg-pure-red rounded-lg p-2.5 text-white max-sm:text-[12px] max-sm:px-2 max-sm:py-2 tracking-wider text-[14px] px-9 max-lg:px-3 flex items-center gap-2">
                    <span className="max-sm:hidden block">Decline</span>
                    <img
                      src="/svg/delete.svg"
                      sizes="24px"
                      className="max-sm:block text-inherit hidden"
                    />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorRequestTable;
