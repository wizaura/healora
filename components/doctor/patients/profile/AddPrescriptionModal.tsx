"use client";

import { useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { Trash2, X } from "lucide-react";
import { getApiError } from "@/lib/util";

export default function AddPrescriptionModal({ appointmentId, onSaved }: any) {

    const [open, setOpen] = useState(false);

    const [medicines, setMedicines] = useState([
        { text: "" }
    ]);

    const [instructions, setInstructions] = useState("");
    const [loading, setLoading] = useState(false);

    const addMedicine = () => {
        setMedicines([...medicines, { text: "" }]);
    };

    const removeMedicine = (index: number) => {

        if (medicines.length === 1) return;

        const copy = medicines.filter((_, i) => i !== index);
        setMedicines(copy);
    };


    const save = async () => {

        try {

            setLoading(true);

            await api.post("/consultations/prescriptions", {
                appointmentId,
                medicines,
                instructions
            });

            toast.success("Prescription created");

            setOpen(false);

            setMedicines([{ text: "" }]);
            setInstructions("");

            onSaved();

        } catch (err: any) {

            toast.error(getApiError(err));

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
                Add Prescription
            </button>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white w-[640px] max-h-[90vh] rounded-xl shadow-lg flex flex-col">

                {/* HEADER */}

                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300">

                    <h3 className="text-lg font-semibold">
                        Create Prescription
                    </h3>

                    <button onClick={() => setOpen(false)}>
                        <X size={18} className="hover:text-red-500" />
                    </button>

                </div>

                {/* SCROLLABLE CONTENT */}

                <div className="overflow-y-auto px-6 py-5 space-y-6 flex-1">

                    {/* MEDICINES */}

                    <div className="space-y-4">

                        <h4 className="text-sm font-semibold text-gray-700">
                            Medicines
                        </h4>

                        {medicines.map((m, i) => (

                            <div
                                key={i}
                                className="border border-gray-200 rounded-lg p-4 space-y-3"
                            >

                                <div className="flex items-center justify-between">

                                    <span className="text-sm font-medium text-gray-700">
                                        Medicine {i + 1}
                                    </span>

                                    {medicines.length > 1 && (
                                        <button
                                            onClick={() => removeMedicine(i)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}

                                </div>

                                <textarea
                                    placeholder="Example: Psorinum 1M (10 pack) EMES 1 in 2 days"
                                    value={m.text}
                                    onChange={(e) => {
                                        const copy = [...medicines];
                                        copy[i].text = e.target.value;
                                        setMedicines(copy);
                                    }}
                                    rows={2}
                                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full"
                                />

                            </div>

                        ))}

                        <button
                            onClick={addMedicine}
                            className="text-sm text-blue-600 hover:underline"
                        >
                            + Add another medicine
                        </button>

                    </div>

                    {/* ADDITIONAL INSTRUCTIONS */}

                    <div className="flex flex-col gap-1">

                        <label className="text-sm font-semibold text-gray-700">
                            Additional Instructions
                        </label>

                        <textarea
                            placeholder="Example: Apply ointment twice daily"
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                            rows={3}
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                        />

                    </div>

                    {/* PREVIEW */}

                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">

                        <h4 className="text-sm font-semibold text-gray-700 mb-3">
                            Prescription Preview
                        </h4>

                        <div className="space-y-2 text-sm">

                            {medicines.map((m, i) => (
                                m.text && (
                                    <p key={i}>
                                        {i + 1}. {m.text}
                                    </p>
                                )
                            ))}

                            {instructions && (
                                <p className="mt-3 text-gray-600">
                                    <strong>Instructions:</strong> {instructions}
                                </p>
                            )}

                        </div>

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
                        disabled={loading}
                        className="bg-navy hover:bg-navy-dark text-white px-4 py-2 rounded-lg text-sm"
                    >
                        Save Prescription
                    </button>

                </div>

            </div>

        </div>
    );
}