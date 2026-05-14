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
  const [note, setNote] = useState("1. ");
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

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {

    if (e.key !== "Enter") return;

    e.preventDefault();

    const target = e.currentTarget;

    const cursorPos =
      target.selectionStart;

    const textBeforeCursor =
      note.substring(0, cursorPos);

    const textAfterCursor =
      note.substring(cursorPos);

    const lines =
      textBeforeCursor.split("\n");

    const nextNumber =
      lines.length + 1;

    const insertText =
      `\n${nextNumber}. `;

    const updated =
      textBeforeCursor +
      insertText +
      textAfterCursor;

    setNote(updated);

    requestAnimationFrame(() => {

      const newPos =
        cursorPos +
        insertText.length;

      target.selectionStart = newPos;
      target.selectionEnd = newPos;
    });
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="bg-navy text-white text-sm px-4 py-2 rounded-lg"
      >
        Add Investigation
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

          onChange={(e) =>
            setNote(e.target.value)
          }

          onKeyDown={handleKeyDown}

          className="
        w-full

        rounded-lg
        border border-slate-200

        p-4

        text-sm
        leading-7

        focus:outline-none
        focus:ring-4
        focus:ring-navy/10
        focus:border-navy

        transition
    "

          rows={7}
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