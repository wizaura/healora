"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "@/lib/api";
import { getApiError } from "@/lib/util";
import FaqModal from "./FaqModal";
import FaqCategoriesSection from "./CategoriesSection";

type Category = {
    id: string;
    name: string;
};

type Faq = {
    id: string;
    categoryId: string;
    category: Category;
    question: string;
    answer: string;
    isActive: boolean;
};

export default function FaqsSection() {
    const [faqs, setFaqs] = useState<Faq[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [selected, setSelected] = useState<Faq | null>(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            setLoading(true);

            const [faqRes, catRes] = await Promise.all([
                api.get("/admin/settings/faqs"),
                api.get("/admin/settings/faq-categories"),
            ]);

            setFaqs(faqRes.data);
            setCategories(catRes.data);
        } catch (err: any) {
            toast.error(getApiError(err));
        } finally {
            setLoading(false);
        }
    }

    async function saveFaq(data: any) {
        try {
            if (selected) {
                await api.put(`/admin/settings/faqs/${selected.id}`, data);
                toast.success("FAQ updated");
            } else {
                await api.post("/admin/settings/faqs", data);
                toast.success("FAQ created");
            }

            setOpen(false);
            setSelected(null);
            fetchData();
        } catch (err: any) {
            toast.error(getApiError(err));
        }
    }

    async function deleteFaq(id: string) {
        try {
            await api.delete(`/admin/settings/faqs/${id}`);
            toast.success("FAQ deleted");
            setConfirmDeleteId(null);
            fetchData();
        } catch (err: any) {
            toast.error(getApiError(err));
        }
    }

    return (
        <section className="space-y-6 pt-20">

            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800">
                        FAQ Management
                    </h2>
                    <p className="text-sm text-gray-500">
                        Manage Healora FAQs and categories
                    </p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => {
                            setSelected(null);
                            setOpen(true);
                        }}
                        className="bg-navy text-white px-4 py-2 rounded-lg text-sm"
                    >
                        + Add FAQ
                    </button>

                    <button
                        onClick={() => setCategoryOpen(true)}
                        className="border border-gray-300 px-4 py-2 rounded-lg text-sm"
                    >
                        Manage Categories
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="bg-white rounded-xl border border-gray-200">

                {loading && (
                    <p className="p-6 text-sm text-gray-400">Loading FAQs...</p>
                )}

                {!loading && faqs.length === 0 && (
                    <p className="p-6 text-sm text-gray-400">No FAQs added.</p>
                )}

                {!loading && faqs.map((faq) => (
                    <div
                        key={faq.id}
                        className="p-6 border-b border-gray-200 last:border-none flex justify-between"
                    >
                        <div>
                            <p className="text-xs text-teal-600 font-medium">
                                {faq.category?.name}
                            </p>

                            <p className="font-semibold text-gray-800">
                                {faq.question}
                            </p>

                            <p className="text-sm text-gray-600 mt-1">
                                {faq.answer}
                            </p>

                            <span
                                className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
                                    faq.isActive
                                        ? "bg-green-100 text-green-700"
                                        : "bg-gray-200 text-gray-600"
                                }`}
                            >
                                {faq.isActive ? "Active" : "Inactive"}
                            </span>
                        </div>

                        <div className="flex gap-4 text-sm">
                            <button
                                onClick={() => {
                                    setSelected(faq);
                                    setOpen(true);
                                }}
                                className="text-blue-600"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => setConfirmDeleteId(faq.id)}
                                className="text-red-500"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* FAQ Modal */}
            {open && (
                <FaqModal
                    categories={categories}
                    initialData={selected}
                    onClose={() => {
                        setOpen(false);
                        setSelected(null);
                    }}
                    onSave={saveFaq}
                />
            )}

            {/* Category Section */}
            {categoryOpen && (
                <FaqCategoriesSection onClose={() => setCategoryOpen(false)} />
            )}

            {/* Confirm Delete */}
            {confirmDeleteId && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl w-[400px]">
                        <h3 className="font-semibold mb-2">Delete FAQ?</h3>
                        <p className="text-sm text-gray-500 mb-4">
                            This action cannot be undone.
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setConfirmDeleteId(null)}
                                className="border px-4 py-2 rounded-lg"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => deleteFaq(confirmDeleteId)}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}