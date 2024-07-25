const MedicalRecords = () => (
  <table className="min-w-full bg-white max-md:text-sm">
    <thead className="bg-light-gray">
      <tr>
        <th className="py-3">Name</th>
        <th className="py-3">Date</th>
        <th className="py-3">Prescription</th>
        <th className="py-3">Action</th>
      </tr>
    </thead>
    <tbody>
      {[...Array(8)].map((_, index) => (
        <tr key={index} className="text-center text-light-gray">
          <td className="py-6">Lab Report</td>
          <td className="py-6">24 March 2024</td>
          <td className="py-6">Glucose test V12</td>
          <td className="py-6">
            <button className="border-2 hover:bg-light-gray transition-all duration-300 ml-2 p-2 rounded-full">
              <img
                src="/doctor/download.svg"
                className="size-5"
                alt="Download"
              />
            </button>
            <button className="border-2 hover:bg-light-gray transition-all duration-300 ml-2 p-2 rounded-full">
              <img src="/doctor/delete.svg" className="size-5" alt="Delete" />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default MedicalRecords;
