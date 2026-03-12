"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const LIMIT = 6;

export default function Blog() {

    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading
    } = useInfiniteQuery({
        queryKey: ["public-blogs"],

        initialPageParam: 1,

        queryFn: ({ pageParam }) =>
            api
                .get(`/blogs?page=${pageParam}&limit=${LIMIT}`)
                .then((res) => res.data),

        getNextPageParam: (lastPage, pages) => {
            if (lastPage.length < LIMIT) return undefined;
            return pages.length + 1;
        },
    });


    const blogs = data?.pages.flat() ?? [];


    if (isLoading) {
        return <div className="text-center py-24">Loading blogs...</div>;
    }

    return (

        <div className="max-w-7xl mx-auto px-6 py-24 space-y-16">

            {/* HEADER */}

            <div className="mb-20 mt-4 text-center">

                <span
                    className="
        inline-block mb-6
        rounded-full
        border border-navy/10
        bg-white/80
        px-8 py-2
        text-sm font-medium
        text-navy/70
        backdrop-blur
    "
                >
                    Healora Insights
                </span>

                <h1
                    className="
        text-4xl md:text-6xl
        font-semibold
        leading-[1.15]
        tracking-[-0.02em]
        text-navy
    "
                >
                    Health, Wellness
                    <br />
                    & Holistic Living
                </h1>

                <p
                    className="
        mt-6
        text-lg
        text-navy/60
        max-w-2xl
        mx-auto
        leading-relaxed
    "
                >
                    Explore expert insights on homeopathy, mental wellness,
                    lifestyle improvement, and holistic healthcare guidance
                    from our Healora specialists.
                </p>

            </div>


            {/* BLOG GRID */}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                {blogs.map((blog: any) => (

                    <Link
                        key={blog.id}
                        href={`/blog/${blog.slug}`}
                        className="
                        group
                        relative
                        border border-slate-200
                        rounded-2xl
                        overflow-hidden
                        bg-white
                        transition
                        hover:shadow-xl
                    "
                    >

                        {/* IMAGE */}

                        {blog.imageUrl && (

                            <div className="relative overflow-hidden">

                                <img
                                    src={blog.imageUrl}
                                    className="
                                    w-full
                                    h-48
                                    object-cover
                                    transition
                                    duration-500
                                    group-hover:scale-105
                                "
                                />

                                {/* HOVER VIEW TEXT */}

                                <div
                                    className="
                                    absolute inset-0
                                    bg-black/40
                                    opacity-0
                                    group-hover:opacity-100
                                    flex items-center justify-center
                                    transition
                                "
                                >

                                    <span
                                        className="
                                        flex items-center gap-2
                                        text-white
                                        text-sm
                                        font-medium
                                    "
                                    >
                                        View Article
                                        <ArrowUpRight size={16} />
                                    </span>

                                </div>

                            </div>

                        )}


                        {/* CONTENT */}

                        <div className="p-5 space-y-3">

                            <h3 className="font-semibold text-slate-900 line-clamp-2">
                                {blog.title}
                            </h3>

                            <p className="text-sm text-slate-500">
                                By {blog.author?.name}
                            </p>

                        </div>

                    </Link>

                ))}

            </div>


            {/* LOAD MORE TRIGGER */}

            <div
                ref={loadMoreRef}
                className="flex justify-center py-10 text-slate-500"
            >
                {isFetchingNextPage
                    ? "Loading more blogs..."
                    : hasNextPage
                        ? "Scroll to load more"
                        : "No more blogs"}
            </div>

        </div>

    );
}