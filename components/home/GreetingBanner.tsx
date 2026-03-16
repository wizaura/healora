"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export default function GreetingBanner() {

    const { data } = useQuery({
        queryKey: ["greeting-banner"],
        queryFn: async () => {
            const res = await api.get("/settings/greetings/active");
            return res.data;
        }
    });

    if (!data) return null;

    return (

        <section className="m-4 rounded-2xl relative py-8 sm:py-16 overflow-hidden">

            {/* SVG BACKGROUND */}

            <div className="absolute inset-0 -z-10">

                <svg
                    viewBox="0 0 1440 320"
                    className="w-full h-full"
                    preserveAspectRatio="none"
                >
                    <path
                        fill="#E8FBF8"
                        fillOpacity="1"
                        d="M0,128L80,144C160,160,320,192,480,186.7C640,181,800,139,960,117.3C1120,96,1280,96,1360,96L1440,96L1440,320L0,320Z"
                    />

                </svg>

            </div>


            {/* CONTENT */}

            <div className="max-w-6xl mx-auto px-6">

                <div className="rounded-2xl overflow-hidden shadow-xl border border-[#CDE7E2] bg-white">

                    <img
                        src={data.imageUrl}
                        alt="Greeting Banner"
                        className="w-full object-cover"
                    />

                </div>

            </div>

        </section>
    );
}