"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import toast from "react-hot-toast";

type Language = {
    id: string;
    name: string;
    isActive: boolean;
};

export default function LanguagesPage() {

    const queryClient = useQueryClient();

    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<Language | null>(null);
    const [name, setName] = useState("");

    /* ---------------- FETCH ---------------- */

    const { data: languages = [], isLoading } = useQuery<Language[]>({
        queryKey: ["languages"],
        queryFn: () => api.get("/settings/languages").then(res => res.data),
    });

    /* ---------------- CREATE ---------------- */

    const createMutation = useMutation({
        mutationFn: () => api.post("/settings/languages", { name }),
        onSuccess: () => {
            toast.success("Language created");
            setName("");
            setShowForm(false);
            queryClient.invalidateQueries({ queryKey: ["languages"] });
        },
        onError: () => toast.error("Failed to create language"),
    });

    /* ---------------- UPDATE ---------------- */

    const updateMutation = useMutation({
        mutationFn: () =>
            api.put(`/settings/languages/${editing?.id}`, { name }),
        onSuccess: () => {
            toast.success("Language updated");
            setEditing(null);
            setName("");
            queryClient.invalidateQueries({ queryKey: ["languages"] });
        },
        onError: () => toast.error("Failed to update language"),
    });

    /* ---------------- TOGGLE ACTIVE ---------------- */

    const toggleMutation = useMutation({
        mutationFn: (lang: Language) =>
            api.patch(`/settings/languages/${lang.id}`, {
                isActive: !lang.isActive,
            }),
        onSuccess: () => {
            toast.success("Status updated");
            queryClient.invalidateQueries({ queryKey: ["languages"] });
        },
        onError: () => toast.error("Failed to update status"),
    });

    /* ---------------- HANDLERS ---------------- */

    const handleCreate = () => {

        if (!name.trim()) {
            toast.error("Language name required");
            return;
        }

        createMutation.mutate();
    };

    const handleUpdate = () => {

        if (!name.trim()) {
            toast.error("Language name required");
            return;
        }

        updateMutation.mutate();
    };

    const startEdit = (lang: Language) => {
        setEditing(lang);
        setName(lang.name);
        setShowForm(true);
    };

    const cancelForm = () => {
        setEditing(null);
        setShowForm(false);
        setName("");
    };

    return (
        <div className="space-y-6">

            {/* HEADER */}
            <div className="flex justify-between items-start">

                <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                        Languages
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                        Manage languages that doctors can select for consultations.
                    </p>
                </div>

                <button
                    onClick={() => {
                        setShowForm(!showForm);
                        setEditing(null);
                        setName("");
                    }}
                    className="cursor-pointer bg-teal-600 hover:bg-teal-800 text-white px-4 py-2 rounded-md text-sm"
                >
                    {showForm ? "Close" : "Add Language"}
                </button>

            </div>

            {/* FORM */}
            {showForm && (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

                    <h3 className="text-lg font-semibold mb-6">
                        {editing ? "Edit Language" : "Add Language"}
                    </h3>

                    <div className="space-y-1">

                        <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                            Language Name
                        </label>

                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Example: English"
                            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                        />

                    </div>

                    {/* ACTIONS */}
                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-300 mt-6">

                        <button
                            onClick={cancelForm}
                            className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-sm"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={editing ? handleUpdate : handleCreate}
                            disabled={createMutation.isPending || updateMutation.isPending}
                            className="cursor-pointer bg-teal-600 hover:bg-teal-800 text-white px-4 py-2 rounded-md text-sm"
                        >
                            {editing
                                ? updateMutation.isPending
                                    ? "Updating..."
                                    : "Update"
                                : createMutation.isPending
                                ? "Creating..."
                                : "Create"}
                        </button>

                    </div>

                </div>
            )}

            {/* TABLE */}
            <div className="overflow-hidden border border-gray-200 rounded-xl bg-white">

                {isLoading ? (
                    <div className="p-6 text-sm text-slate-500">
                        Loading languages...
                    </div>
                ) : (
                    <table className="w-full text-sm">

                        <thead className="bg-slate-50 text-slate-600">
                            <tr>
                                <th className="px-6 py-3 text-left">Language</th>
                                <th className="px-6 py-3 text-left">Status</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {languages.map((lang) => (
                                <tr
                                    key={lang.id}
                                    className="border-t border-gray-200 hover:bg-slate-50"
                                >

                                    <td className="px-6 py-4 font-medium text-slate-900">
                                        {lang.name}
                                    </td>

                                    <td className="px-6 py-4">

                                        <span
                                            className={`px-2 py-1 text-xs rounded-full ${
                                                lang.isActive
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-gray-100 text-gray-500"
                                            }`}
                                        >
                                            {lang.isActive ? "Active" : "Inactive"}
                                        </span>

                                    </td>

                                    <td className="px-6 py-4 text-right">

                                        <div className="flex justify-end gap-4 text-xs font-medium">

                                            <button
                                                onClick={() => startEdit(lang)}
                                                className="text-blue-600 hover:underline"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    toggleMutation.mutate(lang)
                                                }
                                                className={`${
                                                    lang.isActive
                                                        ? "text-yellow-600"
                                                        : "text-green-600"
                                                } hover:underline`}
                                            >
                                                {lang.isActive ? "Disable" : "Enable"}
                                            </button>

                                        </div>

                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </table>
                )}

            </div>

        </div>
    );
}