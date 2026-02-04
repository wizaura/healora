"use client";

import { X, BadgeCheck } from "lucide-react";

export default function DoctorViewModal({
    open,
    onClose,
    doctor,
}: {
    open: boolean;
    onClose: () => void;
    doctor: any;
}) {
    if (!open || !doctor) return null;


    const profile = doctor.doctor;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
            <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-300 px-6 py-4">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                            Doctor Details
                        </h2>
                        <p className="text-sm text-slate-500">
                            Professional profile overview
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Scrollable Body */}
                <div className="max-h-[70vh] overflow-y-auto px-6 py-6 space-y-6">

                    {/* Status */}
                    <div className="flex items-center gap-2">
                        {profile?.isApproved ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                <BadgeCheck size={14} />
                                Approved
                            </span>
                        ) : (
                            <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                                Pending Approval
                            </span>
                        )}
                    </div>

                    {/* Basic Info */}
                    <Section title="Basic Information">
                        <div className="grid gap-4 md:grid-cols-2">
                            <Info label="Name" value={doctor.name} />
                            <Info label="Email" value={doctor.email} />
                            <Info
                                label="Experience"
                                value={profile ? `${profile.experience} years` : "—"}
                            />
                            <Info
                                label="Consultation Fee"
                                value={profile ? `₹${profile.slotFee}` : "—"}
                            />
                        </div>
                    </Section>

                    {/* Qualification */}
                    <Section title="Qualification">
                        <Info
                            label="Qualification"
                            value={profile?.qualification || "—"}
                            full
                        />
                    </Section>

                    {/* Speciality */}
                    <Section title="Speciality">
                        {profile?.speciality ? (
                            <span className="inline-flex rounded-full bg-teal-100 px-4 py-1.5 text-sm font-medium text-teal-700">
                                {profile.speciality.name}
                            </span>
                        ) : (
                            <EmptyText />
                        )}
                    </Section>

                    {/* Sub-specialities */}
                    <Section title="Sub-specialities">
                        {profile?.subSpecialities?.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {profile.subSpecialities.map((s: any) => (
                                    <span
                                        key={s.subSpeciality.id}
                                        className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs text-slate-600"
                                    >
                                        {s.subSpeciality.name}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <EmptyText />
                        )}
                    </Section>

                    {/* Bio */}
                    <Section title="Bio">
                        {profile?.bio ? (
                            <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700 leading-relaxed">
                                {profile.bio}
                            </p>
                        ) : (
                            <EmptyText />
                        )}
                    </Section>
                </div>

                {/* Footer */}
                <div className="cursor-pointer flex justify-end border-t border-gray-300 px-6 py-4">
                    <button
                        onClick={onClose}
                        className="rounded-lg px-4 py-2 text-sm text-slate-600 hover:bg-slate-100"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ---------------- Reusable Pieces ---------------- */

function Section({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <p className="mb-3 text-sm font-medium text-slate-600">
                {title}
            </p>
            {children}
        </div>
    );
}

function Info({
    label,
    value,
    full,
}: {
    label: string;
    value: string;
    full?: boolean;
}) {
    return (
        <div className={full ? "md:col-span-2" : ""}>
            <p className="text-xs font-medium text-slate-500 mb-1">
                {label}
            </p>
            <div className="rounded-lg border border-gray-300    bg-white px-3 py-2 text-sm text-slate-900">
                {value}
            </div>
        </div>
    );
}

function EmptyText() {
    return (
        <p className="text-sm text-slate-400 italic">
            Not provided
        </p>
    );
}
