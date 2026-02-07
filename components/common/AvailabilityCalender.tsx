"use client";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

type Props = {
    availableDates: string[]; // YYYY-MM-DD
    selectedDate: string | null;
    onSelectDate: (date: string) => void;
};

export default function AvailabilityCalendar({
    availableDates,
    selectedDate,
    onSelectDate,
}: Props) {
    const toKey = (d: Date) =>
        [
            d.getFullYear(),
            String(d.getMonth() + 1).padStart(2, "0"),
            String(d.getDate()).padStart(2, "0"),
        ].join("-");

    return (
        <DayPicker
            mode="single"
            selected={
                selectedDate ? new Date(`${selectedDate}T00:00:00`) : undefined
            }
            onDayClick={(day) => {
                const key = toKey(day);
                onSelectDate(key);
            }}
            modifiers={{
                available: availableDates.map(
                    (d) => new Date(`${d}T00:00:00`)
                ),
            }}
            modifiersClassNames={{
                available:
                    "bg-navy/10 text-navy font-semibold hover:bg-navy/20",
                selected:
                    "bg-navy text-white font-bold",
                today:
                    "ring-2 ring-wellness-accent",
            }}
            styles={{
                table: { width: "100%" },
                day: {
                    width: "6rem",
                    height: "6rem",
                    borderRadius: "1.5rem",
                },
                caption: {
                    fontSize: "1.75rem",
                    fontWeight: 600,
                    marginBottom: "1.5rem",
                },
            }}
        />
    );
}
