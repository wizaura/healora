export default function PendingUpdateModal({
    open,
    onClose,
    data,
}: any) {

    if (!open || !data) return null;

    const { old, new: updated, doctor } = data;

    const changed = (a: any, b: any) => a !== b;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">

            <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] shadow-xl flex flex-col">

                {/* Header */}
                <div className="border-b px-6 py-4">
                    <h2 className="text-lg font-semibold text-slate-900">
                        Profile Update Review
                    </h2>

                    <p className="text-sm text-slate-500">
                        {doctor?.name} • {doctor?.email}
                    </p>
                </div>

                {/* Scrollable Body */}
                <div className="p-6 grid md:grid-cols-2 gap-6 text-sm overflow-y-auto">

                    {/* CURRENT */}
                    <div>
                        <p className="font-semibold mb-3 text-slate-600">
                            Current Profile
                        </p>

                        <Info
                            label="Experience"
                            value={`${old.experience} years`}
                            variant={changed(old.experience, updated.experience) ? "old" : undefined}
                        />

                        <Info
                            label="Qualification"
                            value={old.qualification}
                            variant={changed(old.qualification, updated.qualification) ? "old" : undefined}
                        />

                        <Info
                            label="Fee"
                            value={`₹${old.consultationFee}`}
                            variant={changed(old.consultationFee, updated.consultationFee) ? "old" : undefined}
                        />

                        <Info
                            label="Bio"
                            value={old.bio || "—"}
                            variant={changed(old.bio, updated.bio) ? "old" : undefined}
                        />

                        {old.imageUrl && (
                            <img
                                src={old.imageUrl}
                                className="mt-3 w-24 h-24 object-cover rounded-lg border"
                            />
                        )}
                    </div>

                    {/* UPDATED */}
                    <div>
                        <p className="font-semibold mb-3 text-teal-600">
                            Requested Update
                        </p>

                        <Info
                            label="Experience"
                            value={`${updated.experience} years`}
                            variant={changed(old.experience, updated.experience) ? "new" : undefined}
                        />

                        <Info
                            label="Qualification"
                            value={updated.qualification}
                            variant={changed(old.qualification, updated.qualification) ? "new" : undefined}
                        />

                        <Info
                            label="Fee"
                            value={`₹${updated.consultationFee}`}
                            variant={changed(old.consultationFee, updated.consultationFee) ? "new" : undefined}
                        />

                        <Info
                            label="Bio"
                            value={updated.bio || "—"}
                            variant={changed(old.bio, updated.bio) ? "new" : undefined}
                        />

                        {updated.imageUrl && (
                            <img
                                src={updated.imageUrl}
                                className="mt-3 w-24 h-24 object-cover rounded-lg border"
                            />
                        )}
                    </div>

                </div>

                {/* Footer */}
                <div className="flex justify-end border-t px-6 py-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-slate-100 rounded-md text-sm hover:bg-slate-200"
                    >
                        Close
                    </button>
                </div>

            </div>

        </div>
    );
}

function Info({
    label,
    value,
    variant,
}: {
    label: string;
    value: string;
    variant?: "old" | "new";
}) {

    let style = "border-gray-300 bg-white";

    if (variant === "old") {
        style = "border-red-300 bg-red-50 text-red-700";
    }

    if (variant === "new") {
        style = "border-teal-300 bg-teal-50 text-teal-700";
    }

    return (
        <div className="mb-3">
            <p className="text-xs font-medium text-slate-500 mb-1">
                {label}
            </p>

            <div className={`whitespace-pre-wrap rounded-lg border px-3 py-2 text-sm ${style}`}>
                {value}
            </div>
        </div>
    );
}