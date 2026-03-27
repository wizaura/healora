"use client";

import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function GoogleCalenderSetup() {
  const { data, isLoading } = useQuery({
    queryKey: ["google-status"],
    queryFn: () =>
      api.get("/google/doctor/status").then((res) => res.data),
  });

  if (isLoading) return null;

  return (
    <div className="border max-w-7xl mx-auto border-gray-200 rounded-xl mt-28 p-5 flex items-center justify-between">
      <div>
        <p className="font-medium">Google Calendar</p>
        <p className="text-sm text-gray-500">
          {data?.googleConnected
            ? `Connected as ${data.googleEmail}`
            : "Not connected"}
        </p>
      </div>

      <button
        onClick={() =>
          window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/google/doctor/connect`
        }
        className="px-4 py-2 bg-teal-600 text-white rounded-lg"
      >
        {data?.googleConnected ? "Reconnect" : "Connect Google"}
      </button>
    </div>
  );
}