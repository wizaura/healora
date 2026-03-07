"use client";

import ImageUpload from "./ImageUpload";
import toast from "react-hot-toast";

type Props = {
    name: string;
    setName: (v: string) => void;
    preview: string | null;
    setPreview: (v: string | null) => void;
    setImage: (f: File | null) => void;
    onSubmit: () => void;
    onCancel: () => void;
    title: string;
    saving: boolean;
};

export default function LibraryForm({
    name,
    setName,
    preview,
    setPreview,
    setImage,
    onSubmit,
    onCancel,
    title,
    saving,
}: Props) {

    const handleSubmit = () => {

        if (!name.trim()) {
            toast.error("Name is required");
            return;
        }

        onSubmit();
    };

    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

            <h3 className="text-lg font-semibold mb-6">{title}</h3>

            <div className="grid md:grid-cols-2 gap-6">

                {/* NAME */}
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                        Name
                    </label>

                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                    />
                </div>

                {/* IMAGE */}
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                        Image
                    </label>

                    <ImageUpload
                        preview={preview}
                        setPreview={setPreview}
                        setFile={setImage}
                    />
                </div>

            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-300 mt-6">

                <button
                    onClick={onCancel}
                    className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-sm"
                >
                    Cancel
                </button>

                <button
                    onClick={handleSubmit}
                    disabled={saving}
                    className="cursor-pointer bg-teal-600 hover:bg-teal-800 text-white px-4 py-2 rounded-md text-sm disabled:opacity-60"
                >
                    {saving ? "Saving..." : "Save"}
                </button>

            </div>

        </div>
    );
}