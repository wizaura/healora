"use client";

import {
    useQuery,
} from "@tanstack/react-query";

import api from "@/lib/api";

import {
    CalendarDays,
    UserRound,
} from "lucide-react";

export default function FollowUpSection() {

    const {
        data = [],
        isLoading,
    } = useQuery({

        queryKey: [
            "follow-ups",
        ],

        queryFn: async () => {

            const res =
                await api.get(

                    "/consultations/notes/follow-up"
                );

            return res.data;
        },
    });

    const formatDate = (
        date: string,
    ) => {

        return new Date(
            date
        ).toLocaleDateString(
            "en-GB",
            {
                day: "2-digit",
                month: "long",
                year: "numeric",
            }
        );
    };

    if (isLoading) {

        return (

            <div
                id="follow-up"
                className="
                    rounded-2xl

                    border border-gray-100

                    bg-white

                    p-6

                    shadow-sm
                "
            >

                <p
                    className="
                        text-sm
                        text-gray-500
                    "
                >

                    Loading follow-ups...

                </p>

            </div>
        );
    }

    return (

        <div
            className="
                rounded-2xl

                border border-gray-100

                bg-white

                p-6

                shadow-sm
            "
        >

            {/* HEADER */}

            <div
                className="
                    mb-5

                    flex items-center
                    justify-between
                "
            >

                <div>

                    <h2
                        className="
                            text-lg
                            font-semibold

                            text-slate-900
                        "
                    >

                        Follow-up Appointments

                    </h2>

                    <p
                        className="
                            mt-1

                            text-sm
                            text-slate-500
                        "
                    >

                        Upcoming follow-up recommendations from your doctors.

                    </p>

                </div>

            </div>

            {/* EMPTY */}

            {data.length === 0 && (

                <div
                    className="
                        rounded-xl

                        border border-dashed
                        border-slate-200

                        py-10

                        text-center
                    "
                >

                    <p
                        className="
                            text-sm
                            text-slate-400
                        "
                    >

                        No follow-up dates available

                    </p>

                </div>
            )}

            {/* LIST */}

            <div
                className="
                    space-y-4
                "
            >

                {data.map(
                    (
                        item: any
                    ) => (

                        <div
                            key={item.id}

                            className="
                                flex items-center
                                justify-between

                                rounded-2xl

                                border border-slate-100

                                bg-slate-50

                                p-4

                                transition

                                hover:border-slate-200
                                hover:bg-white
                            "
                        >

                            {/* LEFT */}

                            <div
                                className="
                                    flex items-center gap-4
                                "
                            >

                                <div
                                    className="
                                        flex h-12 w-12
                                        items-center justify-center

                                        rounded-xl

                                        bg-blue-100

                                        text-blue-600
                                    "
                                >

                                    <UserRound size={20} />

                                </div>

                                <div>

                                    <p
                                        className="
                                            text-sm
                                            font-semibold

                                            text-slate-900
                                        "
                                    >

                                        {item.doctorName}

                                    </p>

                                    <p
                                        className="
                                            mt-1

                                            text-xs
                                            text-slate-500
                                        "
                                    >

                                        Follow-up Consultation

                                    </p>

                                </div>

                            </div>

                            {/* RIGHT */}

                            <div
                                className="
                                    flex items-center gap-2

                                    rounded-full

                                    bg-white

                                    px-4 py-2

                                    text-sm
                                    font-medium

                                    text-slate-700

                                    shadow-sm
                                "
                            >

                                <CalendarDays
                                    size={16}
                                />

                                {formatDate(
                                    item.followUpDate
                                )}

                            </div>

                        </div>
                    )
                )}

            </div>

        </div>
    );
}