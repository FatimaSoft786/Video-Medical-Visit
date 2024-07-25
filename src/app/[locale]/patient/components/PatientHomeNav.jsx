"use client";
import getPath from "@/utils/path";
import { Image } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";

const header = [
  { title: "Home", link: "/" },
  { title: "Reviews", link: "reviews" },
];

const PatientNavHome = ({ className = "" }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const path = getPath();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSignout = () => {
    clearUserSession();
    redirect(`/${path}/auth/signin`);
  };

  return (
    <>
      <header
        className={`self-stretch transition-all box-border bg-white flex flex-row items-center justify-between py-5 px-8 top-0 z-50 sticky gap-5 max-w-full border-b-1 border-solid backdrop-blur-lg ${className}`}
      >
        <div className="flex items-center gap-5">
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
          <div className="flex !w-full justify-between">
            <Link href={`/${path}/patient`}>
              <Image
                className="h-12 w-12 relative object-cover z-1"
                loading="lazy"
                alt="Logo"
                src="/svg/logo.svg"
              />
            </Link>
            <nav className="flex transition-all max-md:hidden justify-start py-2 gap-12 pl-6 box-border max-w-full items-center lg:flex">
              <div className="m-0  flex flex-row text-dark-gray/50 items-start w-fit justify-start gap-12 max-xl:gap-8 max-w-full text-left text-md">
                {header.map(({ title, link }) => (
                  <Link
                    key={link}
                    href={`/${path}/patient/${link}`}
                    className={`font-medium transition-all text-dark-gray hover:text-dark-gray/80 ${
                      pathname === `/${path}/patient/${link}`
                        ? "text-black hover:text-black/95 !font-bold"
                        : ""
                    }
                  ${
                    pathname === `/${path}/patient` &&
                    "first:text-black first:hover:text-black/95 first:!font-bold"
                  }
                  `}
                  >
                    {title.charAt(0).toUpperCase() + title.slice(1)}
                  </Link>
                ))}
              </div>
              <div
                className={`relative flex flex-row items-center p-1 justify-center gap-4 cursor-pointer ${
                  dropdownOpen && "bg-light-gray/30 rounded-xl"
                }`}
                onClick={toggleDropdown}
              >
                <span className="font-medium text-dark-gray">Admin</span>
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
                      Profile
                    </Link>
                    <Link
                      href={`/${path}/patient/settings`}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      Settings
                    </Link>
                    <div
                      onClick={handleSignout}
                      className="block transition-all hover:text-white px-4 py-2 text-gray-800 hover:bg-red-500 rounded-b-lg"
                    >
                      Signout
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
        <div className="flex flex-col w-fit items-end justify-start px-0 pb-0 relative">
          <div className="flex flex-row items-end justify-start gap-6">
            <div className="relative max-md:hidden flex flex-row items-center p-1 justify-center gap-4 cursor-pointer">
              <Link
                href={`/${path}/doctor`}
                className={`px-6 py-2 rounded-md border border-solid `}
              >
                Doctor
              </Link>
              <Link
                href={`/${path}/patient/dashboard`}
                className={`px-6 py-2 rounded-md border border-solid  bg-dark-blue text-white`}
              >
                Patient
              </Link>
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
            <nav className="flex flex-col p-4 m-0 *:cursor-pointer">
              {header.map(({ title, link }) => (
                <Link
                  key={link}
                  href={`/${path}/patient/${link}`}
                  className={`py-2 px-4 rounded-lg font-medium transition-all text-dark-gray hover:text-dark-gray/80 ${
                    pathname === `/${path}/patient/${link}`
                      ? "text-black bg-gray-200"
                      : ""
                  }
                   ${
                     pathname === `/${path}/patient` &&
                     "first:text-black first:bg-gray-200"
                   }
                  
                  `}
                  onClick={toggleSidebar}
                >
                  {title.charAt(0).toUpperCase() + title.slice(1)}
                </Link>
              ))}

              <Link
                href={`/${path}/patient/profile`}
                className={`py-2 px-4 rounded-lg font-medium transition-all text-dark-gray hover:text-dark-gray/80 `}
                onClick={toggleSidebar}
              >
                Profile
              </Link>
              <Link
                href={`/${path}/patient/settings`}
                className={`py-2 px-4 rounded-lg font-medium transition-all text-dark-gray hover:text-dark-gray/80 `}
                onClick={toggleSidebar}
              >
                Settings
              </Link>
              <div
                onClick={() => {
                  handleSignout();
                  toggleSidebar();
                }}
                className={`py-2 bg-red-500/40 text-red-500 px-4 rounded-lg font-medium transition-all `}
              >
                Signout
              </div>
              <div className="relative w-full mt-4 flex flex-row items-center p-1 justify-center gap-2 cursor-pointer">
                <Link
                  href={`/${path}/doctor`}
                  className={`px-4 py-2   text-center rounded-md border w-full border-solid ${
                    pathname === `/${path}/doctor`
                      ? "bg-dark-blue text-white"
                      : "border-dark-gray/50 text-dark-gray"
                  }`}
                  onClick={toggleSidebar}
                >
                  Doctor
                </Link>
                <Link
                  href={`/${path}/patient`}
                  className={`px-4 py-2 w-full text-center rounded-md border border-solid ${
                    pathname === `/${path}/patient`
                      ? "bg-dark-blue text-white"
                      : "border-dark-gray/50 text-dark-gray"
                  }`}
                  onClick={toggleSidebar}
                >
                  Patient
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default PatientNavHome;
