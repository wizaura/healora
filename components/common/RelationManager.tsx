"use client";

import api from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import SelectOption from "@/components/common/SelectOption";

interface RelationItem {
    symptomId?: string;
    causeId?: string;
    riskFactorId?: string;

    description?: string;

    symptom?: {
        id: string;
        name: string;
        imageUrl?: string;
    };

    cause?: {
        id: string;
        name: string;
        imageUrl?: string;
    };

    riskFactor?: {
        id: string;
        name: string;
        imageUrl?: string;
    };
}

interface RelationSectionProps {
    title: string;
    items: RelationItem[];
    fetchUrl: string;
    addUrl: string;
    removeUrl: string;
    descriptionUrl: string;
    refetchMini: () => void;
}

export default function RelationSection({
    title,
    items = [],
    fetchUrl,
    addUrl,
    removeUrl,
    descriptionUrl,
    refetchMini,
}: RelationSectionProps) {

    const [selectedId, setSelectedId] = useState("");

    const [editingId, setEditingId] = useState<string | null>(null);
    const [descriptionValue, setDescriptionValue] = useState("");

    /* ---------------- FETCH ALL ---------------- */

    const { data: allItems = [], isLoading } = useQuery({
        queryKey: [fetchUrl],
        queryFn: async () => {
            const res = await api.get(fetchUrl);
            return res.data;
        },
    });

    /* ---------------- ADD ---------------- */

    const addMutation = useMutation({
        mutationFn: async () => {
            await api.post(addUrl, {
                relationId: selectedId,
            });
        },
        onSuccess: () => {
            toast.success(`${title} added`);
            setSelectedId("");
            refetchMini();
        },
        onError: () => {
            toast.error(`Failed to add ${title}`);
        }
    });

    /* ---------------- REMOVE ---------------- */

    const removeMutation = useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`${removeUrl}/${id}`);
        },
        onSuccess: () => {
            toast.success(`${title} removed`);
            refetchMini();
        },
        onError: () => {
            toast.error(`Failed to remove ${title}`);
        }
    });

    /* ---------------- UPDATE DESCRIPTION ---------------- */

    const updateDescription = useMutation({
        mutationFn: async ({
            relationId,
            description,
        }: {
            relationId: string;
            description: string;
        }) => {
            await api.patch(`${descriptionUrl}/${relationId}/description`, {
                description,
            });
        },
        onSuccess: () => {
            toast.success("Description updated");
            refetchMini();
        },
        onError: () => {
            toast.error("Failed to update description");
        }
    });

    /* ---------------- FILTER ---------------- */

    const attachedIds = items.map(
        (i: any) =>
            i.symptomId ||
            i.causeId ||
            i.riskFactorId
    );

    const availableItems = allItems.filter(
        (i: any) => !attachedIds.includes(i.id)
    );

    const options = availableItems.map((item: any) => ({
        label: item.name,
        value: item.id,
    }));

    /* ---------------- EDIT HANDLERS ---------------- */

    const startEditing = (id: string, current?: string) => {
        setEditingId(id);
        setDescriptionValue(current || "");
    };

    const cancelEditing = () => {
        setEditingId(null);
        setDescriptionValue("");
    };

    const saveDescription = () => {

        if (!editingId) return;

        updateDescription.mutate({
            relationId: editingId,
            description: descriptionValue,
        });

        setEditingId(null);
        setDescriptionValue("");
    };

    /* ---------------- UI ---------------- */

    return (
        <div className="space-y-8">

            {/* HEADER */}

            <div>
                <h3 className="text-lg font-semibold text-navy-dark">
                    {title}
                </h3>

                <p className="text-sm text-navy/60">
                    Manage related {title.toLowerCase()}.
                </p>
            </div>

            {/* ADD SECTION */}

            <div className="flex gap-4 items-center flex-wrap">

                <SelectOption
                    value={selectedId}
                    onChange={setSelectedId}
                    options={options}
                    placeholder={
                        isLoading
                            ? "Loading..."
                            : `${title}`
                    }
                />

                <button
                    disabled={!selectedId || addMutation.isPending}
                    onClick={() => addMutation.mutate()}
                    className="cursor-pointer hover:bg-wellness-accent/90 px-5 py-2 bg-wellness-accent text-white rounded-lg text-sm font-medium disabled:opacity-50"
                >
                    {addMutation.isPending ? "Adding..." : "Add"}
                </button>

            </div>

            {/* LIST */}

            {items.length === 0 ? (

                <p className="text-sm text-navy/60">
                    No {title.toLowerCase()} added yet.
                </p>

            ) : (

                <div className="divide-y divide-gray-200 border border-gray-200 rounded-lg">

                    {items.map((item: any) => {

                        const id =
                            item.symptomId ||
                            item.causeId ||
                            item.riskFactorId;

                        const entity =
                            item.symptom ||
                            item.cause ||
                            item.riskFactor;

                        const name = entity?.name;
                        const image = entity?.imageUrl;

                        const isEditing = editingId === id;

                        return (

                            <div
                                key={id}
                                className="px-5 py-4 space-y-3"
                            >

                                {/* HEADER ROW */}

                                <div className="flex justify-between items-center">

                                    <div className="flex items-center gap-3">

                                        {image ? (
                                            <img
                                                src={image}
                                                alt={name}
                                                className="w-12 h-12 rounded-full object-cover border"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                                                {name?.charAt(0)}
                                            </div>
                                        )}

                                        <span className="text-sm text-navy-dark font-medium">
                                            {name}
                                        </span>

                                    </div>

                                    <div className="flex gap-4 items-center">

                                        {!isEditing && (
                                            <button
                                                onClick={() =>
                                                    startEditing(id, item.description)
                                                }
                                                className="text-xs text-blue-600 hover:underline"
                                            >
                                                {item.description
                                                    ? "Edit description"
                                                    : "Add description"}
                                            </button>
                                        )}

                                        <button
                                            disabled={removeMutation.isPending}
                                            onClick={() =>
                                                removeMutation.mutate(id)
                                            }
                                            className="cursor-pointer text-xs hover:underline text-red-500 hover:text-red-600 disabled:opacity-50"
                                        >
                                            Remove
                                        </button>

                                    </div>

                                </div>

                                {/* DESCRIPTION DISPLAY */}

                                {!isEditing && item.description && (
                                    <p className="text-sm text-navy/70 bg-gray-50 rounded-md px-3 py-2">
                                        {item.description}
                                    </p>
                                )}

                                {/* DESCRIPTION EDIT */}

                                {isEditing && (

                                    <div className="space-y-3">

                                        <textarea
                                            value={descriptionValue}
                                            onChange={(e) =>
                                                setDescriptionValue(e.target.value)
                                            }
                                            rows={2}
                                            placeholder="Write description..."
                                            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
                                        />

                                        <div className="flex gap-3">

                                            <button
                                                onClick={saveDescription}
                                                disabled={updateDescription.isPending}
                                                className="text-xs bg-wellness-accent text-white px-3 py-1 rounded"
                                            >
                                                {updateDescription.isPending
                                                    ? "Saving..."
                                                    : "Save"}
                                            </button>

                                            <button
                                                onClick={cancelEditing}
                                                className="text-xs text-gray-500 hover:underline"
                                            >
                                                Cancel
                                            </button>

                                        </div>

                                    </div>

                                )}

                            </div>

                        );

                    })}

                </div>

            )}

        </div>
    );
}