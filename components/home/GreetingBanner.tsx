"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { Youtube, Instagram } from "lucide-react";

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
                <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
                    <path
                        fill="#E8FBF8"
                        fillOpacity="1"
                        d="M0,128L80,144C160,160,320,192,480,186.7C640,181,800,139,960,117.3C1120,96,1280,96,1360,96L1440,96L1440,320L0,320Z"
                    />
                </svg>
            </div>

            {/* CONTENT */}
            <div className="max-w-6xl mx-auto px-6">

                <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#CDE7E2] bg-white">

                    {/* IMAGE */}
                    <img
                        src={data.imageUrl}
                        alt="Greeting Banner"
                        className="w-full aspect-[16/9] object-cover"
                    />

                    {/* SOCIAL BUTTONS */}
                    <div className="absolute bottom-4 right-4 flex gap-3">

                        {/* YouTube */}
                        {data.youtube && (
                            <a
                                href={data.youtube || "#"}
                                target="_blank"

                                className="
        flex items-center gap-2

        rounded-full

        bg-red-600

        px-3 py-3 sm:px-4 sm:py-2

        text-white

        shadow-md

        transition

        hover:bg-red-700
    "
                            >

                                <Youtube size={16} />

                                <span className="hidden sm:block text-sm font-medium">
                                    YouTube
                                </span>

                            </a>
                        )}

                        {/* Instagram */}
                        <a
                            href={data.instagram || "#"}
                            target="_blank"

                            className="
        flex items-center gap-2

        rounded-full

        bg-gradient-to-r
        from-pink-500
        via-red-500
        to-yellow-500

        px-3 py-3 sm:px-4 sm:py-2

        text-white

        shadow-md

        transition

        hover:opacity-90
    "
                        >

                            <Instagram size={16} />

                            <span className="hidden sm:block text-sm font-medium">
                                Instagram
                            </span>

                        </a>

                    </div>

                </div>

            </div>

        </section>
    );
}