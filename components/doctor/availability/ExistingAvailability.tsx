"use client";

import api from "@/lib/api";
import { useEffect, useState } from "react";

type Availability = {
    date: string;
    startTimeUTC: string;
    endTimeUTC: string;
    slotDuration: number;
};

export default function ExistingAvailability() {
    const [data, setData] = useState<Availability[]>([]);

    useEffect(() => {
        const fetchAvailability = async () => {
            try {
                const res = await api.get("/availability/my");
                setData(res.data);

                console.log(res,'jj');
            } catch (err) {
                console.error(err);
            }
        };

        fetchAvailability();
    }, []);


    if (!data.length) return null;

    return (
        <div className="rounded-xl border p-5 bg-gray-50 space-y-3">
            <h2 className="font-semibold">Your Availability</h2>

            {data.map((a, i) => (
                <div
                    key={i}
                    className="flex justify-between items-center border rounded p-3 bg-white"
                >
                    <div>
                        <p className="font-medium">
                            {new Date(a.date).toDateString()}
                        </p>
                        <p className="text-sm text-gray-600">
                            {new Date(a.startTimeUTC).toLocaleTimeString()} –{" "}
                            {new Date(a.endTimeUTC).toLocaleTimeString()}
                        </p>
                    </div>

                    <span className="text-sm font-semibold">
                        {a.slotDuration} mins
                    </span>
                </div>
            ))}
        </div>
    );
}
