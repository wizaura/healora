"use client";

import { useEffect, useState } from "react";

export default function FaqModal({
    categories,
    initialData,
    onClose,
    onSave,
}: any) {
    const [form, setForm] = useState({
        categoryId: "",
        question: "",
        answer: "",
        isActive: true,
    });

    useEffect(() => {
        if (initialData) {
            setForm(initialData);
        }
    }, [initialData]);

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 w-[500px]">

                <h2 className="text-xl font-semibold mb-4">
                    {initialData ? "Edit FAQ" : "Add FAQ"}
                </h2>

                <div className="space-y-4">

                    <select
                        value={form.categoryId}
                        onChange={(e) =>
                            setForm({ ...form, categoryId: e.target.value })
                        }
                        className="w-full border border-gray-200 px-3 py-2 rounded-lg"
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat: any) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>

                    <input
                        type="text"
                        placeholder="Question"
                        value={form.question}
                        onChange={(e) =>
                            setForm({ ...form, question: e.target.value })
                        }
                        className="w-full border border-gray-200 px-3 py-2 rounded-lg"
                    />

                    <textarea
                        rows={4}
                        placeholder="Answer"
                        value={form.answer}
                        onChange={(e) =>
                            setForm({ ...form, answer: e.target.value })
                        }
                        className="w-full border border-gray-200 px-3 py-2 rounded-lg"
                    />

                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            checked={form.isActive}
                            onChange={(e) =>
                                setForm({ ...form, isActive: e.target.checked })
                            }
                        />
                        Active
                    </label>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button onClick={onClose} className="border px-4 py-2 rounded-lg">
                        Cancel
                    </button>
                    <button
                        onClick={() => onSave(form)}
                        className="bg-navy text-white px-4 py-2 rounded-lg"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}