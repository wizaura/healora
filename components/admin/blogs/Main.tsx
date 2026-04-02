"use client";

import { useState } from "react";
import BlogList from "@/components/blogs/BlogList";
import BlogForm from "@/components/blogs/BlogForm";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function AdminBlogs() {

    const [open, setOpen] = useState(false);

    return (

        <div className="max-w-6xl mx-auto space-y-8">

            {/* HEADER */}

            <div className="flex items-center justify-between">

                <h1 className="text-2xl font-semibold">
                    Blogs
                </h1>

                <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-2 bg-teal-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-teal-700"
                >
                    + Add Blog
                    {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

            </div>


            {/* ADD BLOG DROPDOWN */}

            {open && (

                <div className="border border-slate-200 rounded-2xl bg-white p-6 shadow-sm">

                    <h2 className="text-lg font-semibold mb-4">
                        Write Blog
                    </h2>

                    <BlogForm role="DOCTOR" />

                </div>

            )}


            {/* BLOG LIST */}

            <BlogList role="ADMIN"/>

        </div>

    );
}