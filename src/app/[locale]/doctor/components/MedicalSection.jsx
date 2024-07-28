import { useEffect, useState } from "react";
import { Image } from "@nextui-org/react";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import { getUserSession } from "@/utils/session";
import Link from "next/link";
import getPath from "@/utils/path";
import { useTranslations } from "next-intl";

const MedicalSection = ({ placeholder }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [patient, setPatient] = useState([]);
  const [filteredPatient, setFilteredPatient] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { user, token } = getUserSession();
  const t = useTranslations("MedicalSection");

   const doctorId = user?.user_details?._id;

  useEffect(() => {
    if (searchTerm) {
      setShowModal(true);
      setLoading(true);
      setError(null);
      fetchPatient();
    } else {
      setShowModal(false);
      setFilteredPatient([]);
    }
  }, [searchTerm]);

  const fetchPatient = async () => {
    try {
      const response = await fetch(
        "https://video-medical-backend-production.up.railway.app/api/user/doctorDashboard",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ doctorId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setPatient(data.appointments_list); // Assuming 'appointments_list' contains patient data
      setFilteredPatient(filterPatient(data.appointments_list)); // Assuming you have a filter function defined
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch data. Please try again later.");
      setLoading(false);
    }
  };

  const filterPatient = (doctorsList) => {
    return doctorsList.filter(
      (doctor) =>
        doctor.patient.firstName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        doctor.patient.lastName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        doctor.patient.specialist
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="flex flex-wrap h-fit bg-light-gray relative">
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
            <div className="flex relative flex-wrap mt-20 items-center gap-2 bg-white shadow-xl p-3 rounded-2xl justify-evenly">
              <div className="flex flex-1 rounded-lg border relative divide-x-1">
                <input
                  type="text"
                  placeholder={placeholder}
                  className="appearance-none w-2/3 md:w-auto px-2 py-4 focus:outline-none"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <button
                className="bg-dark-blue px-3 text-base flex gap-3 text-white py-4 w-full md:w-auto rounded-lg justify-center items-center"
                onClick={fetchPatient}
                disabled={loading}
              >
                <span className="hidden lg:block">{t('Search Now')}</span>
                <FaSearch />
              </button>
            </div>
            {showModal && (
              <div className="absolute w-1/2 z-[50] max-md:w-1/2 mt-2 bg-white p-4 rounded-xl">
                <div className="rounded-xl">
                  {loading && <p className="text-center">Loading...</p>}
                  {error && <p className="text-red-500 text-center">{error}</p>}
                  {!loading && !error && (
                    <div className="flex flex-col gap-2">
                      {filteredPatient.length === 0 ? (
                        <p>No matching patients found.</p>
                      ) : (
                        filteredPatient.map((patient) => (
                          <Link
                            href={`/${getPath()}/doctor/patient/${patient._id}`}
                            key={patient._id}
                            className="flex items-center p-2 gap-2 bg-light-gray/20 rounded-2xl"
                          >
                            <img
                              src={patient.patient.default_picture_url}
                              alt={patient.patient.firstName}
                              className="w-10 h-10 rounded-full"
                            />
                            <div className="flex flex-col items-start text-xs">
                              <span className="first-letter:capitalize">
                                {patient.patient.firstName}{" "}
                                {patient.patient.lastName}
                              </span>
                              <span className="text-light-gray">
                                {patient.patient.location}
                              </span>
                            </div>
                          </Link>
                        ))
                      )}
                    </div>
                  )}
                </div>
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
