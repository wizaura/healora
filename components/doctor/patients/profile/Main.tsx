"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

import ConsultationNotesSection from "./ConsultationNotesSection";
import PrescriptionsSection from "./PrescriptionsSection";

import { Calendar, FileText, Pill } from "lucide-react";
import { useEffect, useState } from "react";
import SelectOption from "@/components/common/SelectOption";
import InvestigationsSection from "./InvestigationsSection";

export default function PatientProfilePage() {

    const params = useParams();
    const patientId = params.patientId;

    const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);

    const { data, refetch, isLoading } = useQuery({
        queryKey: ["patient-profile", patientId],
        queryFn: async () => {
            const res = await api.get(`/consultations/patients/${patientId}`);
            return res.data;
        },
    });

    // 🔐 Safe fallback before data loads
    const appointments = data?.appointments || [];

    const completedAppointments = appointments.filter(
        (a: any) => a.status === "COMPLETED"
    );

    // ✅ Hook MUST be before return
    useEffect(() => {
        if (
            !selectedAppointmentId &&
            completedAppointments.length > 0
        ) {
            setSelectedAppointmentId(completedAppointments[0].id);
        }
    }, [completedAppointments, selectedAppointmentId]);

    // ✅ Now safe to return
    if (isLoading) return <div className="p-6">Loading...</div>;
    if (!data) return null;

    const { patient, consultationNotes, prescriptions } = data;

    const appointmentId = selectedAppointmentId;

    const formatAppointmentLabel = (appt: any) => {

        const date = new Date(appt.slot.startTimeUTC);

        const dateStr = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

        const timeStr = date.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
        });

        return `${dateStr} • ${timeStr} • ${appt.deliveryMode}`;
    };

    const appointmentOptions = completedAppointments.map((appt: any) => ({
        value: appt.id,
        label: formatAppointmentLabel(appt),
    }));

    return (
        <div className="p-6 max-w-7xl mx-auto py-20 space-y-8">

            {/* HEADER */}

            <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 flex flex-col md:flex-row md:justify-between gap-4">

                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">
                        {patient.name}
                    </h1>
                    <p className="text-sm text-gray-500">
                        {patient.email}
                    </p>
                    <p className="text-sm text-gray-500">
                        {patient.age}
                    </p>
                    <p className="text-sm text-gray-500">
                        {patient.sex}
                    </p>
                </div>

                <div className="flex gap-6 text-sm">

                    <div className="flex items-center gap-2 text-gray-600">
                        <Calendar size={16} />
                        {appointments?.length || 0} Visits
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                        <FileText size={16} />
                        {consultationNotes?.length || 0}
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                        <Pill size={16} />
                        {prescriptions?.length || 0}
                    </div>

                </div>

            </div>

            <div className="w-full bg-white border border-gray-100 rounded-xl p-4 space-y-2">

                <label className="text-sm font-medium text-gray-700">
                    Select Consultation
                </label>

                <SelectOption
                    value={selectedAppointmentId || ""}
                    onChange={(val) => setSelectedAppointmentId(val)}
                    options={appointmentOptions}
                    placeholder="Select a completed consultation"
                    className="w-full"
                />

            </div>

            {/* SECTIONS */}

            {appointmentId ? (
                <>
                    <ConsultationNotesSection
                        notes={consultationNotes}
                        appointmentId={appointmentId}
                        refetch={refetch}
                    />

                    <InvestigationsSection patientId={patient.id} />

                    <PrescriptionsSection
                        prescriptions={prescriptions}
                        user={patient}
                        appointmentId={appointmentId}
                        refetch={refetch}
                    />
                </>
            ) : (
                <div className="text-center text-gray-500 py-10">
                    Please select a completed consultation to proceed
                </div>
            )}

        </div>
    );
}