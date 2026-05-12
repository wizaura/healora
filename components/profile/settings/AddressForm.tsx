"use client";

type Props = {
    value: any;
    onChange: (data: any) => void;
    disabled?: boolean;
};

export default function AddressForm({
    value,
    onChange,
    disabled = false,
}: Props) {

    const update = (
        field: string,
        val: string
    ) => {

        onChange({
            ...value,
            [field]: val,
        });
    };

    const input =
        `
            w-full

            rounded-lg

            border border-slate-200

            bg-white

            px-4 py-2.5

            text-sm text-slate-700

            transition

            focus:outline-none
            focus:ring-4
            focus:ring-teal-500/10
            focus:border-teal-500

            disabled:bg-slate-50
            disabled:text-slate-500
            disabled:cursor-not-allowed
        `;

    const label =
        `
            text-sm font-medium text-slate-700
        `;

    return (

        <div className="space-y-8">

            {/* CONTACT INFO */}
            <div className="space-y-5">

                <div
                    className="
                        border-b border-slate-100

                        pb-3
                    "
                >

                    <h3 className="text-sm font-semibold text-slate-900">
                        Contact Information
                    </h3>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* PHONE */}
                    <div className="space-y-1.5">

                        <label className={label}>
                            Phone Number
                        </label>

                        <input
                            type="tel"

                            placeholder="+91 9876543210"

                            value={value.phone || ""}

                            disabled={disabled}

                            onChange={(e) =>
                                update(
                                    "phone",
                                    e.target.value
                                )
                            }

                            className={input}
                        />

                    </div>

                    {/* WHATSAPP */}
                    <div className="space-y-1.5">

                        <label className={label}>
                            WhatsApp Number
                        </label>

                        <input
                            type="tel"

                            placeholder="+91 9876543210"

                            value={value.whatsapp || ""}

                            disabled={disabled}

                            onChange={(e) =>
                                update(
                                    "whatsapp",
                                    e.target.value
                                )
                            }

                            className={input}
                        />

                    </div>

                </div>

            </div>

            {/* ADDRESS */}
            <div className="space-y-5">

                <div
                    className="
                        border-b border-slate-100

                        pb-3
                    "
                >

                    <h3 className="text-sm font-semibold text-slate-900">
                        Address Details
                    </h3>

                </div>

                <div className="space-y-5">

                    {/* LINE 1 */}
                    <div className="space-y-1.5">

                        <label className={label}>
                            Address Line 1
                        </label>

                        <input
                            placeholder="House / Flat / Building"

                            value={value.line1 || ""}

                            disabled={disabled}

                            onChange={(e) =>
                                update(
                                    "line1",
                                    e.target.value
                                )
                            }

                            className={input}
                        />

                    </div>

                    {/* LINE 2 */}
                    <div className="space-y-1.5">

                        <label className={label}>
                            Address Line 2
                        </label>

                        <input
                            placeholder="Street / Area (Optional)"

                            value={value.line2 || ""}

                            disabled={disabled}

                            onChange={(e) =>
                                update(
                                    "line2",
                                    e.target.value
                                )
                            }

                            className={input}
                        />

                    </div>

                    {/* CITY / STATE */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div className="space-y-1.5">

                            <label className={label}>
                                City
                            </label>

                            <input
                                placeholder="City"

                                value={value.city || ""}

                                disabled={disabled}

                                onChange={(e) =>
                                    update(
                                        "city",
                                        e.target.value
                                    )
                                }

                                className={input}
                            />

                        </div>

                        <div className="space-y-1.5">

                            <label className={label}>
                                State / Province
                            </label>

                            <input
                                placeholder="State / Province"

                                value={value.state || ""}

                                disabled={disabled}

                                onChange={(e) =>
                                    update(
                                        "state",
                                        e.target.value
                                    )
                                }

                                className={input}
                            />

                        </div>

                    </div>

                    {/* ZIP / COUNTRY */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div className="space-y-1.5">

                            <label className={label}>
                                Postal Code
                            </label>

                            <input
                                placeholder="PIN / ZIP"

                                value={value.zip || ""}

                                disabled={disabled}

                                onChange={(e) =>
                                    update(
                                        "zip",
                                        e.target.value
                                    )
                                }

                                className={input}
                            />

                        </div>

                        <div className="space-y-1.5">

                            <label className={label}>
                                Country
                            </label>

                            <input
                                placeholder="Country"

                                value={value.country || ""}

                                disabled={disabled}

                                onChange={(e) =>
                                    update(
                                        "country",
                                        e.target.value
                                    )
                                }

                                className={input}
                            />

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}