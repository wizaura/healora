"use client";

import { useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";

import {
    X,
    Upload,
    ImagePlus,
} from "lucide-react";

export default function AddInvestigationModal({
    onSaved,
}: any) {

    const [open, setOpen] =
        useState(false);

    const [note, setNote] =
        useState("");

    const [images, setImages] =
        useState<File[]>([]);

    const [loading, setLoading] =
        useState(false);

    const save = async () => {

        try {

            if (
                images.length === 0 &&
                !note
            ) {

                return toast.error(
                    "Add note or images"
                );
            }

            setLoading(true);

            const formData =
                new FormData();

            formData.append(
                "note",
                note
            );

            images.forEach((file) => {

                formData.append(
                    "files",
                    file
                );
            });

            await api.post(
                "/consultations/investigations/user",
                formData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data",
                    },
                }
            );

            toast.success(
                "Uploaded successfully"
            );

            setOpen(false);

            setNote("");

            setImages([]);

            onSaved?.();

        } catch {

            toast.error(
                "Upload failed"
            );

        } finally {

            setLoading(false);
        }
    };

    /* ---------------- BUTTON ---------------- */

    if (!open) {

        return (

            <button
                onClick={() =>
                    setOpen(true)
                }
                className="
                    inline-flex items-center gap-2

                    rounded-lg

                    bg-navy
                    hover:bg-navy-dark

                    px-4 py-2.5

                    text-md font-medium text-white

                    transition
                "
            >

                <Upload size={16} />

                Upload Investigation

            </button>
        );
    }

    return (

        <div
            className="
                fixed inset-0 z-50

                bg-black/40
                backdrop-blur-sm

                flex items-center justify-center

                p-4
            "
        >

            <div
                className="
                    w-full max-w-xl

                    rounded-xl

                    border border-slate-200

                    bg-white

                    shadow-2xl

                    overflow-hidden
                "
            >

                {/* HEADER */}
                <div
                    className="
                        flex items-center justify-between

                        border-b border-slate-100

                        px-5 py-4
                    "
                >

                    <div>

                        <h3 className="text-lg font-semibold text-slate-900">
                            Upload Investigation
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                            Add medical reports,
                            scans, or notes
                        </p>

                    </div>

                    <button
                        onClick={() =>
                            setOpen(false)
                        }
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

                    {/* NOTE */}
                    <div className="space-y-2">

                        <label
                            className="
                                text-sm font-medium text-slate-700
                            "
                        >
                            Notes
                        </label>

                        <textarea
                            placeholder="
                                Describe symptoms, report details,
                                or additional information...
                            "

                            value={note}

                            onChange={(e) =>
                                setNote(
                                    e.target.value
                                )
                            }

                            rows={5}

                            className="
                                w-full

                                rounded-lg

                                border border-slate-200

                                bg-white

                                px-4 py-3

                                text-sm text-slate-700

                                resize-none

                                focus:outline-none
                                focus:ring-4
                                focus:ring-teal-500/10
                                focus:border-teal-500

                                transition
                            "
                        />

                    </div>

                    {/* IMAGE FIELD */}
                    <div className="space-y-3">

                        <label
                            className="
                                text-sm font-medium text-slate-700
                            "
                        >
                            Upload Images
                        </label>

                        {/* DROP AREA */}
                        <label
                            className="
                                flex flex-col items-center justify-center

                                rounded-lg

                                border-2 border-dashed border-slate-300

                                bg-slate-50

                                px-6 py-10

                                cursor-pointer

                                hover:border-teal-400
                                hover:bg-teal-50/40

                                transition
                            "
                        >

                            <div
                                className="
                                    h-12 w-12

                                    rounded-full

                                    bg-white

                                    border border-slate-200

                                    flex items-center justify-center

                                    mb-3
                                "
                            >

                                <ImagePlus
                                    size={22}
                                    className="text-slate-500"
                                />

                            </div>

                            <p className="text-sm font-medium text-slate-700">
                                Click to upload images
                            </p>

                            <p className="text-xs text-slate-500 mt-1">
                                PNG, JPG, JPEG
                            </p>

                            <input
                                type="file"

                                multiple

                                accept="image/*"

                                className="hidden"

                                onChange={(e) =>
                                    setImages(
                                        Array.from(
                                            e.target.files || []
                                        )
                                    )
                                }
                            />

                        </label>

                        {/* PREVIEW */}
                        {images.length > 0 && (

                            <div className="flex flex-wrap gap-3">

                                {images.map(
                                    (file, i) => (

                                        <div
                                            key={i}

                                            className="
                                                relative
                                            "
                                        >

                                            <img
                                                src={URL.createObjectURL(file)}

                                                className="
                                                    h-24 w-24

                                                    rounded-lg

                                                    border border-slate-200

                                                    object-cover
                                                "
                                            />

                                            <button
                                                onClick={() =>
                                                    setImages(
                                                        images.filter(
                                                            (_, idx) =>
                                                                idx !== i
                                                        )
                                                    )
                                                }

                                                className="
                                                    absolute -top-2 -right-2

                                                    h-6 w-6

                                                    rounded-full

                                                    bg-white

                                                    border border-slate-200

                                                    flex items-center justify-center

                                                    shadow-sm

                                                    hover:bg-red-50

                                                    transition
                                                "
                                            >

                                                <X
                                                    size={12}
                                                    className="text-red-500"
                                                />

                                            </button>

                                        </div>
                                    )
                                )}

                            </div>

                        )}

                    </div>

                </div>

                {/* FOOTER */}
                <div
                    className="
                        flex items-center justify-end gap-3

                        border-t border-slate-100

                        px-5 py-4
                    "
                >

                    <button
                        onClick={() =>
                            setOpen(false)
                        }

                        className="
                            rounded-lg

                            border border-slate-200

                            px-4 py-2

                            text-sm font-medium text-slate-700

                            hover:bg-slate-50

                            transition
                        "
                    >
                        Cancel
                    </button>

                    <button
                        onClick={save}

                        disabled={loading}

                        className="
                            inline-flex items-center gap-2

                            rounded-lg

                            bg-navy
                            hover:bg-navy-dark

                            disabled:opacity-60

                            px-5 py-2

                            text-sm font-medium text-white

                            transition
                        "
                    >

                        <Upload size={15} />

                        {loading
                            ? "Uploading..."
                            : "Submit Investigation"}

                    </button>

                </div>

            </div>

        </div>
    );
}