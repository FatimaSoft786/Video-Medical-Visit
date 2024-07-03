"use client";
import { useState, useEffect } from "react";
import SlotsTabs from "./SlotsTabs";
import DateTabs from "./DateTabs";
import DoctorCard from "@/app/components/DoctorCard";
import ProfileCard from "./ProfileCard";
import { getUserSession } from "@/utils/session";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

const Agenda = () => {
  const t = useTranslations("Slots");

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [prices, setPrices] = useState({ firstVisit: "", followUpVisit: "" });
  const [currency, setCurrency] = useState("USD");
  const { token, user } = getUserSession();
  const doctor = user.user_details;
  const hours = Array.from({ length: 18 }, (_, i) => i + 6);

  useEffect(() => {
    const savedSlots = JSON.parse(localStorage.getItem("selectedSlots")) || [];
    const savedPrices = JSON.parse(localStorage.getItem("prices")) || {
      firstVisit: "",
      followUpVisit: "",
    };
    const savedCurrency = localStorage.getItem("currency") || "USD";

    setSelectedSlots(savedSlots);
    setPrices(savedPrices);
    setCurrency(savedCurrency);
  }, []);

  const toggleSlot = (day, slot) => {
    const slotKey = `${day}-${slot}`;
    setSelectedSlots((prev) =>
      prev.includes(slotKey)
        ? prev.filter((s) => s !== slotKey)
        : [...prev, slotKey]
    );
  };

  const handleSave = async () => {
    const doctorId = user.user_details._id;

    const payload = {
      time: selectedSlots.map(
        (slot) =>
          slot.split("-")[1] +
          ":00-" +
          (parseInt(slot.split("-")[1], 10) + 1).toString().padStart(2, "0") +
          ":00"
      ),
      date: selectedDate.toDateString().slice(4),
      visit: prices.firstVisit.replace("$", "").replace("/Session", ""),
      followUp: prices.followUpVisit.replace("$", "").replace("/Session", ""),
      currency: currency,
      doctorId: doctorId,
    };

    try {
      const response = await fetch(
        "https://video-medical-backend-production.up.railway.app/api/user/addSlots",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      console.log(data, payload);
      if (data.success) {
        localStorage.setItem("selectedSlots", JSON.stringify(selectedSlots));
        localStorage.setItem("prices", JSON.stringify(prices));
        localStorage.setItem("currency", currency);

        toast(t("Data saved successfully!"));

        setSelectedSlots([]);
        setPrices({ firstVisit: "", followUpVisit: "" });
        setCurrency("USD");
      } else {
        console.error("Error saving slots:", data.message);
        toast.error(t("Failed to save slots."));
      }
    } catch (error) {
      console.error("Error:", error);
      toast(t("An error occurred while saving slots."));
    }
  };

  return (
    <div className="container mx-auto p-6">
      <title>
        {t("Slots")} | {t("A Doctor's Appointment")}
      </title>
      <ProfileCard doctor={doctor} />
      <hr className="my-3 mt-9" />

      <div>
        <h2 className="text-3xl font-bold my-6">{t("Slots")}</h2>
        <DateTabs
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <h2 className="text-2xl font-bold my-4 px-6">{t("Select Hour")}</h2>

        <SlotsTabs
          selectedDate={selectedDate}
          toggleSlot={toggleSlot}
          selectedSlots={selectedSlots}
          hours={hours}
        />
      </div>

      <div className="my-6">
        <h2 className="text-2xl font-bold mb-2">
          {t("Set Session & Payment")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">{t("First visit")}</label>
            <select
              value={prices.firstVisit}
              onChange={(e) =>
                setPrices({ ...prices, firstVisit: e.target.value })
              }
              className="p-2 border rounded w-full px-4"
            >
              <option value="$40">$40</option>
              <option value="$50">$50</option>
              <option value="$60">$60</option>
               <option value="$70">$70</option>
              <option value="$80">$80</option>
              <option value="$90">$90</option>
              <option value="$100">$100</option>
              <option value="$110">$110</option>
              <option value="$120">$120</option>
               <option value="$130">$130</option>
              <option value="$140">$140</option>
              <option value="$150">$150</option>
              
            </select>
          </div>
          <div>
            <label className="block mb-2">{t("Follow up")}</label>
            <select
              value={prices.followUpVisit}
              onChange={(e) =>
                setPrices({ ...prices, followUpVisit: e.target.value })
              }
              className="p-2 border rounded w-full px-4"
            >
              <option value="$40">$40</option>
              <option value="$50">$50</option>
              <option value="$60">$60</option>
               <option value="$70">$70</option>
              <option value="$80">$80</option>
              <option value="$90">$90</option>
              <option value="$100">$100</option>
              <option value="$110">$110</option>
              <option value="$120">$120</option>
               <option value="$130">$130</option>
              <option value="$140">$140</option>
              <option value="$150">$150</option>
            </select>
          </div>
           <div>
           
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="p-2 border rounded w-full px-4"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
        
        </div>
      </div>

      <div className="flex justify-end w-full">
        <button
          onClick={handleSave}
          className="bg-dark-blue text-white px-6 py-2 rounded mt-4"
        >
          {t("Save Changes")}
        </button>
      </div>
    </div>
  );
};

export default Agenda;
