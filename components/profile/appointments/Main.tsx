"use client";

import { useEffect, useMemo, useState } from "react";
import api from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import {
    Calendar,
    Video,
    CreditCard,
    RefreshCw,
    X,
    Search
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserAppointments() {

    const router = useRouter();

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

    /* ================= Helpers ================= */

    const formatDate = (date: string) =>
        new Date(date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

    const statusStyle = (status: string) => {
        switch (status) {
            case "CONFIRMED":
                return "bg-green-100 text-green-700";
            case "COMPLETED":
                return "bg-blue-100 text-blue-700";
            case "CANCELLED":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    const filtered = useMemo(() => {
        return appointments.filter((a) =>
            a.doctor?.user?.name?.toLowerCase().includes(search.toLowerCase())
        );
    }, [appointments, search]);

    return (
        <div className="min-h-screen bg-wellness-bg py-20">

            <div className="max-w-6xl mx-auto px-6 space-y-10">

                {/* HEADER */}

                <div className="space-y-2">
                    <h1 className="text-3xl font-semibold text-navy-dark">
                        My Appointments
                    </h1>

                    <p className="text-sm text-navy/60">
                        View and manage your consultations
                    </p>
                </div>

                {/* FILTERS */}

                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 flex flex-wrap gap-4 items-center">

                    <div className="relative">

                        <Search
                            size={16}
                            className="absolute left-3 top-2.5 text-gray-400"
                        />

                        <input
                            placeholder="Search doctor"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 pr-3 py-2 border rounded-xl text-sm"
                        />

                    </div>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border rounded-xl px-3 py-2 text-sm"
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

                    <div className="text-center text-navy/60">
                        Loading appointments...
                    </div>

                ) : filtered.length === 0 ? (

                    <div className="bg-white border rounded-xl p-10 text-center text-navy/60">
                        No appointments found
                    </div>

                ) : (

                    <div className="grid gap-6">

                        {filtered.map((appt) => {

                            const payConsultation =
                                appt.slotPaymentStatus === "PAID" &&
                                appt.consultationPaymentStatus !== "PAID";

                            const retrySlot =
                                appt.slotPaymentStatus === "FAILED";

                            return (

                                <div
                                    key={appt.id}
                                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
                                >

                                    {/* LEFT */}

                                    <div className="space-y-2">

                                        <div className="font-medium text-navy-dark">
                                            Dr. {appt.doctor?.user?.name}
                                        </div>

                                        <div className="text-sm text-navy/60">
                                            {appt.doctor?.speciality?.name}
                                        </div>

                                        <div className="flex items-center gap-2 text-sm text-navy/70">
                                            <Calendar size={14} />
                                            {formatDate(appt.slot.startTimeUTC)}
                                        </div>

                                        <span
                                            className={`inline-block mt-1 px-3 py-1 text-xs rounded-full ${statusStyle(
                                                appt.status
                                            )}`}
                                        >
                                            {appt.status}
                                        </span>

                                    </div>

                                    {/* ACTIONS */}

                                    <div className="flex flex-wrap gap-3">

                                        {appt.meetingLink && (

                                            <a
                                                href={appt.meetingLink}
                                                target="_blank"
                                                className="flex items-center gap-2 px-4 py-2 text-sm bg-indigo-600 text-white rounded-xl"
                                            >
                                                <Video size={16} />
                                                Join
                                            </a>

                                        )}

                                        {payConsultation && (

                                            <button
                                                onClick={() =>
                                                    router.push(
                                                        `/checkout/consultation/${appt.id}`
                                                    )
                                                }
                                                className="flex items-center gap-2 px-4 py-2 text-sm bg-wellness-accent text-white rounded-xl"
                                            >
                                                <CreditCard size={16} />
                                                Pay Consultation
                                            </button>

                                        )}

                                        {retrySlot && (

                                            <button
                                                onClick={() =>
                                                    router.push(
                                                        `/checkout/slot/${appt.id}`
                                                    )
                                                }
                                                className="flex items-center gap-2 px-4 py-2 text-sm bg-red-500 text-white rounded-xl"
                                            >
                                                <RefreshCw size={16} />
                                                Retry Slot
                                            </button>

                                        )}

                                        <button
                                            onClick={() => setSelected(appt)}
                                            className="px-4 py-2 text-sm border border-gray-200 rounded-xl"
                                        >
                                            View Details
                                        </button>

                                    </div>

                                </div>

                            );

                        })}

                    </div>

                )}

            </div>

            {/* ================= MODAL ================= */}

            <AnimatePresence>

                {selected && (

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
                    >

                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-5"
                        >

                            <div className="flex justify-between items-center">

                                <h2 className="text-lg font-semibold text-navy-dark">
                                    Appointment Details
                                </h2>

                                <X
                                    size={18}
                                    className="cursor-pointer"
                                    onClick={() => setSelected(null)}
                                />

                            </div>

                            <div className="space-y-3 text-sm text-navy/80">

                                <p>
                                    <strong>Doctor:</strong>{" "}
                                    Dr. {selected.doctor?.user?.name}
                                </p>

                                <p>
                                    <strong>Speciality:</strong>{" "}
                                    {selected.doctor?.speciality?.name}
                                </p>

                                <p>
                                    <strong>Date & Time:</strong>{" "}
                                    {formatDate(selected.slot.startTimeUTC)}
                                </p>

                                <p>
                                    <strong>Status:</strong>{" "}
                                    {selected.status}
                                </p>

                                <p>
                                    <strong>Slot Payment:</strong>{" "}
                                    {selected.slotPaymentStatus}
                                </p>

                                <p>
                                    <strong>Consultation Payment:</strong>{" "}
                                    {selected.consultationPaymentStatus}
                                </p>

                                {selected.meetingLink && (

                                    <a
                                        href={selected.meetingLink}
                                        target="_blank"
                                        className="inline-block mt-3 text-indigo-600 font-medium"
                                    >
                                        Join Meeting →
                                    </a>

                                )}

                            </div>

                        </motion.div>

                    </motion.div>

                )}

            </AnimatePresence>

        </div>
    );
}