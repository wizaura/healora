import api from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import SelectOption from "@/components/common/SelectOption";

type Item = {
    id: string;
    name: string;
};

interface RelationSectionProps {
    title: string;
    items: Item[];
    fetchUrl: string;
    addUrl: string;
    removeUrl: string;
    refetchMini: () => void;
}

export default function RelationSection({
    title,
    items = [],
    fetchUrl,
    addUrl,
    removeUrl,
    refetchMini,
}: RelationSectionProps) {

    const [selectedId, setSelectedId] = useState("");

    /* ---------------- FETCH ALL ---------------- */

    const { data: allItems = [], isLoading } = useQuery<Item[]>({
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
        },
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
        },
    });

    /* ---------------- FILTER ---------------- */

    const attachedIds = items.map((i) => i.id);

    const availableItems = allItems.filter(
        (i) => !attachedIds.includes(i.id)
    );

    /* Convert to SelectOption format */

    const options = availableItems.map(item => ({
        label: item.name,
        value: item.id,
    }));

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

                    {items.map((item) => (

                        <div
                            key={item.id}
                            className="flex justify-between items-center px-5 py-4"
                        >

                            <span className="text-sm text-navy-dark">
                                {item.name}
                            </span>

                            <button
                                disabled={removeMutation.isPending}
                                onClick={() => removeMutation.mutate(item.id)}
                                className="cursor-pointer text-sm hover:underline text-red-500 hover:text-red-600 disabled:opacity-50"
                            >
                                Remove
                            </button>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}