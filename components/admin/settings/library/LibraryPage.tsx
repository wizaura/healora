"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import LibraryTable from "./LibraryTable";
import LibraryForm from "./LibraryForm";

export default function LibraryPage({
    title,
    endpoint,
}: {
    title: string;
    endpoint: string;
}) {
    const [items, setItems] = useState<any[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [saving, setSaving] = useState(false);

    const [name, setName] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const [editing, setEditing] = useState<any>(null);

    const fetchItems = async () => {
        const res = await api.get(endpoint);
        setItems(res.data);
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const createItem = async () => {
        if (saving) return;

        setSaving(true);

        try {
            const form = new FormData();
            form.append("name", name);

            if (image) {
                form.append("image", image);
            }

            await api.post(endpoint, form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.success("Created");

            setName("");
            setImage(null);
            setPreview(null);

            setShowForm(false);

            await fetchItems();

        } catch (err) {
            toast.error("Creation failed");
        } finally {
            setSaving(false);
        }
    };

    const toggle = async (item: any) => {

        await api.patch(`${endpoint}/${item.id}/toggle`);

        toast.success(
            item.isActive ? "Disabled" : "Enabled"
        );

        fetchItems();
    };

    return (
        <div className="space-y-6">

            <div className="flex justify-between items-start">

                <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                        {title}
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                        Manage and maintain the {title.toLowerCase()} reference library used across the platform.
                    </p>
                </div>

                <button
                    onClick={() => setShowForm(!showForm)}
                    className="cursor-pointer bg-teal-600 hover:bg-teal-800 text-white px-4 py-2 rounded-md text-sm"
                >
                    Add
                </button>

            </div>

            {showForm && (
                <LibraryForm
                    title={`Add ${title}`}
                    name={name}
                    setName={setName}
                    preview={preview}
                    setPreview={setPreview}
                    setImage={setImage}
                    onSubmit={createItem}
                    onCancel={() => setShowForm(false)}
                    saving={saving}
                />
            )}

            {editing && (
                <LibraryForm
                    title={`Edit ${title}`}
                    name={editing.name}
                    setName={(v) => setEditing({ ...editing, name: v })}
                    preview={preview || editing.imageUrl || null}
                    setPreview={setPreview}
                    setImage={setImage}
                    onCancel={() => {
                        setEditing(null);
                        setPreview(null);
                        setImage(null);
                    }}
                    onSubmit={async () => {
                        try {

                            const form = new FormData();

                            form.append("name", editing.name);
                            form.append("description", editing.description || "");

                            if (image) {
                                form.append("image", image);
                            }

                            await api.put(`${endpoint}/${editing.id}`, form, {
                                headers: {
                                    "Content-Type": "multipart/form-data",
                                },
                            });

                            toast.success("Updated");

                            setEditing(null);
                            setImage(null);
                            setPreview(null);

                            fetchItems();

                        } catch {
                            toast.error("Update failed");
                        }
                    }}
                    saving={saving}
                />
            )}

            <LibraryTable
                items={items}
                onEdit={setEditing}
                onToggle={toggle}
            />

        </div>
    );
}