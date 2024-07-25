"use client";
import getPath from "@/utils/path";
import { Image, Avatar } from "@nextui-org/react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { RxHamburgerMenu } from "react-icons/rx";
import { clearUserSession, getUserSession } from "@/utils/session";
import { useTranslations } from "next-intl";


const PatientNav = ({ className = "" }) => {
    const t = useTranslations("PatientNavBar");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const { user } = getUserSession();

  const pathname = usePathname();
  const path = getPath();

const header = [
  { title: `${t("Dashboard")}`, link: "dashboard" },
  {
    title: `${t('Favorite Doctors')}`,
    link: "favoritedoctors",
  },
  {
    title: `${t('Appointments')}`,
    link: "appointments",
  },
  {
    title: `${t('Payment')}`,
    link: "payment",
  },
];




  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    if (!user) {
      redirect(`/${path}/auth/signin`);
    }
    setProfilePicture(
      user.user_details.picture_url
        ? user.user_details.picture_url
        : user.user_details.default_picture_url
    );
  }, [user]);

  return (
    <>
      <header
        className={`self-stretch box-border flex bg-white items-center justify-between py-5 px-8 top-0 z-50 sticky gap-5 max-w-full border-b-1 border-solid backdrop-blur-lg
          `}
        // ${pathname === `/${path}/patient` ? "hidden" : "flex"}
      >
        <div
          className="flex items-center gap-5"
          onClick={() => setDropdownOpen(false)}
        >
          <button
            className="lg:hidden p-2 bg-light-gray/30 hover:bg-light-gray/50 rounded-md"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? (
              <RxCross2 size={24} />
            ) : (
              <RxHamburgerMenu size={24} />
            )}
          </button>
          <Link href={`/${path}/patient`}>
            <Image
              className="h-12 w-12 relative object-cover z-1"
              loading="lazy"
              alt="Logo"
              src="/svg/logo.svg"
            />
          </Link>
          <nav
            onClick={() => setDropdownOpen(false)}
            className="flex-col items-start transition-all justify-start py-2 pb- pl-6 box-border max-w-full hidden lg:flex"
          >
            <div className="m-0 flex flex-row text-dark-gray/50 items-start w-fit justify-start gap-12 max-xl:gap-8 max-w-full text-left text-md">
              {header.map(({ title, link }) => (
                <Link
                  key={link}
                  href={`/${path}/patient/${link}`}
                  className={`font-medium transition-all text-dark-gray hover:text-dark-gray/80 ${
                    pathname === `/${path}/patient/${link}`
                      ? "text-black hover:text-black/95 !font-bold"
                      : ""
                  }`}
                >
                  {title.charAt(0).toUpperCase() + title.slice(1)}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        <div className="flex flex-col w-fit items-end justify-start px-0 pb-0 relative">
          <div className="flex flex-row items-end justify-start gap-6">
            <div className="flex flex-col items-start justify-end">
              <Link
                onClick={() => setDropdownOpen(false)}
                href={`/${path}/patient/notifications`}
                className={`w-11 rounded-xl bg-light-gray transition-all flex items-center justify-center p-2 box-border z-1 ${
                  pathname === `/${path}/patient/notifications`
                    ? "!bg-dark-blue"
                    : ""
                }`}
              >
                <img
                  className="h-7 w-7 relative overflow-hidden"
                  loading="lazy"
                  alt="Notification"
                  src="/svg/notification.svg"
                />
              </Link>
            </div>

            <div
              className={`relative flex flex-row items-center p-1 justify-center gap-4 cursor-pointer ${
                dropdownOpen && "bg-light-gray/30 rounded-xl"
              }`}
              onClick={toggleDropdown}
            >
              <Avatar
                className="size-10 border p-0.5 rounded-full object-cover"
                name=""
                loading="lazy"
                alt="User"
                src={profilePicture}
              />
              <img
                className={`w-3.5 h-2 transition-all duration-250 delay-150 ${
                  dropdownOpen && "rotate-180"
                }`}
                loading="lazy"
                alt="Dropdown Icon"
                src="/svg/dropdown.svg"
              />
              {dropdownOpen && (
                <div className="absolute top-14 right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                  <Link
                    onClick={toggleDropdown}
                    href={`/${path}/patient/profile`}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-t-lg"
                  >
                   {t('Profile')}
                  </Link>
                  <Link
                    href={`/${path}/patient/setting`}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    {t('Settings')}
                  </Link>
                  <div
                    onClick={() => {
                      clearUserSession();
                      redirect(`/${path}/auth/signin`);
                    }}
                    className="block transition-all hover:text-white px-4 py-2 text-gray-800 hover:bg-red-500 rounded-b-lg"
                  >
                   {t('Signout')}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={toggleSidebar}
          ></div>
          <div className="relative w-64 bg-white h-full shadow-lg">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button onClick={toggleSidebar}>
                <RxCross2 className="text-2xl" />
              </button>
            </div>
            <nav className="flex flex-col p-4">
              {header.map(({ title, link }) => (
                <Link
                  key={link}
                  href={`/${path}/patient/${link}`}
                  className={`py-2 px-4 rounded-lg font-medium transition-all text-dark-gray hover:text-dark-gray/80 ${
                    pathname === `/${path}/patient/${link}`
                      ? "text-black bg-gray-200"
                      : ""
                  }`}
                  onClick={toggleSidebar}
                >
                  {title.charAt(0).toUpperCase() + title.slice(1)}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default PatientNav;
