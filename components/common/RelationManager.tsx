import api from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

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

    /* ---------------- FETCH ALL AVAILABLE ITEMS ---------------- */

    const { data: allItems = [], isLoading } = useQuery<Item[]>({
        queryKey: [fetchUrl],
        queryFn: async () => {
            const res = await api.get(fetchUrl);
            return res.data;
        },
    });

    /* ---------------- ADD RELATION ---------------- */

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

    /* ---------------- REMOVE RELATION ---------------- */

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

    /* ---------------- FILTER AVAILABLE ---------------- */

    const attachedIds = items.map((i) => i.id);

    const availableItems = allItems.filter(
        (i) => !attachedIds.includes(i.id)
    );

    /* ---------------- UI ---------------- */

    return (
        <div className="space-y-6">

            <h3 className="text-xs uppercase tracking-wider text-navy/50 font-semibold">
                {title}
            </h3>

            {/* ADD SECTION */}
            <div className="flex gap-4 items-center">

                <select
                    value={selectedId}
                    onChange={(e) => setSelectedId(e.target.value)}
                    className="px-4 py-2 border rounded-xl text-sm"
                    disabled={isLoading}
                >
                    <option value="">
                        {isLoading ? "Loading..." : `Select ${title}`}
                    </option>

                    {availableItems.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>

                <button
                    disabled={!selectedId || addMutation.isPending}
                    onClick={() => addMutation.mutate()}
                    className="px-5 py-2 bg-wellness-accent text-white rounded-xl text-sm disabled:opacity-50"
                >
                    {addMutation.isPending ? "Adding..." : "Add"}
                </button>

            </div>

            {/* LIST */}
            {items.length === 0 ? (
                <p className="text-sm text-navy/60">No items added.</p>
            ) : (
                <div className="space-y-3">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="flex justify-between items-center bg-wellness-bg/40 border border-gray-100 rounded-xl px-6 py-4"
                        >
                            <span className="text-sm text-navy-dark">
                                {item.name}
                            </span>

                            <button
                                disabled={removeMutation.isPending}
                                onClick={() => removeMutation.mutate(item.id)}
                                className="text-sm text-red-500 hover:underline disabled:opacity-50"
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