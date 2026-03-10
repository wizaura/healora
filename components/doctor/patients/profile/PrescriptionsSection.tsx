"use client";

import api from "@/lib/api";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import AddPrescriptionModal from "./AddPrescriptionModal";

export default function PrescriptionsSection({
    prescriptions,
    appointmentId,
    refetch
}: any) {

    const deletePrescription = async (id: string) => {

        if (!confirm("Delete prescription?")) return;

        await api.delete(`/consultations/prescriptions/${id}`);

        toast.success("Prescription deleted");

        refetch();
    };

    return (
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 space-y-4">

            <div className="flex justify-between items-center">

                <h2 className="text-lg font-semibold text-gray-800">
                    Prescriptions
                </h2>

                <AddPrescriptionModal
                    appointmentId={appointmentId}
                    onSaved={refetch}
                />

            </div>

            {prescriptions?.length === 0 ? (
                <p className="text-sm text-gray-400">
                    No prescriptions created
                </p>
            ) : (
                prescriptions.map((p: any) => (

                    <div
                        key={p.id}
                        className="border border-gray-100 rounded-lg p-4 space-y-2"
                    >

                        <div className="text-xs text-gray-400 flex justify-between">

                            <span>
                                {new Date(p.createdAt).toLocaleString()}
                            </span>

                            <button
                                onClick={() => deletePrescription(p.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <Trash2 size={16} />
                            </button>

                        </div>

                        <ul className="list-decimal pl-5 space-y-1 text-sm">

                            {p.medicines?.map((m: any, i: number) => (

                                <li key={i} className="text-gray-700">
                                    {m.text}
                                </li>

                            ))}

                        </ul>

                        {p.instructions && (
                            <p className="text-sm text-gray-600">
                                <b>Instructions:</b> {p.instructions}
                            </p>
                        )}

                        <div className="text-xs text-gray-500">
                            Status: {p.status}
                        </div>

                    </div>

                ))
            )}

        </div>
    );
}