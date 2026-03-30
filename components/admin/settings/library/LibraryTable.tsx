"use client";

import { useMemo, useState } from "react";

type Item = {
    id: string;
    name: string;
    imageUrl?: string;
    isActive: boolean;
};

type Props = {
    items: Item[];
    onEdit: (item: Item) => void;
    onToggle: (item: Item) => void;
};

const ITEMS_PER_PAGE = 12;

export default function LibraryTable({ items, onEdit, onToggle }: Props) {

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    /* ---------------- SEARCH ---------------- */
    const filteredItems = useMemo(() => {
        return items.filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [items, search]);

    /* ---------------- PAGINATION ---------------- */
    const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

    const paginatedItems = filteredItems.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    return (
        <div className="border border-gray-200 rounded-xl bg-white overflow-hidden">

            {/* SEARCH */}
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-64"
                />

                <p className="text-xs text-gray-500">
                    Showing {paginatedItems.length} of {filteredItems.length}
                </p>
            </div>

            {/* TABLE */}
            <table className="w-full text-sm">
                <thead className="bg-slate-50 text-gray-700">
                    <tr>
                        <th className="px-6 py-3 text-left">Image</th>
                        <th className="px-6 py-3 text-left">Name</th>
                        <th className="px-6 py-3 text-left">Status</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {paginatedItems.map((item) => (
                        <tr
                            key={item.id}
                            className="border-t border-gray-200 hover:bg-slate-50"
                        >
                            {/* IMAGE */}
                            <td className="px-6 py-4">
                                {item.imageUrl ? (
                                    <img
                                        src={item.imageUrl}
                                        className="w-10 h-10 rounded-md object-cover"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-md bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                                        {item.name.charAt(0)}
                                    </div>
                                )}
                            </td>

                            {/* NAME */}
                            <td className="px-6 py-4 font-medium">
                                {item.name}
                            </td>

                            {/* STATUS */}
                            <td className="px-6 py-4">
                                <span
                                    className={`px-2 py-1 text-xs rounded-full ${
                                        item.isActive
                                            ? "bg-green-100 text-green-700"
                                            : "bg-gray-100 text-gray-500"
                                    }`}
                                >
                                    {item.isActive ? "Active" : "Inactive"}
                                </span>
                            </td>

                            {/* ACTIONS */}
                            <td className="px-6 py-4 text-right">
                                <button
                                    onClick={() => onEdit(item)}
                                    className="hover:underline font-medium text-blue-600 text-xs mr-3"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => onToggle(item)}
                                    className="hover:underline font-medium text-xs"
                                >
                                    Toggle
                                </button>
                            </td>
                        </tr>
                    ))}

                    {paginatedItems.length === 0 && (
                        <tr>
                            <td colSpan={4} className="text-center py-10 text-gray-400 text-sm">
                                No items found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* PAGINATION */}
            {totalPages > 1 && (
                <div className="flex justify-between items-center p-4 border-t border-gray-200">
                    <button
                        onClick={() => setPage((p) => p - 1)}
                        disabled={page === 1}
                        className="px-3 py-1 border border-gray-200 hover:bg-gray-200 rounded disabled:opacity-40"
                    >
                        Prev
                    </button>

                    <p className="text-sm text-gray-500">
                        Page {page} of {totalPages}
                    </p>

                    <button
                        onClick={() => setPage((p) => p + 1)}
                        disabled={page === totalPages}
                        className="px-3 py-1 border border-gray-200 hover:bg-gray-200 rounded disabled:opacity-40"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}