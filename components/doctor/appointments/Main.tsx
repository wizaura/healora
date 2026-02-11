"use client";

import { useEffect, useMemo, useState } from "react";
import { Calendar, dateFnsLocalizer, Event } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import api from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const locales = {
    "en-US": enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

export default function DoctorAppointments() {
    const [appointments, setAppointments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<any>(null);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const res = await api.get("/appointments/doctor");
            setAppointments(res.data);
        } catch (err) {
            console.error("Failed to fetch doctor appointments", err);
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
            case "CANCELLED":
                return "bg-red-100 text-red-700";
            case "COMPLETED":
                return "bg-blue-100 text-blue-700";
            default:
                return "bg-yellow-100 text-yellow-700";
        }
    };

    /* ================= Filtering ================= */

    const filteredAppointments = useMemo(() => {
        return appointments.filter((appt) => {
            const matchesSearch = appt.user?.name
                ?.toLowerCase()
                .includes(search.toLowerCase());

            const matchesStatus = statusFilter
                ? appt.status === statusFilter
                : true;

            return matchesSearch && matchesStatus;
        });
    }, [appointments, search, statusFilter]);

    /* ================= Calendar Events ================= */

    const calendarEvents: Event[] = useMemo(() => {
        return appointments.map((appt) => ({
            id: appt.id,
            title: `${appt.user?.name} (${appt.status})`,
            start: new Date(appt.slot.startTimeUTC),
            end: new Date(appt.slot.endTimeUTC),
            resource: appt,
        }));
    }, [appointments]);

    const today = new Date();

    const todayAppointments = appointments
        .filter((appt) => {
            const date = new Date(appt.slot.startTimeUTC);
            return (
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear()
            );
        })
        .sort(
            (a, b) =>
                new Date(a.slot.startTimeUTC).getTime() -
                new Date(b.slot.startTimeUTC).getTime()
        );

    return (
        <div className="min-h-screen bg-gray-50 p-6 pt-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* ================= LEFT SIDE (List) ================= */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6 space-y-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-semibold">My Appointments</h1>
                    </div>

                    <div className="flex gap-3 flex-wrap">
                        <input
                            type="text"
                            placeholder="Search patient"
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
                        </select>
                    </div>

                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <table className="w-full text-sm mt-4">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-3 text-left">Date</th>
                                    <th className="p-3 text-left">Patient</th>
                                    <th className="p-3 text-left">Status</th>
                                    <th className="p-3 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAppointments.map((appt) => (
                                    <tr key={appt.id} className="border-t hover:bg-gray-50">
                                        <td className="p-3">
                                            {formatDateTime(appt.slot.startTimeUTC)}
                                        </td>
                                        <td className="p-3">{appt.user?.name}</td>
                                        <td className="p-3">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs ${statusColor(
                                                    appt.status
                                                )}`}
                                            >
                                                {appt.status}
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            <button
                                                onClick={() => setSelected(appt)}
                                                className="text-blue-600 hover:underline"
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

                {/* ================= RIGHT SIDE (Today + Calendar) ================= */}
                <div className="bg-white rounded-2xl shadow p-4 space-y-6">
                    <div>
                        <h2 className="font-semibold mb-3">Today</h2>
                        {todayAppointments.length === 0 ? (
                            <p className="text-sm text-gray-500">No appointments today</p>
                        ) : (
                            <div className="space-y-2">
                                {todayAppointments.map((appt) => (
                                    <div
                                        key={appt.id}
                                        className="p-3 border rounded-xl text-sm"
                                    >
                                        <div className="font-medium">
                                            {new Date(appt.slot.startTimeUTC).toLocaleTimeString(
                                                "en-IN",
                                                { hour: "2-digit", minute: "2-digit" }
                                            )}
                                        </div>
                                        <div>{appt.user?.name}</div>
                                        <div className="text-xs text-gray-500">
                                            {appt.status}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <h2 className="font-semibold mb-3">Calendar</h2>
                        <div style={{ height: 300 }}>
                            <Calendar
                                localizer={localizer}
                                events={calendarEvents}
                                startAccessor="start"
                                endAccessor="end"
                                defaultView="week"
                                views={["day", "week"]}
                                onSelectEvent={(event: any) => setSelected(event.resource)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* ================= MODAL ================= */}
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
                                <h2 className="text-lg font-semibold">Appointment</h2>
                                <X
                                    className="cursor-pointer"
                                    onClick={() => setSelected(null)}
                                />
                            </div>

                            <div className="space-y-3 text-sm">
                                <p>
                                    <strong>Patient:</strong> {selected.user?.name}
                                </p>
                                <p>
                                    <strong>Date:</strong>{" "}
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
