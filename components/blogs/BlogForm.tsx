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

            onSuccess?.();

        } catch {

            toast.error("Failed to save blog");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="space-y-6">

            {/* TITLE */}

            <div>
                <label className="text-sm font-medium">
                    Blog Title
                </label>

                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter blog title"
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 mt-1"
                />
            </div>

            {/* IMAGE */}

            <div className="space-y-2">

                <label className="text-sm font-medium">
                    Featured Image
                </label>

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                        handleImageChange(e.target.files?.[0] || null)
                    }
                />

                {preview && (

                    <div className="relative">

                        <img
                            src={preview}
                            className="w-full max-h-60 object-cover rounded-lg border"
                        />

                        <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs"
                        >
                            Remove
                        </button>

                    </div>

                )}

            </div>

            {/* EDITOR */}

            <div>

                <label className="text-sm font-medium mb-2 block">
                    Blog Content
                </label>

                <TinyEditor
                    content={content}
                    onChange={setContent}
                />

            </div>

            {/* SUBMIT */}

            <button
                onClick={submit}
                disabled={loading}
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-lg"
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