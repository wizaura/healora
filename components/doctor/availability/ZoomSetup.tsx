"use client";

import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function ZoomSetup() {
  const { data, isLoading } = useQuery({
    queryKey: ["zoom-status"],
    queryFn: () =>
      api.get("/zoom/doctor/status").then((res) => res.data),
  });

  if (isLoading) return null;

  return (
    <div className="border max-w-7xl mx-auto border-gray-200 rounded-xl mt-6 p-5 flex items-center justify-between">
      <div>
        <p className="font-medium">Zoom</p>
        <p className="text-sm text-gray-500">
          {data?.zoomConnected
            ? `Connected as ${data.zoomEmail}`
            : "Not connected"}
        </p>
      </div>

      <button
        onClick={() =>
          window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/zoom/doctor/connect`
        }
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        {data?.zoomConnected ? "Reconnect" : "Connect Zoom"}
      </button>
    </div>
  );
}