"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import { getProfile } from "@/lib/profile.api";

import Link from "next/link";

import {
    User,
    LogOut,
    Mail,
    Phone,
    Cake,
    VenusAndMars,
    MapPin,
    MessageCircle,
    Pencil,
    Shield,
} from "lucide-react";

import Loader from "../common/Loader";

export default function Profile() {

    const {
        user,
        logout,
        loading,
    } = useAuth();

    const router = useRouter();

    const {
        data: profile,
        isLoading: profileLoading,
    } = useQuery({

        queryKey: [
            "profile",
            user?.sub,
        ],

        queryFn: () =>
            getProfile(user!.sub),

        enabled:
            !!user?.sub,
    });

    if (
        loading ||
        profileLoading
    ) {

        return <Loader fullScreen />;
    }

    if (!user) {

        router.replace("/login");

        return null;
    }

    const handleLogout =
        async () => {

            await logout();

            router.push("/login");
        };

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
                        from-wellness-bg/90
                        via-wellness-bg/50
                        to-white

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
                                    flex h-24 w-24
                                    items-center justify-center

                                    overflow-hidden

                                    rounded-2xl

                                    bg-navy

                                    text-3xl font-semibold
                                    text-white

                                    shadow-sm
                                "
                            >

                                {profile?.image ? (

                                    <img
                                        src={profile.image}

                                        className="
                                            h-full w-full
                                            object-cover
                                        "
                                    />

                                ) : (

                                    profile?.name?.charAt(0) || "U"

                                )}

                            </div>

                            {/* INFO */}

                            <div>

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

                                        text-3xl font-semibold

                                        tracking-[-0.03em]

                                        text-slate-900

                                        md:text-4xl
                                    "
                                >

                                    {profile?.name || "User"}

                                </h1>

                                <p
                                    className="
                                        mt-2

                                        text-sm leading-6

                                        text-slate-500
                                    "
                                >

                                    Manage your personal profile,
                                    contact information, and
                                    healthcare preferences.

                                </p>

                            </div>

                        </div>

                        {/* ACTIONS */}

                        <div
                            className="
                                flex flex-wrap gap-3
                            "
                        >

                            {/* EDIT */}

                            <Link
                                href="/profile/settings"
                            >

                                <button
                                    className="
                                        inline-flex items-center gap-2

                                        rounded-lg

                                        bg-navy

                                        px-5 py-3

                                        text-sm font-semibold
                                        text-white

                                        shadow-sm

                                        transition-all duration-200

                                        hover:bg-navy-dark
                                        hover:shadow-md
                                    "
                                >

                                    <Pencil size={16} />

                                    Edit Profile

                                </button>

                            </Link>

                            {/* LOGOUT */}

                            <button
                                onClick={handleLogout}

                                className="
                                    inline-flex items-center gap-2

                                    rounded-lg

                                    border border-red-200

                                    bg-white

                                    px-5 py-3

                                    text-sm font-semibold

                                    text-red-600

                                    transition

                                    hover:bg-red-500
                                    hover:text-white
                                "
                            >

                                <LogOut size={16} />

                                Logout

                            </button>

                        </div>

                    </div>

                </div>

            </div>

            {/* =====================================================
               PERSONAL DETAILS
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

                {/* HEADER */}

                <div
                    className="
                        border-b border-slate-200

                        bg-gradient-to-r
                        from-slate-50
                        to-white

                        px-7 py-5
                    "
                >

                    <div
                        className="
                            flex items-center gap-3
                        "
                    >

                        <div
                            className="
                                flex h-10 w-10
                                items-center justify-center

                                rounded-xl

                                bg-teal-50

                                text-teal-600
                            "
                        >

                            <Shield size={18} />

                        </div>

                        <div>

                            <h2
                                className="
                                    text-lg font-semibold

                                    text-slate-900
                                "
                            >

                                Personal Information

                            </h2>

                            <p
                                className="
                                    mt-1

                                    text-sm text-slate-500
                                "
                            >

                                Your account and contact details.

                            </p>

                        </div>

                    </div>

                </div>

                {/* CONTENT */}

                <div
                    className="
                        grid grid-cols-1 gap-5

                        p-7

                        md:grid-cols-2
                    "
                >

                    <InfoCard
                        icon={<User size={18} />}
                        label="Full Name"
                        value={profile?.name || "—"}
                    />

                    <InfoCard
                        icon={<Mail size={18} />}
                        label="Email Address"
                        value={profile?.email || "—"}
                    />

                    <InfoCard
                        icon={<Phone size={18} />}
                        label="Phone Number"
                        value={profile?.address?.phone || profile?.phone || "—"}
                    />

                    <InfoCard
                        icon={<MessageCircle size={18} />}
                        label="WhatsApp Number"
                        value={
                            profile?.address?.whatsapp || profile?.whatsappNumber || "—"
                        }
                    />

                    <InfoCard
                        icon={<Cake size={18} />}
                        label="Age"
                        value={profile?.age || "—"}
                    />

                    <InfoCard
                        icon={<VenusAndMars size={18} />}
                        label="Gender"
                        value={profile?.gender || "—"}
                    />

                    <div className="md:col-span-2">

                        <InfoCard
                            icon={<MapPin size={18} />}
                            label="Address"
                            value={
                                formatAddress(
                                    profile?.address
                                ) || "—"
                            }
                        />

                    </div>

                </div>

            </div>

        </div>
    );
}

/* =====================================================
   INFO CARD
   ===================================================== */

function InfoCard({
    icon,
    label,
    value,
}: any) {

    return (

        <div
            className="
                flex items-start gap-4

                rounded-xl

                border border-slate-200

                bg-white

                p-5

                shadow-sm

                transition

                hover:shadow-md
            "
        >

            {/* ICON */}

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

            {/* CONTENT */}

            <div className="min-w-0 flex-1">

                <p
                    className="
                        text-xs font-medium

                        uppercase tracking-wide

                        text-slate-400
                    "
                >

                    {label}

                </p>

                <p
                    className="
                        mt-2

                        break-words

                        text-sm font-semibold

                        leading-6

                        text-slate-900
                    "
                >

                    {value}

                </p>

            </div>

        </div>

    );
}

/* =====================================================
   FORMAT ADDRESS
   ===================================================== */

function formatAddress(address: any) {

    if (!address) return "";

    const parts = [

        address.line1,
        address.line2,
        address.city,
        address.state,
        address.country,
        address.zipCode,

    ].filter(Boolean);

    return parts.join(", ");
}