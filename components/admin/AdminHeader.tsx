"use client";

import { useAuth } from "@/lib/auth-context";
import { useQuery } from "@tanstack/react-query";

import {
  LogOut,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  useEffect,
  useRef,
  useState,
} from "react";

// ✅ import your API function
import { getProfile } from "@/lib/profile.api";

export default function AdminHeader() {

  const pathname = usePathname();

  const {
    user,
    logout,
  } = useAuth();

  const [open, setOpen] =
    useState(false);

  const [
    profileOpen,
    setProfileOpen,
  ] = useState(false);

  const profileRef =
    useRef<HTMLDivElement>(null);

  // ✅ React Query profile fetch
  const {
    data: profile,
    isLoading: profileLoading,
  } = useQuery({

    queryKey: [
      "profile",
      user?.sub,
    ],

    queryFn: () =>
      getProfile(user!.sub),

    enabled:
      !!user?.sub,
  });

  useEffect(() => {

    const handleClickOutside = (
      event: MouseEvent
    ) => {

      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target as Node
        )
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };

  }, []);

  const getTitle = () => {

    if (pathname === "/admin")
      return "Dashboard";

    if (
      pathname.includes("/admin/doctors")
    )
      return "Doctors";

    if (
      pathname.includes("/admin/users")
    )
      return "Patients";

    if (
      pathname.includes("/admin/bookings")
    )
      return "Appointments";

    if (
      pathname.includes("/admin/payments")
    )
      return "Payments";

    if (
      pathname.includes("/admin/settings")
    )
      return "Settings";

    return "Healora Admin";
  };

  // ✅ safely extract profile data
  const adminProfile =
    profile?.data?.data ||
    profile?.data ||
    {};

  const adminName =
    adminProfile?.name ||
    "Admin";

  const adminEmail =
    adminProfile?.email ||
    "admin@healora.com";

  return (

    <header
      className="
        sticky top-0 z-30
        bg-white/80 backdrop-blur-md
        border-b border-slate-200
      "
    >

      <div
        className="
          flex items-center
          justify-between
          px-6 h-16
        "
      >

        {/* LEFT */}
        <div>

          <h1
            className="
              text-lg font-semibold
              text-slate-900
            "
          >
            {getTitle()}
          </h1>

          <p
            className="
              text-xs text-slate-500
            "
          >
            Manage Healora platform
          </p>

        </div>

        {/* RIGHT */}
        <div
          className="
            flex items-center gap-4
          "
        >

          {/* ACTIONS */}
          <div
            className="
              flex items-center gap-2
            "
          >

            <Link
              href="/"
              className="
                hidden md:block
                text-sm text-slate-600
                hover:text-emerald-600
                transition
              "
            >
              View Site
            </Link>

            {/* Mobile Menu */}
            <button
              onClick={() =>
                setOpen(!open)
              }
              className="md:hidden p-1"
            >
              {open ? <X /> : <Menu />}
            </button>

          </div>

          {/* PROFILE */}
          <div
            ref={profileRef}
            className="relative"
          >

            <button
              onClick={() =>
                setProfileOpen(
                  !profileOpen
                )
              }
              className="
                flex items-center gap-2
                cursor-pointer
                hover:bg-slate-100
                px-3 py-1.5
                rounded-xl
                transition
              "
            >

              <div
                className="
                  h-9 w-9 rounded-full
                  bg-emerald-100
                  text-emerald-600
                  flex items-center
                  justify-center
                  text-sm font-semibold
                "
              >
                {
                  adminName?.charAt(0)
                }
              </div>

              <div
                className="
                  hidden sm:flex
                  flex-col leading-tight
                  text-left
                "
              >

                <span
                  className="
                    text-sm font-medium
                    text-slate-800
                  "
                >
                  {profileLoading
                    ? "Loading..."
                    : adminName}
                </span>

                <span
                  className="
                    text-xs text-slate-500
                    max-w-[180px]
                    truncate
                  "
                >
                  {adminEmail}
                </span>

              </div>

              <ChevronDown
                size={16}
                className="
                  text-slate-500
                  hidden sm:block
                "
              />

            </button>

            {/* DROPDOWN */}
            {profileOpen && (

              <div
                className="
                  absolute right-0 mt-3
                  w-72 rounded-2xl
                  border border-slate-200
                  bg-white shadow-xl
                  overflow-hidden
                "
              >

                {/* TOP */}
                <div
                  className="
                    px-5 py-4
                    border-b border-slate-100
                  "
                >

                  <div
                    className="
                      flex items-center gap-3
                    "
                  >

                    <div
                      className="
                        h-12 w-12 rounded-full
                        bg-emerald-100
                        text-emerald-600
                        flex items-center
                        justify-center
                        text-lg font-semibold
                      "
                    >
                      {
                        adminName?.charAt(0)
                      }
                    </div>

                    <div>

                      <h3
                        className="
                          text-sm font-semibold
                          text-slate-900
                        "
                      >
                        {adminName}
                      </h3>

                      <p
                        className="
                          text-xs text-slate-500
                          break-all
                        "
                      >
                        {adminEmail}
                      </p>

                    </div>

                  </div>

                </div>

                {/* BODY */}
                <div className="p-2">

                  <button
                    onClick={logout}
                    className="
                      w-full flex items-center
                      gap-2 rounded-xl
                      px-3 py-2.5
                      text-sm text-red-500
                      hover:bg-red-50
                      transition
                    "
                  >
                    <LogOut size={16} />
                    Logout
                  </button>

                </div>

              </div>
            )}

          </div>

        </div>

      </div>

      {/* MOBILE DROPDOWN */}
      {open && (

        <div
          className="
            md:hidden px-6 pb-4
            space-y-3 border-t
            border-slate-100 bg-white
          "
        >

          <Link
            href="/"
            className="
              block text-sm
              text-slate-700
            "
          >
            View Site
          </Link>

          <button
            onClick={logout}
            className="
              block text-sm
              text-red-500
            "
          >
            Logout
          </button>

        </div>
      )}

    </header>
  );
}