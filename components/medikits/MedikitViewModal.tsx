"use client";

import { X } from "lucide-react";

export default function MedikitViewModal({ data, onClose }: any) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-5xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2"
      >
        {/* LEFT IMAGE */}
        <div className="relative h-[300px] md:h-full">
          <img
            src={data.imageUrl}
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 shadow"
          >
            <X size={18} />
          </button>

          {/* Title on image (mobile) */}
          <div className="absolute bottom-4 left-4 right-4 text-white md:hidden">
            <h2 className="text-xl font-semibold">{data.title}</h2>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex flex-col h-full">
          <div className="p-8 space-y-6 overflow-y-auto">

            <div>
              <h2 className="text-2xl font-semibold hidden md:block">
                {data.title}
              </h2>
              <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                {data.description}
              </p>
            </div>

            {/* MEDICINES */}
            <div>
              <h3 className="font-semibold mb-3">Medicines Included</h3>
              <div className="flex flex-wrap gap-2">
                {data.medicines.map((m: string, i: number) => (
                  <span
                    key={i}
                    className="border border-gray-200 bg-gray-50 px-3 py-1 rounded-full text-sm"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* DIRECTIONS */}
            <div>
              <h3 className="font-semibold mb-3">Directions to Use</h3>

              <div className="space-y-3">
                {data.questions.map((q: any) => (
                  <div
                    key={q.id}
                    className="border border-gray-200 rounded-xl p-4"
                  >
                    <p className="font-medium text-sm">{q.question}</p>
                    <p className="text-sm text-gray-600 mt-1">{q.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FOOTER ACTION */}
          <p className="text-center p-6 border-t border-gray-200 text-xs">Ask Doctor to include Medikits (Only for Door to Door Appointments)</p>
        </div>
      </div>
    </div>
  );
}