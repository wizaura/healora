"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { useParams } from "next/navigation";
import Loader from "../common/Loader";

export default function BlogPage() {

    const { slug } = useParams();

    const { data: blog, isLoading } = useQuery({
        queryKey: ["blog", slug],
        queryFn: () =>
            api.get(`/blogs/${slug}`).then((res) => res.data),
        enabled: !!slug,
    });

    if (isLoading) {
        return (
            <Loader fullScreen />
        );
    }

    if (!blog) {
        return (
            <div className="text-center py-24 text-slate-500">
                Blog not found
            </div>
        );
    }

    return (

        <div className="relative m-4 rounded-3xl
            bg-gradient-to-b from-white via-white to-wellness-bg pb-24">
            <div className="max-w-4xl mx-auto px-6 py-24 space-y-12">

                {/* HERO */}

                <div className="space-y-6 text-center pt-12">

                    <h1 className="text-4xl font-semibold text-slate-900 leading-tight">
                        {blog.title}
                    </h1>

                    <p className="text-sm text-slate-500">
                        By {blog.author?.name} •{" "}
                        {new Date(blog.updatedAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </p>

                </div>


                {/* IMAGE */}

                {blog.imageUrl && (

                    <div className="rounded-2xl overflow-hidden shadow-sm">

                        <img
                            src={blog.imageUrl}
                            className="w-full max-h-[420px] object-cover"
                        />

                    </div>

                )}


                {/* CONTENT */}

                <div
                    className="
                prose
                prose-slate
                max-w-none
                prose-headings:font-semibold
                prose-img:rounded-xl
                prose-a:text-teal-600
                prose-p:leading-relaxed
                "
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />

            </div>
        </div>

    );
}