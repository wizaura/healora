"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export default function AdminAnalytics() {

    const { data, isLoading } = useQuery({
        queryKey: ["admin-analytics"],
        queryFn: async () => {
            const res = await api.get("/admin/payments/analytics");
            return res.data;
        }
    });

    if (isLoading) return <div className="p-6">Loading...</div>;

    return (
        <div className="pt-28 px-6 max-w-7xl mx-auto space-y-8">

            {/* HEADER */}
            <div>
                <h1 className="text-3xl font-semibold">
                    Revenue Analytics
                </h1>
                <p className="text-sm text-gray-500">
                    Monitor platform performance and revenue insights
                </p>
            </div>

            {/* STATS */}
            <div className="grid md:grid-cols-4 gap-6">

                <Card title="Total Revenue" value={`₹${data.totalRevenue}`} />
                <Card title="Consultation Revenue" value={`₹${data.consultationRevenue}`} />
                <Card title="Pharmacy Revenue" value={`₹${data.pharmacyRevenue}`} />
                <Card title="Appointments" value={data.totalAppointments} />

            </div>

            {/* DOCTOR STATS */}
            <div className="bg-white border rounded-xl p-6">

                <h2 className="text-lg font-semibold mb-4">
                    Doctor Performance
                </h2>

                <div className="space-y-4">

                    {data.doctorStats.map((doc: any, i: number) => (

                        <div
                            key={i}
                            className="flex justify-between items-center border-b pb-3"
                        >

                            <div>
                                <p className="font-medium">{doc.name}</p>
                                <p className="text-sm text-gray-500">
                                    {doc.consultations} consultations
                                </p>
                            </div>

                            <p className="font-semibold text-teal-600">
                                ₹{doc.revenue}
                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}

function Card({ title, value }: any) {
    return (
        <div className="bg-white border rounded-xl p-5 shadow-sm">

            <p className="text-sm text-gray-500">{title}</p>

            <p className="text-2xl font-semibold mt-1">
                {value}
            </p>

        </div>
    );
}