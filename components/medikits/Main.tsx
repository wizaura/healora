"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import MedikitViewModal from "./MedikitViewModal";
import Loader from "../common/Loader";

export default function MedikitsPage() {
  const [selected, setSelected] = useState<any>(null);

  const {
    data: medikits = [],
    isLoading,
  } = useQuery({
    queryKey: ["public-medikits"],
    queryFn: () =>
      api
        .get(`/medikits`)
        .then((res) => res.data),
  });

  if (isLoading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="relative m-4 rounded-3xl
            bg-gradient-to-b from-white via-white to-wellness-bg pb-24">
      <div className="max-w-7xl mx-auto px-6 py-24 space-y-16">

        {/* HEADER */}
        <div className="mb-20 mt-4 text-center">

          <h1 className="text-4xl md:text-6xl font-semibold leading-[1.15] tracking-[-0.02em] text-navy">
            Ready-to-use
            <br />
            Treatment Kits
          </h1>

          <p className="mt-6 text-lg text-navy/60 max-w-2xl mx-auto leading-relaxed">
            Carefully curated medicine kits for common health conditions,
            prescribed by Healora doctors for safe and effective treatment.
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {medikits.map((kit: any) => (
            <div
              key={kit.id}
              onClick={() => setSelected(kit)}
              className="group relative border border-slate-200 rounded-2xl overflow-hidden bg-white transition hover:shadow-xl cursor-pointer"
            >
              {/* IMAGE */}
              {kit.imageUrl && (
                <div className="relative overflow-hidden">
                  <img
                    src={kit.imageUrl}
                    className="w-full h-48 object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* HOVER */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                    <span className="flex items-center gap-2 text-white text-sm font-medium">
                      View Medikit
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                </div>
              )}

              {/* CONTENT */}
              <div className="p-5 space-y-3">
                <h3 className="font-semibold text-slate-900 line-clamp-2">
                  {kit.title}
                </h3>

                <p className="text-sm text-slate-500 line-clamp-2">
                  {kit.description}
                </p>

                <div className="text-xs text-teal-600 font-medium">
                  {kit.medicines.length} medicines included
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL */}
        {selected && (
          <MedikitViewModal
            data={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </div>
    </div>
  );
}