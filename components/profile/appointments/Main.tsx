"use client";

import { useEffect, useMemo, useState } from "react";
import api from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

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
        } catch (err) {
            console.error("Failed to fetch user appointments", err);
        } finally {
            setLoading(false);
        }
    };

    /* ================= Helpers ================= */

    const formatDateTime = (date: string) =>
        new Date(date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

    const statusColor = (status: string) => {
        switch (status) {
            case "CONFIRMED":
                return "bg-green-100 text-green-700";
            case "COMPLETED":
                return "bg-blue-100 text-blue-700";
            case "CANCELLED":
                return "bg-red-100 text-red-700";
            case "NO_SHOW":
                return "bg-gray-200 text-gray-700";
            default:
                return "bg-yellow-100 text-yellow-700";
        }
    };

    const paymentColor = (status: string) => {
        switch (status) {
            case "PAID":
                return "bg-green-100 text-green-700";
            case "REFUNDED":
                return "bg-purple-100 text-purple-700";
            case "FAILED":
                return "bg-red-100 text-red-700";
            default:
                return "bg-yellow-100 text-yellow-700";
        }
    };

    /* ================= Filtering ================= */

    const filteredAppointments = useMemo(() => {
        return appointments.filter((appt) => {
            const matchesSearch = appt.doctor?.user?.name
                ?.toLowerCase()
                .includes(search.toLowerCase());
            return matchesSearch;
        });
    }, [appointments, search]);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-semibold">My Appointments</h1>
                    <p className="text-sm text-gray-500">
                        View and manage your consultation bookings
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl shadow p-4 flex flex-wrap gap-4">
                    <input
                        type="text"
                        placeholder="Search by doctor"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border rounded-xl px-3 py-2 text-sm"
                    />

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border rounded-xl px-3 py-2 text-sm"
                    >
                        <option value="">All</option>
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="CANCELLED">CANCELLED</option>
                        <option value="NO_SHOW">NO_SHOW</option>
                    </select>
                </div>

                {/* Appointment Cards */}
                {loading ? (
                    <div className="text-center text-gray-500">Loading...</div>
                ) : filteredAppointments.length === 0 ? (
                    <div className="text-center text-gray-500">
                        No appointments found
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {filteredAppointments.map((appt) => (
                            <div
                                key={appt.id}
                                className="bg-white rounded-2xl shadow p-5 flex justify-between items-center"
                            >
                                <div className="space-y-1">
                                    <div className="font-medium">
                                        {appt.doctor?.user?.name}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {appt.doctor?.speciality?.name}
                                    </div>
                                    <div className="text-sm">
                                        {formatDateTime(appt.slot.startTimeUTC)}
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs ${statusColor(
                                                appt.status
                                            )}`}
                                        >
                                            {appt.status}
                                        </span>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs ${paymentColor(
                                                appt.slotPaymentStatus
                                            )}`}
                                        >
                                            Slot: {appt.slotPaymentStatus}
                                        </span>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs ${paymentColor(
                                                appt.consultationPaymentStatus
                                            )}`}
                                        >
                                            Consultation: {appt.consultationPaymentStatus}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setSelected(appt)}
                                    className="text-blue-600 hover:underline text-sm"
                                >
                                    View
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ================= Modal ================= */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="bg-white rounded-2xl w-full max-w-md p-6"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold">Appointment Details</h2>
                                <X
                                    className="cursor-pointer"
                                    onClick={() => setSelected(null)}
                                />
                            </div>

                            <div className="space-y-3 text-sm">
                                <p>
                                    <strong>Doctor:</strong> Dr. {selected.doctor?.user?.name}
                                </p>
                                <p>
                                    <strong>Speciality:</strong>{" "}
                                    {selected.doctor?.speciality?.name}
                                </p>
                                <p>
                                    <strong>Date & Time:</strong>{" "}
                                    {formatDateTime(selected.slot.startTimeUTC)}
                                </p>
                                <p>
                                    <strong>Status:</strong> {selected.status}
                                </p>
                                <p>
                                    <strong>Slot Payment:</strong>{" "}
                                    {selected.slotPaymentStatus}
                                </p>
                                <p>
                                    <strong>Consultation Payment:</strong>{" "}
                                    {selected.consultationPaymentStatus}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
