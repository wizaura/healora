"use client";

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

    return <>{children}</>;
}
