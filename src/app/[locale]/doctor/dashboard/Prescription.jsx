const Prescription = () => (
  <table className="min-w-full bg-white max-md:text-sm">
    <thead className="bg-light-gray">
      <tr>
        <th className="py-3">ID</th>
        <th className="py-3">Prescribed By</th>
        <th className="py-3">Type</th>
        <th className="py-3">Date</th>
      </tr>
    </thead>
    <tbody>
      {[...Array(8)].map((_, index) => (
        <tr key={index} className="text-center  text-light-gray">
          <td className="py-6 text-[#7CB839]">1234</td>
          <td className="py-6 flex gap-2 items-center justify-center ">
            <img src="/img/user.png" className="size-8" alt="Dr. Hamza Yasin" />
            Dr. Hamza Yasin
          </td>
          <td className="py-6">Visit</td>
          <td className="py-6">23 March 2024</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Prescription;
