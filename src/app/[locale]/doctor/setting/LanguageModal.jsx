"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const buttonClass = "w-full bg-dark-blue text-white p-3 rounded";

const languages = [
  { code: "en", name: "English" },
  // { code: "es", name: "Spanish" },
  // { code: "fr", name: "French" },
  { code: "it", name: "Italian" },
];

export default function LanguageModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const router = useRouter();
  const t = useTranslations("Setting");

  useEffect(() => {
    setSelectedLanguage(router.locale || "it");
  }, [router.locale]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
     setIsOpen(false);
     router.push(`/${selectedLanguage}/doctor/setting`);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)} className="flex flex-row">
        <img src={`/svg/language.svg`} alt="language" />
        <p className="font-abc font-medium text-[16px] mx-[15px] text-[#000]">
          {t("Language")}
        </p>
      </button>
      <motion.div>
        <motion.div
          className={`z-[99] ${
            isOpen ? "" : "hidden"
          } fixed top-0 right-0 p-6 flex max-sm:overflow-y-scroll justify-center items-center w-full h-screen bg-black/30 px-2`}
        >
          <motion.div
            className={`z-[999] ${
              isOpen ? "" : "hidden"
            } w-[600px] max-sm:w-full h-fit py-8 rounded-lg bg-white p-4`}
          >
            <h1 className="text-2xl font-bold py-2 text-center">
              {t("Select Your Language")}
            </h1>
            <form
              className="flex flex-col gap-4 px-4 py-6"
              onSubmit={handleSubmit}
            >
              {languages.map((language) => (
                <div key={language.code} className="pt-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="language"
                      value={language.code}
                      checked={selectedLanguage === language.code}
                      onChange={() => setSelectedLanguage(language.code)}
                      className="accent-dark-blue"
                    />
                    {language.name}
                  </label>
                  <hr className="mt-2" />
                </div>
              ))}
              <div className="flex items-end justify-end">
                <button
                  type="submit"
                  className="bg-dark-blue text-white py-3 rounded mt-4 px-12"
                >
                  {t("Save Setting")}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
