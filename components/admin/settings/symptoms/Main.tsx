"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";

type Symptom = {
    id: string;
    name: string;
    description?: string;
    imageUrl?: string;
    isActive: boolean;
};

export default function SymptomsPage() {
    const [items, setItems] = useState<Symptom[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<Symptom | null>(null);
    const [editImage, setEditImage] = useState<File | null>(null);
    const [editPreview, setEditPreview] = useState<string | null>(null);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const res = await api.get("/settings/symptoms");
            setItems(res.data);
        } catch {
            toast.error("Failed to load symptoms");
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
            await api.post("/settings/symptoms", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success("Symptom created");
            resetForm();
            setShowForm(false);
            fetchItems();
        } catch {
            toast.error("Creation failed");
        }
    };

    const handleUpdate = async () => {
        if (!editing) return;

        try {
            const formData = new FormData();
            formData.append("name", editing.name);
            formData.append("description", editing.description || "");

            if (editImage) {
                formData.append("image", editImage);
            }

            await api.put(
                `/settings/symptoms/${editing.id}`,
                formData
            );

            toast.success("Updated successfully");
            setEditing(null);
            setEditImage(null);
            setEditPreview(null);
            fetchItems();
        } catch {
            toast.error("Update failed");
        }
    };

    const toggleActive = async (id: string, isActive: boolean) => {
        try {
            await api.patch(`/settings/symptoms/${id}`, {
                isActive: !isActive,
            });
            fetchItems();
        } catch {
            toast.error("Failed to update status");
        }
    };

    const resetForm = () => {
        setName("");
        setDescription("");
        setImage(null);
        setPreview(null);
    };

    return (
        <div className="space-y-10">

            {/* HEADER */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-semibold text-navy">
                        Symptoms
                    </h2>
                    <p className="text-sm text-navy/50">
                        Manage symptom reference library
                    </p>
                </div>

                <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-5 py-2 rounded-xl bg-wellness-accent text-white text-sm font-medium hover:opacity-90"
                >
                    {showForm ? "Close" : "+ Add Symptom"}
                </button>
            </div>

            {/* CREATE FORM */}
            {showForm && (
                <div className="bg-white border rounded-2xl shadow-sm p-6 space-y-4">
                    <input
                        className="w-full border rounded-xl px-4 py-2"
                        placeholder="Symptom name"
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
                        className="px-5 py-2 rounded-xl bg-navy text-white text-sm"
                    >
                        Create
                    </button>
                </div>
            )}

            {/* LIST */}
            {loading ? (
                <div className="text-sm text-navy/50">Loading...</div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white border rounded-2xl shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition"
                        >
                            <div className="space-y-3">

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

                            {/* ACTIONS */}
                            <div className="flex justify-between mt-4 pt-4 border-t text-sm">
                                <button
                                    onClick={() => setEditing(item)}
                                    className="text-blue-600 hover:text-blue-700"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => toggleActive(item.id, item.isActive)}
                                    className={`${item.isActive
                                        ? "text-yellow-600 hover:text-yellow-700"
                                        : "text-green-600 hover:text-green-700"
                                        }`}
                                >
                                    {item.isActive ? "Disable" : "Enable"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* EDIT MODAL */}
            {editing && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md space-y-5">
                        <h3 className="font-semibold text-lg">
                            Edit Symptom
                        </h3>

                        <input
                            className="w-full border rounded-xl px-4 py-2"
                            value={editing.name}
                            onChange={(e) =>
                                setEditing({ ...editing, name: e.target.value })
                            }
                        />

                        <textarea
                            className="w-full border rounded-xl px-4 py-2"
                            value={editing.description}
                            onChange={(e) =>
                                setEditing({
                                    ...editing,
                                    description: e.target.value,
                                })
                            }
                        />

                        {/* Current Image */}
                        {editing.imageUrl && !editPreview && (
                            <img
                                src={editing.imageUrl}
                                className="w-32 h-32 object-cover rounded-xl border"
                            />
                        )}

                        {/* New Preview */}
                        {editPreview && (
                            <img
                                src={editPreview}
                                className="w-32 h-32 object-cover rounded-xl border"
                            />
                        )}

                        {/* Upload New Image */}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                if (!e.target.files) return;
                                const file = e.target.files[0];
                                setEditImage(file);
                                setEditPreview(URL.createObjectURL(file));
                            }}
                        />

                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                onClick={() => {
                                    setEditing(null);
                                    setEditImage(null);
                                    setEditPreview(null);
                                }}
                                className="px-4 py-2 text-sm"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleUpdate}
                                className="px-5 py-2 rounded-xl bg-navy text-white text-sm"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}