"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

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
            {/* Sidebar */}
            <AdminSidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />

            {/* Right Side */}
            <div
                className={`
      flex-1 flex flex-col transition-all duration-300
      ${collapsed ? "ml-20" : "ml-64"}
    `}
            >
                {/* Header */}
                <AdminHeader />

                {/* Content */}
                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
