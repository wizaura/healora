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
            base: `
        bg-navy text-white
        hover:bg-navy-dark
      `,
            icon: `
        bg-wellness-accent text-navy-dark
        group-hover:bg-white group-hover:text-navy
      `,
        },
        light: {
            base: `
        bg-white text-navy
        hover:bg-gray-100
      `,
            icon: `
        bg-white text-navy
        group-hover:bg-navy group-hover:text-white
      `,
        },
        outline: {
            base: `
        bg-transparent border border-navy
        text-navy
        hover:bg-navy hover:text-white
      `,
            icon: `
        bg-transparent border border-navy
        text-navy
        group-hover:bg-white group-hover:text-navy
      `,
        },
    };

    return (
        <Link href={href}>
            <button
                className="
          group flex items-center gap-1
          transition-all duration-300
          hover:scale-[1.04] cursor-pointer
        "
            >
                {/* TEXT */}
                <span
                    className={`
            px-8 py-5 text-md font-semibold
            rounded-xl
            transition-colors duration-300
            ${variants[variant].base}
            ${className}
          `}
                >
                    {label}
                </span>

                {/* ICON */}
                <span
                    className={`
            relative flex h-16 w-16 items-center justify-center
            rounded-xl
            transition-all duration-300
            ${variants[variant].icon}
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
