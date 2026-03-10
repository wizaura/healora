"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import Link from "next/link";
import { useState, useMemo } from "react";

export default function PatientsPage() {

    const [search, setSearch] = useState("");

    const { data = [], isLoading } = useQuery({
        queryKey: ["doctor-patients"],
        queryFn: async () => {
            const res = await api.get("/consultations/patients");
            return res.data;
        },
    });

    /* ---------------- FILTER ---------------- */

    const filteredPatients = useMemo(() => {

        if (!search) return data;

        return data.filter((p: any) =>
            p.name?.toLowerCase().includes(search.toLowerCase()) ||
            p.email?.toLowerCase().includes(search.toLowerCase())
        );

    }, [data, search]);

    return (

        <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6 py-24">

            {/* HEADER */}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <h1 className="text-2xl font-semibold text-gray-800">
                    My Patients
                </h1>

                <input
                    type="text"
                    placeholder="Search patient..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-2 text-sm outline-none transition"
                />

            </div>

            {/* CONTENT */}

            {isLoading ? (

                <div className="text-gray-500 text-sm animate-pulse">
                    Loading patients...
                </div>

            ) : filteredPatients.length === 0 ? (

                <div className="text-center py-10 text-gray-400">
                    No patients found
                </div>

            ) : (

                <div className="overflow-x-auto">

                    <table className="w-full text-sm">

                        <thead>

                            <tr className="text-gray-500 text-xs uppercase tracking-wider border-b">

                                <th className="py-3 text-left">
                                    Patient
                                </th>

                                <th className="py-3 text-left">
                                    Email
                                </th>

                                <th className="py-3 text-right">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredPatients.map((patient: any) => (

                                <tr
                                    key={patient.id}
                                    className="border-b last:border-none hover:bg-gray-50 transition"
                                >

                                    <td className="py-4 font-medium text-gray-800">
                                        {patient.name}
                                    </td>

                                    <td className="py-4 text-gray-600">
                                        {patient.email}
                                    </td>

                                    <td className="py-4 text-right">

                                        <Link
                                            href={`/doctor/patients/${patient.id}`}
                                            className="
                                                px-4 py-1
                                                text-sm
                                                font-medium
                                                rounded-md
                                                bg-blue-600
                                                text-white
                                                hover:bg-blue-700
                                                transition
                                            "
                                        >
                                            View Profile
                                        </Link>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            )}

        </div>

    );
}