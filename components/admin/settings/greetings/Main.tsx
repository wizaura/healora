import api from "@/lib/api";
import { useState } from "react";
import toast from "react-hot-toast";

export default function GreetingBannerSettings() {

    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

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

        <div className="space-y-4 max-w-xl">

            {/* IMAGE */}

            {preview && (
                <img
                    src={preview}
                    className="w-full h-40 object-cover rounded-xl border"
                />
            )}

            <input
                type="file"
                onChange={(e) => {

                    const file = e.target.files?.[0];
                    if (!file) return;

                    setImage(file);
                    setPreview(URL.createObjectURL(file));

                }}
            />

            {/* DATES */}

            <div className="grid grid-cols-2 gap-4">

                <div>
                    <label className="text-sm font-medium">Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                    />
                </div>

            </div>

            {/* ACTIONS */}

            <div className="flex gap-3">

                <button
                    onClick={saveBanner}
                    className="bg-wellness-accent text-white px-5 py-2 rounded-lg"
                >
                    {loading ? "Saving..." : "Save Banner"}
                </button>

                <button
                    className="border px-5 py-2 rounded-lg"
                >
                    Delete
                </button>

            </div>

        </div>
    );
}