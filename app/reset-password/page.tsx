import ResetPassword from "@/components/reset-password/Main";
import { Suspense } from "react";

export default function ResetPasswordPage() {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <ResetPassword />
            </Suspense>
        </div>
    )
}