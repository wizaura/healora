import SelectOption from "@/components/common/SelectOption";
import React from "react";

export default function AppointmentsList({
    loading,
    appointments,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    onSelect,
}: any) {
    const formatDateTime = (date: string) =>
        new Date(date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

    const statusColor = (status: string) => {
        switch (status) {
            case "CONFIRMED":
                return "bg-green-50 text-green-600 border border-green-200";
            case "CANCELLED":
                return "bg-red-50 text-red-600 border border-red-200";
            case "COMPLETED":
                return "bg-blue-50 text-blue-600 border border-blue-200";
            default:
                return "bg-yellow-50 text-yellow-600 border border-yellow-200";
        }
    };

    return (
        <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-2xl font-semibold text-gray-800">
                    My Appointments
                </h1>

                <div className="flex flex-row gap-3">
                    <input
                        type="text"
                        placeholder="Search patient..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-2 text-sm outline-none transition"
                    />
                    <SelectOption
                        value={statusFilter}
                        onChange={setStatusFilter}
                        options={[
                            { label: "All", value: "" },
                            { label: "Confirmed", value: "CONFIRMED" },
                            { label: "Completed", value: "COMPLETED" },
                            { label: "Cancelled", value: "CANCELLED" },
                        ]}
                    />
                </div>
            </div>

            {/* Content */}
            {loading ? (
                <div className="text-gray-500 text-sm animate-pulse">
                    Loading appointments...
                </div>
            ) : appointments.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                    No appointments found
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-gray-500 text-xs uppercase tracking-wider border-b">
                                <th className="py-3 text-left">Date & Time</th>
                                <th className="py-3 text-left">Patient</th>
                                <th className="py-3 text-left">Status</th>
                                <th className="py-3 text-right">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {appointments.map((appt: any) => (
                                <tr
                                    key={appt.id}
                                    className="border-b last:border-none hover:bg-gray-50 transition"
                                >
                                    <td className="py-4 text-gray-700">
                                        {formatDateTime(
                                            appt.slot.startTimeUTC
                                        )}
                                    </td>

                                    <td className="py-4 font-medium text-gray-800">
                                        {appt.user?.name}
                                    </td>

                                    <td className="py-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(
                                                appt.status
                                            )}`}
                                        >
                                            {appt.status}
                                        </span>
                                    </td>

                                    <td className="py-4 text-right">
                                        <button
                                            onClick={() => onSelect(appt)}
                                            className="px-4 py-1 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
