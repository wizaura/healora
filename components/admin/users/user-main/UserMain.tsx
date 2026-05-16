"use client";

import { useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import api from "@/lib/api";

import {
    ArrowLeft,
    Mail,
    Phone,
    Calendar,
    Shield,
    Globe,
    User,
    ClipboardList,
    FileText,
    FlaskConical,
    StickyNote,
} from "lucide-react";

import Loader from "@/components/common/Loader";

import UserAppointmentsTab from "./UserAppointmentsTab";
import UserPrescriptionsTab from "./UserPrescriptionTab";
import UserInvestigationsTab from "./UserInvestigationsTab";
import UserNotesTab from "./UserNotesTab";

export default function AdminUserDetails() {

    const params =
        useParams();

    const router =
        useRouter();

    const userId =
        params.id as string;

    const [activeTab, setActiveTab] =
        useState<
            "overview" |
            "appointments" |
            "prescriptions" |
            "investigations" |
            "notes"
        >("overview");

    /* =====================================================
       USER
       ===================================================== */

    const {
        data,
        isLoading,
        refetch,
    } = useQuery({

        queryKey: [
            "admin-user-detail",
            userId,
        ],

        queryFn: async () => {

            const res =
                await api.get(
                    `/admin/users/${userId}`
                );

            return res.data;
        },
    });

    if (isLoading) {
        return <Loader fullScreen />;
    }

    const user =
        data?.user;

    const stats =
        data?.stats;

    return (

        <div className="space-y-8">

            {/* =====================================================
               HERO HEADER
               ===================================================== */}

            <div
                className="
                    overflow-hidden

                    rounded-2xl

                    border border-slate-200

                    bg-white

                    shadow-sm
                "
            >

                <div
                    className="
                        border-b border-slate-200

                        bg-gradient-to-r
                        from-teal-50
                        via-cyan-50
                        to-white

                        px-8 py-7
                    "
                >

                    {/* TOP */}

                    <div className="flex items-center justify-between gap-4">

                        <button
                            onClick={() =>
                                router.back()
                            }

                            className="
                                inline-flex items-center gap-2

                                rounded-lg

                                border border-slate-200

                                bg-white

                                px-4 py-2.5

                                text-sm font-medium

                                text-slate-700

                                shadow-sm

                                transition

                                hover:bg-slate-50
                            "
                        >

                            <ArrowLeft size={16} />

                            Back

                        </button>

                        <span
                            className={`
                                inline-flex items-center

                                rounded-full

                                px-4 py-2

                                text-sm font-medium

                                ${user?.isBlocked

                                    ? `
                                        bg-red-100
                                        text-red-600
                                    `

                                    : `
                                        bg-green-100
                                        text-green-600
                                    `
                                }
                            `}
                        >

                            {user?.isBlocked
                                ? "Blocked"
                                : "Active"}

                        </span>

                    </div>

                    {/* PROFILE */}

                    <div
                        className="
                            mt-8

                            flex flex-col gap-6

                            lg:flex-row
                            lg:items-center
                        "
                    >

                        {/* AVATAR */}

                        <div
                            className="
                                flex h-24 w-24
                                items-center justify-center

                                rounded-3xl

                                bg-navy

                                text-3xl font-semibold
                                text-white
                            "
                        >

                            {user?.name?.charAt(0)}

                        </div>

                        {/* INFO */}

                        <div className="flex-1">

                            <div
                                className="
                                    inline-flex items-center gap-2

                                    rounded-full

                                    border border-teal-100

                                    bg-white

                                    px-3 py-1

                                    text-xs font-semibold

                                    uppercase tracking-wide

                                    text-teal-700
                                "
                            >

                                Patient Profile

                            </div>

                            <h1
                                className="
                                    mt-4

                                    text-4xl font-semibold

                                    tracking-[-0.03em]

                                    text-slate-900
                                "
                            >

                                {user?.name}

                            </h1>

                            <div
                                className="
                                    mt-5

                                    grid grid-cols-1 gap-4

                                    md:grid-cols-2
                                    xl:grid-cols-4
                                "
                            >

                                <Info
                                    icon={<Mail size={16} />}
                                    label="Email"
                                    value={user?.email}
                                />

                                <Info
                                    icon={<Phone size={16} />}
                                    label="Phone"
                                    value={user?.phone || "—"}
                                />

                                <Info
                                    icon={<Globe size={16} />}
                                    label="Country"
                                    value={user?.countryCode || "—"}
                                />

                                <Info
                                    icon={<Calendar size={16} />}
                                    label="Joined"
                                    value={new Date(
                                        user?.createdAt
                                    ).toLocaleDateString()}
                                />

                            </div>

                        </div>

                    </div>

                </div>

                {/* STATS */}

                <div
                    className="
                        grid grid-cols-2 gap-5

                        p-6

                        md:grid-cols-4
                    "
                >

                    <StatCard
                        title="Appointments"
                        value={stats?.appointments || 0}
                        icon={<ClipboardList size={18} />}
                    />

                    <StatCard
                        title="Prescriptions"
                        value={stats?.prescriptions || 0}
                        icon={<FileText size={18} />}
                    />

                    <StatCard
                        title="Investigations"
                        value={stats?.investigations || 0}
                        icon={<FlaskConical size={18} />}
                    />

                    <StatCard
                        title="Notes"
                        value={stats?.notes || 0}
                        icon={<StickyNote size={18} />}
                    />

                </div>

            </div>

            {/* =====================================================
               TABS
               ===================================================== */}

            <div
                className="
                    sticky top-16 z-20

                    overflow-x-auto

                    rounded-2xl

                    border border-slate-200

                    bg-white/90

                    p-2

                    shadow-sm

                    backdrop-blur
                "
            >

                <div className="flex gap-2 min-w-max">

                    <TabButton
                        active={activeTab === "overview"}
                        onClick={() =>
                            setActiveTab("overview")
                        }
                    >
                        Overview
                    </TabButton>

                    <TabButton
                        active={activeTab === "appointments"}
                        onClick={() =>
                            setActiveTab("appointments")
                        }
                    >
                        Appointments
                    </TabButton>

                    <TabButton
                        active={activeTab === "prescriptions"}
                        onClick={() =>
                            setActiveTab("prescriptions")
                        }
                    >
                        Prescriptions
                    </TabButton>

                    <TabButton
                        active={activeTab === "investigations"}
                        onClick={() =>
                            setActiveTab("investigations")
                        }
                    >
                        Investigations
                    </TabButton>

                    <TabButton
                        active={activeTab === "notes"}
                        onClick={() =>
                            setActiveTab("notes")
                        }
                    >
                        Notes
                    </TabButton>

                </div>

            </div>

            {/* =====================================================
               CONTENT
               ===================================================== */}

            {activeTab === "overview" && (

                <div
                    className="
                        rounded-2xl

                        border border-slate-200

                        bg-white

                        p-7

                        shadow-sm
                    "
                >

                    <h2
                        className="
                            text-xl font-semibold

                            text-slate-900
                        "
                    >

                        User Overview

                    </h2>

                    <div
                        className="
                            mt-6

                            grid grid-cols-1 gap-5

                            md:grid-cols-2
                        "
                    >

                        <OverviewCard
                            label="Gender"
                            value={user?.gender || "—"}
                        />

                        <OverviewCard
                            label="Age"
                            value={user?.age || "—"}
                        />

                        <OverviewCard
                            label="Timezone"
                            value={user?.timezone || "—"}
                        />

                        <OverviewCard
                            label="WhatsApp"
                            value={user?.whatsappNumber || "—"}
                        />

                    </div>

                </div>

            )}

            {activeTab === "appointments" && (
                <UserAppointmentsTab userId={userId} />
            )}

            {activeTab === "prescriptions" && (
                <UserPrescriptionsTab userId={userId} />
            )}

            {activeTab === "investigations" && (
                <UserInvestigationsTab userId={userId} />
            )}

            {activeTab === "notes" && (
                <UserNotesTab userId={userId} />
            )}

        </div>
    );
}

/* =====================================================
   HELPERS
   ===================================================== */

function TabButton({
    active,
    onClick,
    children,
}: any) {

    return (

        <button
            onClick={onClick}

            className={`
                rounded-2xl

                px-5 py-3

                text-sm font-medium

                transition-all duration-200

                ${active

                    ? `
                        bg-slate-900
                        text-white
                    `

                    : `
                        text-slate-600
                        hover:bg-slate-100
                    `
                }
            `}
        >

            {children}

        </button>
    );
}

function Info({
    icon,
    label,
    value,
}: any) {

    return (

        <div className="flex items-center gap-3">

            <div
                className="
                    flex h-10 w-10
                    items-center justify-center

                    rounded-xl

                    bg-white

                    text-teal-600
                "
            >

                {icon}

            </div>

            <div>

                <p className="text-xs text-slate-500">
                    {label}
                </p>

                <p className="text-sm font-medium text-slate-900">
                    {value}
                </p>

            </div>

        </div>
    );
}

function StatCard({
    title,
    value,
    icon,
}: any) {

    return (

        <div
            className="
                rounded-2xl

                border border-slate-200

                bg-slate-50/60

                p-5
            "
        >

            <div
                className="
                    flex h-11 w-11
                    items-center justify-center

                    rounded-xl

                    bg-teal-50

                    text-teal-600
                "
            >

                {icon}

            </div>

            <p className="mt-4 text-sm text-slate-500">
                {title}
            </p>

            <p className="mt-2 text-3xl font-semibold text-slate-900">
                {value}
            </p>

        </div>
    );
}

function OverviewCard({
    label,
    value,
}: any) {

    return (

        <div
            className="
                rounded-2xl

                border border-slate-200

                bg-slate-50/60

                p-5
            "
        >

            <p className="text-xs uppercase tracking-wide text-slate-400">
                {label}
            </p>

            <p className="mt-3 text-sm font-semibold text-slate-900">
                {value}
            </p>

        </div>
    );
}