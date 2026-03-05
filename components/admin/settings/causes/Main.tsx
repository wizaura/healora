"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";

type Cause = {
    id: string;
    name: string;
    description?: string;
    imageUrl?: string;
    isActive: boolean;
};

export default function CausesPage() {
    const [items, setItems] = useState<Cause[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    // Fetch
    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const res = await api.get("/settings/causes");
            setItems(res.data);
        } catch {
            toast.error("Failed to load causes");
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        if (!name.trim()) return toast.error("Name required");

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        if (image) formData.append("image", image);

        try {
            await api.post("/settings/causes", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success("Cause created");

            setName("");
            setDescription("");
            setImage(null);
            setPreview(null);
            setShowForm(false);
            fetchItems();
        } catch {
            toast.error("Creation failed");
        }
    };

    return (
        <div className="space-y-8">

            {/* HEADER */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-semibold text-navy">
                        Causes
                    </h2>
                    <p className="text-sm text-navy/50">
                        Manage medical symptom library
                    </p>
                </div>

                <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-5 py-2 rounded-xl bg-wellness-accent text-white text-sm font-medium hover:opacity-90"
                >
                    {showForm ? "Close" : "+ Add Cause"}
                </button>
            </div>

            {/* FORM */}
            {showForm && (
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 space-y-4 animate-fade-in">

                    <input
                        className="w-full border rounded-xl px-4 py-2"
                        placeholder="Cause name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <textarea
                        className="w-full border rounded-xl px-4 py-2"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            if (!e.target.files) return;
                            const file = e.target.files[0];
                            setImage(file);
                            setPreview(URL.createObjectURL(file));
                        }}
                    />

                    {preview && (
                        <img
                            src={preview}
                            className="w-32 h-32 object-cover rounded-xl border"
                        />
                    )}

                    <button
                        onClick={handleCreate}
                        className="px-5 py-2 rounded-xl bg-navy text-white text-sm font-medium"
                    >
                        Create
                    </button>
                </div>
            )}

            {/* LIST */}
            {loading ? (
                <div className="text-sm text-navy/50">
                    Loading...
                </div>
            ) : items.length === 0 ? (
                <div className="text-sm text-navy/50">
                    No causes added yet.
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 space-y-3 hover:shadow-md transition"
                        >
                            {item.imageUrl && (
                                <img
                                    src={item.imageUrl}
                                    className="w-full h-40 object-cover rounded-xl"
                                />
                            )}

                            <div>
                                <h3 className="font-semibold text-navy">
                                    {item.name}
                                </h3>
                                <p className="text-sm text-navy/50 mt-1">
                                    {item.description}
                                </p>
                            </div>

                            <span
                                className={`inline-block px-3 py-1 text-xs rounded-full ${item.isActive
                                        ? "bg-green-100 text-green-600"
                                        : "bg-gray-200 text-gray-500"
                                    }`}
                            >
                                {item.isActive ? "Active" : "Inactive"}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}