"use client";

import api from "@/lib/api";
import { useState } from "react";
import toast from "react-hot-toast";

export default function GreetingBannerSettings() {

    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [youtube, setYoutube] = useState("");
    const [instagram, setInstagram] = useState("");

    const [loading, setLoading] = useState(false);

    const saveBanner = async () => {

        if (!image) {
            toast.error("Please upload an image");
            return;
        }

        const formData = new FormData();
        formData.append("image", image);
        formData.append("startDate", startDate);
        formData.append("endDate", endDate);
        formData.append("youtube", youtube);
        formData.append("instagram", instagram);

        setLoading(true);

        try {
            await api.post("/settings/greetings", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.success("Greeting banner saved");

        } catch {
            toast.error("Failed to save greeting banner");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6">

            {/* HEADER */}
            <div>
                <h2 className="text-lg font-semibold text-slate-900">
                    Greeting Banner
                </h2>
                <p className="text-sm text-gray-500">
                    Upload banner and set visibility dates with social links.
                </p>
            </div>

            {/* IMAGE UPLOAD */}
            <div className="space-y-3">
                <label className="text-sm font-medium">Banner Image</label>

                {preview ? (
                    <img
                        src={preview}
                        className="w-full h-48 object-cover rounded-xl border border-gray-200"
                    />
                ) : (
                    <div className="w-full h-48 border border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-400 text-sm">
                        Image preview will appear here
                    </div>
                )}

                <input
                    type="file"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        setImage(file);
                        setPreview(URL.createObjectURL(file));
                    }}
                    className="text-sm"
                />
            </div>

            {/* DATES */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium">Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                    />
                </div>
            </div>

            {/* SOCIAL LINKS */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium">YouTube Link</label>
                    <input
                        type="text"
                        placeholder="https://youtube.com/..."
                        value={youtube}
                        onChange={(e) => setYoutube(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">Instagram Link</label>
                    <input
                        type="text"
                        placeholder="https://instagram.com/..."
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                    />
                </div>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3 pt-2">
                <button
                    onClick={saveBanner}
                    className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg text-sm"
                >
                    {loading ? "Saving..." : "Save Banner"}
                </button>

                <button
                    className="border border-gray-300 hover:bg-gray-50 px-6 py-2 rounded-lg text-sm"
                >
                    Delete
                </button>
            </div>

        </div>
    );
}