"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import toast from "react-hot-toast";

type Language = {
    id: string;
    name: string;
};

export default function LanguagesPage() {
    const queryClient = useQueryClient();

    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");

    /* ---------------- FETCH ---------------- */

    const { data: languages = [], isLoading } = useQuery<Language[]>({
        queryKey: ["languages"],
        queryFn: () => api.get("/languages").then(res => res.data),
    });

    /* ---------------- CREATE ---------------- */

    const createMutation = useMutation({
        mutationFn: () => api.post("/languages", { name }),
        onSuccess: () => {
            toast.success("Language created");
            setName("");
            setShowForm(false);
            queryClient.invalidateQueries({ queryKey: ["languages"] });
        },
        onError: () => toast.error("Failed to create language"),
    });

    /* ---------------- DELETE ---------------- */

    const deleteMutation = useMutation({
        mutationFn: (id: string) => api.delete(`/languages/${id}`),
        onSuccess: () => {
            toast.success("Language deleted");
            queryClient.invalidateQueries({ queryKey: ["languages"] });
        },
        onError: () => toast.error("Failed to delete language"),
    });

    const handleCreate = () => {
        if (!name.trim()) {
            toast.error("Language name required");
            return;
        }
        createMutation.mutate();
    };

    return (
        <div className="space-y-8">

            {/* HEADER */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-semibold text-navy">
                        Languages
                    </h2>
                    <p className="text-sm text-navy/50">
                        Manage supported languages for doctors
                    </p>
                </div>

                <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-5 py-2 rounded-xl bg-wellness-accent text-white text-sm font-medium hover:opacity-90"
                >
                    {showForm ? "Close" : "+ Add Language"}
                </button>
            </div>

            {/* FORM */}
            {showForm && (
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 space-y-4">

                    <input
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-wellness-accent/30"
                        placeholder="Language name (e.g. English)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <button
                        onClick={handleCreate}
                        disabled={createMutation.isPending}
                        className="px-5 py-2.5 rounded-xl bg-navy text-white text-sm font-medium hover:opacity-90 disabled:opacity-60"
                    >
                        {createMutation.isPending ? "Creating..." : "Create Language"}
                    </button>
                </div>
            )}

            {/* LIST */}
            {isLoading ? (
                <div className="text-sm text-navy/50">
                    Loading languages...
                </div>
            ) : languages.length === 0 ? (
                <div className="text-sm text-navy/50">
                    No languages added yet.
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {languages.map((lang) => (
                        <div
                            key={lang.id}
                            className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 flex justify-between items-center hover:shadow-md transition"
                        >
                            <span className="font-medium text-navy">
                                {lang.name}
                            </span>

                            <button
                                onClick={() => deleteMutation.mutate(lang.id)}
                                className="text-sm text-red-500 hover:text-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}