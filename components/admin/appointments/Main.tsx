"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/api";

export default function AdminAppointmentsPage() {
    const [appointments, setAppointments] = useState<any[]>([]);
    const [selected, setSelected] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("");
    const [search, setSearch] = useState("");
    const [dateFilter, setDateFilter] = useState("");

    useEffect(() => {
        fetchAppointments();
    }, [statusFilter]);

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const res = await api.get("/appointments", {
                params: statusFilter ? { status: statusFilter } : {},
            });
            setAppointments(res.data);
        } catch (err) {
            console.error("Failed to fetch appointments", err);
        } finally {
            setLoading(false);
        }
    };

    /* ================= Helpers ================= */

    const formatDateTime = (date: string) => {
        return new Date(date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const statusColor = (status: string) => {
        switch (status) {
            case "CONFIRMED":
                return "bg-green-100 text-green-700";
            case "CANCELLED":
                return "bg-red-100 text-red-700";
            case "COMPLETED":
                return "bg-blue-100 text-blue-700";
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
            const matchesSearch =
                appt.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
                appt.doctor?.user?.name
                    ?.toLowerCase()
                    .includes(search.toLowerCase());

            const matchesDate = dateFilter
                ? new Date(appt.slot.startTimeUTC)
                    .toISOString()
                    .startsWith(dateFilter)
                : true;

            return matchesSearch && matchesDate;
        });
    }, [appointments, search, dateFilter]);

    return (
        <div className="min-h-screen bg-[#F6FAF8] p-8 pt-20">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Appointments
                        </h1>
                        <p className="text-sm text-gray-500">
                            Manage and monitor consultation bookings
                        </p>
                    </div>
                    <button
                        onClick={fetchAppointments}
                        className="px-4 py-2 bg-[#16A085] text-white rounded-xl shadow hover:bg-[#138d75] transition"
                    >
                        Refresh
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-wrap gap-4">
                    <input
                        type="text"
                        placeholder="Search patient or doctor"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#16A085] outline-none"
                    />

                    <input
                        type="date"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="border rounded-xl px-3 py-2 text-sm"
                    />

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#16A085] outline-none"
                    >
                        <option value="">All Status</option>
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="CANCELLED">CANCELLED</option>
                        <option value="NO_SHOW">NO_SHOW</option>
                    </select>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    {loading ? (
                        <div className="p-6 text-center text-gray-500">
                            Loading appointments...
                        </div>
                    ) : (
                        <table className="w-full text-sm">
                            <thead className="bg-[#F2F7F5] text-gray-600">
                                <tr>
                                    <th className="p-4 text-left">Date</th>
                                    <th className="p-4 text-left">Patient</th>
                                    <th className="p-4 text-left">Doctor</th>
                                    <th className="p-4 text-left">Fees</th>
                                    <th className="p-4 text-left">Status</th>
                                    <th className="p-4 text-left">Payments</th>
                                    <th className="p-4 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAppointments.map((appt: any) => (
                                    <tr key={appt.id} className="border-t border-gray-300 hover:bg-[#F6FAF8]">
                                        <td className="p-4">
                                            {formatDateTime(appt.slot.startTimeUTC)}
                                        </td>
                                        <td className="p-4">{appt.user?.name}</td>
                                        <td className="p-4">{appt.doctor?.user?.name}</td>
                                        <td className="p-4">
                                            <div>Consultation: ₹{appt.consultationFee}</div>
                                            <div className="text-xs text-gray-500">
                                                Slot: ₹{appt.slotFee}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs ${statusColor(
                                                    appt.status
                                                )}`}
                                            >
                                                {appt.status}
                                            </span>
                                        </td>
                                        <td className="p-4 space-y-1">
                                            <div>
                                                <span className="text-xs text-gray-500 mr-2">
                                                    Slot:
                                                </span>
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs ${paymentColor(
                                                        appt.slotPaymentStatus
                                                    )}`}
                                                >
                                                    {appt.slotPaymentStatus}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-500 mr-2">
                                                    Consultation:
                                                </span>
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs ${paymentColor(
                                                        appt.consultationPaymentStatus
                                                    )}`}
                                                >
                                                    {appt.consultationPaymentStatus}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <button
                                                onClick={() => setSelected(appt)}
                                                className="text-[#16A085] hover:underline"
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Modal */}
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
                            className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold">
                                    Appointment Details
                                </h2>
                                <X
                                    className="cursor-pointer"
                                    onClick={() => setSelected(null)}
                                />
                            </div>

                            <div className="space-y-3 text-sm">
                                <p>
                                    <strong>Date:</strong>{" "}
                                    {formatDateTime(selected.slot.startTimeUTC)}
                                </p>
                                <p>
                                    <strong>Patient:</strong> {selected.user?.name}
                                </p>
                                <p>
                                    <strong>Doctor:</strong> {selected.doctor?.user?.name}
                                </p>
                                <p>
                                    <strong>Speciality:</strong>{" "}
                                    {selected.doctor?.speciality?.name}
                                </p>
                                <p>
                                    <strong>Slot Fee:</strong> ₹{selected.slotFee} ({selected.slotPaymentStatus})
                                </p>
                                <p>
                                    <strong>Consultation Fee:</strong> ₹{selected.consultationFee} ({selected.consultationPaymentStatus})
                                </p>
                                <p>
                                    <strong>Status:</strong> {selected.status}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
