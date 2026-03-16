"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export default function GreetingBannerList() {

    const { data, isLoading } = useQuery({
        queryKey: ["greeting-banner"],
        queryFn: async () => {
            const res = await api.get("/settings/greetings/active");
            return res.data;
        }
    });

    if (isLoading) return <p className="text-sm text-gray-500">Loading...</p>;

    if (!data) {
        return (
            <p className="text-sm text-gray-500">
                No greeting banner scheduled.
            </p>
        );
    }

    return (

        <div className="flex items-center gap-6 border border-gray-100 rounded-xl p-4">

            <img
                src={data.imageUrl}
                className="w-32 h-20 object-cover rounded-lg border"
            />

            <div className="flex-1">

                <p className="text-sm text-navy font-medium">
                    Active Greeting
                </p>

                <p className="text-xs text-gray-500 mt-1">
                    {new Date(data.startDate).toLocaleDateString()} →
                    {" "}
                    {new Date(data.endDate).toLocaleDateString()}
                </p>

            </div>

        </div>

    );
}