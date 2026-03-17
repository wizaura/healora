"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function PharmacyModal({ data, onClose, onSubmit }: any) {

    const [price, setPrice] = useState("");
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);

    const user = data.appointment.user;
    const slot = data.appointment.slot;

    const handleSubmit = async () => {

        if (!price) return;

        setLoading(true);

        await onSubmit({
            price: Number(price),
            note
        });

        setLoading(false);
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white w-[700px] max-h-[90vh] rounded-xl shadow-lg flex flex-col">

                {/* HEADER */}
                <div className="flex justify-between items-center p-5 border-b">
                    <h2 className="text-lg font-semibold">
                        Prescription Details
                    </h2>

                    <button onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>

                {/* BODY */}
                <div className="p-5 space-y-6 overflow-y-auto">

                    {/* USER */}
                    <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                    </div>

                    {/* APPOINTMENT */}
                    <div className="text-sm text-gray-600">
                        <p>
                            {new Date(slot.startTimeUTC).toLocaleString()}
                        </p>
                        <p>{data.deliveryMode}</p>
                    </div>

                    {/* MEDICINES */}
                    <div>
                        <h3 className="font-semibold mb-2">Medicines</h3>

                        <ul className="space-y-2 text-sm">
                            {data.medicines?.map((m: any, i: number) => (
                                <li key={i}>
                                    {i + 1}. {m.text}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* INSTRUCTIONS */}
                    {data.instructions && (
                        <div>
                            <h3 className="font-semibold mb-1">Instructions</h3>
                            <p className="text-sm text-gray-600">
                                {data.instructions}
                            </p>
                        </div>
                    )}

                    {/* PRICE INPUT */}
                    {!data.pharmacyPrice && (
                        <div className="space-y-3">

                            <input
                                type="number"
                                placeholder="Enter price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full border rounded-lg px-4 py-2"
                            />

                            <textarea
                                placeholder="Optional note"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                className="w-full border rounded-lg px-4 py-2"
                            />

                        </div>
                    )}

                    {/* SHOW PRICE */}
                    {data.pharmacyPrice && (
                        <div className="bg-gray-50 p-4 rounded-lg text-sm">
                            <p><strong>Price:</strong> ₹{data.pharmacyPrice}</p>
                            <p><strong>Status:</strong> {data.paymentStatus}</p>
                        </div>
                    )}

                </div>

                {/* FOOTER */}
                {!data.pharmacyPrice && (
                    <div className="p-4 border-t flex justify-end">

                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="bg-teal-600 text-white px-5 py-2 rounded-lg"
                        >
                            {loading ? "Sending..." : "Send Quote"}
                        </button>

                    </div>
                )}

            </div>

        </div>
    );
}