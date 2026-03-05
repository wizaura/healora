"use client";

import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";

type SingleProps = {
    mode: "single";
    selectedDate: Date | null;
    selectDate: (date: Date) => void;
    isAllowedDate?: (date: Date) => boolean;
};

type RangeProps = {
    mode: "range";
    selectedRange: DateRange | undefined;
    selectRange: (range: DateRange | undefined) => void;
    isAllowedDate?: (date: Date) => boolean;
};

type DatePickerProps = SingleProps | RangeProps;

export default function DatePicker(props: DatePickerProps) {
    const isAllowedDate = props.isAllowedDate ?? (() => true);

    const commonProps = {
        disabled: [
            { before: new Date() },
            (date: Date) => !isAllowedDate(date),
        ],
        modifiers: {
            active: (date: Date) => isAllowedDate(date),
        },
        modifiersClassNames: {
            selected: "bg-navy-dark text-white font-bold",
            range_middle: "bg-navy/20 text-navy",
            range_start: "bg-navy text-white",
            range_end: "bg-navy text-white",
            active: "text-navy font-semibold",
            today: "text-teal-400 bg-teal-50 font-bold",
        },
        styles: {
            caption: {
                fontSize: "1.5rem",
                fontWeight: 600,
                marginBottom: "1.5rem",
                textAlign: "center" as const,
            },
            day: {
                width: "6rem",
                height: "4rem",
                borderRadius: "1.5rem",
            },
            table: {
                width: "100%",
                margin: "0 auto",
            },
            cell: {
                padding: "0.75rem",
            },
            nav_button: {
                color: "#38D6C4",
            },
        },
    };

    return (
        <section className="rounded-3xl bg-gradient-to-b from-white to-white">
            <div className="mx-auto max-w-lg text-center">
                <div className="mt-2 flex justify-center text-navy">

                    {/* SINGLE MODE */}
                    {props.mode === "single" && (
                        <DayPicker
                            mode="single"
                            selected={props.selectedDate ?? undefined}
                            onSelect={(date) => {
                                if (!date) return;
                                props.selectDate(date);
                            }}
                            {...commonProps}
                        />
                    )}

                    {/* RANGE MODE */}
                    {props.mode === "range" && (
                        <DayPicker
                            mode="range"
                            selected={props.selectedRange}
                            onSelect={(range) => {
                                props.selectRange(range);
                            }}
                            {...commonProps}
                        />
                    )}

                </div>
            </div>
        </section>
    );
}
