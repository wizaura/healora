"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import toast from "react-hot-toast";
import UserModal from "./UserModal";

export default function AdminUsers() {

    const [selectedUser, setSelectedUser] = useState<any>(null);

    /* ---------------- FILTERS ---------------- */
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [sort, setSort] = useState("new");

    const { data = [], isLoading, refetch } = useQuery({
        queryKey: ["admin-users", search, status, sort],
        queryFn: async () => {
            const res = await api.get("/admin/users", {
                params: { search, status, sort }
            });
            return res.data;
        }
    });

    const blockMutation = useMutation({
        mutationFn: async ({ userId, isBlocked }: any) => {
            await api.patch(`/admin/users/${userId}/status`, { isBlocked });
        },
        onSuccess: () => {
            toast.success("User updated");
            refetch();
            setSelectedUser(null);
        }
    });

    return (
        <div className="pt-20 pb-10 px-6 max-w-7xl mx-auto space-y-6">

            {/* HEADER */}
            <div>
                <h1 className="text-2xl font-semibold text-slate-900">
                    Users
                </h1>
                <p className="text-sm text-slate-500">
                    Manage all platform users
                </p>
            </div>

            {/* FILTERS */}
            <h2 className="text-sm font-semibold text-gray-700 mb-2">
                Filters
            </h2>

            <div className="bg-white rounded-2xl border border-gray-200 p-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">

                <div className="flex flex-col">
                    <label className="text-xs text-gray-500 mb-1">Search</label>
                    <input
                        type="text"
                        placeholder="Name or email"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-xs text-gray-500 mb-1">Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                    >
                        <option value="">All</option>
                        <option value="active">Active</option>
                        <option value="blocked">Blocked</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="text-xs text-gray-500 mb-1">Sort</label>
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                    >
                        <option value="new">Newest</option>
                        <option value="old">Oldest</option>
                        <option value="visits">Most Visits</option>
                    </select>
                </div>

            </div>

            {/* TABLE */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

                {isLoading ? (
                    <div className="p-6 text-sm text-gray-500">
                        Loading users...
                    </div>
                ) : (
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-5 py-3 text-left">User</th>
                                <th className="px-5 py-3 text-left">Role</th>
                                <th className="px-5 py-3 text-left">Visits</th>
                                <th className="px-5 py-3 text-left">Joined</th>
                                <th className="px-5 py-3 text-left">Status</th>
                                <th className="px-5 py-3 text-right">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((user: any) => (
                                <tr key={user.id} className="border-t hover:bg-slate-50">
                                    <td className="px-5 py-4">
                                        <div className="font-medium">{user.name}</div>
                                        <div className="text-xs text-gray-500">{user.email}</div>
                                    </td>

                                    <td className="px-5 py-4">{user.role}</td>

                                    <td className="px-5 py-4">{user.appointmentCount}</td>

                                    <td className="px-5 py-4">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>

                                    <td className="px-5 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs
                                            ${user.isBlocked
                                                ? "bg-red-100 text-red-600"
                                                : "bg-green-100 text-green-600"
                                            }`}>
                                            {user.isBlocked ? "Blocked" : "Active"}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4 text-right">
                                        <button
                                            onClick={() => setSelectedUser(user)}
                                            className="text-teal-600 hover:underline text-sm"
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* MODAL */}
            {selectedUser && (
                <UserModal
                    user={selectedUser}
                    onClose={() => setSelectedUser(null)}
                    onToggleStatus={(u: any) => {
                        blockMutation.mutate({
                            userId: u.id,
                            isBlocked: !u.isBlocked
                        });
                    }}
                />
            )}
        </div>
    );
}