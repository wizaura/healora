"use client"

import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, Link2, Video } from "lucide-react";

export default function ZoomSetup() {

  const { data, isLoading } = useQuery({
    queryKey: ["zoom-status"],
    queryFn: () =>
      api
        .get("/zoom/doctor/status")
        .then((res) => res.data),
  });

  if (isLoading) return null;

  const connected = data?.zoomConnected;

  return (
    <div
      className="
        relative overflow-hidden

        rounded-xl
        w-full
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
          bg-blue-100/40
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
              bg-blue-100
            "
          >
            <Video
              size={28}
              className="text-blue-700"
            />
          </div>

          <div>

            <div className="flex items-center gap-2">

              <h3 className="text-lg font-semibold text-slate-900">
                Zoom
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
                ? `Connected as ${data.zoomEmail}`
                : "Connect Zoom!"
              }

            </p>

          </div>

        </div>

        {/* BUTTON */}
        <button
          onClick={() =>
            window.location.href =
            `${process.env.NEXT_PUBLIC_API_URL}/zoom/doctor/connect`
          }
          className="
            inline-flex items-center justify-center gap-2

            rounded-lg

            bg-blue-600
            hover:bg-blue-700

            px-5 py-3

            text-sm font-semibold text-white

            shadow-lg shadow-blue-600/10

            transition-all duration-200
          "
        >

          <Link2 size={16} />

          {connected
            ? "Reconnect Zoom"
            : "Connect Zoom"}

        </button>

      </div>

    </div>
  );
}