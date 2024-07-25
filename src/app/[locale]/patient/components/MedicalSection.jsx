"use client";
import React, { useState, useEffect } from "react";
import { Image } from "@nextui-org/react";
import { motion } from "framer-motion";
import { FaSearch, FaUser } from "react-icons/fa";
import { getUserSession } from "@/utils/session";
import Link from "next/link";
import getPath from "@/utils/path";
import { useTranslations } from "next-intl";

const MedicalSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const t = useTranslations("MedicalSection");

  useEffect(() => {
    if (searchTerm) {
      setShowModal(true);
      setLoading(true);
      setError(null);
      const { token } = getUserSession();
      const fetchDoctors = async () => {
        try {
          const response = await fetch(
            `https://video-medical-backend-production.up.railway.app/api/user/doctorsList`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ role: "Doctor" }),
            }
          );

          const data = await response.json();
          if (data.success) {
            if (data.doctors_list.length === 0) {
              setError("No doctors found.");
              setDoctors([]);
              setFilteredDoctors([]);
            } else {
              setDoctors(data.doctors_list);
              filterDoctors(data.doctors_list);
            }
          } else {
            setError("Failed to fetch doctors.");
            setDoctors([]);
            setFilteredDoctors([]);
          }
        } catch (err) {
          setError("An error occurred while fetching doctors.");
          setDoctors([]);
          setFilteredDoctors([]);
        } finally {
          setLoading(false);
        }
      };

      fetchDoctors();
    } else {
      setShowModal(false);
      setFilteredDoctors([]);
    }
  }, [searchTerm]);

  const filterDoctors = (doctorsList) => {
    const filtered = doctorsList.filter(
      (doctor) =>
        doctor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialist.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDoctors(filtered);
  };

  return (
    <div className="flex flex-wrap h-fit bg-light-gray overflow-visible">
      <div className="w-full flex flex-wrap container mx-auto relative flex-row py-8">
        <div className="w-full md:w-[53%] p-4 flex items-center ">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-4 text-black">
              Benvenuto nella <span className="text-dark-blue">medicina</span>
              <br />
              del <span className="text-dark-blue">futuro!</span>
            </h1>
            <p className="mb-4">
              Connettiti con medici qualificati in pochi minuti, direttamente
              dal tuo dispositivo. La nostra piattaforma ti guiderà direttamente
              verso la soluzione di cui hai bisogno, con accesso istantaneo ai
              migliori specialisti e tutto il supporto necessario per gestire la
              tua salute senza stress.
            </p>
            <div className="flex flex-wrap mt-20 items-center gap-2 bg-white  p-3 rounded-2xl justify-evenly">
              <div className="flex flex-1 rounded-lg border relative divide-x-1">
                {/* <select className="px-2 appearance-none py-4 w-1/3 md:w-auto">
                  <option>Lahore</option>
                  <option>Other Location</option>
                </select> */}
                <input
                  type="text"
                  placeholder={t('Specialist')}
                  className="appearance-none w-full px-2 py-4 focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="bg-dark-blue px-3 text-base flex gap-3 text-white py-4 w-full md:w-auto rounded-lg justify-center items-center">
                <span className="hidden lg:block">{t("Search Now")}</span>
                <FaSearch />
              </button>
            </div>
            {showModal && (
              <div className="absolute z-10 w-1/2 max-md:w-full mt-2 bg-white p-4 rounded-xl">
                {loading && <p className="text-center">Loading...</p>}
                {error && <p className="text-red-500 text-center">{error}</p>}
                {!loading && !error && (
                  <div className="flex flex-col gap-2">
                    {filteredDoctors.length === 0 ? (
                      <p>No matching doctors found.</p>
                    ) : (
                      filteredDoctors.map((doctor) => (
                        <Link
                          href={`/${getPath()}/patient/doctorDetails/${
                            doctor._id
                          }`}
                          key={doctor.id}
                          className="flex items-center p-2 gap-2  rounded-2xl"
                        >
                          {doctor.image ? (
                            <img
                              src={doctor.image}
                              alt={doctor.firstName}
                              className="size-14 p-2 rounded-full"
                            />
                          ) : (
                            <FaUser className="w-10 h-10 bg-light-gray p-2 rounded-full" />
                          )}
                          <div className="flex flex-col items-start text-xs">
                            <span className="first-letter:capitalize">
                              {doctor.firstName} {doctor.lastName}
                            </span>
                            <span className="text-light-gray">
                              {doctor.specialist}
                            </span>
                          </div>
                        </Link>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
        <div className="w-full md:w-[47%] flex max-md:hidden justify-center md:justify-end mt-8 md:mt-0">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={`/patient/mediclSection.svg`}
              alt="Doctor"
              className="w-full max-h-screen object-cover"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MedicalSection;
