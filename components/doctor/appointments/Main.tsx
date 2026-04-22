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
    const [page, setPage] = useState(1);
    const pageSize = 10;

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

    const paginatedAppointments = useMemo(() => {
        const start = (page - 1) * pageSize;
        return filteredAppointments.slice(start, start + pageSize);
    }, [filteredAppointments, page]);

    useEffect(() => {
        setPage(1);
    }, [search, statusFilter]);

    return (
        <div className="min-h-screen md:p-8 pt-24 md:mt-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">

                {/* LEFT SIDE */}
                <AppointmentsList
                    loading={loading}
                    appointments={paginatedAppointments}
                    search={search}
                    setSearch={setSearch}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    onSelect={setSelected}
                    page={page}
                    setPage={setPage}
                    total={filteredAppointments.length}
                    pageSize={pageSize}
                />

                {/* RIGHT SIDE */}
                <div className="lg:col-span-2 space-y-6">
                    <TodayPanel appointments={appointments} onSelect={setSelected} />
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
