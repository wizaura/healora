"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import api from "@/lib/api";

import {
    Calendar,
    FileText,
    Pill,
    User2,
    Clock3,
    Activity,
    Stethoscope,
} from "lucide-react";

import ConsultationNotesSection from "./ConsultationNotesSection";

import PrescriptionsSection from "./PrescriptionsSection";

import InvestigationsSection from "./InvestigationsSection";

import SelectOption from "@/components/common/SelectOption";

import Loader from "@/components/common/Loader";

export default function PatientProfilePage() {

    const params =
        useParams();

    const patientId =
        params.patientId;

    const [
        selectedAppointmentId,
        setSelectedAppointmentId,
    ] = useState<string | null>(
        null
    );

    /* =====================================================
       QUERY
    ===================================================== */

    const {
        data,
        refetch,
        isLoading,
    } = useQuery({

        queryKey: [
            "patient-profile",
            patientId,
        ],

        queryFn: async () => {

            const res =
                await api.get(
                    `/consultations/patients/${patientId}`
                );

            return res.data;
        },
    });

    const patient =
        data?.patient;

    const consultationNotes =
        data?.consultationNotes || [];

    const prescriptions =
        data?.prescriptions || [];

    const appointments =
        data?.appointments || [];

    const completedAppointments =
        appointments.filter(
            (a: any) =>
                a.status === "COMPLETED"
        );

    const selectedAppointment =
        appointments.find(
            (a: any) =>
                a.id === selectedAppointmentId
        );

    useEffect(() => {
        if (

            !selectedAppointmentId

            &&

            completedAppointments.length > 0

        ) {

            setSelectedAppointmentId(
                completedAppointments[0].id
            );
        }

    }, [
        completedAppointments,
        selectedAppointmentId,
    ]);

    if (isLoading) {
        return <Loader fullScreen />;
    }

    if (!data) return null;

    const appointmentId =
        selectedAppointmentId;


    const formatAppointmentLabel =
        (appt: any) => {

            const date =
                new Date(
                    appt.slot.startTimeUTC
                );

            const dateStr =
                date.toLocaleDateString(
                    "en-GB",
                    {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    }
                );

            const timeStr =
                date.toLocaleTimeString(
                    "en-GB",
                    {
                        hour: "2-digit",
                        minute: "2-digit",
                    }
                );

            return `${dateStr} • ${timeStr} • ${appt.deliveryMode}`;
        };

    const appointmentOptions =
        completedAppointments.map(
            (appt: any) => ({

                value:
                    appt.id,

                label:
                    formatAppointmentLabel(appt),
            })
        );

    /* =====================================================
       UI
    ===================================================== */

    return (

        <div className="space-y-8 max-w-7xl mx-auto">

            {/* =====================================================
               HERO
            ===================================================== */}

            {/* =====================================================
   HEADER
===================================================== */}

            <div
                className="

        rounded-2xl

        border border-slate-200

        bg-white

        shadow-sm
    "
            >

                {/* TOP */}

                <div
                    className="
            border-b border-slate-200

            bg-navy rounded-2xl

            px-8 py-7
        "
                >

                    <div
                        className="
                flex flex-col gap-6

                lg:flex-row
                lg:items-center
                lg:justify-between
            "
                    >

                        {/* LEFT */}

                        <div
                            className="
                    flex items-center gap-5
                "
                        >

                            {/* AVATAR */}

                            <div
                                className="
                        flex h-20 w-20
                        items-center justify-center

                        overflow-hidden

                        rounded-2xl

                        bg-gradient-to-br
                        from-teal-400
                        to-cyan-500

                        text-2xl font-semibold
                        text-white

                        shadow-md
                    "
                            >

                                {patient.image ? (

                                    <img
                                        src={patient.image}

                                        className="
                                h-full w-full

                                object-cover
                            "
                                    />

                                ) : (

                                    patient.name?.charAt(0)

                                )}

                            </div>

                            {/* INFO */}

                            <div>

                                <div
                                    className="
                            inline-flex items-center gap-2

                            rounded-full

                            bg-white/10

                            px-3 py-1

                            text-xs font-medium

                            uppercase tracking-wide

                            text-teal-300
                        "
                                >

                                    <User2 size={13} />

                                    Patient Profile

                                </div>

                                <h1
                                    className="
                            mt-3

                            text-3xl font-semibold

                            tracking-[-0.03em]

                            text-white
                        "
                                >

                                    {patient.name}

                                </h1>

                                <div
                                    className="
                            mt-2

                            flex flex-wrap gap-x-5 gap-y-1

                            text-sm

                            text-slate-300
                        "
                                >

                                    <span>
                                        {patient.email}
                                    </span>

                                    {patient.age && (
                                        <span>
                                            {patient.age} yrs
                                        </span>
                                    )}

                                    {patient.sex && (
                                        <span>
                                            {patient.sex}
                                        </span>
                                    )}

                                    {patient.phone && (
                                        <span>
                                            {patient.phone}
                                        </span>
                                    )}

                                </div>

                            </div>

                        </div>

                        {/* STATS */}

                        <div
                            className="
                    grid grid-cols-3 gap-1 sm:gap-3
                "
                        >

                            <SimpleStat
                                icon={<Calendar size={16} />}
                                label="Visits"
                                value={appointments.length || 0}
                            />

                            <SimpleStat
                                icon={<FileText size={16} />}
                                label="Notes"
                                value={consultationNotes?.length || 0}
                            />

                            <SimpleStat
                                icon={<Pill size={16} />}
                                label="Presc"
                                value={prescriptions?.length || 0}
                            />

                        </div>

                    </div>

                </div>

                {/* SELECT */}

                <div className="p-6">

                    <div
                        className="
                flex flex-col gap-4

                lg:flex-row
                lg:items-center
                lg:justify-between
            "
                    >

                        <div>

                            <h3
                                className="
                        text-base font-semibold

                        text-slate-900
                    "
                            >

                                Consultation Records

                            </h3>

                            <p
                                className="
                        mt-1

                        text-sm

                        text-slate-500
                    "
                            >

                                Select a completed consultation
                                to manage notes,
                                investigations,
                                and prescriptions.

                            </p>

                        </div>

                        <div className="w-full lg:w-[420px]">

                            <SelectOption
                                value={
                                    selectedAppointmentId || ""
                                }

                                onChange={(val) =>
                                    setSelectedAppointmentId(val)
                                }

                                options={
                                    appointmentOptions
                                }

                                placeholder="Select consultation"

                                className="w-full"

                                subClasses="
                        rounded-2xl
                        px-5 py-4
                    "
                            />

                        </div>

                    </div>

                </div>

            </div>

            {/* =====================================================
               EMPTY
            ===================================================== */}

            {!appointmentId && (

                <div
                    className="
                        rounded-3xl

                        border border-dashed
                        border-slate-300

                        bg-white

                        py-20

                        text-center
                    "
                >

                    <div
                        className="
                            mx-auto

                            flex h-16 w-16
                            items-center justify-center

                            rounded-2xl

                            bg-slate-100

                            text-slate-400
                        "
                    >

                        <Activity size={28} />

                    </div>

                    <h3
                        className="
                            mt-5

                            text-lg font-semibold

                            text-slate-900
                        "
                    >

                        No Consultation Selected

                    </h3>

                    <p
                        className="
                            mt-2

                            text-sm

                            text-slate-500
                        "
                    >

                        Select a completed consultation
                        to view patient records.

                    </p>

                </div>

            )}

            {/* =====================================================
               SECTIONS
            ===================================================== */}

            {appointmentId && (

                <div className="space-y-8">

                    <ConsultationNotesSection
                        notes={consultationNotes}

                        appointment={
                            selectedAppointment
                        }

                        refetch={refetch}
                    />

                    <InvestigationsSection
                        patientId={patient.id}
                    />

                    <PrescriptionsSection
                        prescriptions={prescriptions}

                        user={patient}

                        appointmentId={appointmentId}

                        refetch={refetch}
                    />

                </div>

            )}

        </div>
    );
}

/* =====================================================
   HEADER STAT
===================================================== */
function SimpleStat({
    icon,
    label,
    value,
}: any) {

    return (

        <div
            className="
                min-w-[110px]

                rounded-2xl

                bg-white/10

                px-4 py-3

                backdrop-blur-sm
            "
        >

            <div
                className="
                    flex items-center gap-2

                    text-slate-300
                "
            >

                {icon}

                <span
                    className="
                        text-xs font-medium

                        uppercase tracking-wide
                    "
                >

                    {label}

                </span>

            </div>

            <p
                className="
                    mt-2

                    text-2xl font-semibold

                    text-white
                "
            >

                {value}

            </p>

        </div>

    );
}