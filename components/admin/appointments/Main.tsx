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
    const [dateFilter, setDateFilter] = useState("");

    const [status, setStatus] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("");
    const [doctorId, setDoctorId] = useState("");
    const [search, setSearch] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [sort, setSort] = useState("new");
    const [doctors, setDoctors] = useState<any[]>([]);

    useEffect(() => {
        fetchAppointments();
    }, [status, paymentStatus, doctorId, from, to, sort]);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        const res = await api.get("/admin/doctors");
        setDoctors(res.data);
    };

    console.log(doctors, 'dos')

    const fetchAppointments = async () => {
        try {
            setLoading(true);

            const res = await api.get("/appointments", {
                params: {
                    status,
                    paymentStatus,
                    doctorId,
                    from,
                    to,
                    sort,
                },
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

    function Info({ label, children }: any) {
        return (
            <div>
                <p className="text-xs text-gray-500 mb-1">{label}</p>
                <p className="font-medium text-gray-800">{children}</p>
            </div>
        );
    }

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
                        className="px-4 py-2 bg-[#16A085] text-white rounded-md shadow hover:bg-[#138d75] transition"
                    >
                        Refresh
                    </button>

                </div>

                <h2 className="text-sm font-semibold text-gray-700 mb-2">
                    Filters
                </h2>

                {/* Filters */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-2">

                    {/* Search */}
                    <div className="flex flex-col">
                        <label className="text-xs text-gray-500 mb-1">
                            Search
                        </label>
                        <input
                            type="text"
                            placeholder="Patient or Doctor"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                        />
                    </div>

                    {/* Doctor */}
                    <div className="flex flex-col">
                        <label className="text-xs text-gray-500 mb-1">
                            Doctor
                        </label>
                        <select
                            value={doctorId}
                            onChange={(e) => setDoctorId(e.target.value)}
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                        >
                            <option value="">All Doctors</option>
                            {doctors.map((d: any) => (
                                <option key={d.id} value={d.id}>
                                    {d.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* From Date */}
                    <div className="flex flex-col">
                        <label className="text-xs text-gray-500 mb-1">
                            From Date
                        </label>
                        <input
                            type="date"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                        />
                    </div>

                    {/* To Date */}
                    <div className="flex flex-col">
                        <label className="text-xs text-gray-500 mb-1">
                            To Date
                        </label>
                        <input
                            type="date"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                        />
                    </div>

                    {/* Status */}
                    <div className="flex flex-col">
                        <label className="text-xs text-gray-500 mb-1">
                            Appointment Status
                        </label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                        >
                            <option value="">All</option>
                            <option value="CONFIRMED">CONFIRMED</option>
                            <option value="COMPLETED">COMPLETED</option>
                            <option value="CANCELLED">CANCELLED</option>
                            <option value="NO_SHOW">NO_SHOW</option>
                        </select>
                    </div>

                    {/* Payment */}
                    <div className="flex flex-col">
                        <label className="text-xs text-gray-500 mb-1">
                            Payment Status
                        </label>
                        <select
                            value={paymentStatus}
                            onChange={(e) => setPaymentStatus(e.target.value)}
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                        >
                            <option value="">All</option>
                            <option value="PAID">PAID</option>
                            <option value="PENDING">PENDING</option>
                            <option value="FAILED">FAILED</option>
                            <option value="REFUNDED">REFUNDED</option>
                        </select>
                    </div>

                    {/* Sort */}
                    <div className="flex flex-col">
                        <label className="text-xs text-gray-500 mb-1">
                            Sort
                        </label>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                        >
                            <option value="new">Newest</option>
                            <option value="old">Oldest</option>
                        </select>
                    </div>

                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
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
                        className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-xl"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center mb-4 border-b pb-3">
                                <div>
                                    <h2 className="text-lg font-semibold">
                                        Appointment Details
                                    </h2>
                                    <p className="text-xs text-gray-500">
                                        ID: {selected.id}
                                    </p>
                                </div>
                                <X
                                    className="cursor-pointer"
                                    onClick={() => setSelected(null)}
                                />
                            </div>

                            {/* Body */}
                            <div className="grid grid-cols-2 gap-4 text-sm">

                                <Info label="Date">
                                    {formatDateTime(selected.slot.startTimeUTC)}
                                </Info>

                                <Info label="Status">
                                    <span className="px-2 py-1 rounded bg-gray-100">
                                        {selected.status}
                                    </span>
                                </Info>

                                <Info label="Patient">
                                    {selected.user?.name}
                                </Info>

                                <Info label="Doctor">
                                    {selected.doctor?.user?.name}
                                </Info>

                                <Info label="Speciality">
                                    {selected.doctor?.specialities
                                        ?.map((s: any) => s.speciality.name)
                                        .join(", ")}
                                </Info>

                                <Info label="Meeting Type">
                                    {selected.meetingType || "—"}
                                </Info>

                                <Info label="Delivery Mode">
                                    {selected.deliveryMode || "—"}
                                </Info>

                                <Info label="Meeting Link">
                                    {selected.meetingLink ? (
                                        <a
                                            href={selected.meetingLink}
                                            target="_blank"
                                            className="text-teal-600 underline"
                                        >
                                            Join Meeting
                                        </a>
                                    ) : "—"}
                                </Info>

                            </div>

                            {/* Payment Section */}
                            <div className="mt-6 border-t pt-4">
                                <h3 className="text-sm font-semibold mb-3">
                                    Payment Details
                                </h3>

                                <div className="grid grid-cols-2 gap-4 text-sm">

                                    <Info label="Slot Fee">
                                        ₹{selected.slotFee}
                                    </Info>

                                    <Info label="Slot Payment">
                                        <span className="px-2 py-1 rounded bg-gray-100">
                                            {selected.slotPaymentStatus}
                                        </span>
                                    </Info>

                                    <Info label="Consultation Fee">
                                        ₹{selected.consultationFee}
                                    </Info>

                                    <Info label="Consultation Payment">
                                        <span className="px-2 py-1 rounded bg-gray-100">
                                            {selected.consultationPaymentStatus}
                                        </span>
                                    </Info>

                                </div>
                            </div>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
