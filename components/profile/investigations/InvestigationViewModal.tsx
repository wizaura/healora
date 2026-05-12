"use client";

import {
    X,
    FileText,
    Calendar,
    User,
    ImageIcon,
} from "lucide-react";

import { useState } from "react";

import ImageViewModal
    from "./ImageViewModal";

export default function InvestigationViewModal({
    investigation,
    onClose,
}: any) {

    const [selectedImage, setSelectedImage] =
        useState<string | null>(null);

    return (

        <div
            className="
                fixed inset-0 z-50

                bg-black/50
                backdrop-blur-sm

                flex items-center justify-center

                p-4
            "
        >

            <div
                className="
                    relative

                    w-full max-w-3xl

                    max-h-[90vh]
                    overflow-y-auto

                    rounded-xl

                    border border-slate-200

                    bg-white

                    shadow-2xl
                "
            >

                {/* HEADER */}
                <div
                    className="
                        sticky top-0 z-10

                        flex items-center justify-between

                        border-b border-slate-100

                        bg-white

                        px-5 py-4
                    "
                >

                    <div>

                        <h3 className="text-lg font-semibold text-slate-900">
                            Investigation Details
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                            Medical report &
                            uploaded records
                        </p>

                    </div>

                    <button
                        onClick={onClose}

                        className="
                            h-9 w-9

                            rounded-lg

                            flex items-center justify-center

                            hover:bg-slate-100

                            transition
                        "
                    >

                        <X
                            size={18}
                            className="text-slate-500"
                        />

                    </button>

                </div>

                {/* CONTENT */}
                <div className="p-5 space-y-5">

                    {/* META */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        {/* DATE */}
                        <div
                            className="
                                rounded-lg

                                border border-slate-200

                                bg-slate-50

                                p-4
                            "
                        >

                            <div className="flex items-center gap-2">

                                <Calendar
                                    size={15}
                                    className="text-slate-500"
                                />

                                <p className="text-xs text-slate-500">
                                    Uploaded On
                                </p>

                            </div>

                            <p className="mt-2 text-sm font-medium text-slate-800">
                                {new Date(
                                    investigation.createdAt
                                ).toLocaleString()}
                            </p>

                        </div>

                        {/* ROLE */}
                        <div
                            className="
                                rounded-lg

                                border border-slate-200

                                bg-slate-50

                                p-4
                            "
                        >

                            <div className="flex items-center gap-2">

                                <User
                                    size={15}
                                    className="text-slate-500"
                                />

                                <p className="text-xs text-slate-500">
                                    Added By
                                </p>

                            </div>

                            <p className="mt-2 text-sm font-medium text-slate-800">
                                {
                                    investigation.createdByRole
                                }
                            </p>

                        </div>

                    </div>

                    {/* NOTE */}
                    {investigation.note && (

                        <div className="space-y-2">

                            <div className="flex items-center gap-2">

                                <FileText
                                    size={16}
                                    className="text-slate-500"
                                />

                                <h4 className="text-sm font-medium text-slate-800">
                                    Notes
                                </h4>

                            </div>

                            <div
                                className="
                                    rounded-lg

                                    border border-slate-200

                                    bg-slate-50

                                    p-4

                                    whitespace-pre-wrap

                                    text-sm leading-relaxed text-slate-700
                                "
                            >

                                {investigation.note}

                            </div>

                        </div>

                    )}

                    {/* IMAGES */}
                    {investigation.images?.length > 0 && (

                        <div className="space-y-3">

                            <div className="flex items-center gap-2">

                                <ImageIcon
                                    size={16}
                                    className="text-slate-500"
                                />

                                <h4 className="text-sm font-medium text-slate-800">
                                    Uploaded Images
                                </h4>

                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

                                {investigation.images.map(
                                    (img: any) => (

                                        <button
                                            key={img.id}

                                            onClick={() =>
                                                setSelectedImage(
                                                    img.imageUrl
                                                )
                                            }

                                            className="
                                                group

                                                relative

                                                overflow-hidden

                                                rounded-lg

                                                border border-slate-200

                                                bg-white

                                                aspect-square

                                                cursor-pointer
                                            "
                                        >

                                            <img
                                                src={img.imageUrl}

                                                className="
                                                    h-full w-full

                                                    object-cover

                                                    transition duration-300

                                                    group-hover:scale-105
                                                "
                                            />

                                            <div
                                                className="
                                                    absolute inset-0

                                                    bg-black/0
                                                    group-hover:bg-black/10

                                                    transition
                                                "
                                            />

                                        </button>
                                    )
                                )}

                            </div>

                        </div>

                    )}

                </div>

            </div>

            {/* IMAGE MODAL */}
            {selectedImage && (

                <ImageViewModal
                    image={selectedImage}

                    onClose={() =>
                        setSelectedImage(null)
                    }
                />

            )}

        </div>
    );
}