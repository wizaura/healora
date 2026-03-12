"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

type Props = {
    name: string;
    slug: string;
    description?: string;
    imageUrl?: string;
};

export default function MainSpecialityCard({
    name,
    slug,
    description,
    imageUrl,
}: Props) {

    return (

        <div
            className="
            group
            bg-white
            border border-gray-200
            rounded-2xl
            overflow-hidden
            shadow-sm
            transition-all duration-300
            hover:-translate-y-1
            hover:shadow-xl
            flex flex-col lg:flex-row
            h-auto lg:h-[220px]
        "
        >

            {/* IMAGE */}

            <div
                className="
                relative
                w-full
                h-[170px]
                lg:h-full
                lg:w-[40%]
                overflow-hidden
                flex-shrink-0
            "
            >

                {imageUrl && (

                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        className="
                        object-cover
                        transition duration-500
                        group-hover:scale-105
                    "
                    />

                )}

            </div>


            {/* CONTENT */}

            <div
                className="
                flex flex-col
                flex-1
                p-6
            "
            >

                <h3 className="text-lg font-semibold text-navy-dark">
                    {name}
                </h3>


                {description && (

                    <p
                        className="
                        text-sm
                        text-gray-600
                        mt-2
                        line-clamp-4
                    "
                    >
                        {description}
                    </p>

                )}


                {/* BUTTON */}

                <div className="mt-auto pt-4">

                    <Link
                        href={`/specialities/${slug}`}
                        className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-navy
                        text-white
                        text-sm
                        font-medium
                        px-5
                        py-2.5
                        transition
                        hover:bg-navy-dark
                    "
                    >

                        Explore

                        <ArrowUpRight size={16} />

                    </Link>

                </div>

            </div>

        </div>

    );
}