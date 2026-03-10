"use client";

import { useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { X } from "lucide-react";

export default function AddDoctorNoteModal({
    patientId,
    onSaved
}: {
    patientId: string;
    onSaved: () => void;
}) {

    const [open, setOpen] = useState(false);

    const [diagnosis, setDiagnosis] = useState("");
    const [notes, setNotes] = useState("");

    const saveNote = async () => {

        try {

            await api.post("/consultations/patient-notes", {
                patientId,
                diagnosis,
                notes
            });

            toast.success("Note saved");

            setOpen(false);

            setDiagnosis("");
            setNotes("");

            onSaved();

        } catch {
            toast.error("Failed to save note");
        }

    };

    if (!open) {
        return (
            <button
                onClick={() => setOpen(true)}
                className="text-sm bg-navy text-white px-4 py-2 rounded-lg"
            >
                Add Doctor Note
            </button>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white w-[520px] max-h-[80vh] rounded-xl shadow-lg flex flex-col">

                {/* HEADER */}

                <div className="flex items-center justify-between px-6 py-4 border-b">

                    <h3 className="text-lg font-semibold">
                        Add Doctor Note
                    </h3>

                    <button onClick={() => setOpen(false)}>
                        <X size={18} className="hover:text-red-500" />
                    </button>

                </div>

                {/* BODY */}

                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">

                    <div className="flex flex-col gap-1">

                        <label className="text-sm font-medium text-gray-700">
                            Diagnosis
                        </label>

                        <input
                            value={diagnosis}
                            onChange={(e) => setDiagnosis(e.target.value)}
                            placeholder="Example: Psoriasis flare"
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                        />

                    </div>

                    <div className="flex flex-col gap-1">

                        <label className="text-sm font-medium text-gray-700">
                            Doctor Notes
                        </label>

                        <textarea
                            rows={5}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Internal notes about patient condition..."
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                        />

                    </div>

                </div>

                {/* FOOTER */}

                <div className="border-t px-6 py-4 flex justify-end gap-3">

                    <button
                        onClick={() => setOpen(false)}
                        className="text-gray-500 text-sm hover:bg-gray-100 px-3 py-2 rounded-md"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={saveNote}
                        className="bg-navy text-white px-4 py-2 rounded-lg text-sm"
                    >
                        Save Note
                    </button>

                </div>

            </div>

        </div>
    );
}