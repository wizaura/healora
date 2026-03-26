"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import MedikitViewModal from "./MedikitViewModal";

const LIMIT = 6;

export default function MedikitsPage() {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = useState<any>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["public-medikits"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      api
        .get(`/medikits?page=${pageParam}&limit=${LIMIT}`)
        .then((res) => res.data),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < LIMIT) return undefined;
      return pages.length + 1;
    },
  });

  const medikits = data?.pages.flat() ?? [];

  // Infinite scroll
  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage]);

  if (isLoading) {
    return <div className="text-center py-24">Loading medikits...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 space-y-16">

      {/* HEADER */}
      <div className="mb-20 mt-4 text-center">
        <span className="inline-block mb-6 rounded-full border border-navy/10 bg-white/80 px-8 py-2 text-sm font-medium text-navy/70 backdrop-blur">
          Healora Medikits
        </span>

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

      {/* LOAD MORE */}
      <div
        ref={loadMoreRef}
        className="flex justify-center py-10 text-slate-500"
      >
        {isFetchingNextPage
          ? "Loading more medikits..."
          : hasNextPage
          ? "Scroll to load more"
          : "No more medikits"}
      </div>

      {/* MODAL */}
      {selected && (
        <MedikitViewModal
          data={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}