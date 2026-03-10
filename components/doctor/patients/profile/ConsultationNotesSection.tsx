"use client";

import { useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import AddConsultationNoteModal from "./AddConsultationNoteModal";

export default function ConsultationNotesSection({
    notes,
    appointmentId,
    refetch
}: any) {

    const [editing, setEditing] = useState<any>(null);

    const deleteNote = async (id: string) => {

        if (!confirm("Delete consultation note?")) return;

        await api.delete(`/consultations/notes/${id}`);

        toast.success("Consultation note deleted");

        refetch();
    };

    const formatDate = (date: string) =>
        new Date(date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

    return (
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 space-y-5">

            {/* HEADER */}

            <div className="flex items-center justify-between">

                <h2 className="text-lg font-semibold text-gray-800">
                    Consultation Notes
                </h2>

                <AddConsultationNoteModal
                    appointmentId={appointmentId}
                    onSaved={refetch}
                />

            </div>

            {/* EMPTY STATE */}

            {notes.length === 0 && (

                <div className="text-sm text-gray-400 py-6 text-center">
                    No consultation notes added yet
                </div>

            )}

            {/* NOTES LIST */}

            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">

                {notes.map((note: any) => (

                    <div
                        key={note.id}
                        className="border border-gray-200 rounded-lg p-5 space-y-3 hover:bg-gray-50 transition"
                    >

                        {/* DATE */}

                        <div className="text-xs text-gray-400">
                            {formatDate(note.createdAt)}
                        </div>

                        {/* CONTENT */}

                        <div className="space-y-2 text-sm text-gray-700">

                            {note.symptoms && (
                                <p>
                                    <span className="font-medium text-gray-800">
                                        Symptoms:
                                    </span>{" "}
                                    {note.symptoms}
                                </p>
                            )}

                            {note.diagnosis && (
                                <p>
                                    <span className="font-medium text-gray-800">
                                        Diagnosis:
                                    </span>{" "}
                                    {note.diagnosis}
                                </p>
                            )}

                            {note.advice && (
                                <p>
                                    <span className="font-medium text-gray-800">
                                        Advice:
                                    </span>{" "}
                                    {note.advice}
                                </p>
                            )}

                            {note.followUpDate && (
                                <p className="text-xs text-blue-600">
                                    Follow-up:{" "}
                                    {formatDate(note.followUpDate)}
                                </p>
                            )}

                        </div>

                        {/* ACTIONS */}

                        <div className="flex gap-4 text-sm pt-2">

                            <button
                                onClick={() => setEditing(note)}
                                className="text-blue-600 hover:underline"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => deleteNote(note.id)}
                                className="text-red-600 hover:underline"
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}