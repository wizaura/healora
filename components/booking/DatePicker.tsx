"use client";

import DatePicker from "../common/DatePicker";

type Props = {
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
    availableDates?: string[];
};

export default function DatePickerCard({ date, setDate, availableDates }: Props) {

    const isAllowedDate = (
        currentDate: Date
    ) => {

        const key = [
            currentDate.getFullYear(),

            String(
                currentDate.getMonth() + 1
            ).padStart(2, "0"),

            String(
                currentDate.getDate()
            ).padStart(2, "0"),

        ].join("-");

        return availableDates?.includes(key) ?? false;
    };

    return (
        <section className="rounded-2xl bg-gradient-to-b from-white to-white p-4">
            <div className="mx-auto max-w-lg text-center">

                {/* pill label */}
                <span className="mb-4 inline-block rounded-full border border-gray-200 bg-white px-6 py-2 text-sm font-medium text-gray-600">
                    Date
                </span>

                {/* title */}
                <h2 className="text-2xl font-medium tracking-[-0.02em] text-[#1F2147]">
                    Choose consultation date
                </h2>

                {/* calendar */}
                <DatePicker
                    mode="single"
                    selectedDate={date || null}
                    selectDate={setDate}
                    isAllowedDate={isAllowedDate}
                />

            </div>
        </section>
    );
}
