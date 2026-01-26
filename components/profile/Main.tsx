"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import {
    User,
    ShieldCheck,
    Stethoscope,
    LogOut,
} from "lucide-react";

export default function Profile() {
    const { user, logout, loading } = useAuth();
    const router = useRouter();

    if (loading) return null;

    if (!user) {
        router.replace("/login");
        return null;
    }

    const roleLabel =
        user.role === "ADMIN"
            ? "Administrator"
            : user.role === "DOCTOR"
                ? "Doctor"
                : "Patient";

    const roleIcon =
        user.role === "ADMIN" ? (
            <ShieldCheck size={16} />
        ) : user.role === "DOCTOR" ? (
            <Stethoscope size={16} />
        ) : (
            <User size={16} />
        );

    const handleLogout = async () => {
        await logout();
        router.push("/login");
    };

    return (
        <div className="flex min-h-[70vh] items-center justify-center px-4 pt-24">
            <div className="w-full max-w-md rounded-2xl border
                border-slate-200 bg-white p-8 shadow-sm">

                {/* Avatar */}
                <div className="mb-6 flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center
                        rounded-full bg-teal-100 text-teal-700">
                        <User size={28} />
                    </div>
                </div>

                {/* Info */}
                <div className="text-center">
                    <h1 className="text-xl font-semibold text-slate-900">
                        Your Profile
                    </h1>

                    <div className="mt-4 space-y-2 text-sm text-slate-600">
                        {/* <p>
                            <span className="font-medium text-slate-700">
                                User ID:
                            </span>{" "}
                            {user.sub}
                        </p> */}

                        <div className="mt-3 inline-flex items-center gap-2
                            rounded-full bg-slate-100 px-4 py-1.5
                            text-xs font-medium text-slate-700">
                            {roleIcon}
                            {roleLabel}
                        </div>
                    </div>
                </div>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="mt-8 flex w-full items-center
                    justify-center gap-2 rounded-xl bg-red-500
                    py-3 text-sm font-semibold text-white
                    transition hover:bg-red-600"
                >
                    <LogOut size={16} />
                    Logout
                </button>
            </div>
        </div>
    );
}
