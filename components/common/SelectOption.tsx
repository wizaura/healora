"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

type Option = {
    label: string;
    value: string;
};

type Props = {
    value: string;
    onChange: (value: string) => void;
    options: Option[];
    placeholder?: string;
    className?: string;
};

export default function SelectOption({
    value,
    onChange,
    options,
    placeholder = "Select option",
    className,
}: Props) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selected = options.find(o => o.value === value);

    /* ---------- CLOSE ON OUTSIDE CLICK ---------- */
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
       <div ref={containerRef} className={`relative ${className || "w-40"}`}>
            {/* Trigger */}
            <button
                type="button"
                onClick={() => setOpen(prev => !prev)}
                className={`
                    w-full flex justify-between items-center
                    bg-white border rounded-xl px-4 py-2 text-sm
                    text-[#0B2E28]
                    transition
                    ${open
                        ? "border-[#38D6C4] ring-2 ring-[#E6F7F4]"
                        : "border-[#CDE7E2] hover:border-[#38D6C4]"
                    }
                `}
            >
                <span className={!selected ? "text-[#7FA6A0]" : ""}>
                    {selected?.label || placeholder}
                </span>

                <ChevronDown
                    size={16}
                    className={`text-[#5F7C76] transition-transform ${open ? "rotate-180" : ""
                        }`}
                />
            </button>

            {/* Dropdown */}
            {open && (
                <div
                    className="
                        absolute z-50 mt-2 w-full
                        bg-white border border-[#E2F0ED]
                        rounded-xl shadow-lg
                        overflow-hidden
                        animate-in fade-in zoom-in-95
                    "
                >
                    {options.map(option => {
                        const isSelected = option.value === value;

                        return (
                            <div
                                key={option.value}
                                onClick={() => {
                                    onChange(option.value);
                                    setOpen(false);
                                }}
                                className={`
                                    px-4 py-2 text-sm cursor-pointer transition
                                    ${isSelected
                                        ? "bg-[#E6F7F4] text-[#1F9E8E] font-medium"
                                        : "text-[#0B2E28] hover:bg-[#F4FBF9]"
                                    }
                                `}
                            >
                                {option.label}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
