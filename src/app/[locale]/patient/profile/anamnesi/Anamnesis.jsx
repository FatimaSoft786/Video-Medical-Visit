"use client";
import getPath from "@/utils/path";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { createUserSession, getUserSession } from "@/utils/session";
import Link from "next/link";
import { Skeleton } from "@nextui-org/react";
import { useTranslations } from "next-intl";

const Anamens = ({ isProfile }) => {
   const t = useTranslations("MedicalHistory");
   const t1 = useTranslations("DoctorProfile")
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const path = getPath();
  const { user, token } = getUserSession();
  const [formState, setFormState] = useState({
    good_health: "",
    serious_illness: "",
    serious_illness_description: "",
    past_surgery: "",
    past_surgery_description: "",
    current_medication: "",
    current_medication_description: "",
    heart_disease: "",
    blood_pressure: "",
    allergies: "",
    allergies_description: "",
    diabetes: "",
    kidney_disease: "",
    thyroid: "",
    stomach_disease: "",
    digestive_disease: "",
    digestive_description: "",
    lung_disease: "",
    lungs_description: "",
    venereal: "",
    nervous: "",
    hormone: "",
    any_illness: "",
    any_illness_description: "",
    smoke: "",
    alcohol: "",
    usual_medicine: "",
    usual_medicine_description: "",
  });

  useEffect(() => {
    const { user } = getUserSession();
    if (user) {
      const userDetails = user.user_details;
      setProfileData(userDetails);
      setFormState({
        good_health: userDetails.good_health || "",
        serious_illness: userDetails.serious_illness || "",
        serious_illness_description:
          userDetails.serious_illness_description || "",
        past_surgery: userDetails.past_surgery || "",
        past_surgery_description: userDetails.past_surgery_description || "",
        current_medication: userDetails.current_medication || "",
        current_medication_description:
          userDetails.current_medication_description || "",
        heart_disease: userDetails.heart_disease || "",
        blood_pressure: userDetails.blood_pressure || "",
        allergies: userDetails.allergies || "",
        allergies_description: userDetails.allergies_description || "",
        diabetes: userDetails.diabetes || "",
        kidney_disease: userDetails.kidney_disease || "",
        thyroid: userDetails.thyroid || "",
        stomach_disease: userDetails.stomach_disease || "",
        digestive_disease: userDetails.digestive_disease || "",
        digestive_description: userDetails.digestive_description || "",
        lung_disease: userDetails.lung_disease || "",
        lungs_description: userDetails.lungs_description || "",
        venereal: userDetails.venereal || "",
        nervous: userDetails.nervous || "",
        hormone: userDetails.hormone || "",
        any_illness: userDetails.any_illness || "",
        any_illness_description: userDetails.any_illness_description || "",
        smoke: userDetails.smoke || "",
        alcohol: userDetails.alcohol || "",
        usual_medicine: userDetails.usual_medicine || "",
        usual_medicine_description:
          userDetails.usual_medicine_description || "",
      });
      setLoading(false);
    } else {
      console.error("No user details found in session");
      setLoading(false);
    }
  }, []);

  const questions = [
    { id: "good_health", text: t('Are you currently in good health?') },
    {
      id: "serious_illness",
      text: t('Have you had any serious illnesses in the past?')
    },
    {
      id: "serious_illness_description",
      text: t('If the answer is yes, which ones?'),
      type: "input",
    },
    { id: "past_surgery", text: t('Have you had surgery in the past?') },
    {
      id: "past_surgery_description",
      text: t('If the answer is yes, which ones?'),
      type: "input",
    },
    {
      id: "current_medication",
      text: t('Are you currently undergoing medical treatment?'),
    },
    {
      id: "current_medication_description",
      text: t('If the answer is yes, which ones?'),
      type: "input",
    },
    {
      id: "heart_disease",
      text:t('Have had or currently have heart disease?'),
    },
    { id: "blood_pressure", text: t('Have you had or currently have high blood pressure?')},
    { id: "allergies", text: t('Have you had or currently have allergies?') },
    {
      id: "allergies_description",
      text: t('If the answer is yes, which ones?'),
      type: "input",
    },
    { id: "diabetes", text: t('Do you have diabetes?') },
    {
      id: "kidney_disease",
      text: t('Do you have kidney disease?'),
    },
    { id: "thyroid", text: t('Do you have thyroid disease?') },
    {
      id: "stomach_disease",
      text: t('Do you have stomach diseases?'),
    },
    {
      id: "digestive_disease",
      text:  t('Do you have digestive tract diseases?'),
    },
    {
      id: "digestive_description",
      text: t('If the answer is yes, which ones?'),
      type: "input",
    },
    {
      id: "lung_disease",
      text: t('Do you have lung disease?')
    },
    {
      id: "lungs_description",
      text: t('If the answer is yes, which ones?'),
      type: "input",
    },
    {
      id: "venereal",
      text:  t('Do you have venereal diseases?'),
    },
    { id: "nervous", text: t('Do you have nervous or depressive diseases?')},
    { id: "hormone", text: t('Do you have blood or haemorrhagic diseases?') },
    { id: "any_illness", text:  t('Do you have any other illnesses not listed above?') },
    {
      id: "any_illness_description",
      text:  t('If the answer is yes, which ones?'),
      type: "input",
    },
    { id: "smoke", text:  t('Do you smoke?') },
    { id: "alcohol", text: t('Do you drink alcohol regularly?') },
    { id: "usual_medicine", text:  t('Do you usually take any medications?') },
    {
      id: "usual_medicine_description",
      text: t('If the answer is yes, which ones?'),
      type: "input",
    },
  ];

  const handleChange = (field) => (e) => {
    setFormState({
      ...formState,
      [field]: e.target.value,
    });
  };

  const handleCheckboxChange = (field, value) => () => {
    setFormState({
      ...formState,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    const patientId = user.user_details._id;
    try {
      const response = await axios.post(
        "https://video-medical-backend-production.up.railway.app/api/user/patientMedicalHistory",
        { patientId, ...formState },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Anamnes updated successfully!");
        localStorage.setItem("user", JSON.stringify(response.data));
      }
    } catch (error) {
      toast.error("Failed to update Anamnes. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col">
        <Skeleton height={30} width={300} />
        <Skeleton count={10} height={20} width={600} />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl text-black">{t('medicalHistory')}</h1>
        {isProfile && (
          <Link
            href={`/${path}/patient/profile/anamnesi`}
            className="bg-dark-blue text-white py-2 hover:opacity-90 transition-all active:scale-95 px-6 rounded float-right my-5"
          >
            {t1('Edit medical')}
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
        {questions.map((question) => (
          <div key={question.id} className="my-4">
            <p className="text-[14px] mb-4 font-medium text-black">
              {question.text}
            </p>
            {isProfile ? (
              <p className="mt-0 font-normal py-2.5 rounded-lg border-2 h-[48px] w-full px-3">
                {formState[question.id] || "N/A"}
              </p>
            ) : question.type === "input" ? (
              <div className="relative">
                <input
                  value={formState[question.id]}
                  onChange={handleChange(question.id)}
                  className="mt-0 font-normal py-2.5 rounded-lg border-2 h-[48px] w-full px-3"
                />
                <div className="absolute -top-4 bg-dark-blue/5 backdrop-blur-md left-4 rounded-full px-2 py-1 ">
                  Se e si, quali ?
                </div>
              </div>
            ) : (
              <div className="flex flex-row mb-5">
                <div className="flex flex-row items-center">
                  <input
                    className="size-5 accent-black rounded-xl"
                    type="checkbox"
                    checked={formState[question.id] === "Yes"}
                    onChange={handleCheckboxChange(question.id, "Yes")}
                  />
                  <label className="accent-black rounded-lg text-black font-semibold mx-1">
                    Yes
                  </label>
                </div>
                <div className="flex flex-row mx-3 items-center">
                  <input
                    type="checkbox"
                    className="size-5 accent-black rounded-xl border-2"
                    checked={formState[question.id] === "No"}
                    onChange={handleCheckboxChange(question.id, "No")}
                  />
                  <label className="text-black font-semibold mx-1">No</label>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col my-6">
        <p className="text-light-gray">
          *Il/La sottoscritto/a autorizza il trattamento dei dati personali nel
          rispetto della vigente normativa sulla protezione dei dati personali
          ed, in particolare, il Regolamento Europeo per la protezione dei dati
          personali 2016/679, il d.lgs. 30/06/2003 n. 196 e successive modifiche
          e integrazioni, come modificato da ultimo dal d.lgs. 10/08/2018 n. 101
        </p>
        <div className="flex gap-12 items-center mt-2">
          <input
            type="checkbox"
            checked={formState.VenerealChecked === "Yes"}
            onChange={() => {
              setFormState({ ...formState, VenerealChecked: "Yes" });
            }}
            className="size-4 accent-black rounded-xl border-2"
          />
          <label className="text-black font-semibold mx-1">I accept</label>
          <input
            type="checkbox"
            checked={formState.VenerealChecked === "No"}
            onChange={() => {
              setFormState({ ...formState, VenerealChecked: "No" });
            }}
            className="size-4 accent-black rounded-xl border-2"
          />
          <label className="text-black font-semibold mx-1">I decline</label>
        </div>
        <p className="my-6 text-light-gray">
          ** Si informa il paziente che il rifiuto al trattamento dei propri
          dati personali a fini medici può influenzare negativamente la capacità
          del medico di effettuare un'accurata anamnesi e di fornire un
          trattamento ottimale. La mancanza di informazioni essenziali può
          portare a una diagnosi incompleta o inesatta e, di conseguenza, a un
          trattamento che potrebbe non essere il più adeguato per la sua
          condizione. È importante comprendere che la decisione di non
          permettere il trattamento dei dati personali è un diritto del
          paziente, ma comporta il rischio di non ricevere le cure più
          appropriate basate su un'analisi completa delle informazioni mediche.
        </p>
      </div>
      {!isProfile && (
        <button
          onClick={handleSubmit}
          className="bg-dark-blue text-white py-2 px-12 rounded float-right my-5"
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default Anamens;
