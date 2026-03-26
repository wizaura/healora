"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "@/lib/api";
import { getApiError } from "@/lib/util";

import {
    Stethoscope,
    FileText,
    Truck,
    CreditCard,
    User,
    Info,
} from "lucide-react";

const ICON_OPTIONS = [
    { label: "Consultation", value: "stethoscope", icon: Stethoscope },
    { label: "Prescription", value: "fileText", icon: FileText },
    { label: "Door Delivery", value: "truck", icon: Truck },
    { label: "Payments", value: "creditCard", icon: CreditCard },
    { label: "Account", value: "user", icon: User },
    { label: "General", value: "info", icon: Info },
];

type Category = {
    id: string;
    name: string;
    icon: string;
    isActive: boolean;
};

export default function FaqCategoriesSection({ onClose }: any) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [newName, setNewName] = useState("");
    const [selectedIcon, setSelectedIcon] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    async function fetchCategories() {
        try {
            setLoading(true);
            const { data } = await api.get("/admin/settings/faq-categories");
            setCategories(data);
        } catch (err: any) {
            toast.error(getApiError(err));
        } finally {
            setLoading(false);
        }
    }

    async function createCategory() {
        if (!newName.trim()) return;

        try {
            await api.post("/admin/settings/faq-categories", {
                name: newName,
                icon: selectedIcon,
                isActive: true,
            });

            toast.success("Category created");
            setNewName("");
            setSelectedIcon("");
            fetchCategories();
        } catch (err: any) {
            toast.error(getApiError(err));
        }
    }

    async function updateCategory(id: string, name: string, icon: string, isActive: boolean) {
        try {
            await api.put(`/admin/settings/faq-categories/${id}`, {
                name,
                icon,
                isActive,
            });

            toast.success("Category updated");
            setEditingId(null);
            fetchCategories();
        } catch (err: any) {
            toast.error(getApiError(err));
        }
    }

    async function deleteCategory(id: string) {
        try {
            await api.delete(`/admin/settings/faq-categories/${id}`);
            toast.success("Category deleted");
            setConfirmDeleteId(null);
            fetchCategories();
        } catch (err: any) {
            toast.error(getApiError(err));
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[700px] max-h-[90vh] overflow-y-auto rounded-xl p-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">
                            FAQ Categories
                        </h2>
                        <p className="text-sm text-gray-500">
                            Manage FAQ categories for Healora
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-red-500"
                    >
                        Close
                    </button>
                </div>

                {/* Create Category */}
                <div className="border border-gray-200 rounded-lg p-4 space-y-4 mb-6">
                    <input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="Category name"
                        className="w-full border border-gray-200 px-3 py-2 rounded-lg"
                    />

                    {/* Icon Selection */}
                    <div className="flex flex-wrap gap-3">
                        {ICON_OPTIONS.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.value}
                                    onClick={() => setSelectedIcon(item.value)}
                                    className={`flex items-center gap-2 px-4 py-2 border rounded-lg
                                    ${selectedIcon === item.value
                                            ? "border-navy bg-blue-50"
                                            : "border-gray-300"
                                        }`}
                                >
                                    <Icon size={16} />
                                    <span className="text-sm">{item.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    <button
                        onClick={createCategory}
                        className="bg-navy text-white px-4 py-2 rounded-lg"
                    >
                        Add Category
                    </button>
                </div>

                {/* Category List */}
                <div className="space-y-3">
                    {loading && (
                        <p className="text-gray-400 text-sm">
                            Loading categories...
                        </p>
                    )}

                    {!loading && categories.map((cat) => (
                        <div
                            key={cat.id}
                            className="flex justify-between items-center border border-gray-200 p-4 rounded-lg"
                        >
                            <div className="flex items-center gap-3">
                                {(() => {
                                    const Icon = ICON_OPTIONS.find(i => i.value === cat.icon)?.icon;
                                    return Icon ? <Icon size={18} className="text-navy" /> : null;
                                })()}

                                {editingId === cat.id ? (
                                    <input
                                        defaultValue={cat.name}
                                        onBlur={(e) =>
                                            updateCategory(
                                                cat.id,
                                                e.target.value,
                                                cat.icon,
                                                cat.isActive
                                            )
                                        }
                                        className="border px-2 py-1 rounded"
                                        autoFocus
                                    />
                                ) : (
                                    <span className="font-medium">{cat.name}</span>
                                )}

                                <span
                                    className={`px-3 py-1 text-xs rounded-full ${
                                        cat.isActive
                                            ? "bg-green-100 text-green-700"
                                            : "bg-gray-200 text-gray-600"
                                    }`}
                                >
                                    {cat.isActive ? "Active" : "Inactive"}
                                </span>
                            </div>

                            <div className="flex gap-4 text-sm">
                                <button
                                    onClick={() => setEditingId(cat.id)}
                                    className="text-blue-600"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        updateCategory(
                                            cat.id,
                                            cat.name,
                                            cat.icon,
                                            !cat.isActive
                                        )
                                    }
                                    className="text-gray-600"
                                >
                                    Toggle
                                </button>

                                <button
                                    onClick={() => setConfirmDeleteId(cat.id)}
                                    className="text-red-500"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Confirm Delete */}
                {confirmDeleteId && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-xl w-[400px]">
                            <h3 className="font-semibold mb-2">Delete Category?</h3>
                            <p className="text-sm text-gray-500 mb-4">
                                Deleting this category will remove all related FAQs.
                            </p>

                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setConfirmDeleteId(null)}
                                    className="border px-4 py-2 rounded-lg"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={() => deleteCategory(confirmDeleteId)}
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}