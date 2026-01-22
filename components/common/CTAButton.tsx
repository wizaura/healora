"use client";

import { ArrowUpRight } from "lucide-react";

export default function CTAButton() {
    return (
        <button
            className="
                cursor-pointer group flex items-center bg-transparent gap-0.5 overflow-hidden
                text-white
                transition-all duration-300
                hover:scale-[1.03]
            "
        >
            {/* Text */}
            <span className="px-8 py-5 text-sm font-semibold bg-[#2F4CFF] hover:bg-[#243BDB] rounded-xl">
                Book an Appointment
            </span>

            {/* Icon Container */}
            <span className="relative flex h-15 w-15 items-center justify-center rounded-xl bg-[#2F4CFF] hover:bg-[#243BDB] transition-colors duration-300 group-hover:bg-[#2F4CFF]">

                {/* Default Icon (moves ↗ out) */}
                <ArrowUpRight
                    className="
                        absolute h-5 w-5
                        transition-all duration-300 ease-out
                        group-hover:translate-x-3
                        group-hover:-translate-y-3
                        group-hover:opacity-0
                    "
                />

                {/* Hover Icon (comes ↗ in) */}
                <ArrowUpRight
                    className="
                        absolute h-5 w-5
                        translate-x-[-12px] translate-y-[12px]
                        opacity-0
                        transition-all duration-300 ease-out
                        group-hover:translate-x-0
                        group-hover:translate-y-0
                        group-hover:opacity-100
                    "
                />
            </span>
        </button>
    );
}
