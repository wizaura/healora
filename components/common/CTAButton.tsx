"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type CTAButtonProps = {
    href: string;
    label: string;
    variant?: "primary" | "light" | "outline";
    className?: string;
};

export default function CTAButton({
    href,
    label,
    variant = "primary",
    className = "",
}: CTAButtonProps) {
    const variants = {
        primary: {
            base: "bg-[#2F4CFF] text-white hover:bg-blue-900",
            icon: "bg-[#2F4CFF] text-white group-hover:bg-blue-900",
        },
        light: {
            base: "bg-white text-[#1F4BFF] hover:bg-gray-100",
            icon: "bg-white text-[#1F4BFF] group-hover:bg-gray-100",
        },
        outline: {
            base:
                "bg-transparent border border-[#2F4CFF] text-[#2F4CFF] hover:bg-[#2F4CFF] hover:text-white",
            icon:
                "bg-transparent border border-[#2F4CFF] text-[#2F4CFF] group-hover:bg-[#2F4CFF] group-hover:text-white",
        },
    };

    return (
        <Link href={href}>
            <button
                className="
          group flex cursor-pointer items-center gap-0.5 overflow-hidden
          transition-all duration-300 hover:scale-[1.03]
        "
            >
                {/* TEXT */}
                <span
                    className={`
            px-8 py-5 text-md font-semibold rounded-xl transition-colors
            ${variants[variant].base}
            ${className}
          `}
                >
                    {label}
                </span>

                {/* ICON */}
                <span
                    className={`
            relative flex h-16 w-16 items-center justify-center rounded-xl
            transition-colors duration-300
            ${variants[variant].icon}
            ${className}
          `}
                >
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
