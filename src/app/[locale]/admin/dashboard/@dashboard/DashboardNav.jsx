"use client";
import { Image } from "@nextui-org/react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { RxHamburgerMenu } from "react-icons/rx";

const TopbarAdmin = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const params = useParams();

  console.log(params.locale);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <div
        className={`self-stretch box-border mx-auto bg-white flex flex-row items-center justify-between py-5 px-12 top-0 z-50 sticky gap-5  border-b-1 border-solid backdrop-blur-lg`}
      >
        <div className="flex items-center gap-5">
          <button
            className="lg:hidden p-2 bg-light-gray/30 hover:bg-light-gray/50
            rounded-md"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? (
              <RxCross2 size={24} />
            ) : (
              <RxHamburgerMenu size={24} />
            )}
          </button>
          <Link href={`/${params.locale}/admin`}>
            <Image
              className="h-12 w-12 relative object-cover z-1"
              loading="lazy"
              alt="Logo"
              src="/svg/logo.svg"
            />
          </Link>
        </div>

        <nav
          onClick={() => setDropdownOpen(false)}
          className="flex-col items-start transition-all justify-start py-2 pb-1 pr-10 pl-0 box-border max-w-full hidden lg:flex"
        >
          <div className="m-0 w-auto flex flex-row text-dark-gray/50 items-start justify-between gap-10 max-xl:gap-3 max-w-full text-left text-md">
            {[
              "dashboard",
              "appointments",
              "specialties",
              "doctors",
              "patients",
              "reviews",
              "transactions",
            ].map((link) => (
              <Link
                key={link}
                href={`/${params.locale}/admin/${link}`}
                className={`font-medium transition-all text-dark-gray hover:text-dark-gray/80 ${
                  pathname === `/${params.locale}/admin/${link}`
                    ? "text-black hover:text-black/95 !font-bold"
                    : ""
                }`}
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </Link>
            ))}
          </div>
        </nav>

        <div className="flex flex-col items-end justify-start px-0 pb-0 relative">
          <div className="flex flex-row items-end justify-start gap-6">
            <div className="flex flex-col items-start justify-end">
              <Link
                onClick={() => setDropdownOpen(false)}
                href={`/${params.locale}/admin/notifications`}
                className={`w-11 rounded-xl bg-light-gray transition-all flex items-center justify-center p-2 box-border z-1 ${
                  pathname === `/${params.locale}/admin/notifications`
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
              <Image
                className="size-10 border p-0.5 rounded-full object-cover"
                loading="lazy"
                alt="User"
                src="/img/user.png"
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
                <div
                  onClick={() => setDropdownOpen(false)}
                  className="absolute top-14 right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10"
                >
                  <Link
                    href={`/${params.locale}/admin/profile`}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-t-lg"
                  >
                    Profile
                  </Link>
                  <Link
                    href={`/${params.locale}/admin/settings`}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Settings
                  </Link>
                  <Link
                    href={`/${params.locale}/auth/signout`}
                    className="block transition-all hover:text-white px-4 py-2 text-gray-800 hover:bg-red-500 rounded-b-lg"
                  >
                    Signout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

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
              {[
                "dashboard",
                "appointments",
                "specialties",
                "doctors",
                "patients",
                "reviews",
                "transactions",
              ].map((link) => (
                <Link
                  key={link}
                  href={`/${params.locale}/admin/${link}`}
                  className={`py-2 px-4 rounded-lg font-medium transition-all text-dark-gray hover:text-dark-gray/80 ${
                    pathname === `/${params.locale}/admin/${link}`
                      ? "text-black bg-gray-200"
                      : ""
                  }`}
                  onClick={toggleSidebar}
                >
                  {link.charAt(0).toUpperCase() + link.slice(1)}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default TopbarAdmin;
