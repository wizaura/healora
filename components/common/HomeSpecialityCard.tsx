"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

type Props = {
    name: string;
    slug: string;
    imageUrl?: string;
    aosDelay?: number;
};

export default function MainSpecialityCard({
    name,
    slug,
    imageUrl,
    aosDelay = 0,
}: Props) {

    return (

        <Link
            href={`/specialities/${slug}`}

            data-aos="fade-up"
            data-aos-delay={aosDelay}

            className="
                group relative block

                overflow-hidden

                rounded-[2rem]

                border border-white/40

                bg-white

                shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)]

                transition-all duration-500

                hover:-translate-y-2
                hover:shadow-[0_30px_80px_-15px_rgba(0,0,0,0.18)]
            "
        >

            {/* =====================================================
               IMAGE
               ===================================================== */}

            <div
                className="
                    relative

                    h-[220px]
                    w-full

                    overflow-hidden
                "
            >

                {imageUrl ? (

                    <Image
                        src={imageUrl}
                        alt={name}
                        fill

                        className="
                            object-cover

                            transition-transform duration-700

                            group-hover:scale-110
                        "
                    />

                ) : (

                    <div
                        className="
                            flex h-full w-full
                            items-center justify-center

                            bg-gradient-to-br
                            from-[#1F2147]
                            to-[#2E3363]

                            text-4xl font-semibold
                            text-white
                        "
                    >

                        {name?.charAt(0)}

                    </div>

                )}

                {/* DARK OVERLAY */}

                <div
                    className="
                        absolute inset-0

                        bg-gradient-to-t
                        from-black/70
                        via-black/10
                        to-transparent
                    "
                />

            </div>

            {/* =====================================================
               CONTENT
               ===================================================== */}

            <div
                className="
                    absolute inset-x-0 bottom-0

                    flex items-end justify-between

                    p-6
                "
            >

                <div>

                    <p
                        className="
                            text-2xl font-semibold

                            tracking-[-0.02em]

                            text-white
                        "
                    >

                        {name}

                    </p>

                </div>

                {/* ICON */}

                <div
                    className="
                        flex h-11 w-11
                        items-center justify-center

                        rounded-full

                        bg-white/15

                        text-white

                        backdrop-blur-md

                        transition-all duration-300

                        group-hover:translate-x-1
                        group-hover:-translate-y-1
                        group-hover:bg-white
                        group-hover:text-navy
                    "
                >

                    <ArrowUpRight size={18} />

                </div>

            </div>

        </Link>
    );
}