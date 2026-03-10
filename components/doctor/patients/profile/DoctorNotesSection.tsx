"use client";

import AddDoctorNoteModal from "./AddDoctorNoteModal";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

export default function DoctorNotesSection({ notes, patientId, refetch }: any) {

    const deleteNote = async (id: string) => {

        if (!confirm("Delete note?")) return;

        await api.delete(`/consultations/patient-notes/${id}`);

        toast.success("Note deleted");

        refetch();
    };

    return (
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 space-y-4">

            <div className="flex items-center justify-between">

                <h2 className="text-lg font-semibold text-gray-800">
                    Doctor Private Notes
                </h2>

                <AddDoctorNoteModal
                    patientId={patientId}
                    onSaved={refetch}
                />

            </div>

            {notes?.length === 0 ? (
                <p className="text-sm text-gray-400">
                    No notes added
                </p>
            ) : (
                notes.map((note: any) => (

                    <div
                        key={note.id}
                        className="border border-gray-100 rounded-lg p-4 flex justify-between"
                    >

                        <div className="space-y-1 text-sm">

                            {note.diagnosis && (
                                <p>
                                    <b>Diagnosis:</b> {note.diagnosis}
                                </p>
                            )}

                            {note.notes && (
                                <p>
                                    <b>Notes:</b> {note.notes}
                                </p>
                            )}

                        </div>

                        <button
                            onClick={() => deleteNote(note.id)}
                            className="text-red-500 hover:text-red-700"
                        >
                            <Trash2 size={16} />
                        </button>

                    </div>

                ))
            )}

        </div>
    );
}