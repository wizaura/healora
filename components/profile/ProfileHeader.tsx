"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  User,
  Calendar,
  Settings,
  CreditCard,
  FileText,
  Star,
  X,
} from "lucide-react";

import api from "@/lib/api";
import toast from "react-hot-toast";
import AppReviewModal from "./AppReviewModal";

export default function ProfileHeader() {

  const pathname = usePathname();

  const [showReviewModal, setShowReviewModal] =
    useState(false);

  const nav = [
    {
      label: "Profile",
      href: "/profile",
      icon: User,
    },
    {
      label: "Appointments",
      href: "/profile/appointments",
      icon: Calendar,
    },
    {
      label: "Payments",
      href: "/profile/payments",
      icon: CreditCard,
    },
    {
      label: "Investigations",
      href: "/profile/investigations",
      icon: FileText,
    },
    {
      label: "Edit Profile",
      href: "/profile/settings",
      icon: Settings,
    },
  ];

  return (

    <>

      {/* HEADER */}
      <div>

        <div className="overflow-x-auto no-scrollbar">

          <div
            className="
        flex w-max items-center mx-auto gap-2
      "
          >

            {/* NAVIGATION */}
            <div
              className="
          flex items-center gap-2

          rounded-lg border border-gray-200

          bg-slate-100

          p-1
        "
            >

              {nav.map(
                ({
                  href,
                  label,
                  icon: Icon,
                }) => {

                  const active =
                    href === "/profile"
                      ? pathname === href
                      : pathname.startsWith(
                        href
                      );

                  return (

                    <Link
                      key={href}
                      href={href}
                      className={`
                  flex items-center gap-2

                  whitespace-nowrap

                  rounded-lg

                  px-4 py-2.5

                  text-sm font-medium

                  transition-all duration-200

                  ${active
                          ? `
                        bg-[#1F2147]
                        text-white
                        shadow-sm
                      `
                          : `
                        text-slate-600
                        hover:bg-white
                      `
                        }
                `}
                    >

                      <Icon size={16} />

                      {label}

                    </Link>
                  );
                }
              )}

            </div>

            {/* REVIEW BUTTON */}
            <button
              onClick={() =>
                setShowReviewModal(true)
              }
              className="
          group

          flex items-center gap-2

          whitespace-nowrap

          rounded-lg

          border border-yellow-200

          bg-gradient-to-r
          from-yellow-50
          to-amber-50

          px-4 py-2.5

          text-sm font-medium

          text-yellow-900

          shadow-sm

          transition-all duration-200

          hover:-translate-y-0.5
          hover:shadow-md
        "
            >

              <div
                className="
            flex h-6 w-6
            items-center justify-center

            rounded-full

            bg-yellow-100

            text-yellow-600
          "
              >

                <Star
                  size={13}
                  className="fill-yellow-500"
                />

              </div>

              Share Review

            </button>

          </div>

        </div>

      </div>

      {/* REVIEW MODAL */}
      <AppReviewModal

        open={
          showReviewModal
        }

        onClose={() =>
          setShowReviewModal(
            false
          )
        }
      />

    </>
  );
}