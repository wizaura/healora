"use client";

import { useEffect, useMemo, useState } from "react";
import api from "@/lib/api";
import AppointmentCard from "./AppointmentCard";
import AppointmentDetailsModal from "./AppointmentModal";
import { Search } from "lucide-react";

export default function UserAppointments() {

    const [appointments, setAppointments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<any>(null);
    const [statusFilter, setStatusFilter] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchAppointments();
    }, [statusFilter]);

    const fetchAppointments = async () => {
        try {
            setLoading(true);

            const res = await api.get("/appointments/my", {
                params: statusFilter ? { status: statusFilter } : {},
            });

            setAppointments(res.data);

        } finally {
            setLoading(false);
        }
    };

    const filtered = useMemo(() => {
        return appointments.filter((a) =>
            a.doctor?.user?.name
                ?.toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [appointments, search]);

    return (
        <div className="min-h-screen py-12">

            <div className="mx-auto max-w-5xl px-6 space-y-8">

                {/* FILTER BAR */}

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex flex-wrap gap-4 items-center">

                    <div className="relative">

                        <Search
                            size={16}
                            className="absolute left-3 top-2.5 text-slate-400"
                        />

                        <input
                            placeholder="Search doctor"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                        />

                    </div>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border border-slate-200 rounded-lg px-3 py-2 text-sm"
                    >
                        <option value="">All Status</option>
                        <option value="CONFIRMED">Confirmed</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="CANCELLED">Cancelled</option>
                        <option value="NO_SHOW">No Show</option>
                    </select>

                </div>

                {/* LIST */}

                {loading ? (

                    <div className="text-center text-sm text-slate-500 py-10">
                        Loading appointments...
                    </div>

                ) : filtered.length === 0 ? (

                    <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500 shadow-sm">
                        No appointments found
                    </div>

                ) : (

                    <div className="space-y-4">

                        {filtered.map((appt) => (

                            <AppointmentCard
                                key={appt.id}
                                appt={appt}
                                onView={() => setSelected(appt)}
                            />

                        ))}

                    </div>

                )}

            </div>

            {selected && (
                <AppointmentDetailsModal
                    appointment={selected}
                    onClose={() => setSelected(null)}
                />
            )}

        </div>
    );
}