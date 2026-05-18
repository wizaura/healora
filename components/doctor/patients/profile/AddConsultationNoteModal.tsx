"use client";

import { useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { X } from "lucide-react";

export default function AddConsultationNoteModal({
    appointment,
    onSaved,
    existingNote = null,
    trigger = null,
}: any) {

    const [open, setOpen] = useState(false);

    const [symptoms,
        setSymptoms] =
        useState(
            existingNote?.symptoms || ""
        );

    const [diagnosis,
        setDiagnosis] =
        useState(
            existingNote?.diagnosis || ""
        );

    const [advice,
        setAdvice] =
        useState(
            existingNote?.advice || ""
        );

    const [followUpDate,
        setFollowUpDate] =
        useState(

            existingNote?.followUpDate

                ? new Date(
                    existingNote.followUpDate
                )
                    .toISOString()
                    .split("T")[0]

                : ""
        );

    const save =
        async () => {

            try {

                const payload = {

                    appointmentId:
                        appointment.id,

                    symptoms,

                    diagnosis,

                    advice,

                    followUpDate:
                        followUpDate || null,
                };

                if (
                    existingNote
                ) {

                    await api.patch(

                        `/consultations/notes/${existingNote.id}`,

                        payload
                    );

                    toast.success(

                        "Consultation note updated"
                    );

                } else {

                    await api.post(

                        "/consultations/notes",

                        payload
                    );

                    toast.success(

                        "Consultation note saved"
                    );
                }

                setOpen(false);

                onSaved();

            } catch {

                toast.error(

                    existingNote

                        ? "Failed to update consultation note"

                        : "Failed to save consultation note"
                );
            }
        };

    if (!open) {

        return trigger ? (

            <div
                onClick={() =>
                    setOpen(true)
                }
            >

                {trigger}

            </div>

        ) : (

            <button
                onClick={() =>
                    setOpen(true)
                }

                className="
                bg-navy

                px-4 py-2

                text-sm
                text-white

                rounded-lg
            "
            >

                {existingNote

                    ? "Edit"

                    : "Add Consultation Note"}

            </button>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white w-[560px] max-h-[85vh] rounded-xl shadow-lg flex flex-col">

                {/* HEADER */}

                <div className="border-b border-slate-200 px-6 py-5">

                    {/* TOP */}

                    <div className="flex items-start justify-between gap-4">

                        <div>

                            <h3 className="text-xl font-semibold text-slate-900">
                                Add Consultation Note
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                                Record symptoms, diagnosis, and treatment plan for this consultation.
                            </p>

                        </div>

                        <button
                            onClick={() => setOpen(false)}

                            className="
                rounded-lg

                p-2

                text-slate-400

                transition

                hover:bg-slate-100
                hover:text-red-500
            "
                        >

                            <X size={18} />

                        </button>

                    </div>

                    {/* CONSULTATION INFO */}

                    <div className="mt-5 flex flex-wrap gap-2">

                        {/* DATE */}

                        <div
                            className="
                inline-flex items-center gap-2

                rounded-full

                border border-slate-200

                bg-slate-50

                px-3 py-1.5

                text-xs font-medium

                text-slate-700
            "
                        >

                            {new Date(
                                appointment.slot.startTimeUTC
                            ).toLocaleString(
                                "en-GB",
                                {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",

                                    hour: "numeric",
                                    minute: "2-digit",

                                    hour12: true,
                                }
                            )}

                        </div>

                        {/* DELIVERY MODE */}

                        <div
                            className="
                inline-flex items-center gap-2

                rounded-full

                bg-teal-50

                px-3 py-1.5

                text-xs font-medium

                uppercase tracking-wide

                text-teal-700
            "
                        >

                            {appointment.deliveryMode}

                        </div>

                        {/* STATUS */}

                        <div
                            className={`
                inline-flex items-center gap-2

                rounded-full

                px-3 py-1.5

                text-xs font-medium

                uppercase tracking-wide

                ${appointment.status === "COMPLETED"

                                    ? `
                        bg-green-50
                        text-green-700
                    `

                                    : `
                        bg-yellow-50
                        text-yellow-700
                    `
                                }
            `}
                        >

                            {appointment.status}

                        </div>

                    </div>

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
                        {existingNote
                            ? "Edit"
                            : "Add Consultation Note"}
                    </button>

                </div>

            </div>

        </div>
    );
}