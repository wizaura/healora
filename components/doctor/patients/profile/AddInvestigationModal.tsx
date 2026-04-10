"use client";

import { useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { X } from "lucide-react";

export default function AddDoctorInvestigationModal({
  patientId,
  onSaved,
}: any) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const save = async () => {
    try {
      if (!note) return toast.error("Add note");

      setLoading(true);

      await api.post("/consultations/investigations/doctor", {
        patientId,
        note,
      });

      toast.success("Saved successfully");

      setOpen(false);
      setNote("");
      onSaved?.();
    } catch (err) {
      toast.error("Failed");
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="bg-navy text-white text-sm px-4 py-2 rounded-lg"
      >
        Add Note
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[500px] rounded-xl p-6 space-y-4">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            Add Investigation Note
          </h3>
          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        {/* Note */}
        <textarea
          placeholder="Write investigation advice..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="border rounded-lg w-full p-2 text-sm"
          rows={5}
        />

        {/* Submit */}
        <button
          onClick={save}
          disabled={loading}
          className="bg-navy text-white px-4 py-2 rounded-lg w-full"
        >
          {loading ? "Saving..." : "Save"}
        </button>

      </div>
    </div>
  );
}