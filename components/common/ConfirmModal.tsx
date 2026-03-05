"use client";

type Props = {
    open: boolean;
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    loading?: boolean;
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
    onConfirm,
    onCancel,
}: Props) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 space-y-6">

                <div>
                    <h3 className="text-lg font-semibold text-[#0B2E28]">
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
                        className="px-5 py-2 rounded-xl bg-[#38D6C4] text-white text-sm font-medium hover:opacity-90 transition disabled:opacity-50"
                    >
                        {loading ? "Please wait..." : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
