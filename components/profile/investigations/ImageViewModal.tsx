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
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="relative max-w-4xl w-full p-4">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-black hover:text-red-500"
        >
          <X size={28} />
        </button>

        {/* Image */}
        <img
          src={image}
          className="w-full max-h-[80vh] object-contain rounded-lg"
        />
      </div>
    </div>
  );
}