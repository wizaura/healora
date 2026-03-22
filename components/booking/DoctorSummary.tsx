"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronUp, BadgeCheck } from "lucide-react";
import api from "@/lib/api";
import Link from "next/link";

export default function DoctorSummary({ doctorId }: { doctorId: string }) {
  const [expanded, setExpanded] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["doctor", doctorId],
    queryFn: () =>
      api.get(`/doctor/${doctorId}`).then((res) => res.data),
  });

  if (isLoading || !data) {
    return (
      <section className="relative m-4 rounded-3xl bg-white/60 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="h-40 animate-pulse rounded-3xl bg-white/70" />
        </div>
      </section>
    );
  }

  return (
    <section className="relative m-4 rounded-3xl bg-gradient-to-b from-white to-wellness-bg pt-20 pb-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-start gap-16 md:grid-cols-2">

          {/* LEFT */}
          <div className="space-y-3 text-center md:text-left">

            <span className="inline-block rounded-full border border-navy/10 bg-white px-5 py-1.5 text-xs font-medium text-navy/70">
              Doctor Profile
            </span>

            {/* NAME */}
            <h1 className="text-3xl md:text-5xl font-semibold text-navy">
              {data.name}
            </h1>

            {data.isApproved && (
              <div className="inline-flex items-center gap-2 text-sm text-emerald-700">
                <BadgeCheck size={16} />
                Verified Doctor
              </div>
            )}

            {/* Qualification + Experience */}
            <div className="text-md text-navy/90 space-y-1">
              <p>
                <span className="font-medium text-lg text-navy">
                  Qualification:
                </span>{" "}
                {data.qualification}
              </p>

              <p>
                <span className="font-medium text-lg text-navy">
                  Experience:
                </span>{" "}
                {data.experience} Years • {data.registrationCouncil}
              </p>
            </div>

            {/* SPECIALITIES */}
            {data.specialities?.length > 0 && (
              <div>
                <p className="text-xs font-medium text-navy/60 mb-2">
                  Specialities
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  {data.specialities.map((s: any) => (
                    <Link
                      key={s.id}
                      href={`/specialities/${s.slug}`}
                      className="rounded-full bg-navy px-4 py-1 text-sm text-white hover:bg-wellness-accent"
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* SUB SPECIALITIES */}
            {data.subSpecialities?.length > 0 && (
              <div>
                <p className="text-xs font-medium text-navy/60 mb-2">
                  Key Expertise
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  {data.subSpecialities.slice(0, 2).map((item: any) => {
                    const specialitySlug = data.specialities?.[0]?.slug;

                    return (
                      <Link
                        key={item.id}
                        href={`/specialities/${specialitySlug}/${item.slug}`}
                        className="rounded-full bg-navy/10 px-3 py-1 text-xs text-navy hover:bg-wellness-accent hover:text-white"
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* LANGUAGES */}
            {data.languages?.length > 0 && (
              <div className="text-sm text-navy/70">
                <span className="font-medium text-lg text-navy">
                  Languages:
                </span>{" "}
                {data.languages.map((l: any) => l.name).join(", ")}
              </div>
            )}

            {/* PRICE */}
            <div className="inline-flex items-center gap-3 rounded-xl border border-navy/10 bg-navy/5 px-5 py-3 shadow-sm">
              <span className="text-lg font-semibold text-navy">
                {data.currencySymbol}{data.consultationFee}
              </span>
              <span className="text-sm text-navy/80">
                per consultation
              </span>
            </div>

            {/* BIO */}
            {data.bio && (
              <div className="pt-2">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="flex items-center gap-2 text-md font-medium text-navy"
                >
                  {expanded ? "Hide bio" : "Read full bio"}
                  {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {expanded && (
                  <div className="mt-4 space-y-4">
                    <p className="whitespace-pre-wrap text-navy/90 text-md leading-relaxed">
                      {data.bio}
                    </p>

                    {/* MINI SPECIALITIES */}
                    {data.miniSpecialities?.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-navy/60 mb-2">
                          Areas of Expertise
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {data.miniSpecialities.map((m: any) => {
                            const specialitySlug =
                              data.specialities?.[0]?.slug;

                            return (
                              <Link
                                key={m.id}
                                href={`/specialities/${specialitySlug}/${m.subSpecialitySlug}/${m.slug}`}
                                className="rounded-full bg-wellness-accent/20 px-3 py-1 text-xs text-navy hover:bg-wellness-accent hover:text-white"
                              >
                                {m.name}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative mx-auto w-full max-w-sm md:sticky md:top-36 self-start">
            <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl">
              <img
                src={data.imageUrl || "/doctor-placeholder.png"}
                alt={data.name}
                className="h-[460px] w-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}