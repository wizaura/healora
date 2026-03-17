"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import toast from "react-hot-toast";
import UserModal from "./UserModal";

export default function AdminUsers() {

    const [selectedUser, setSelectedUser] = useState<any>(null);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["admin-users"],
        queryFn: async () => {
            const res = await api.get("/admin/users");
            return res.data;
        }
    });

    const blockMutation = useMutation({
        mutationFn: async ({ userId, isBlocked }: any) => {
            await api.patch(`/admin/users/${userId}/status`, {
                isBlocked
            });
        },
        onSuccess: () => {
            toast.success("User updated");
            refetch();
            setSelectedUser(null);
        }
    });

    return (
        <div className="pt-20 pb-10 px-6 max-w-7xl mx-auto space-y-8">

            {/* HEADER */}
            <div className="space-y-1">
                <h1 className="text-3xl font-semibold text-slate-900">
                    Users
                </h1>
                <p className="text-sm text-slate-500">
                    Manage all platform users, view activity and control access
                </p>
            </div>

            {/* CARD */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

                {/* LOADING */}
                {isLoading && (
                    <div className="p-6 text-sm text-gray-500">
                        Loading users...
                    </div>
                )}

                {/* EMPTY */}
                {!isLoading && data?.length === 0 && (
                    <div className="p-10 text-center text-gray-400 text-sm">
                        No users found
                    </div>
                )}

                {/* LIST */}
                <div className="divide-y divide-gray-200">

                    {data?.map((user: any) => (

                        <div
                            key={user.id}
                            onClick={() => setSelectedUser(user)}
                            className="px-6 py-5 flex justify-between items-center cursor-pointer hover:bg-slate-50 transition group"
                        >

                            {/* LEFT */}
                            <div className="flex items-center gap-4">

                                {/* Avatar */}
                                <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-semibold">
                                    {user.name?.charAt(0)}
                                </div>

                                <div>
                                    <p className="font-medium text-slate-800 group-hover:text-teal-600 transition">
                                        {user.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {user.email}
                                    </p>
                                </div>

                            </div>

                            {/* RIGHT */}
                            <div className="flex items-center gap-6 text-sm">

                                {/* Visits */}
                                <div className="text-right">
                                    <p className="text-slate-700 font-medium">
                                        {user.appointmentCount}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        visits
                                    </p>
                                </div>

                                {/* STATUS */}
                                <span
                                    className={`
                                        px-3 py-1 rounded-full text-xs font-medium
                                        ${user.isBlocked
                                            ? "bg-red-100 text-red-600"
                                            : "bg-green-100 text-green-600"
                                        }
                                    `}
                                >
                                    {user.isBlocked ? "Blocked" : "Active"}
                                </span>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

            {/* MODAL */}
            {selectedUser && (
                <UserModal
                    user={selectedUser}
                    onClose={() => setSelectedUser(null)}
                    onToggleStatus={(u: any) => {
                        blockMutation.mutate({
                            userId: u.id,
                            isBlocked: !u.isBlocked // ✅ FIXED toggle
                        });
                    }}
                />
            )}

        </div>
    );
}