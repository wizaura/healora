"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { AppointmentService } from "@/services/appointment.service";

export default function AdminAppointmentsPage() {

    const [appointments, setAppointments] = useState<any[]>([]);
    const [selected, setSelected] = useState<any>(null);

    const [loading, setLoading] = useState(true);

    const [status, setStatus] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("");
    const [doctorId, setDoctorId] = useState("");
    const [search, setSearch] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [sort, setSort] = useState("new");

    const [doctors, setDoctors] = useState<any[]>([]);

    const [page, setPage] = useState(1);

    const [meta, setMeta] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1,
    });

    /* ================= Fetch ================= */

    useEffect(() => {
        fetchDoctors();
    }, []);

    useEffect(() => {

        fetchAppointments();

    }, [
        page,
        status,
        paymentStatus,
        doctorId,
        from,
        to,
        search,
        sort,
    ]);

    useEffect(() => {
        setPage(1);
    }, [
        status,
        paymentStatus,
        doctorId,
        from,
        to,
        search,
        sort,
    ]);

    const fetchDoctors = async () => {

        try {

            const data =
                await AppointmentService.getDoctors();

            setDoctors(data);

        } catch (err) {

            console.error(err);
        }
    };

    const fetchAppointments = async () => {

        try {

            setLoading(true);

            const data =
                await AppointmentService.getAll({

                    page,
                    limit: 10,

                    status,
                    paymentStatus,
                    doctorId,
                    from,
                    to,
                    search,
                    sort,
                });

            setAppointments(data.data);

            setMeta(data.meta);

        } catch (err) {

            console.error(
                "Failed to fetch appointments",
                err
            );

        } finally {

            setLoading(false);
        }
    };

    /* ================= Helpers ================= */

    const formatDateTime = (date: string) => {

        return new Date(date).toLocaleString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }
        );
    };

    const statusColor = (status: string) => {

        switch (status) {

            case "CONFIRMED":
                return "bg-green-100 text-green-700";

            case "CANCELLED":
                return "bg-red-100 text-red-700";

            case "COMPLETED":
                return "bg-blue-100 text-blue-700";

            case "NO_SHOW":
                return "bg-gray-200 text-gray-700";

            default:
                return "bg-yellow-100 text-yellow-700";
        }
    };

    const paymentColor = (status: string) => {

        switch (status) {

            case "PAID":
                return "bg-green-100 text-green-700";

            case "REFUNDED":
                return "bg-purple-100 text-purple-700";

            case "FAILED":
                return "bg-red-100 text-red-700";

            default:
                return "bg-yellow-100 text-yellow-700";
        }
    };

    const getCurrencySymbol =
        (currency?: string) => {

            switch (currency) {

                case "INR":
                    return "₹";

                case "USD":
                    return "$";

                case "EUR":
                    return "€";

                case "GBP":
                    return "£";

                case "AED":
                    return "د.إ";

                default:
                    return currency || "$";
            }
        };

    function Info({
        label,
        children,
    }: any) {

        return (
            <div>
                <p className="text-xs text-gray-500 mb-1">
                    {label}
                </p>

                <p className="font-medium text-gray-800">
                    {children}
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F6FAF8]">

            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center">

                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Appointments
                        </h1>

                        <p className="text-sm text-gray-500">
                            Manage and monitor consultation bookings
                        </p>
                    </div>

                    <button
                        onClick={fetchAppointments}
                        className="px-4 py-2 bg-[#16A085] text-white rounded-md shadow hover:bg-[#138d75] transition"
                    >
                        Refresh
                    </button>

                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-2">

                    <div className="flex flex-col">
                        <label className="text-xs text-gray-500 mb-1">
                            Search
                        </label>

                        <input
                            type="text"
                            placeholder="Patient or Doctor"
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-xs text-gray-500 mb-1">
                            Doctor
                        </label>

                        <select
                            value={doctorId}
                            onChange={(e) =>
                                setDoctorId(e.target.value)
                            }
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                        >
                            <option value="">
                                All Doctors
                            </option>

                            {doctors.map((d: any) => (
                                <option
                                    key={d.id}
                                    value={d.id}
                                >
                                    {d.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-xs text-gray-500 mb-1">
                            From Date
                        </label>

                        <input
                            type="date"
                            value={from}
                            onChange={(e) =>
                                setFrom(e.target.value)
                            }
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-xs text-gray-500 mb-1">
                            To Date
                        </label>

                        <input
                            type="date"
                            value={to}
                            onChange={(e) =>
                                setTo(e.target.value)
                            }
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-xs text-gray-500 mb-1">
                            Appointment Status
                        </label>

                        <select
                            value={status}
                            onChange={(e) =>
                                setStatus(e.target.value)
                            }
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                        >
                            <option value="">All</option>
                            <option value="CONFIRMED">
                                CONFIRMED
                            </option>
                            <option value="COMPLETED">
                                COMPLETED
                            </option>
                            <option value="CANCELLED">
                                CANCELLED
                            </option>
                            <option value="NO_SHOW">
                                NO_SHOW
                            </option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-xs text-gray-500 mb-1">
                            Payment Status
                        </label>

                        <select
                            value={paymentStatus}
                            onChange={(e) =>
                                setPaymentStatus(
                                    e.target.value
                                )
                            }
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                        >
                            <option value="">All</option>
                            <option value="PAID">PAID</option>
                            <option value="PENDING">PENDING</option>
                            <option value="FAILED">FAILED</option>
                            <option value="REFUNDED">REFUNDED</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-xs text-gray-500 mb-1">
                            Sort
                        </label>

                        <select
                            value={sort}
                            onChange={(e) =>
                                setSort(e.target.value)
                            }
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                        >
                            <option value="new">
                                Newest
                            </option>

                            <option value="old">
                                Oldest
                            </option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

                    {loading ? (

                        <div className="p-6 text-center text-gray-500">
                            Loading appointments...
                        </div>

                    ) : (

                        <>
                            <table className="w-full text-sm">

                                <thead className="bg-[#F2F7F5] text-gray-600">

                                    <tr>
                                        <th className="p-4 text-left">
                                            Date
                                        </th>

                                        <th className="p-4 text-left">
                                            Patient
                                        </th>

                                        <th className="p-4 text-left">
                                            Doctor
                                        </th>

                                        <th className="p-4 text-left">
                                            Fees
                                        </th>

                                        <th className="p-4 text-left">
                                            Status
                                        </th>

                                        <th className="p-4 text-left">
                                            Payments
                                        </th>

                                        <th className="p-4 text-left">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {appointments.map((appt: any) => (

                                        <tr
                                            key={appt.id}
                                            className="border-t border-gray-300 hover:bg-[#F6FAF8]"
                                        >

                                            <td className="p-4">
                                                {formatDateTime(
                                                    appt.slot.startTimeUTC
                                                )}
                                            </td>

                                            <td className="p-4">
                                                {appt.user?.name}
                                            </td>

                                            <td className="p-4">
                                                {appt.doctor?.user?.name}
                                            </td>

                                            <td className="p-4">
                                                <div>

                                                    Consultation:

                                                    {getCurrencySymbol(
                                                        appt.currency
                                                    )}

                                                    {appt.consultationFee}

                                                </div>

                                                <div
                                                    className="
                                                        text-xs
                                                        text-gray-500
                                                    "
                                                >

                                                    Slot:

                                                    {getCurrencySymbol(
                                                        appt.currency
                                                    )}

                                                    {appt.slotFee}

                                                </div>
                                            </td>

                                            <td className="p-4">

                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs ${statusColor(
                                                        appt.status
                                                    )}`}
                                                >
                                                    {appt.status}
                                                </span>

                                            </td>

                                            <td className="p-4 space-y-1">

                                                <div>
                                                    <span className="text-xs text-gray-500 mr-2">
                                                        Slot:
                                                    </span>

                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs ${paymentColor(
                                                            appt.slotPaymentStatus
                                                        )}`}
                                                    >
                                                        {appt.slotPaymentStatus}
                                                    </span>
                                                </div>

                                                <div>
                                                    <span className="text-xs text-gray-500 mr-2">
                                                        Consultation:
                                                    </span>

                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs ${paymentColor(
                                                            appt.consultationPaymentStatus
                                                        )}`}
                                                    >
                                                        {appt.consultationPaymentStatus}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="p-4">
                                                <button
                                                    onClick={() =>
                                                        setSelected(appt)
                                                    }
                                                    className="text-[#16A085] hover:underline"
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>

                            {/* Pagination */}
                            <div className="flex items-center justify-between p-4 border-t">

                                <button
                                    disabled={page === 1}
                                    onClick={() =>
                                        setPage((p) => p - 1)
                                    }
                                    className="px-4 py-2 border rounded disabled:opacity-50"
                                >
                                    Previous
                                </button>

                                <p className="text-sm text-gray-500">
                                    Page {meta.page} of{" "}
                                    {meta.totalPages}
                                </p>

                                <button
                                    disabled={
                                        page === meta.totalPages
                                    }
                                    onClick={() =>
                                        setPage((p) => p + 1)
                                    }
                                    className="px-4 py-2 border rounded disabled:opacity-50"
                                >
                                    Next
                                </button>

                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>

                {selected && (

                    <motion.div

                        initial={{ opacity: 0 }}

                        animate={{ opacity: 1 }}

                        exit={{ opacity: 0 }}

                        className="
                fixed inset-0 z-50

                flex items-center justify-center

                bg-black/50
                backdrop-blur-sm

                p-4
            "
                    >

                        <motion.div

                            initial={{
                                opacity: 0,
                                y: 20,
                                scale: 0.96,
                            }}

                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                            }}

                            exit={{
                                opacity: 0,
                                y: 10,
                                scale: 0.96,
                            }}

                            transition={{
                                duration: 0.2,
                            }}

                            className="
                    relative

                    w-full max-w-3xl

                    overflow-hidden

                    rounded-3xl

                    border border-white/20

                    bg-white

                    shadow-[0_20px_60px_rgba(0,0,0,0.18)]
                "
                        >

                            {/* HEADER */}

                            <div
                                className="
                        flex items-start justify-between

                        border-b border-slate-200

                        bg-gradient-to-r
                        from-[#16A085]
                        to-[#138d75]

                        px-6 py-5

                        text-white
                    "
                            >

                                <div>

                                    <p
                                        className="
                                text-xs uppercase
                                tracking-[0.2em]

                                text-white/70
                            "
                                    >
                                        Appointment Details
                                    </p>

                                    <h2
                                        className="
                                mt-1
                                text-2xl
                                font-semibold
                            "
                                    >
                                        {selected.user?.name}
                                    </h2>

                                    <p
                                        className="
                                mt-1
                                text-sm
                                text-white/80
                            "
                                    >
                                        #{selected.id}
                                    </p>

                                </div>

                                <button
                                    onClick={() =>
                                        setSelected(null)
                                    }
                                    className="
                            rounded-full

                            bg-white/10

                            p-2

                            transition

                            hover:bg-white/20
                        "
                                >

                                    <X size={20} />

                                </button>

                            </div>

                            {/* BODY */}

                            <div
                                className="
                        max-h-[80vh]
                        overflow-y-auto

                        p-6
                    "
                            >

                                {/* TOP GRID */}

                                <div
                                    className="
                            grid gap-4

                            md:grid-cols-2
                        "
                                >

                                    <div
                                        className="
                                rounded-2xl

                                border border-slate-200

                                bg-slate-50

                                p-5
                            "
                                    >

                                        <p
                                            className="
                                    mb-4

                                    text-sm
                                    font-semibold

                                    text-slate-700
                                "
                                        >
                                            Appointment Info
                                        </p>

                                        <div className="space-y-4">

                                            <Info label="Date">

                                                {formatDateTime(
                                                    selected.slot.startTimeUTC
                                                )}

                                            </Info>

                                            <Info label="Status">

                                                <span
                                                    className={`
                                            inline-flex
                                            rounded-full

                                            px-3 py-1

                                            text-xs
                                            font-semibold

                                            ${statusColor(
                                                        selected.status
                                                    )}
                                        `}
                                                >

                                                    {selected.status}

                                                </span>

                                            </Info>

                                            <Info label="Meeting Type">

                                                {selected.meetingType || "—"}

                                            </Info>

                                            <Info label="Delivery Mode">

                                                {selected.deliveryMode || "—"}

                                            </Info>

                                            <Info label="Meeting Link">

                                                {selected.meetingLink ? (

                                                    <a
                                                        href={
                                                            selected.meetingLink
                                                        }

                                                        target="_blank"

                                                        className="
                                                inline-flex
                                                items-center

                                                rounded-lg

                                                bg-[#16A085]

                                                px-4 py-2

                                                text-sm
                                                font-medium

                                                text-white

                                                transition

                                                hover:bg-[#138d75]
                                            "
                                                    >
                                                        Join Meeting
                                                    </a>

                                                ) : "—"}

                                            </Info>

                                        </div>

                                    </div>

                                    {/* DOCTOR + PATIENT */}

                                    <div
                                        className="
                                rounded-2xl

                                border border-slate-200

                                bg-white

                                p-5
                            "
                                    >

                                        <p
                                            className="
                                    mb-4

                                    text-sm
                                    font-semibold

                                    text-slate-700
                                "
                                        >
                                            Participants
                                        </p>

                                        <div className="space-y-5">

                                            <div>

                                                <p
                                                    className="
                                            text-xs
                                            uppercase
                                            tracking-wide

                                            text-slate-400
                                        "
                                                >
                                                    Patient
                                                </p>

                                                <p
                                                    className="
                                            mt-1
                                            text-lg
                                            font-semibold
                                            text-slate-800
                                        "
                                                >
                                                    {selected.user?.name}
                                                </p>

                                            </div>

                                            <div>

                                                <p
                                                    className="
                                            text-xs
                                            uppercase
                                            tracking-wide

                                            text-slate-400
                                        "
                                                >
                                                    Doctor
                                                </p>

                                                <p
                                                    className="
                                            mt-1
                                            text-lg
                                            font-semibold
                                            text-slate-800
                                        "
                                                >
                                                    {selected.doctor?.user?.name}
                                                </p>

                                                <p
                                                    className="
                                            mt-1
                                            text-sm
                                            text-slate-500
                                        "
                                                >

                                                    {selected.doctor?.specialities
                                                        ?.map(
                                                            (s: any) =>
                                                                s.speciality.name
                                                        )
                                                        .join(", ")}

                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                                {/* PAYMENT SECTION */}

                                <div
                                    className="
                            mt-6

                            rounded-2xl

                            border border-slate-200

                            bg-gradient-to-br
                            from-slate-50
                            to-white

                            p-5
                        "
                                >

                                    <div
                                        className="
                                mb-5

                                flex items-center
                                justify-between
                            "
                                    >

                                        <div>

                                            <p
                                                className="
                                        text-sm
                                        font-semibold
                                        text-slate-700
                                    "
                                            >
                                                Payment Details
                                            </p>

                                            <p
                                                className="
                                        mt-1
                                        text-xs
                                        text-slate-500
                                    "
                                            >
                                                Original database currency
                                            </p>

                                        </div>

                                        <div
                                            className="
                                    rounded-full

                                    bg-slate-900

                                    px-3 py-1

                                    text-xs
                                    font-semibold

                                    text-white
                                "
                                        >
                                            {selected.currency}
                                        </div>

                                    </div>

                                    <div
                                        className="
                                grid gap-4

                                md:grid-cols-2
                            "
                                    >

                                        {/* SLOT */}

                                        <div
                                            className="
                                    rounded-2xl

                                    border border-slate-200

                                    bg-white

                                    p-4
                                "
                                        >

                                            <div
                                                className="
                                        flex items-center
                                        justify-between
                                    "
                                            >

                                                <div>

                                                    <p
                                                        className="
                                                text-xs
                                                uppercase

                                                text-slate-400
                                            "
                                                    >
                                                        Slot Fee
                                                    </p>

                                                    <h3
                                                        className="
                                                mt-1

                                                text-2xl
                                                font-bold

                                                text-slate-800
                                            "
                                                    >

                                                        {getCurrencySymbol(
                                                            selected.currency
                                                        )}

                                                        {selected.slotFee}

                                                    </h3>

                                                </div>

                                                <span
                                                    className={`
                                            rounded-full

                                            px-3 py-1

                                            text-xs
                                            font-semibold

                                            ${paymentColor(
                                                        selected.slotPaymentStatus
                                                    )}
                                        `}
                                                >

                                                    {selected.slotPaymentStatus}

                                                </span>

                                            </div>

                                        </div>

                                        {/* CONSULTATION */}

                                        <div
                                            className="
                                    rounded-2xl

                                    border border-slate-200

                                    bg-white

                                    p-4
                                "
                                        >

                                            <div
                                                className="
                                        flex items-center
                                        justify-between
                                    "
                                            >

                                                <div>

                                                    <p
                                                        className="
                                                text-xs
                                                uppercase

                                                text-slate-400
                                            "
                                                    >
                                                        Consultation Fee
                                                    </p>

                                                    <h3
                                                        className="
                                                mt-1

                                                text-2xl
                                                font-bold

                                                text-slate-800
                                            "
                                                    >

                                                        {getCurrencySymbol(
                                                            selected.currency
                                                        )}

                                                        {selected.consultationFee}

                                                    </h3>

                                                </div>

                                                <span
                                                    className={`
                                            rounded-full

                                            px-3 py-1

                                            text-xs
                                            font-semibold

                                            ${paymentColor(
                                                        selected.consultationPaymentStatus
                                                    )}
                                        `}
                                                >

                                                    {selected.consultationPaymentStatus}

                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </motion.div>

                    </motion.div>
                )}

            </AnimatePresence>
        </div>
    );
}
