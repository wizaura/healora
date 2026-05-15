"use client";

import { useState } from "react";
import api from "@/lib/api";
import TinyEditor from "./BlogEditor";
import toast from "react-hot-toast";

export default function BlogForm({
    role,
    blog,
    onSuccess
}: {
    role: "ADMIN" | "DOCTOR";
    blog?: any;
    onSuccess?: () => void;
}) {

    const inputClass =
        "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition";

    const [title, setTitle] = useState(blog?.title || "");
    const [content, setContent] = useState(blog?.content || "");

    const [image, setImage] = useState<File | null>(null);

    const [preview, setPreview] = useState<string | null>(
        blog?.imageUrl || null
    );

    const [loading, setLoading] = useState(false);

    const handleImageChange = (file: File | null) => {

        setImage(file);

        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setImage(null);
        setPreview(null);
    };

    const submit = async () => {

        if (!title.trim()) return toast.error("Title required");
        if (!content.trim()) return toast.error("Content required");

        const formData = new FormData();

        formData.append("title", title);
        formData.append("content", content);

        if (image) {
            formData.append("image", image);
        }

        try {

            setLoading(true);

            if (blog) {

                await api.patch(`/blogs/${blog.id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                toast.success("Blog updated");

            } else {

                await api.post("/blogs", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                toast.success(
                    role === "DOCTOR"
                        ? "Blog submitted for approval"
                        : "Blog published"
                );

            }

            setTitle("");
            setContent("");
            setImage(null);
            setPreview(null);
            onSuccess?.();

        } catch {

            toast.error("Failed to save blog");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="space-y-6 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm">

            {/* TITLE */}

            <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                    Blog Title
                </label>

                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter blog title"
                    className={inputClass}
                />
            </div>

            {/* IMAGE */}

            <div className="space-y-3">

                <label className="text-sm font-semibold text-slate-700">
                    Featured Image
                </label>

                <input
                    type="file"
                    accept="image/*"
                    className={inputClass}
                    onChange={(e) =>
                        handleImageChange(e.target.files?.[0] || null)
                    }
                />

                {preview && (

                    <div className="relative overflow-hidden rounded-xl border border-slate-200">

                        <img
                            src={preview}
                            className="w-full max-h-72 object-cover"
                        />

                        <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-lg px-3 py-1.5 text-xs font-medium transition"
                        >
                            Remove
                        </button>

                    </div>

                )}

            </div>

            {/* EDITOR */}

            <div className="space-y-2">

                <label className="text-sm font-semibold text-slate-700">
                    Blog Content
                </label>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <TinyEditor
                        content={content}
                        onChange={setContent}
                    />
                </div>

            </div>

            {/* SUBMIT */}

            <button
                onClick={submit}
                disabled={loading}
                className="bg-teal-600 hover:bg-teal-700 disabled:opacity-70 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition"
            >
                {loading
                    ? "Saving..."
                    : blog
                        ? "Update Blog"
                        : "Publish Blog"}
            </button>

        </div>

    );
}