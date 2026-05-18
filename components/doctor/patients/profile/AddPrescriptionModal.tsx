"use client";

import { useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { Trash2, X } from "lucide-react";
import { getApiError } from "@/lib/util";
import { useQuery } from "@tanstack/react-query";

export default function AddPrescriptionModal({ appointment, user, deliveryMode, onSaved }: any) {

    const [open, setOpen] = useState(false);

    const [medicines, setMedicines] = useState([
        { text: "" }
    ]);
    const [selectedMedikits, setSelectedMedikits] = useState<any[]>([]);

    const { data: medikits } = useQuery({
        queryKey: ["medikits"],
        queryFn: async () => {
            const res = await api.get("/medikits");
            return res.data;
        },
    });
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender || "");

    const [instructions, setInstructions] = useState("");
    const [loading, setLoading] = useState(false);
    const [confirmOpen,
        setConfirmOpen] =
        useState(false);

    const addMedicine = () => {
        setMedicines([...medicines, { text: "" }]);
    };

    const toggleMedikit = (kit: any) => {
        const exists = selectedMedikits.find((k) => k.id === kit.id);

        if (exists) {
            setSelectedMedikits(selectedMedikits.filter((k) => k.id !== kit.id));
        } else {
            setSelectedMedikits([...selectedMedikits, kit]);
        }
    };

    const removeMedicine = (index: number) => {

        if (medicines.length === 1) return;

        const copy = medicines.filter((_, i) => i !== index);
        setMedicines(copy);
    };


    const savePrescription = async () => {

        try {

            console.log(appointment.id, 'ss')

            setLoading(true);

            await api.post("/consultations/prescriptions", {
                appointmentId: appointment.id,
                medicines,
                instructions,
                age,
                gender,
                medikitIds:
                    deliveryMode === "DOOR"
                        ? selectedMedikits.map((k) => k.id)
                        : [],
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

                <div className="border-b border-slate-200 px-6 py-5">

                    {/* TOP */}

                    <div className="flex items-start justify-between gap-4">

                        <div>

                            <h3 className="text-xl font-semibold text-slate-900">
                                Create Prescription
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                                Add medicines, dosage instructions, and treatment details for this consultation.
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

                        {/* DATE + TIME */}

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

                            {appointment?.date}{"   "}

                            •

                            {appointment?.startTime}{"   "}

                        </div>

                        {/* DELIVERY MODE */}

                        {appointment?.deliveryMode && (

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

                        )}

                        {/* STATUS */}

                        {appointment?.status && (

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

                        )}

                    </div>

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
                                    placeholder="Example: Psorinum 1M (10 pack) EMES 1 in 2 days / 1 month"
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

                        {/* PATIENT DETAILS (ONLY IF MISSING) */}

                        <div className="space-y-4">
                            <h4 className="text-sm font-semibold text-gray-700">
                                Patient Details
                            </h4>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-gray-600">Age</label>
                                    <input
                                        type="number"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-gray-600">Sex</label>
                                    <select
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full"
                                    >
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>


                    </div>

                    {/* MEDIKITS */}
                    {deliveryMode === "DOOR" && (
                        <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-gray-700">
                                Select Medikits
                            </h4>

                            <div className="grid grid-cols-2 gap-3">
                                {medikits?.map((kit: any) => {
                                    const selected = selectedMedikits.find((k) => k.id === kit.id);

                                    return (
                                        <div
                                            key={kit.id}
                                            onClick={() => toggleMedikit(kit)}
                                            className={`border rounded-lg p-3 cursor-pointer transition ${selected
                                                ? "border-teal-600 bg-teal-50"
                                                : "border-gray-200 hover:border-gray-300"
                                                }`}
                                        >
                                            <p className="font-medium text-sm">{kit.title}</p>
                                            <p className="text-xs text-gray-500">
                                                {kit.medicines.length} medicines
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

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

                    <p className="text-gray-800 text-sm bg-gray-100 p-3 rounded-md">
                        <span className="font-bold">Note: </span>
                        Your digital signature, seal, and registration details
                        will be automatically attached to the prescription.
                    </p>

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

                            {selectedMedikits.length > 0 && (
                                <div className="mt-3 space-y-2">
                                    {selectedMedikits.map((kit: any, index: number) => (
                                        <div key={kit.id}>
                                            <p className="font-medium">
                                                Medikit: {kit.title}
                                            </p>

                                            <ul className="ml-4 list-disc">
                                                {kit.medicines.map((m: string, i: number) => (
                                                    <li key={i}>{m}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            )}

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
                        onClick={() =>
                            setConfirmOpen(true)}
                        disabled={loading}
                        className="bg-navy hover:bg-navy-dark text-white px-4 py-2 rounded-lg text-sm"
                    >
                        {loading ? "Creating Prescription..." : "Save Prescription"}
                    </button>

                </div>

            </div>

            {/* =====================================================
   CONFIRM MODAL
   ===================================================== */}

            {confirmOpen && (

                <div
                    className="
            fixed inset-0 z-[70]

            flex items-center justify-center

            bg-black/50

            p-4
        "
                >

                    <div
                        className="
                w-full max-w-md

                rounded-2xl

                bg-white

                p-6

                shadow-2xl
            "
                    >

                        {/* TITLE */}

                        <h3
                            className="
                    text-lg font-semibold
                    text-slate-900
                "
                        >

                            Continue Prescription?

                        </h3>

                        {/* DESCRIPTION */}

                        <p
                            className="
                    mt-3

                    text-sm
                    leading-relaxed

                    text-slate-600
                "
                        >

                            Please review the prescription carefully before continuing.

                            Once created, the prescription will be shared with the patient and may affect pharmacy processing and billing.

                        </p>

                        {/* ACTIONS */}

                        <div
                            className="
                    mt-6

                    flex items-center
                    justify-end

                    gap-3
                "
                        >

                            <button
                                onClick={() =>
                                    setConfirmOpen(false)
                                }

                                className="
                        rounded-xl

                        border border-slate-200

                        px-4 py-2

                        text-sm
                        font-medium

                        text-slate-600

                        transition

                        hover:bg-slate-50
                    "
                            >

                                Cancel

                            </button>

                            <button
                                onClick={async () => {

                                    setConfirmOpen(false);

                                    await savePrescription();
                                }}

                                disabled={loading}

                                className="
                        rounded-xl

                        bg-[#1F2147]

                        px-4 py-2

                        text-sm
                        font-medium

                        text-white

                        transition

                        hover:bg-[#171933]

                        disabled:opacity-50
                    "
                            >

                                {loading

                                    ? "Creating..."

                                    : "Continue"}

                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}