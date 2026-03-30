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

                        <Info label="Experience" value={`${old.experience} years`}
                            variant={changed(old.experience, updated.experience) ? "old" : undefined} />

                        <Info label="Qualification" value={old.qualification}
                            variant={changed(old.qualification, updated.qualification) ? "old" : undefined} />

                        <Info label="Bio" value={old.bio || "—"}
                            variant={changed(old.bio, updated.bio) ? "old" : undefined} />

                        <Info label="Fee (INR)" value={`₹${old.consultationFeeINR}`}
                            variant={changed(old.consultationFeeINR, updated.consultationFeeINR) ? "old" : undefined} />

                        <Info label="Fee (USD)" value={`$${old.consultationFeeUSD}`}
                            variant={changed(old.consultationFeeUSD, updated.consultationFeeUSD) ? "old" : undefined} />
                        <Info label="Fee (AED)" value={`$${old.consultationFeeAED}`}
                            variant={changed(old.consultationFeeAED, updated.consultationFeeAED) ? "old" : undefined} />
                        <Info label="Fee (EUR)" value={`$${old.consultationFeeEUR}`}
                            variant={changed(old.consultationFeeEUR, updated.consultationFeeEUR) ? "old" : undefined} />
                        <Info label="Fee (GBP)" value={`$${old.consultationFeeGBP}`}
                            variant={changed(old.consultationFeeGBP, updated.consultationFeeGBP) ? "old" : undefined} />
                        <Info label="Fee (CAD)" value={`$${old.consultationFeeCAD}`}
                            variant={changed(old.consultationFeeCAD, updated.consultationFeeCAD) ? "old" : undefined} />

                        <Info label="Registration No" value={old.registrationNumber}
                            variant={changed(old.registrationNumber, updated.registrationNumber) ? "old" : undefined} />

                        <Info label="Registration Council" value={old.registrationCouncil}
                            variant={changed(old.registrationCouncil, updated.registrationCouncil) ? "old" : undefined} />

                        <Info label="Languages" value={(old.languages || []).join(", ")}
                            variant={changed(old.languages?.join(","), updated.languages?.join(",")) ? "old" : undefined} />

                        <Info label="Mini Specialities" value={(old.miniSpecialities || []).join(", ")}
                            variant={changed(old.miniSpecialities?.join(","), updated.miniSpecialities?.join(",")) ? "old" : undefined} />

                        {old.imageUrl && <img src={old.imageUrl} className="mt-3 w-24 h-24 rounded-lg border" />}
                        {old.sealUrl && <img src={old.sealUrl} className="mt-3 w-24 h-24 rounded-lg border" />}
                        {old.signatureUrl && <img src={old.signatureUrl} className="mt-3 w-24 h-24 rounded-lg border" />}
                    </div>

                    {/* UPDATED */}
                    <div>
                        <p className="font-semibold mb-3 text-teal-600">
                            Requested Update
                        </p>

                        <Info label="Experience" value={`${updated.experience} years`}
                            variant={changed(old.experience, updated.experience) ? "new" : undefined} />

                        <Info label="Qualification" value={updated.qualification}
                            variant={changed(old.qualification, updated.qualification) ? "new" : undefined} />

                        <Info label="Bio" value={updated.bio || "—"}
                            variant={changed(old.bio, updated.bio) ? "new" : undefined} />

                        <Info label="Fee (INR)" value={`₹${updated.consultationFeeINR}`}
                            variant={changed(old.consultationFeeINR, updated.consultationFeeINR) ? "new" : undefined} />

                        <Info label="Fee (USD)" value={`$${updated.consultationFeeUSD}`}
                            variant={changed(old.consultationFeeUSD, updated.consultationFeeUSD) ? "new" : undefined} />

                        <Info label="Fee (AED)" value={`$${updated.consultationFeeAED}`}
                            variant={changed(old.consultationFeeAED, updated.consultationFeeAED) ? "new" : undefined} />

                        <Info label="Fee (EUR)" value={`$${updated.consultationFeeEUR}`}
                            variant={changed(old.consultationFeeEUR, updated.consultationFeeEUR) ? "new" : undefined} />

                        <Info label="Fee (GBP)" value={`$${updated.consultationFeeGBP}`}
                            variant={changed(old.consultationFeeGBP, updated.consultationFeeGBP) ? "new" : undefined} />

                        <Info label="Fee (CAD)" value={`$${updated.consultationFeeCAD}`}
                            variant={changed(old.consultationFeeCAD, updated.consultationFeeCAD) ? "new" : undefined} />

                        <Info label="Registration No" value={updated.registrationNumber}
                            variant={changed(old.registrationNumber, updated.registrationNumber) ? "new" : undefined} />

                        <Info label="Registration Council" value={updated.registrationCouncil}
                            variant={changed(old.registrationCouncil, updated.registrationCouncil) ? "new" : undefined} />

                        <Info label="Languages" value={(updated.languages || []).join(", ")}
                            variant={changed(old.languages?.join(","), updated.languages?.join(",")) ? "new" : undefined} />

                        <Info label="Mini Specialities" value={(updated.miniSpecialities || []).join(", ")}
                            variant={changed(old.miniSpecialities?.join(","), updated.miniSpecialities?.join(",")) ? "new" : undefined} />

                        {updated.imageUrl && <img src={updated.imageUrl} className="mt-3 w-24 h-24 rounded-lg border" />}
                        {updated.sealUrl && <img src={updated.sealUrl} className="mt-3 w-24 h-24 rounded-lg border" />}
                        {updated.signatureUrl && <img src={updated.signatureUrl} className="mt-3 w-24 h-24 rounded-lg border" />}
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