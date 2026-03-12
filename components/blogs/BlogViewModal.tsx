"use client";

import { X, Pencil, Trash, Check } from "lucide-react";
import { useState } from "react";
import ConfirmModal from "@/components/common/ConfirmModal";

export default function BlogViewModal({
    open,
    onClose,
    blog,
    onEdit,
    onDelete,
    onApprove,
    role
}: any) {

    const [confirmDelete, setConfirmDelete] = useState(false);
    const [confirmApprove, setConfirmApprove] = useState(false);

    if (!open || !blog) return null;

    return (
        <>
            {/* MAIN MODAL */}

            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">

                <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl">

                    {/* HEADER */}

                    <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">

                        <h2 className="text-lg font-semibold">
                            {blog.title}
                        </h2>

                        <div className="flex items-center gap-3">

                            {/* ADMIN APPROVE */}

                            {role === "ADMIN" && blog.status === "PENDING" && (

                                <button
                                    onClick={() => setConfirmApprove(true)}
                                    className="text-green-600 flex items-center gap-1 text-sm hover:underline"
                                >
                                    <Check size={14} />
                                    Approve
                                </button>

                            )}

                            <button
                                onClick={onEdit}
                                className="text-blue-600 flex items-center gap-1 text-sm hover:underline"
                            >
                                <Pencil size={14} />
                                Edit
                            </button>

                            <button
                                onClick={() => setConfirmDelete(true)}
                                className="text-red-600 flex items-center gap-1 text-sm hover:underline"
                            >
                                <Trash size={14} />
                                Delete
                            </button>

                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-slate-100 rounded-lg"
                            >
                                <X size={18} />
                            </button>

                        </div>

                    </div>

                    {/* IMAGE */}

                    {blog.imageUrl && (
                        <img
                            src={blog.imageUrl}
                            className="w-full h-64 object-cover"
                        />
                    )}

                    {/* CONTENT */}

                    <div className="p-6 space-y-4">

                        <p className="text-xs text-slate-500">
                            Status: {blog.status}
                        </p>

                        <div
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        />

                    </div>

                </div>

            </div>


            {/* DELETE CONFIRM */}

            <ConfirmModal
                open={confirmDelete}
                title="Delete blog?"
                message="This blog will be permanently deleted."
                confirmText="Delete"
                cancelText="Cancel"
                onCancel={() => setConfirmDelete(false)}
                onConfirm={() => {
                    setConfirmDelete(false);
                    onDelete();
                }}
            />


            {/* APPROVE CONFIRM */}

            <ConfirmModal
                open={confirmApprove}
                title="Approve blog?"
                message="This blog will become publicly visible."
                confirmText="Approve"
                cancelText="Cancel"
                onCancel={() => setConfirmApprove(false)}
                onConfirm={() => {
                    setConfirmApprove(false);
                    onApprove();
                }}
            />
        </>
    );
}