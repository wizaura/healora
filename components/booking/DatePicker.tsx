export default function DatePicker({ date, setDate }: any) {
    return (
        <section className="rounded-3xl bg-gradient-to-b from-white to-white p-8">
            <div className="mx-auto max-w-lg text-center">
                {/* pill label */}
                <span className="inline-block mb-4 rounded-full border border-gray-200 bg-white px-6 py-2 text-sm font-medium text-gray-600">
                    Date
                </span>

                {/* title */}
                <h2 className="text-2xl font-medium tracking-[-0.02em] text-[#1F2147]">
                    Choose consultation date
                </h2>

                {/* input */}
                <div className="mt-6">
                    <input
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full rounded-2xl border bg-white px-5 py-3 text-sm shadow-sm outline-none transition focus:border-black"
                    />
                </div>
            </div>
        </section>
    );
}
