"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type CTAButtonProps = {
    href: string;
    label: string;
    className?: string;
};

export default function CTAButton({
    href,
    label,
    className = "",
}: CTAButtonProps) {
    return (
        <Link href={href}>
            <button
                className={`
                    cursor-pointer group flex items-center gap-0.5 overflow-hidden
                    text-white transition-all duration-300
                    hover:scale-[1.03]
                `}
            >
                {/* Text */}
                <span className={`px-8 py-5 text-md font-semibold bg-[#2F4CFF] hover:bg-blue-900 rounded-xl transition-colors group-hover:text-white ${className}`}>
                    {label}
                </span>

                {/* Icon Container */}
                <span className={`relative flex h-16 w-16 items-center justify-center rounded-xl bg-[#2F4CFF] transition-colors duration-300 group-hover:bg-blue-900 group-hover:text-white ${className}`}>
                    {/* Default Icon */}
                    <ArrowUpRight
                        className="
                            absolute h-5 w-5
                            transition-all duration-300 ease-out
                            group-hover:translate-x-3
                            group-hover:-translate-y-3
                            group-hover:opacity-0
                        "
                    />

                    {/* Hover Icon */}
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
        </Link>
    );
}
