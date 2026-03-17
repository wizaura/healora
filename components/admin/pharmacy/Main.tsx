"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import toast from "react-hot-toast";
import PharmacyModal from "./PharmacyModal";

export default function AdminPharmacy() {

    const [selected, setSelected] = useState<any>(null);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["pharmacy"],
        queryFn: async () => {
            const res = await api.get("/pharmacy");
            return res.data;
        }
    });

    const priceMutation = useMutation({
        mutationFn: async ({ id, price, note }: any) => {
            await api.patch(`/pharmacy/${id}/price`, {
                price,
                note
            });
        },
        onSuccess: () => {
            toast.success("Quote sent to user");
            refetch();
            setSelected(null);
        }
    });

    const getStatus = (p: any) => {
        if (!p.pharmacyPrice) return "Pending Pricing";
        if (p.paymentStatus === "PENDING") return "Awaiting Payment";
        if (p.paymentStatus === "PAID") return "Completed";
    };

    return (
        <div className="pt-28 px-6 max-w-7xl mx-auto space-y-8">

            {/* HEADER */}
            <div>
                <h1 className="text-3xl font-semibold">Pharmacy</h1>
                <p className="text-sm text-gray-500">
                    Manage door delivery prescriptions and pricing
                </p>
            </div>

            {/* LIST */}
            <div className="bg-white rounded-2xl border divide-y">

                {isLoading && (
                    <div className="p-6 text-sm text-gray-500">
                        Loading...
                    </div>
                )}

                {data?.map((p: any) => {

                    const user = p.appointment.user;
                    const date = new Date(p.appointment.slot.startTimeUTC);

                    return (
                        <div
                            key={p.id}
                            onClick={() => setSelected(p)}
                            className="p-5 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition"
                        >

                            {/* LEFT */}
                            <div className="flex items-center gap-4">

                                <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-semibold">
                                    {user.name?.charAt(0)}
                                </div>

                                <div>
                                    <p className="font-medium">{user.name}</p>
                                    <p className="text-sm text-gray-500">
                                        {user.email}
                                    </p>
                                </div>

                            </div>

                            {/* RIGHT */}
                            <div className="text-right space-y-1">

                                <p className="text-sm text-gray-600">
                                    {date.toLocaleDateString()} • {p.deliveryMode}
                                </p>

                                <span className={`
                                    text-xs px-3 py-1 rounded-full
                                    ${!p.pharmacyPrice
                                        ? "bg-yellow-100 text-yellow-700"
                                        : p.paymentStatus === "PAID"
                                            ? "bg-green-100 text-green-600"
                                            : "bg-blue-100 text-blue-600"
                                    }
                                `}>
                                    {getStatus(p)}
                                </span>

                            </div>

                        </div>
                    );
                })}

            </div>

            {/* MODAL */}
            {selected && (
                <PharmacyModal
                    data={selected}
                    onClose={() => setSelected(null)}
                    onSubmit={(val: any) =>
                        priceMutation.mutate({
                            id: selected.id,
                            ...val
                        })
                    }
                />
            )}

        </div>
    );
}