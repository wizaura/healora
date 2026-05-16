"use client";

import { useEffect } from "react";

import { useAuth } from "@/lib/auth-context";
import { getProfile } from "@/lib/profile.api";

import { useQuery } from "@tanstack/react-query";

type Props = {
    value: any;
    onChange: (data: any) => void;
};

export default function AddressForm({
    value,
    onChange,
}: Props) {

    const { user } =
        useAuth();

    const {
        data: profile,
    } = useQuery({

        queryKey: [
            "profile",
            user?.sub,
        ],

        queryFn: () =>
            getProfile(user!.sub),

        enabled:
            !!user?.sub,
    });

    /* =====================================================
       PREFILL
       ===================================================== */

    useEffect(() => {

        if (!profile) return;

        // only prefill if empty
        if (
            value?.name ||
            value?.phone ||
            value?.line1
        ) {
            return;
        }

        onChange({

            name:
                profile?.name || "",

            phone:
                profile?.phone ||
                "",

            line1:
                profile?.address?.line1 ||
                "",

            line2:
                profile?.address?.line2 ||
                "",

            city:
                profile?.address?.city ||
                "",

            state:
                profile?.address?.state ||
                "",

            zip:
                profile?.address?.zip ||
                "",

            country:
                profile?.address?.country ||
                "",
        });

    }, [profile]);

    /* =====================================================
       UPDATE
       ===================================================== */

    const update = (
        field: string,
        val: string
    ) => {

        onChange({
            ...value,
            [field]: val,
        });
    };

    /* =====================================================
       STYLES
       ===================================================== */

    const input =
        `
            w-full

            rounded-lg

            border border-slate-200

            bg-white

            px-4 py-3.5

            text-sm text-slate-700

            shadow-sm

            transition-all duration-200

            focus:outline-none
            focus:ring-4
            focus:ring-teal-500/10
            focus:border-teal-500
        `;

    const label =
        `
            mb-2 block

            text-sm font-medium

            text-slate-700
        `;

    return (

        <div className="space-y-6">

            {/* =====================================================
               BASIC
               ===================================================== */}

            <div
                className="
                    grid grid-cols-1 gap-5

                    md:grid-cols-2
                "
            >

                {/* NAME */}

                <div>

                    <label className={label}>
                        Full Name
                    </label>

                    <input
                        placeholder="Enter full name"

                        value={value.name || ""}

                        onChange={(e) =>
                            update(
                                "name",
                                e.target.value
                            )
                        }

                        className={input}
                    />

                </div>

                {/* PHONE */}

                <div>

                    <label className={label}>
                        Phone Number
                    </label>

                    <input
                        placeholder="Enter phone number"

                        value={value.phone || ""}

                        onChange={(e) =>
                            update(
                                "phone",
                                e.target.value
                            )
                        }

                        className={input}
                    />

                </div>

            </div>

            {/* =====================================================
               ADDRESS
               ===================================================== */}

            <div>

                <label className={label}>
                    Address Line 1
                </label>

                <input
                    placeholder="House number, street, locality"

                    value={value.line1 || ""}

                    onChange={(e) =>
                        update(
                            "line1",
                            e.target.value
                        )
                    }

                    className={input}
                />

            </div>

            <div>

                <label className={label}>
                    Address Line 2
                </label>

                <input
                    placeholder="Apartment, suite, landmark (optional)"

                    value={value.line2 || ""}

                    onChange={(e) =>
                        update(
                            "line2",
                            e.target.value
                        )
                    }

                    className={input}
                />

            </div>

            {/* =====================================================
               CITY STATE
               ===================================================== */}

            <div
                className="
                    grid grid-cols-1 gap-5

                    md:grid-cols-2
                "
            >

                {/* CITY */}

                <div>

                    <label className={label}>
                        City
                    </label>

                    <input
                        placeholder="Enter city"

                        value={value.city || ""}

                        onChange={(e) =>
                            update(
                                "city",
                                e.target.value
                            )
                        }

                        className={input}
                    />

                </div>

                {/* STATE */}

                <div>

                    <label className={label}>
                        State / Province
                    </label>

                    <input
                        placeholder="Enter state"

                        value={value.state || ""}

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

            {/* =====================================================
               ZIP COUNTRY
               ===================================================== */}

            <div
                className="
                    grid grid-cols-1 gap-5

                    md:grid-cols-2
                "
            >

                {/* ZIP */}

                <div>

                    <label className={label}>
                        Postal / ZIP Code
                    </label>

                    <input
                        placeholder="Enter ZIP / postal code"

                        value={value.zip || ""}

                        onChange={(e) =>
                            update(
                                "zip",
                                e.target.value
                            )
                        }

                        className={input}
                    />

                </div>

                {/* COUNTRY */}

                <div>

                    <label className={label}>
                        Country
                    </label>

                    <input
                        placeholder="Enter country"

                        value={value.country || ""}

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
    );
}