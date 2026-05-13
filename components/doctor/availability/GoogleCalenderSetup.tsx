"use client";

import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import {
  CalendarDays,
  CheckCircle2,
  Link2,
} from "lucide-react";

/* ---------------------------------- */
/* GOOGLE CALENDAR */
/* ---------------------------------- */

export default function GoogleCalenderSetup() {

  const { data, isLoading } = useQuery({
    queryKey: ["google-status"],
    queryFn: () =>
      api
        .get("/google/doctor/status")
        .then((res) => res.data),
  });

  if (isLoading) return null;

  const connected = data?.googleConnected;

  return (
    <div
      className="
        relative overflow-hidden

        w-full
        rounded-xl
        border border-gray-200

        bg-white

        p-6

        shadow-sm
      "
    >

      {/* Glow */}
      <div
        className="
          absolute -top-10 -right-10
          h-40 w-40
          rounded-full
          bg-teal-100/40
          blur-3xl
        "
      />

      <div
        className="
          relative z-10

          flex flex-col gap-5
          lg:flex-row lg:items-center lg:justify-between
        "
      >

        {/* LEFT */}
        <div className="flex items-start gap-4">

          <div
            className="
              flex h-14 w-14
              items-center justify-center
              rounded-2xl
              bg-teal-100
            "
          >
            <CalendarDays
              size={28}
              className="text-teal-700"
            />
          </div>

          <div>

            <div className="flex items-center gap-2">

              <h3 className="text-lg font-semibold text-slate-900">
                Google Calendar
              </h3>

              {connected && (
                <span
                  className="
                    inline-flex items-center gap-1

                    rounded-full

                    bg-emerald-100

                    px-2.5 py-1

                    text-xs font-medium text-emerald-700
                  "
                >
                  <CheckCircle2 size={12} />
                  Connected
                </span>
              )}

            </div>

            <p className="mt-1 text-sm text-slate-500 max-w-md">

              {connected
                ? `Connected as ${data.googleEmail}`
                : "Connect your Google Calendar to automatically create Google Meet consultation links and sync appointments."
              }

            </p>

          </div>

        </div>

        {/* BUTTON */}
        <button
          onClick={() =>
            window.location.href =
            `${process.env.NEXT_PUBLIC_API_URL}/google/doctor/connect`
          }
          className="
            inline-flex items-center justify-center gap-2

            rounded-lg

            bg-teal-600
            hover:bg-teal-700

            px-5 py-3

            text-sm font-semibold text-white

            shadow-lg shadow-teal-600/10

            transition-all duration-200
          "
        >

          <Link2 size={16} />

          {connected
            ? "Reconnect Google"
            : "Connect Google"}

        </button>

      </div>

    </div>
  );
}