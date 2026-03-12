"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { useState } from "react";
import BlogViewModal from "./BlogViewModal";
import BlogForm from "./BlogForm";
import toast from "react-hot-toast";

export default function BlogList({ role }: { role: "ADMIN" | "DOCTOR" }) {

    const queryClient = useQueryClient();

    const { data = [], isLoading } = useQuery({
        queryKey: ["blogs"],
        queryFn: () => api.get("/blogs/mine").then(res => res.data),
    });

    const [selectedBlog, setSelectedBlog] = useState<any>(null);
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(false);

    const openBlog = (blog: any) => {
        setSelectedBlog(blog);
        setOpen(true);
    };

    const closeAll = () => {
        setSelectedBlog(null);
        setEditing(false);
        setOpen(false);
    };

    /* ---------------- DELETE ---------------- */

    const deleteMutation = useMutation({
        mutationFn: (id: string) => api.delete(`/blogs/${id}`),

        onSuccess: () => {
            toast.success("Blog deleted");
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
            closeAll();
        },
    });

    const handleDelete = () => {

        if (!selectedBlog) return;

        const confirmDelete = window.confirm("Delete this blog?");

        if (!confirmDelete) return;

        deleteMutation.mutate(selectedBlog.id);
    };

    /* ---------------- APPROVE ---------------- */

    const approveMutation = useMutation({
        mutationFn: (id: string) => api.patch(`/blogs/${id}/approve`),

        onSuccess: () => {
            toast.success("Blog approved");
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
            closeAll();
        },
    });

    const handleApprove = () => {

        if (!selectedBlog) return;

        approveMutation.mutate(selectedBlog.id);
    };

    if (isLoading) {
        return <div className="text-slate-500">Loading blogs...</div>;
    }

    if (!data.length) {
        return (
            <div className="text-slate-500">
                No blogs written yet.
            </div>
        );
    }

    return (

        <>
            {/* BLOG GRID */}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                {data.map((blog: any) => (

                    <div
                        key={blog.id}
                        onClick={() => openBlog(blog)}
                        className="cursor-pointer border border-slate-200 rounded-xl overflow-hidden bg-white hover:shadow-md transition"
                    >

                        {blog.imageUrl && (
                            <img
                                src={blog.imageUrl}
                                className="w-full h-40 object-cover"
                            />
                        )}

                        <div className="p-4 space-y-2">

                            <h3 className="font-semibold line-clamp-2">
                                {blog.title}
                            </h3>

                            <span
                                className={`text-xs px-2 py-1 rounded-full
                                ${blog.status === "APPROVED"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-yellow-100 text-yellow-700"
                                    }`}
                            >
                                {blog.status}
                            </span>

                        </div>

                    </div>

                ))}

            </div>


            {/* VIEW MODAL */}

            <BlogViewModal
                open={open && !editing}
                blog={selectedBlog}
                role={role}
                onClose={closeAll}
                onEdit={() => setEditing(true)}
                onDelete={handleDelete}
                onApprove={handleApprove}
            />


            {/* EDIT MODAL */}

            {editing && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">

                    <div className="bg-white rounded-2xl max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">

                        {/* HEADER */}

                        <div className="flex justify-between items-center mb-4">

                            <h2 className="text-lg font-semibold">
                                Edit Blog
                            </h2>

                            <button
                                onClick={closeAll}
                                className="text-slate-500 hover:text-red-500"
                            >
                                ✕
                            </button>

                        </div>

                        <BlogForm
                            role={role}
                            blog={selectedBlog}
                            onSuccess={() => {
                                queryClient.invalidateQueries({ queryKey: ["blogs"] });
                                closeAll();
                            }}
                        />

                    </div>

                </div>

            )}

        </>

    );
}