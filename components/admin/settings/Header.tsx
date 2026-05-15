"use client";

import Link from "next/link";

import {
    useEffect,
    useState,
} from "react";

const tabs = [
    {
        name: "Fees",
        href: "#fees",
        hash: "fees",
    },
    {
        name: "Contents",
        href: "#content",
        hash: "content",
    },
    {
        name: "Greeting Banner",
        href: "#greetings",
        hash: "greetings",
    },
    {
        name: "FAQs",
        href: "/admin/settings/faqs",
        hash: "faqs",
    },
];

export default function SettingsHeader() {

    const [active,
        setActive] =
        useState("fees");

    useEffect(() => {

        const updateHash = () => {

            const hash =
                window.location.hash.replace(
                    "#",
                    ""
                );

            if (hash) {
                setActive(hash);
            }
        };

        updateHash();

        window.addEventListener(
            "hashchange",
            updateHash
        );

        return () =>
            window.removeEventListener(
                "hashchange",
                updateHash
            );

    }, []);

    return (

        <div
            className="
                sticky top-16 z-40

                mb-6

                border-b border-gray-200

                bg-white/90

                backdrop-blur-md
            "
        >

            <div className="relative">

                {/* TABS */}

                <div
                    className="
                        flex gap-6

                        overflow-x-auto

                        px-1
                    "
                >

                    {tabs.map((tab) => {

                        const isActive =
                            active ===
                            tab.hash;

                        return (

                            <Link
                                key={tab.name}

                                href={tab.href}

                                onClick={() =>
                                    setActive(
                                        tab.hash
                                    )
                                }

                                className={`
                                    relative

                                    whitespace-nowrap

                                    pb-4 pt-4

                                    text-sm font-medium

                                    transition

                                    ${isActive
                                        ? `
                                            text-teal-600
                                        `
                                        : `
                                            text-gray-500

                                            hover:text-gray-700
                                        `
                                    }
                                `}
                            >

                                {tab.name}

                            </Link>
                        );
                    })}

                </div>

                {/* ACTIVE BAR */}

                <div
                    className="
                        absolute bottom-0

                        h-[2px]

                        rounded-full

                        bg-teal-600

                        transition-all duration-300
                    "
                    style={{
                        width: `${100 / tabs.length}%`,
                        left: `${
                            (100 / tabs.length) *
                            tabs.findIndex(
                                (t) =>
                                    t.hash ===
                                    active
                            )
                        }%`,
                    }}
                />

            </div>

        </div>
    );
}