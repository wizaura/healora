"use client";

type Props = {
    value: any;
    onChange: (data: any) => void;
};

export default function AddressForm({ value, onChange }: Props) {
    const update = (field: string, val: string) => {
        onChange({ ...value, [field]: val });
    };

    const input = "w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy";

    return (
        <div className="space-y-4">

            <div className="grid grid-cols-2 gap-3">
                <input
                    placeholder="Full Name"
                    value={value.name || ""}
                    onChange={(e) => update("name", e.target.value)}
                    className={input}
                />

                <input
                    placeholder="Phone Number"
                    value={value.phone || ""}
                    onChange={(e) => update("phone", e.target.value)}
                    className={input}
                />
            </div>

            <input
                placeholder="Address Line 1"
                value={value.line1 || ""}
                onChange={(e) => update("line1", e.target.value)}
                className={input}
            />

            <input
                placeholder="Address Line 2 (Optional)"
                value={value.line2 || ""}
                onChange={(e) => update("line2", e.target.value)}
                className={input}
            />

            <div className="grid grid-cols-2 gap-3">
                <input
                    placeholder="City"
                    value={value.city || ""}
                    onChange={(e) => update("city", e.target.value)}
                    className={input}
                />

                <input
                    placeholder="State / Province"
                    value={value.state || ""}
                    onChange={(e) => update("state", e.target.value)}
                    className={input}
                />
            </div>

            <div className="grid grid-cols-2 gap-3">
                <input
                    placeholder="Postal / ZIP Code"
                    value={value.zip || ""}
                    onChange={(e) => update("zip", e.target.value)}
                    className={input}
                />

                <input
                    placeholder="Country"
                    value={value.country || ""}
                    onChange={(e) => update("country", e.target.value)}
                    className={input}
                />
            </div>

        </div>
    );
}