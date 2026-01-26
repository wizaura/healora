"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";
import { Plus } from "lucide-react";

type Doctor = {
    id: string;
    name: string;
    email: string;
    isActive: boolean;
};

export default function DoctorsList() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await api.get("/admin/doctors");
                setDoctors(res.data);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    if (loading) return <p className="p-8">Loading...</p>;

    return (
        <div className="p-8 pt-24">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-slate-900">
                    Doctors
                </h1>

                <Link
                    href="/admin/doctors/add"
                    className="inline-flex items-center gap-2 rounded-xl
          bg-teal-600 px-4 py-2 text-sm font-semibold text-white"
                >
                    <Plus size={16} />
                    Add Doctor
                </Link>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-4 py-3 text-left">Name</th>
                            <th className="px-4 py-3 text-left">Email</th>
                            <th className="px-4 py-3 text-left">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {doctors.map((doc) => (
                            <tr key={doc.id} className="border-t">
                                <td className="px-4 py-3">{doc.name}</td>
                                <td className="px-4 py-3">{doc.email}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-medium
                      ${doc.isActive
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {doc.isActive ? "Active" : "Inactive"}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
