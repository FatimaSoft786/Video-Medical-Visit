"use client";
import { useState, useEffect } from "react";
import SlotsTabs from "./SlotsTabs";
import DateTabs from "./DateTabs";
import DoctorCard from "@/app/components/DoctorCard";
import ProfileCard from "./ProfileCard";
import { getUserSession } from "@/utils/session";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { format} from "date-fns";
import { enUS, fr, es, it } from "date-fns/locale";

const Agenda = () => {
  const t = useTranslations("Slots");

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [prices, setPrices] = useState({ firstVisit: "", followUpVisit: "" });
  const [currency, setCurrency] = useState("€");
  const [doctor,setDoctor]= useState({})
  const { token, user } = getUserSession();
  const hours = Array.from({ length: 18 }, (_, i) => i + 6);
  
  useEffect(() => {
    const doctor = user.user_details;
    setDoctor(doctor);
    const savedSlots = JSON.parse(localStorage.getItem("selectedSlots")) || [];
    const savedPrices = JSON.parse(localStorage.getItem("prices")) || {
      firstVisit: "",
      followUpVisit: "",
    };
    const savedCurrency = localStorage.getItem("currency") || "€";
    
    setSelectedSlots(savedSlots);
    setPrices(savedPrices);
    setCurrency(savedCurrency);
  }, []);

  const [locale, setLocale] = useState();
  const localeMap = {
    en: enUS,
    fr: fr,
    es: es,
    it: it,
  };
  useEffect(() => {
    const local = document.querySelector("html").lang;
    setLocale(local);
  }, [locale]);

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
   
 const format1 = format(selectedDate, "MMMM dd yyyy", { locale: localeMap[locale] })
 

    const payload = {
      time: selectedSlots.map(
        (slot) =>
          slot.split("-")[1] +
          ":00-" +
          (parseInt(slot.split("-")[1], 10) + 1).toString().padStart(2, "0") +
          ":00"
      ),
      
      date: format1,
      visit: Number(prices.firstVisit),
      followUp: Number(prices.followUpVisit),
      currency: currency,
      doctorId: doctorId,
    };
    console.log(payload);

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
     
      if (data.success) {
        setCurrency(currency);
        localStorage.setItem("currency",currency)
        localStorage.setItem("selectedSlots", JSON.stringify(selectedSlots));
        setPrices({
          firstVisit:  `${currency}${data.user_details.visit}`, followUpVisit: `${currency}${data.user_details.followUp}`});
        
        localStorage.setItem("prices", JSON.stringify(prices));
        toast.success(t("Data saved successfully!"));

        setSelectedSlots([]);
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
        {t("Slots")}
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
              <option value="40">{currency}40</option>
              <option value="50">{currency}50</option>
              <option value="60">{currency}60</option>
              <option value="70">{currency}70</option>
              <option value="80">{currency}80</option>
              <option value="90">{currency}90</option>
              <option value="100">{currency}100</option>
              <option value="110">{currency}110</option>
              <option value="120">{currency}120</option>
               <option value="130">{currency}130</option>
              <option value="140">{currency}140</option>
              <option value="150">{currency}150</option>
              
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
              <option value="40">{currency}40</option>
              <option value="50">{currency}50</option>
              <option value="60">{currency}60</option>
               <option value="70">{currency}70</option>
              <option value="80">{currency}80</option>
              <option value="90">{currency}90</option>
              <option value="100">{currency}100</option>
              <option value="110">{currency}110</option>
              <option value="120">{currency}120</option>
               <option value="130">{currency}130</option>
              <option value="140">{currency}140</option>
              <option value="150">{currency}150</option>
            </select>
          </div>
           <div>
           
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="p-2 border rounded w-full px-4"
            >
              <option value="$">$</option>
              <option value="€">€</option>
              <option value="£">£</option>
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
