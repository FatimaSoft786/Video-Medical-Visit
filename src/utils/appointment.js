export const cancelAppointment = async (appointmentId, doctorId) => {
  const response = await fetch(
    `https://video-medical-backend-production.up.railway.app/api/appointment/cancelAppointment`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ appointmentId, doctorId }),
    }
  );
  return response.json();
};
