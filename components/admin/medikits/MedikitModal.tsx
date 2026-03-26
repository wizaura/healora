"use client";

import { useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { X } from "lucide-react";

export default function MedikitModal({ data, onClose, onSuccess }: any) {
    const isEdit = !!data;

    const [title, setTitle] = useState(data?.title || "");
    const [description, setDescription] = useState(data?.description || "");
    const [medicines, setMedicines] = useState<string[]>(
        data?.medicines || [""]
    );
    const [preview, setPreview] = useState(data?.imageUrl || null);
    const [directions, setDirections] = useState(
        data?.questions || [{ question: "", answer: "" }]
    );
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const addField = (setter: any, list: string[]) => {
        setter([...list, ""]);
    };

    const updateField = (
        index: number,
        value: string,
        list: string[],
        setter: any
    ) => {
        const updated = [...list];
        updated[index] = value;
        setter(updated);
    };

    const removeField = (index: number, list: string[], setter: any) => {
        const updated = list.filter((_, i) => i !== index);
        setter(updated);
    };

    const handleSubmit = async () => {
        setLoading(true);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("medicines", JSON.stringify(medicines));
        formData.append(
            "questions",
            JSON.stringify(
                directions.map((d: any) => ({
                    question: d.question,
                    answer: d.answer,
                }))
            )
        );

        if (image) {
            formData.append("image", image);
        }

        try {
            if (isEdit) {
                await api.patch(`/medikits/${data.id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                toast.success("Medikit updated");
            } else {
                await api.post("/medikits", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                toast.success("Medikit created");
            }

            onSuccess();
        } catch (err) {
            toast.error("Error saving medikit");
        }

        setLoading(false);
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[800px] max-h-[90vh] rounded-2xl shadow-xl flex flex-col">
                {/* HEADER */}
                <div className="flex justify-between items-center p-5 border-b border-gray-200">
                    <h2 className="text-xl font-semibold">
                        {isEdit ? "Edit Medikit" : "Add Medikit"}
                    </h2>

                    <button onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>

                {/* BODY */}
                <div className="p-6 space-y-5 overflow-y-auto">
                    {/* TITLE */}
                    <div>
                        <label className="text-sm text-gray-600">Title</label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1"
                        />
                    </div>

                    {/* DESCRIPTION */}
                    <div>
                        <label className="text-sm text-gray-600">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1"
                        />
                    </div>

                    {/* IMAGE */}
                    <div>
                        <label className="text-sm text-gray-600">Image</label>

                        <div className="mt-2 flex items-center gap-4">
                            {/* Preview */}
                            {preview && (
                                <img
                                    src={preview}
                                    className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                                />
                            )}

                            {/* File Input Styled */}
                            <label className="border border-gray-200 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-50">
                                Upload Image
                                <input
                                    type="file"
                                    hidden
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setImage(file);
                                            setPreview(URL.createObjectURL(file));
                                        }
                                    }}
                                />
                            </label>
                        </div>
                    </div>

                    {/* MEDICINES */}
                    <div>
                        <label className="text-sm text-gray-600">Medicines</label>
                        {medicines.map((m, i) => (
                            <div key={i} className="flex gap-2 mt-2">
                                <input
                                    value={m}
                                    onChange={(e) =>
                                        updateField(i, e.target.value, medicines, setMedicines)
                                    }
                                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2"
                                />
                                <button
                                    onClick={() => removeField(i, medicines, setMedicines)}
                                    className="px-3 bg-red-500 text-white rounded-lg"
                                >
                                    X
                                </button>
                            </div>
                        ))}

                        <button
                            onClick={() => addField(setMedicines, medicines)}
                            className="mt-2 text-sm text-teal-600"
                        >
                            + Add Medicine
                        </button>
                    </div>

                    {/* DIRECTIONS */}
                    <div>
                        <label className="text-sm text-gray-600">Directions to Use</label>

                        {directions.map((d: any, i: number) => (
                            <div key={i} className="grid grid-cols-2 gap-2 mt-2">
                                <input
                                    placeholder="Question"
                                    value={d.question}
                                    onChange={(e) => {
                                        const updated = [...directions];
                                        updated[i].question = e.target.value;
                                        setDirections(updated);
                                    }}
                                    className="border border-gray-200 rounded-lg px-3 py-2"
                                />

                                <input
                                    placeholder="Answer"
                                    value={d.answer}
                                    onChange={(e) => {
                                        const updated = [...directions];
                                        updated[i].answer = e.target.value;
                                        setDirections(updated);
                                    }}
                                    className="border border-gray-200 rounded-lg px-3 py-2"
                                />
                            </div>
                        ))}

                        <button
                            onClick={() =>
                                setDirections([...directions, { question: "", answer: "" }])
                            }
                            className="mt-2 text-sm text-teal-600"
                        >
                            + Add Direction
                        </button>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="p-4 border-t border-gray-200 flex justify-end">
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="bg-teal-600 text-white px-6 py-2 rounded-lg"
                    >
                        {loading ? "Saving..." : "Save Medikit"}
                    </button>
                </div>
            </div>
        </div>
    );
}