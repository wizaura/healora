"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import toast from "react-hot-toast";
import MedikitModal from "./MedikitModal";

export default function AdminMedikit() {
  const [selected, setSelected] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["medikits"],
    queryFn: async () => {
      const res = await api.get("/medikits");
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/medikits/${id}`);
    },
    onSuccess: () => {
      toast.success("Medikit deleted");
      refetch();
    },
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">Medikits</h1>
          <p className="text-sm text-gray-500">
            Manage medikits, medicines & directions
          </p>
        </div>

        <button
          onClick={() => {
            setSelected(null);
            setOpen(true);
          }}
          className="bg-teal-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Medikit
        </button>
      </div>

      {/* LIST */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        {isLoading && (
          <div className="p-6 text-sm text-gray-500">Loading...</div>
        )}

        {data?.map((m: any) => (
          <div
            key={m.id}
            className="flex justify-between items-center p-5 border-b border-gray-200"
          >
            <div className="flex items-center gap-4">
              <img
                src={m.imageUrl}
                className="w-14 h-14 object-cover rounded-lg border"
              />

              <div>
                <p className="font-medium">{m.title}</p>
                <p className="text-sm text-gray-500 line-clamp-1">
                  {m.description}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSelected(m);
                  setOpen(true);
                }}
                className="px-3 py-1 text-sm border border-gray-200 rounded-lg"
              >
                Edit
              </button>

              <button
                onClick={() => deleteMutation.mutate(m.id)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {open && (
        <MedikitModal
          data={selected}
          onClose={() => setOpen(false)}
          onSuccess={() => {
            setOpen(false);
            refetch();
          }}
        />
      )}
    </div>
  );
}