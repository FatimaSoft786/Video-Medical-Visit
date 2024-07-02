import React from "react";

const PaymentCard = ({ appointment }) => {
  const {
    doctor,
    appointment_date,
    appointment_time,
    payment_status,
    fee,
    _id,
  } = appointment;

  const getFirstFourDigits = (str) => {
    const digitMatch = str.match(/\d/g);
    if (digitMatch) {
      const digits = digitMatch.join("").slice(0, 4);
      return digits;
    }
    return "";
  };
  return (
    <div className="border rounded-lg shadow-md p-3 flex flex-col gap-2">
      <img
        src={doctor.picture_url}
        alt={`${doctor.firstName} ${doctor.lastName}`}
        className="w-full h-40 object-cover rounded-md"
      />
      <div className="flex justify-between ">
        <h2 className="text-lg font-bold">{`${doctor.firstName} ${doctor.lastName}`}</h2>
        <span className="text-sm font-bold bg-dark-blue text-white p-2 rounded-lg">
          ${fee}
        </span>
      </div>
      <div className="">
        <p className="text-sm text-gray-600">{doctor.specialist}</p>
      </div>
      <div className="flex justify-between ">
        <p className="text-sm text-black font-bold">
          Payment Status: {getFirstFourDigits(_id)}
        </p>
        <p className="text-sm text-gray-600">{appointment_date}</p>
      </div>
      <p className="text-sm text-gray-600">Time: {appointment_time}</p>
      <button
        disabled={payment_status === "Paid" && true}
        className={`bg-dark-blue mt-4 w-full text-white py-2 px-4 rounded-lg ${
          payment_status === "Paid" &&
          "disabled:bg-dark-blue/80 cursor-not-allowed"
        }`}
      >
        {payment_status === "Paid" ? "Paid" : "Pay Now"}{" "}
      </button>
    </div>
  );
};

export default PaymentCard;
