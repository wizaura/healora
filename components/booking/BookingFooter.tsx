export default function BookingFooter({ slot }: any) {
    if (!slot) return null;

    return (
        <div className="sticky bottom-0 z-20 border-t bg-white px-6 py-4">
            <div className="mx-auto flex max-w-4xl items-center justify-between">
                <div>
                    <p className="text-xs text-gray-500">Selected slot</p>
                    <p className="text-sm font-medium text-gray-900">
                        {new Date(slot.startTime).toLocaleString()}
                    </p>
                </div>

                <button className="rounded-2xl bg-black px-7 py-2.5 text-sm font-medium text-white transition hover:opacity-90">
                    Continue to Payment
                </button>
            </div>
        </div>
    );
}
