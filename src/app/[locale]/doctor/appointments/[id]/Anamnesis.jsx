"use client";
import getPath from "@/utils/path";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { createUserSession, getUserSession } from "@/utils/session";
import Link from "next/link";
import { Skeleton } from "@nextui-org/react";

const Anamens = ({ isProfile, userDetails }) => {
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
    { id: "good_health", text: "Are you currently in good health?" },
    {
      id: "serious_illness",
      text: "Have you had any serious illnesses in the past?",
    },
    {
      id: "serious_illness_description",
      text: "If the answer is yes, which ones?",
      type: "input",
    },
    { id: "past_surgery", text: "Have you had surgery in the past?" },
    {
      id: "past_surgery_description",
      text: "If the answer is yes, which ones?",
      type: "input",
    },
    {
      id: "current_medication",
      text: "Are you currently undergoing medical treatment?",
    },
    {
      id: "current_medication_description",
      text: "If the answer is yes, which ones?",
      type: "input",
    },
    {
      id: "heart_disease",
      text: "Have you had or currently have heart disease?",
    },
    { id: "blood_pressure", text: "Do you have high or low blood pressure?" },
    { id: "allergies", text: "Have you had or currently have allergies?" },
    {
      id: "allergies_description",
      text: "If the answer is yes, which ones?",
      type: "input",
    },
    { id: "diabetes", text: "Have you had or currently have diabetes?" },
    {
      id: "kidney_disease",
      text: "Have you had or currently have kidney disease?",
    },
    { id: "thyroid", text: "Have you had or currently have thyroid disease?" },
    {
      id: "stomach_disease",
      text: "Have you had or currently have stomach issues?",
    },
    {
      id: "digestive_disease",
      text: "Have you had or currently have digestive issues?",
    },
    {
      id: "digestive_description",
      text: "If the answer is yes, which ones?",
      type: "input",
    },
    {
      id: "lung_disease",
      text: "Have you had or currently have lung disease?",
    },
    {
      id: "lungs_description",
      text: "If the answer is yes, which ones?",
      type: "input",
    },
    {
      id: "venereal",
      text: "Have you had or currently have venereal disease?",
    },
    { id: "nervous", text: "Have you had or currently have nervous disease?" },
    { id: "hormone", text: "Have you had or currently have hormone issues?" },
    { id: "any_illness", text: "Have you had or currently have any illness?" },
    {
      id: "any_illness_description",
      text: "If the answer is yes, which ones?",
      type: "input",
    },
    { id: "smoke", text: "Do you smoke?" },
    { id: "alcohol", text: "Do you consume alcohol?" },
    { id: "usual_medicine", text: "Do you usually take any medicine?" },
    {
      id: "usual_medicine_description",
      text: "If the answer is yes, which ones?",
      type: "input",
    },
  ];

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
        <h1 className="font-bold text-2xl text-black">Anamnesi</h1>
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
    </div>
  );
};

export default Anamens;
