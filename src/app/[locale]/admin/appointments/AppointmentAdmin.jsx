import TableAppointment from "./TableAppoinment";

  const appointmentData = Array.from({ length: 6 }).map((_, index) => ({
    doctorName: "Hamza Yasin",
    specialty: "Dental",
    patientName: "Hamza Yasin",
    appointmentDate: "11 Nov 2024",
    appointmentTime: "11:00 PM",
    status: true,
    amount: "$300",
  }));
export default function AppointmentAdmin() {
  return (
    <div className="flex flex-col py-6 h-auto gap-4">
        <h1 className="font-bold text-3xl max-md:text-2xl mt-4 mb-2 px-4">
        Appointments!
      </h1>
      <TableAppointment />
    </div>
  );
}
