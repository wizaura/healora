"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type SubSpeciality = {
    id: string;
    name: string;
};

type SpecialityCardProps = {
    name: string;
    description?: string;
    icon: any;
    slug: string;
    subSpecialities?: SubSpeciality[];
};

export default function SpecialityCard({
    name,
    description,
    icon: Icon,
    slug,
    subSpecialities = [],
}: SpecialityCardProps) {
    return (
        <div
            className="

    w-auto
min-w-[320px]
sm:min-w-[420px]
md:min-w-[500px]

    overflow-hidden
    rounded-2xl
    bg-navy-dark
    shadow-[0_30px_60px_-25px_rgba(0,0,0,0.35)]
    transition-all duration-500
    hover:-translate-y-1 hover:scale-[1.02]
    flex flex-col sm:flex-row
  "
        >

            {/* ICON PANEL */}
            <div
                className="
          relative flex items-center justify-center
          bg-gradient-to-b from-wellness-bg via-white to-white
          p-6
          m-3 rounded-xl sm:m-4 sm:w-44 sm:rounded-2xl
        "
            >
                <div
                    className="
            flex h-16 w-16 items-center justify-center
            rounded-full
            bg-navy
            text-wellness-accent
            shadow-lg
          "
                >
                    <Icon size={28} />
                </div>
            </div>

            {/* CONTENT */}
            <div className="flex flex-1 flex-col justify-between px-5 py-6">
                <div>
                    <h3 className="mb-2 text-xl font-semibold text-white">
                        {name}
                    </h3>

                    {description && (
                        <p className="max-w-md text-md leading-relaxed text-white/70">
                            {description}
                        </p>
                    )}
                </div>

                {/* CTA */}
                <Link
                    href={`/specialities/${slug}`}
                    className="
            group mt-5 inline-flex w-fit items-center gap-3
            rounded-full
            border border-white/20 hover:border-white
            bg-white
            px-4 py-2
            text-sm font-medium text-navy
            transition-all duration-300
            hover:bg-navy hover:text-white hover:border-navy
          "
                >
                    Explore More

                    <span
                        className="
              flex h-7 w-7 items-center justify-center rounded-full
              bg-navy text-white
              transition-all duration-300
              group-hover:bg-white group-hover:text-navy
            "
                    >
                        <ArrowUpRight size={14} />
                    </span>
                </Link>
            </div>
        </div>
    );
}
