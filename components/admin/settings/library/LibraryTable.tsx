type Item = {
    id: string;
    name: string;
    description?: string;
    imageUrl?: string;
    isActive: boolean;
};

type Props = {
    items: Item[];
    onEdit: (item: Item) => void;
    onToggle: (item: Item) => void;
};

export default function LibraryTable({ items, onEdit, onToggle }: Props) {
    return (
        <div className="overflow-hidden border border-gray-200 rounded-xl bg-white">

            <table className="w-full text-sm">

                <thead className="bg-slate-50 text-gray-700">
                    <tr>
                        <th className="px-6 py-3 text-left">Image</th>
                        <th className="px-6 py-3 text-left">Name</th>
                        <th className="px-6 py-3 text-left">Description</th>
                        <th className="px-6 py-3 text-left">Status</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {items.map((item) => (
                        <tr
                            key={item.id}
                            className="border-t border-gray-200 hover:bg-slate-50"
                        >
                            <td className="px-6 py-4">
                                {item.imageUrl && (
                                    <img
                                        src={item.imageUrl}
                                        className="w-10 h-10 rounded-md object-cover"
                                    />
                                )}
                            </td>

                            <td className="px-6 py-4 font-medium">
                                {item.name}
                            </td>

                            <td className="px-6 py-4 text-slate-500">
                                {item.description}
                            </td>

                            <td className="px-6 py-4">
                                <span
                                    className={`px-2 py-1 text-xs rounded-full ${item.isActive
                                            ? "bg-green-100 text-green-700"
                                            : "bg-gray-100 text-gray-500"
                                        }`}
                                >
                                    {item.isActive ? "Active" : "Inactive"}
                                </span>
                            </td>

                            <td className="px-6 py-4 text-right">

                                <button
                                    onClick={() => onEdit(item)}
                                    className="cursor-pointer hover:underline font-medium text-blue-600 hover:text-blue-800 text-xs mr-3"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => onToggle(item)}
                                    className="cursor-pointer hover:underline font-medium text-xs"
                                >
                                    Toggle
                                </button>

                            </td>

                        </tr>
                    ))}

                </tbody>

            </table>

        </div>
    );
}