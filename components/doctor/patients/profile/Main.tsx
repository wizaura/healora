"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

import ConsultationNotesSection from "./ConsultationNotesSection";
import PrescriptionsSection from "./PrescriptionsSection";
import DoctorNotesSection from "./DoctorNotesSection";

import { Calendar, FileText, ClipboardList, Pill } from "lucide-react";

export default function PatientProfilePage() {

    const params = useParams();
    const patientId = params.patientId;

    const { data, refetch, isLoading } = useQuery({
        queryKey: ["patient-profile", patientId],
        queryFn: async () => {
            const res = await api.get(`/consultations/patients/${patientId}`);
            return res.data;
        },
    });

    if (isLoading) return <div className="p-6">Loading...</div>;
    if (!data) return null;

    const { patient, appointments, consultationNotes, doctorNotes, prescriptions } = data;

    const latestAppointment = appointments?.[0];
    const appointmentId = latestAppointment?.id;

    return (
        <div className="p-6 py-20 space-y-8">

            {/* HEADER */}

            <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 flex flex-col md:flex-row md:justify-between gap-4">

                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">
                        {patient.name}
                    </h1>
                    <p className="text-sm text-gray-500">
                        {patient.email}
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
                        <ClipboardList size={16} />
                        {doctorNotes?.length || 0}
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                        <Pill size={16} />
                        {prescriptions?.length || 0}
                    </div>

                </div>

            </div>

            {/* SECTIONS */}

            <ConsultationNotesSection
                notes={consultationNotes}
                appointmentId={appointmentId}
                refetch={refetch}
            />

            <PrescriptionsSection
                prescriptions={prescriptions}
                appointmentId={appointmentId}
                refetch={refetch}
            />

            {/* <DoctorNotesSection
                notes={doctorNotes}
                patientId={patientId as string}
                refetch={refetch}
            /> */}

        </div>
    );
}