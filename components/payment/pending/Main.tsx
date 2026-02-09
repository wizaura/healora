"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import api from "@/lib/api";

export default function PaymentPending() {
    const params = useSearchParams();
    const router = useRouter();
    const appointmentId = params.get("appointmentId");

    const [status, setStatus] = useState<
        "PENDING" | "SUCCESS" | "FAILED"
    >("PENDING");

    useEffect(() => {
        if (!appointmentId) return;

        const interval = setInterval(async () => {
            try {
                const res = await api.get(
                    `/appointments/${appointmentId}/status`,
                );

                const bookingStatus = res.data.status;

                if (bookingStatus === "CONFIRMED") {
                    setStatus("SUCCESS");
                    clearInterval(interval);

                    setTimeout(() => {
                        router.replace(`/booking/success/${appointmentId}`);
                    }, 1500);
                }

                if (bookingStatus === "CANCELLED") {
                    setStatus("FAILED");
                    clearInterval(interval);
                }
            } catch (err) {
                console.error("Polling failed", err);
            }
        }, 3000); // poll every 3s

        return () => clearInterval(interval);
    }, [appointmentId, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-wellness-bg px-4">
            <div className="max-w-md w-full rounded-3xl bg-white p-8 text-center shadow-sm">

                {status === "PENDING" && (
                    <>
                        <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-teal-200 border-t-teal-600" />

                        <h1 className="text-xl font-semibold text-navy">
                            Confirming your payment
                        </h1>

                        <p className="mt-2 text-sm text-navy/60">
                            Please don’t close this page.
                            We’re securely confirming your slot.
                        </p>
                    </>
                )}

                {status === "SUCCESS" && (
                    <>
                        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                            ✓
                        </div>

                        <h1 className="text-xl font-semibold text-navy">
                            Slot confirmed!
                        </h1>

                        <p className="mt-2 text-sm text-navy/60">
                            Redirecting you to booking details…
                        </p>
                    </>
                )}

                {status === "FAILED" && (
                    <>
                        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                            ✕
                        </div>

                        <h1 className="text-xl font-semibold text-navy">
                            Payment failed
                        </h1>

                        <p className="mt-2 text-sm text-navy/60">
                            The slot has been released.
                            Please try booking again.
                        </p>

                        <button
                            onClick={() => router.replace("/")}
                            className="mt-6 w-full rounded-xl bg-navy py-3 text-white font-medium"
                        >
                            Go back
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
