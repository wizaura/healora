"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import ConfirmModal from "@/components/common/ConfirmModal";

export default function UserModal({ user, onClose, onToggleStatus }: any) {

    const { data, isLoading } = useQuery({
        queryKey: ["admin-user-detail", user.id],
        queryFn: async () => {
            const res = await api.get(`/admin/users/${user.id}`);
            return res.data;
        }
    });

    const [activeTab, setActiveTab] = useState<"appointments" | "notes" | "prescriptions">("appointments");
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 6;

    if (isLoading || !data) return null;

    const { appointments = [], consultationNotes = [], prescriptions = [] } = data;

    const formatDate = (date: string) =>
        new Date(date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

    /* ---------------- TAB DATA ---------------- */

    const getCurrentData = () => {
        if (activeTab === "appointments") return appointments;
        if (activeTab === "notes") return consultationNotes;
        return prescriptions;
    };

    const currentData = getCurrentData();

    const totalPages = Math.ceil(currentData.length / ITEMS_PER_PAGE);

    const paginatedData = currentData.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    /* ---------------- UI ---------------- */

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

            <div className="bg-white w-[900px] max-h-[90vh] rounded-2xl shadow-xl flex flex-col overflow-hidden">

                {/* HEADER */}
                <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-slate-50 to-white">

                    <div>
                        <h2 className="text-xl font-semibold text-slate-800">
                            {user.name}
                        </h2>
                        <p className="text-sm text-slate-500">
                            {user.email}
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-red-500 text-lg"
                    >
                        ✕
                    </button>

                </div>

                {/* BODY */}
                <div className="p-6 overflow-y-auto space-y-6 flex-1">

                    {/* STATS */}
                    <div className="grid grid-cols-3 gap-4">

                        <Stat
                            label="Appointments"
                            value={appointments.length}
                            active={activeTab === "appointments"}
                            onClick={() => {
                                setActiveTab("appointments");
                                setPage(1);
                            }}
                        />

                        <Stat
                            label="Notes"
                            value={consultationNotes.length}
                            active={activeTab === "notes"}
                            onClick={() => {
                                setActiveTab("notes");
                                setPage(1);
                            }}
                        />

                        <Stat
                            label="Prescriptions"
                            value={prescriptions.length}
                            active={activeTab === "prescriptions"}
                            onClick={() => {
                                setActiveTab("prescriptions");
                                setPage(1);
                            }}
                        />

                    </div>

                    {/* SECTION */}
                    <Section title={activeTab.toUpperCase()}>

                        {paginatedData.length === 0 && (
                            <Empty text="No data available" />
                        )}

                        {/* APPOINTMENTS */}
                        {activeTab === "appointments" &&
                            paginatedData.map((a: any) => (
                                <Card key={a.id}>
                                    <p className="font-medium">
                                        {formatDate(a.slot.startTimeUTC)}
                                    </p>

                                    <div className="flex gap-2 mt-1 text-xs">
                                        <Badge type="status" value={a.status} />
                                        <Badge type="mode" value={a.deliveryMode} />
                                    </div>
                                </Card>
                            ))
                        }

                        {/* NOTES */}
                        {activeTab === "notes" &&
                            paginatedData.map((note: any) => (
                                <Card key={note.id}>
                                    <div className="space-y-2 text-sm text-gray-700">

                                        {note.symptoms && (
                                            <p><b>Symptoms:</b> {note.symptoms}</p>
                                        )}

                                        {note.diagnosis && (
                                            <p><b>Diagnosis:</b> {note.diagnosis}</p>
                                        )}

                                        {note.advice && (
                                            <p><b>Advice:</b> {note.advice}</p>
                                        )}

                                        {note.followUpDate && (
                                            <p className="text-xs text-blue-600">
                                                Follow-up: {formatDate(note.followUpDate)}
                                            </p>
                                        )}

                                    </div>
                                </Card>
                            ))
                        }

                        {/* PRESCRIPTIONS */}
                        {activeTab === "prescriptions" &&
                            paginatedData.map((p: any) => (
                                <Card key={p.id}>

                                    <div className="space-y-2 text-sm">

                                        {p.medicines?.map((m: any, i: number) => (
                                            <p key={i}>
                                                {i + 1}. {m.text}
                                            </p>
                                        ))}

                                        {p.instructions && (
                                            <p className="text-gray-600 mt-2">
                                                <b>Instructions:</b> {p.instructions}
                                            </p>
                                        )}

                                    </div>

                                </Card>
                            ))
                        }

                    </Section>

                    {/* PAGINATION */}
                    {currentData.length > ITEMS_PER_PAGE && (
                        <div className="flex justify-between items-center pt-4">

                            <button
                                disabled={page === 1}
                                onClick={() => setPage(prev => prev - 1)}
                                className="px-3 py-1 border rounded disabled:opacity-40"
                            >
                                Prev
                            </button>

                            <p className="text-sm text-gray-500">
                                Page {page} of {totalPages}
                            </p>

                            <button
                                disabled={page === totalPages}
                                onClick={() => setPage(prev => prev + 1)}
                                className="px-3 py-1 border rounded disabled:opacity-40"
                            >
                                Next
                            </button>

                        </div>
                    )}

                </div>

                {/* FOOTER */}
                <div className="p-5 border-t border-gray-200 flex justify-between items-center bg-slate-50">

                    <button
                        onClick={() => setConfirmOpen(true)}
                        className={`px-5 py-2 rounded-lg text-white text-sm font-medium ${user.isBlocked
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-red-500 hover:bg-red-600"
                            }`}
                    >
                        {user.isBlocked ? "Unblock User" : "Block User"}
                    </button>

                    <button
                        onClick={onClose}
                        className="px-5 py-2 border rounded-lg text-sm hover:bg-gray-100"
                    >
                        Close
                    </button>

                </div>

            </div>

            {confirmOpen && (
                <ConfirmModal
                    open={confirmOpen}
                    variant="danger"
                    title={user.isBlocked ? "Unblock User" : "Block User"}
                    message={
                        user.isBlocked
                            ? "Do you want to unblock this user?"
                            : "Are you sure you want to block this user? They will not be able to access their account."
                    }
                    confirmText={user.isBlocked ? "Unblock" : "Block"}
                    onConfirm={() => {
                        onToggleStatus(user);
                        setConfirmOpen(false);
                    }}
                    onCancel={() => setConfirmOpen(false)}
                />
            )}

        </div>
    );
}

function Stat({ label, value, active, onClick }: any) {
    return (
        <div
            onClick={onClick}
            className={`
                p-4 rounded-xl text-center cursor-pointer transition border
                ${active
                    ? "bg-teal-50 border-teal-400"
                    : "bg-white hover:bg-gray-50 border-gray-200"
                }
            `}
        >
            <p className="text-xl font-semibold">{value}</p>
            <p className="text-xs text-gray-500">{label}</p>
        </div>
    );
}

function Section({ title, children }: any) {
    return (
        <div className="space-y-3">
            <h3 className="text-md font-semibold text-slate-800">
                {title}
            </h3>
            {children}
        </div>
    );
}

function Card({ children }: any) {
    return (
        <div className="border border-gray-100 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition">
            {children}
        </div>
    );
}

function Badge({ type, value }: any) {
    const base = "px-2 py-1 rounded-full text-xs font-medium";

    if (type === "status") {
        return <span className={`${base} bg-blue-100 text-blue-700`}>{value}</span>;
    }

    return <span className={`${base} bg-green-100 text-green-700`}>{value}</span>;
}

function Empty({ text }: any) {
    return <p className="text-sm text-gray-400 italic">{text}</p>;
}