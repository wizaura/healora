"use client";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

type DatePickerProps = {
    selectedDate: Date | null;
    selectDate: (date: Date) => void;
    isAllowedDate?: (date: Date) => boolean;
};

export default function DatePicker({
    selectedDate,
    selectDate,
    isAllowedDate = () => true,
}: DatePickerProps) {
    return (
        <section className="rounded-3xl bg-gradient-to-b from-white to-white">
            <div className="mx-auto max-w-lg text-center">

                {/* Calendar */}
                <div className="mt-8 flex justify-center text-navy">
                    <DayPicker
                        mode="single"
                        selected={selectedDate ?? undefined}
                        onSelect={(date) => {
                            if (!date) return;
                            selectDate(date);
                        }}

                        disabled={[
                            { before: new Date() },
                            (date) => !isAllowedDate(date),
                        ]}
                        modifiers={{
                            active: (date) => isAllowedDate(date),
                        }}
                        modifiersClassNames={{
                            selected:
                                "bg-navy-dark text-wellness-accent font-bold",
                            active:
                                "text-navy font-semibold",
                            today:
                                "text-wellness-accent bg-wellness-bg font-bold",
                        }}
                        styles={{
                            caption: {
                                fontSize: "1.5rem",
                                fontWeight: 600,
                                marginBottom: "1.5rem",
                                textAlign: "center",
                            },
                            nav_button: {
                                color: "#38D6C4",
                            },
                            head_cell: {
                                fontSize: "0.9rem",
                                fontWeight: 500,
                                color: "#9CA3AF",
                                paddingBottom: "0.75rem",
                            },
                            table: {
                                width: "100%",
                                margin: "0 auto",
                            },
                            cell: {
                                padding: "0.75rem",
                            },
                            day: {
                                width: "4.75rem",
                                height: "4.75rem",
                                fontSize: "1.25rem",
                                borderRadius: "1rem",
                                margin: "0 auto",
                            },
                        }}
                    />
                </div>
            </div>
        </section>
    );
}
