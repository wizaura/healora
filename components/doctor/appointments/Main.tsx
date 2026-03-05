"use client";

import { useEffect, useMemo, useState } from "react";
import api from "@/lib/api";
import AppointmentsList from "./AppointmentsList";
import TodayPanel from "./TodayPanel";
import AppointmentsCalendar from "./AppointmentsCalendar";
import AppointmentModal from "./AppointmentModal";

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
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

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

    return (
        <div className="min-h-screen bg-gray-50 p-6 pt-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">

                {/* LEFT SIDE */}
                <AppointmentsList
                    loading={loading}
                    appointments={filteredAppointments}
                    search={search}
                    setSearch={setSearch}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    onSelect={setSelected}
                />

                {/* RIGHT SIDE */}
                <div className="bg-white lg:col-span-2 rounded-xl shadow p-4 space-y-6">
                    <TodayPanel appointments={appointments} />
                    <AppointmentsCalendar
                        appointments={appointments}
                        onSelect={setSelected}
                    />
                </div>
            </div>

            <AppointmentModal
                selected={selected}
                onClose={() => setSelected(null)}
            />
        </div>
    );
}
