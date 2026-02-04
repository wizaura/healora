"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        if (!loading && (!user || user.role !== "ADMIN")) {
            router.replace("/login");
        }
    }, [user, loading, router]);

    if (loading || !user) return null;

    return (
        <div className="min-h-screen bg-slate-50 flex">
            <AdminSidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />

            {/* Content */}
            <main
                className={`
                    flex-1 p-8 transition-all duration-300
                    ${collapsed ? "ml-20" : "ml-64"}
                `}
            >
                {children}
            </main>
        </div>
    );
}
