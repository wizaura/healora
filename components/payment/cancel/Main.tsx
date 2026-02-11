"use client";

import { useRouter } from "next/navigation";

export default function PaymentCancel() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center bg-wellness-bg px-4">
            <div className="max-w-md w-full rounded-3xl bg-white p-8 text-center shadow-sm">

                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600 text-xl">
                    ✕
                </div>

                <h1 className="text-2xl font-semibold text-navy">
                    Payment Cancelled
                </h1>

                <p className="mt-3 text-sm text-navy/60">
                    Your slot was not confirmed.
                    You can try again or choose a different time.
                </p>

                <div className="mt-6 space-y-3">
                    <button
                        onClick={() => router.back()}
                        className="w-full rounded-xl bg-navy py-3 text-white font-medium"
                    >
                        Try Again
                    </button>

                    <button
                        onClick={() => router.push("/")}
                        className="w-full rounded-xl border border-navy text-navy py-3 font-medium"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        </div>
    );
}
