"use client";

import { useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { X } from "lucide-react";

export default function AddConsultationNoteModal({
    appointmentId,
    onSaved
}: any) {

    const [open, setOpen] = useState(false);

    const [symptoms, setSymptoms] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const [advice, setAdvice] = useState("");
    const [followUpDate, setFollowUpDate] = useState("");

    const save = async () => {

        try {

            await api.post("/consultations/notes", {
                appointmentId,
                symptoms,
                diagnosis,
                advice,
                followUpDate: followUpDate || null
            });

            toast.success("Consultation note saved");

            setOpen(false);

            setSymptoms("");
            setDiagnosis("");
            setAdvice("");
            setFollowUpDate("");

            onSaved();

        } catch {
            toast.error("Failed to save consultation note");
        }

    };

    if (!open) {
        return (
            <button
                onClick={() => setOpen(true)}
                className="bg-navy text-white text-sm px-4 py-2 rounded-lg"
            >
                Add Consultation Note
            </button>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white w-[560px] max-h-[85vh] rounded-xl shadow-lg flex flex-col">

                {/* HEADER */}

                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300">

                    <h3 className="text-lg font-semibold">
                        Add Consultation Note
                    </h3>

                    <button onClick={() => setOpen(false)}>
                        <X size={18} className="hover:text-red-500 cursor-pointer" />
                    </button>

                </div>

                {/* SCROLLABLE BODY */}

                <div className="overflow-y-auto px-6 py-5 space-y-5 flex-1">

                    {/* SYMPTOMS */}

                    <div className="flex flex-col gap-1">

                        <label className="text-sm font-medium text-gray-700">
                            Symptoms
                        </label>

                        <textarea
                            rows={3}
                            value={symptoms}
                            onChange={(e) => setSymptoms(e.target.value)}
                            placeholder="Example: itching, red patches on skin..."
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                        />

                    </div>

                    {/* DIAGNOSIS */}

                    <div className="flex flex-col gap-1">

                        <label className="text-sm font-medium text-gray-700">
                            Diagnosis
                        </label>

                        <input
                            value={diagnosis}
                            onChange={(e) => setDiagnosis(e.target.value)}
                            placeholder="Example: Psoriasis"
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                        />

                    </div>

                    {/* ADVICE */}

                    <div className="flex flex-col gap-1">

                        <label className="text-sm font-medium text-gray-700">
                            Advice / Treatment Plan
                        </label>

                        <textarea
                            rows={3}
                            value={advice}
                            onChange={(e) => setAdvice(e.target.value)}
                            placeholder="Example: Avoid oily foods, follow prescribed medicine"
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                        />

                    </div>

                    {/* FOLLOW UP */}

                    <div className="flex flex-col gap-1">

                        <label className="text-sm font-medium text-gray-700">
                            Follow-up Date
                        </label>

                        <input
                            type="date"
                            value={followUpDate}
                            onChange={(e) => setFollowUpDate(e.target.value)}
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                        />

                        <p className="text-xs text-gray-400">
                            Optional: Set a follow-up visit date for the patient
                        </p>

                    </div>

                </div>

                {/* FOOTER */}

                <div className="border-t border-gray-300 px-6 py-4 flex justify-end gap-3">

                    <button
                        onClick={() => setOpen(false)}
                        className="hover:bg-gray-200 px-3 py-2 rounded-md text-gray-500 text-sm"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={save}
                        className="bg-navy hover:bg-navy-dark text-white px-4 py-2 rounded-lg text-sm"
                    >
                        Save Consultation
                    </button>

                </div>

            </div>

        </div>
    );
}