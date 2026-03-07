"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { User } from "lucide-react";

type Doctor = {
    id: string;
    name: string;
    email: string;
    isActive: boolean;
    doctor: {
        id: string;
        isApproved: boolean;
        experience: number;
        qualification: string;
        consultationFee: number;
    } | null;
};

export default function DoctorsTable() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchDoctors = async () => {
        const res = await api.get("/admin/doctors");
        setDoctors(res.data);
        setLoading(false);
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    if (loading) {
        return <div className="text-slate-500">Loading doctors...</div>;
    }

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-sm">
                <thead className="bg-slate-50">
                    <tr>
                        <th className="px-5 py-3 text-left">Doctor</th>
                        <th className="px-5 py-3 text-left">Email</th>
                        <th className="px-5 py-3 text-left">Status</th>
                        <th className="px-5 py-3 text-left">Approval</th>
                    </tr>
                </thead>

                <tbody>
                    {doctors.map((doc) => (
                        <tr key={doc.id} className="border-t hover:bg-slate-50">
                            <td className="px-5 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-9 w-9 flex items-center justify-center rounded-full bg-slate-100">
                                        <User size={16} />
                                    </div>
                                    {doc.name}
                                </div>
                            </td>

                            <td className="px-5 py-4 text-slate-600">{doc.email}</td>

                            <td className="px-5 py-4">
                                <span
                                    className={`rounded-full px-3 py-1 text-xs ${doc.isActive
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {doc.isActive ? "Active" : "Inactive"}
                                </span>
                            </td>

                            <td className="px-5 py-4">
                                {doc?.doctor?.isApproved ? (
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                                        Approved
                                    </span>
                                ) : (
                                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">
                                        Pending
                                    </span>
                                )}
                            </td>
                        </tr>
                    ))}

                    {doctors.length === 0 && (
                        <tr>
                            <td colSpan={4} className="text-center py-10 text-slate-500">
                                No doctors found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}