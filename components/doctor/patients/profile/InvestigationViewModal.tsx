"use client";

import { X } from "lucide-react";
import { useState } from "react";
import ImageViewModal from "./ImageViewModal";

export default function InvestigationViewModal({
  investigation,
  onClose,
}: any) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-white w-[700px] max-h-[90vh] overflow-y-auto rounded-xl p-6 relative space-y-4">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
        >
          <X />
        </button>

        {/* Header */}
        <div>
          <h3 className="text-lg font-semibold">
            Investigation Details
          </h3>
          <p className="text-xs text-gray-400">
            {new Date(investigation.createdAt).toLocaleString()}
          </p>
        </div>

        {/* Role */}
        <div className="text-sm text-gray-500">
          Added by:{" "}
          <span className="font-medium text-gray-700">
            {investigation.createdByRole}
          </span>
        </div>

        {/* Note */}
        {investigation.note && (
          <div className="bg-gray-50 whitespace-pre-wrap border border-gray-300 rounded-lg p-3 text-sm text-gray-700">
            {investigation.note}
          </div>
        )}

        {/* Images */}
        {investigation.images?.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">
              Images
            </p>

            <div className="flex gap-3 flex-wrap">
              {investigation.images.map((img: any) => (
                <img
                  key={img.id}
                  src={img.imageUrl}
                  onClick={() => setSelectedImage(img.imageUrl)}
                  className="w-24 h-24 object-cover rounded-lg border border-gray-200 cursor-pointer hover:scale-105 transition"
                />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Image zoom modal */}
      {selectedImage && (
        <ImageViewModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}