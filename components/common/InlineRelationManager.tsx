import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "@/lib/api";

export default function InlineRelationManager({
    title,
    items,
    fetchUrl,
    addUrl,
    removeUrl,
}: any) {
    const [selectedId, setSelectedId] = useState("");

    const { data: allItems = [] } = useQuery({
        queryKey: [fetchUrl],
        queryFn: async () => {
            const res = await api.get(fetchUrl);
            return res.data;
        },
    });

    const addMutation = useMutation({
        mutationFn: async () => {
            await api.post(addUrl, {
                relationId: selectedId,
            });
        },
        onSuccess: () => {
            toast.success(`${title} added`);
            setSelectedId("");
            window.location.reload(); // simple refresh
        },
    });

    const removeMutation = useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`${removeUrl}/${id}`);
        },
        onSuccess: () => {
            toast.success(`${title} removed`);
            window.location.reload();
        },
    });

    const attachedIds = items.map((i: any) => i.id);
    const availableItems = allItems.filter(
        (i: any) => !attachedIds.includes(i.id)
    );

    return (
        <div className="space-y-8">

            <div className="flex justify-between items-center">
                <h3 className="text-xs uppercase tracking-[0.15em] font-semibold text-navy/50">
                    {title}
                </h3>
            </div>

            {/* ADD */}
            <div className="flex gap-4 items-center">
                <select
                    value={selectedId}
                    onChange={(e) => setSelectedId(e.target.value)}
                    className="px-4 py-2 border rounded-xl text-sm"
                >
                    <option value="">Select {title}</option>
                    {availableItems.map((item: any) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>

                <button
                    disabled={!selectedId}
                    onClick={() => addMutation.mutate()}
                    className="px-5 py-2 bg-wellness-accent text-white rounded-xl text-sm disabled:opacity-50"
                >
                    Add
                </button>
            </div>

            {/* LIST */}
            {items.length === 0 ? (
                <p className="text-sm text-navy/50">No items assigned.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {items.map((item: any) => (
                        <div
                            key={item.id}
                            className="bg-white border border-gray-100 rounded-2xl px-6 py-5 shadow-sm flex justify-between items-center"
                        >
                            <span className="text-navy-dark text-sm font-medium">
                                {item.name}
                            </span>

                            <button
                                onClick={() => removeMutation.mutate(item.id)}
                                className="text-sm text-red-500 hover:underline"
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