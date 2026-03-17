"use client";

type Variant = "default" | "danger" | "success";

type Props = {
    open: boolean;
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    loading?: boolean;
    variant?: Variant; // ✅ NEW
    onConfirm: () => void;
    onCancel: () => void;
};

export default function ConfirmModal({
    open,
    title = "Are you sure?",
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    loading = false,
    variant = "default",
    onConfirm,
    onCancel,
}: Props) {

    if (!open) return null;

    /* ---------------- VARIANT STYLES ---------------- */

    const variantStyles = {
        default: {
            button: "bg-[#38D6C4] hover:opacity-90",
            title: "text-[#0B2E28]",
        },
        danger: {
            button: "bg-red-500 hover:bg-red-600",
            title: "text-red-600",
        },
        success: {
            button: "bg-green-600 hover:bg-green-700",
            title: "text-green-600",
        },
    };

    const styles = variantStyles[variant];

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm">

            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 space-y-6">

                <div>
                    <h3 className={`text-lg font-semibold ${styles.title}`}>
                        {title}
                    </h3>

                    <p className="text-sm text-[#5F7C76] mt-2">
                        {message}
                    </p>
                </div>

                <div className="flex justify-end gap-3">

                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-xl border border-[#CDE7E2] text-[#0B2E28] text-sm"
                        disabled={loading}
                    >
                        {cancelText}
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className={`px-5 py-2 rounded-xl text-white text-sm font-medium transition disabled:opacity-50 ${styles.button}`}
                    >
                        {loading ? "Please wait..." : confirmText}
                    </button>

                </div>

            </div>

        </div>
    );
}