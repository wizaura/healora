"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "@/lib/api";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function DoctorProfile() {
    const [specialityId, setSpecialityId] = useState("");
    const [subIds, setSubIds] = useState<string[]>([]);
    const [experience, setExperience] = useState("");
    const [qualification, setQualification] = useState("");
    const [slotFee, setSlotFee] = useState("");
    const [bio, setBio] = useState("");

    /* ---------------- FETCH DATA ---------------- */

    const { data: specialities = [] } = useQuery({
        queryKey: ["specialities"],
        queryFn: () => api.get("/specialities").then(res => res.data),
    });

    const { data: profile } = useQuery({
        queryKey: ["doctor-profile"],
        queryFn: () => api.get("/doctor/profile").then(res => res.data),
    });

    const inputClass = `
        w-full rounded-xl border border-slate-300
        bg-white px-4 py-2.5 text-sm text-slate-900
        placeholder:text-slate-400
        transition-all
        hover:border-slate-400
        focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20
        focus:outline-none
    `;


    /* ---------------- PREFILL ---------------- */

    useEffect(() => {
        if (!profile) return;

        setSpecialityId(profile.specialityId);
        setSubIds(
            profile.subSpecialities?.map((s: any) => s.subSpecialityId) || []
        );
        setExperience(String(profile.experience || ""));
        setQualification(profile.qualification || "");
        setSlotFee(String(profile.slotFee || ""));
        setBio(profile.bio || "");
    }, [profile]);

    const selectedSpeciality = specialities.find(
        (s: any) => s.id === specialityId
    );

    /* ---------------- SAVE ---------------- */

    const saveMutation = useMutation({
        mutationFn: () =>
            api.post("/doctor/profile", {
                specialityId,
                subSpecialityIds: subIds,
                experience: Number(experience),
                qualification,
                slotFee: Number(slotFee),
                bio,
            }),
        onSuccess: () =>
            toast.success("Profile saved. Pending admin approval."),
        onError: () =>
            toast.error("Failed to save profile"),
    });

    const handleSave = () => {
        if (!specialityId || !experience || !qualification || !slotFee) {
            toast.error("Please fill all required fields");
            return;
        }

        saveMutation.mutate();
    };

    /* ---------------- UI ---------------- */

    return (
        <div className="mx-auto max-w-4xl px-6 pt-24 pb-16">
            <div className="mb-6">
                {/* Back */}
                <Link
                    href="/doctor"
                    className="
            inline-flex items-center gap-2
            text-sm font-medium text-slate-600
            hover:text-slate-900 transition
        "
                >
                    <ArrowLeft size={16} />
                    Back to Dashboard
                </Link>

                {/* Title */}
                <h1 className="mt-4 text-3xl font-semibold text-slate-900">
                    Doctor Profile
                </h1>

                <p className="mt-2 text-slate-600">
                    This information will be visible to patients once approved.
                </p>
            </div>

            {!profile?.isApproved && (
                <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
                    <p className="text-sm text-amber-800">
                        Your profile is under admin review. You’ll be visible to patients once approved.
                    </p>
                </div>
            )}

            {/* Body */}
            <div className="space-y-8 bg-white shadow-xl rounded-3xl px-6 py-6">

                {/* Speciality */}
                <div className="rounded-2xl bg-white shadow-sm border border-gray-300 p-6 mb-4">
                    <h2 className="text-lg font-semibold mb-4 text-slate-800">
                        Medical Speciality
                    </h2>

                    <label className="block text-sm font-medium mb-2">
                        Primary Speciality *
                    </label>

                    <select
                        value={specialityId}
                        onChange={(e) => {
                            setSpecialityId(e.target.value);
                            setSubIds([]);
                        }}
                        className={inputClass}
                    >
                        <option value="">Select speciality</option>
                        {specialities.map((s: any) => (
                            <option key={s.id} value={s.id}>
                                {s.name}
                            </option>
                        ))}
                    </select>

                    {selectedSpeciality?.subSpecialities?.length > 0 && (
                        <div className="mt-6">
                            <label className="block text-sm font-medium mb-3">
                                Sub-specialities
                            </label>

                            <div className="flex flex-wrap gap-2">
                                {selectedSpeciality.subSpecialities.map((sub: any) => {
                                    const active = subIds.includes(sub.id);

                                    return (
                                        <button
                                            key={sub.id}
                                            type="button"
                                            onClick={() =>
                                                setSubIds(prev =>
                                                    active
                                                        ? prev.filter(id => id !== sub.id)
                                                        : [...prev, sub.id]
                                                )
                                            }
                                            className={`
                                rounded-full px-4 py-1.5 text-xs font-medium
                                transition
                                ${active
                                                    ? "bg-teal-600 text-white shadow"
                                                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                                }
                            `}
                                        >
                                            {sub.name}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* Professional Info */}
                <div className="rounded-2xl bg-white shadow-sm border border-gray-300 p-6 mb-4">
                    <h2 className="text-lg font-semibold mb-6 text-slate-800">
                        Professional Details
                    </h2>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Experience (years) *
                            </label>
                            <input
                                type="number"
                                min="0"
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Consultation Fee (₹) *
                            </label>
                            <input
                                type="number"
                                min="0"
                                value={slotFee}
                                onChange={(e) => setSlotFee(e.target.value)}
                                className={inputClass}
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <label className="block text-sm font-medium mb-2">
                            Qualification *
                        </label>
                        <input
                            value={qualification}
                            onChange={(e) => setQualification(e.target.value)}
                            className={inputClass}
                            placeholder="MBBS, MD, DM..."
                        />
                    </div>
                </div>

                {/* Bio */}
                <div className="rounded-2xl bg-white shadow-sm border border-gray-300 p-6 mb-4">
                    <h2 className="text-lg font-semibold mb-4 text-slate-800">
                        About You
                    </h2>

                    <textarea
                        rows={4}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className={`${inputClass} resize-none`}
                        placeholder="Brief introduction for patients..."
                    />
                </div>

                {/* Footer */}
                <div className="flex justify-end">
                    <button
                        onClick={handleSave}
                        disabled={saveMutation.isPending}
                        className="
            rounded-xl bg-teal-600 px-8 py-3
            text-sm font-semibold text-white
            transition
            hover:bg-teal-700 hover:shadow-md
            active:scale-[0.98]
            disabled:opacity-60
        "
                    >
                        {saveMutation.isPending ? "Saving..." : "Save Profile"}
                    </button>
                </div>
            </div>

        </div>
    );
}
