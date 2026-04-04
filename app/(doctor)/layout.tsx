"use client";

import DoctorFooter from "@/components/doctor/DoctorFooter";
import DoctorTopBar from "@/components/doctor/DoctorTopbar";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DoctorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user || user.role !== "DOCTOR") {
                router.replace("/login");
            }
        }
    }, [user, loading, router]);

    if (loading || !user) return null;

    return (
        <div className="min-h-screen bg-slate-50">
            <DoctorTopBar/>

            {/* Page content */}
            <main className="mx-auto bg-white px-6 pt-24 pb-8">
                {children}
            </main>
            <DoctorFooter />
        </div>
    );
}
