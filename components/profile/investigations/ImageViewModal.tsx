"use client";

import { X } from "lucide-react";

export default function ImageViewModal({
    image,
    onClose,
}: {
    image: string;
    onClose: () => void;
}) {

    return (

        <div
            onClick={onClose}

            className="
                fixed inset-0 z-[60]

                bg-black/80
                backdrop-blur-sm

                flex items-center justify-center

                p-4
            "
        >

            <div
                onClick={(e) =>
                    e.stopPropagation()
                }

                className="
                    relative

                    w-full max-w-5xl
                "
            >

                {/* CLOSE */}
                <button
                    onClick={onClose}

                    className="
                        absolute top-4 right-4 z-10

                        h-10 w-10

                        rounded-full

                        bg-black/70
                        hover:bg-white

                        flex items-center justify-center

                        text-white
                        hover:text-red-600

                        transition
                    "
                >

                    <X size={20} />

                </button>

                {/* IMAGE */}
                <img
                    src={image}

                    className="
                        w-full

                        max-h-[85vh]

                        object-contain

                        rounded-xl

                        shadow-2xl
                    "
                />

            </div>

        </div>
    );
}