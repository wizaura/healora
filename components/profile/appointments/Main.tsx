"use client";

import { useEffect, useMemo, useState } from "react";
import api from "@/lib/api";
import AppointmentCard from "./AppointmentCard";
import AppointmentDetailsModal from "./AppointmentModal";
import { CalendarX2, Search } from "lucide-react";
import Loader from "@/components/common/Loader";
import SelectOption from "@/components/common/SelectOption";

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

                <div className="rounded-xl border border-slate-200/80 bg-white/90 backdrop-blur shadow-sm p-5">

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                        {/* LEFT */}
                        <div className="flex flex-col sm:flex-row gap-3 flex-1">

                            {/* SEARCH */}
                            <div className="relative flex-1">

                                <Search
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    placeholder="Search doctor name..."
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                    className="
                        w-full
                        pl-11 pr-4 py-3
                        rounded-lg
                        border border-slate-200
                        bg-slate-50
                        text-sm
                        focus:outline-none
                        focus:ring-4
                        focus:ring-teal-500/10
                        focus:border-teal-500
                        transition
                    "
                                />

                            </div>

                            {/* STATUS SELECT */}
                            <SelectOption
                                value={statusFilter}
                                onChange={setStatusFilter}
                                placeholder="All Status"
                                className="min-w-[180px]"
                                subClasses="
        rounded-lg
        px-4 py-3
        border border-slate-200
        bg-slate-50
    "
                                options={[
                                    {
                                        label: "All Status",
                                        value: "",
                                    },

                                    {
                                        label: "Confirmed",
                                        value: "CONFIRMED",
                                    },

                                    {
                                        label: "Pending",
                                        value: "PENDING",
                                    },

                                    {
                                        label: "Completed",
                                        value: "COMPLETED",
                                    },

                                    {
                                        label: "Cancelled",
                                        value: "CANCELLED",
                                    },

                                    {
                                        label: "No Show",
                                        value: "NO_SHOW",
                                    },
                                ]}
                            />

                        </div>

                        {/* RIGHT */}
                        <div className="flex items-center gap-2 flex-wrap">

                            {/* QUICK FILTERS */}

                            {[
                                {
                                    label: "Upcoming",
                                    value: "CONFIRMED",
                                },

                                {
                                    label: "Completed",
                                    value: "COMPLETED",
                                },

                                {
                                    label: "Cancelled",
                                    value: "CANCELLED",
                                },
                            ].map((item) => (

                                <button
                                    key={item.value}
                                    onClick={() =>
                                        setStatusFilter(item.value)
                                    }
                                    className={`
                        px-4 py-2 rounded-full text-sm transition
                        ${statusFilter === item.value
                                            ? "bg-teal-600 text-white shadow"
                                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                        }
                    `}
                                >
                                    {item.label}
                                </button>
                            ))}

                            {/* CLEAR */}
                            {(search || statusFilter) && (

                                <button
                                    onClick={() => {
                                        setSearch("");
                                        setStatusFilter("");
                                    }}
                                    className="
                        px-4 py-2
                        rounded-full
                        text-sm
                        border border-red-200
                        text-red-600
                        hover:bg-red-50
                        transition
                    "
                                >
                                    Clear Filters
                                </button>

                            )}

                        </div>

                    </div>

                </div>

                {/* LIST */}

                {loading ? (

                    <Loader fullScreen />

                ) : filtered.length === 0 ? (

                    <div
                        className="
        rounded-2xl
        border border-slate-200
        bg-white
        p-10
        text-center
        shadow-sm
        flex
        flex-col
        items-center
        justify-center
    "
                    >

                        <div
                            className="
            h-14 w-14
            rounded-full
            bg-slate-100
            flex items-center justify-center
            mb-4
        "
                        >
                            <CalendarX2
                                size={26}
                                className="text-slate-400"
                            />
                        </div>

                        <h3 className="text-base font-medium text-slate-700">
                            No appointments found
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                            Try changing your filters or search query
                        </p>

                    </div>

                ) : (

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

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