"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Pencil } from "lucide-react";

/* ---------------- TYPES ---------------- */

type Speciality = {
    id: string;
    name: string;
    subSpecialities?: {
        id: string;
        name: string;
    }[];
};

type Language = {
    id: string;
    name: string;
};

type Mini = {
    id: string;
    name: string;
};

export default function DoctorProfile() {

    /* ---------------- STATES ---------------- */

    const [isEditing, setIsEditing] = useState(false);
    const [originalProfile, setOriginalProfile] = useState<any>(null);

    const [primarySpeciality, setPrimarySpeciality] = useState("");
    const [secondarySpecialities, setSecondarySpecialities] = useState<string[]>([]);
    const [subIds, setSubIds] = useState<string[]>([]);
    const [miniIds, setMiniIds] = useState<string[]>([]);
    const [languageIds, setLanguageIds] = useState<string[]>([]);

    const [experience, setExperience] = useState("");
    const [qualification, setQualification] = useState("");
    const [consultationFee, setConsultationFee] = useState("");
    const [bio, setBio] = useState("");

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    /* ---------------- FETCH ---------------- */

    const { data: specialities = [] } = useQuery<Speciality[]>({
        queryKey: ["specialities"],
        queryFn: () => api.get("/specialities").then(res => res.data),
    });

    const { data: profile } = useQuery({
        queryKey: ["doctor-profile"],
        queryFn: () => api.get("/doctor/profile").then(res => res.data),
    });

    const { data: languageOptions = [] } = useQuery<Language[]>({
        queryKey: ["languages"],
        queryFn: () => api.get("/settings/languages").then(res => res.data),
    });

    /* ---------------- PREFILL ---------------- */

    useEffect(() => {

        if (!profile) return;

        setOriginalProfile(profile);

        setPrimarySpeciality(profile.primarySpecialityId || "");
        setSecondarySpecialities(profile.secondarySpecialityIds || []);
        setSubIds(profile.subSpecialityIds || []);
        setMiniIds(profile.miniSpecialityIds || []);
        setLanguageIds(profile.languageIds || []);

        setExperience(String(profile.experience || ""));
        setQualification(profile.qualification || "");
        setConsultationFee(String(profile.consultationFee || ""));
        setBio(profile.bio || "");

        setImagePreview(profile.user?.imageUrl || null);

    }, [profile]);

    /* ---------------- DERIVED ---------------- */

    const selectedSpecialities = useMemo(() => {
        return specialities.filter(
            s =>
                s.id === primarySpeciality ||
                secondarySpecialities.includes(s.id)
        );
    }, [specialities, primarySpeciality, secondarySpecialities]);

    const allSubSpecialities = useMemo(() => {
        return selectedSpecialities.flatMap(s => s.subSpecialities || []);
    }, [selectedSpecialities]);

    const { data: minis = [] } = useQuery<Mini[]>({
        queryKey: ["mini-options", subIds],
        enabled: subIds.length > 0,
        queryFn: async () => {
            const results = await Promise.all(
                subIds.map(id =>
                    api.get(`/sub-specialities/id/${id}/mini-specialities`)
                )
            );
            return results.flatMap(r => r.data);
        },
    });

    /* ---------------- SAVE ---------------- */

    const saveMutation = useMutation({

        mutationFn: async () => {

            const formData = new FormData();

            formData.append(
                "specialityIds",
                JSON.stringify([primarySpeciality, ...secondarySpecialities])
            );

            formData.append("subSpecialityIds", JSON.stringify(subIds));
            formData.append("miniSpecialityIds", JSON.stringify(miniIds));
            formData.append("languageIds", JSON.stringify(languageIds));

            formData.append("experience", experience);
            formData.append("qualification", qualification);
            formData.append("consultationFee", consultationFee);
            formData.append("bio", bio);

            if (imageFile) {
                formData.append("image", imageFile);
            }

            return api.post("/doctor/profile", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

        },

        onSuccess: () => {
            toast.success("Profile saved. Pending admin approval.");
            setIsEditing(false);
        },

        onError: () => toast.error("Failed to save profile"),
    });

    const handleCancel = () => {

        if (!originalProfile) return;

        setPrimarySpeciality(originalProfile.primarySpecialityId || "");
        setSecondarySpecialities(originalProfile.secondarySpecialityIds || []);
        setSubIds(originalProfile.subSpecialityIds || []);
        setMiniIds(originalProfile.miniSpecialityIds || []);
        setLanguageIds(originalProfile.languageIds || []);

        setExperience(String(originalProfile.experience || ""));
        setQualification(originalProfile.qualification || "");
        setConsultationFee(String(originalProfile.consultationFee || ""));
        setBio(originalProfile.bio || "");

        setImagePreview(originalProfile.user?.imageUrl || null);
        setImageFile(null);

        setIsEditing(false);
    };

    const imageSrc = imagePreview || profile?.imageUrl;

    const inputClass = `
    w-full rounded-xl border border-slate-300
    bg-white px-4 py-2.5 text-sm text-slate-900
    focus:border-teal-500
    focus:ring-2 focus:ring-teal-500/20
    focus:outline-none
    disabled:bg-slate-100
  `;

    return (

        <div className="mx-auto max-w-7xl bg-white px-8 rounded-xl py-12 my-20 space-y-10">

            {/* HEADER */}

            <div className="flex items-center justify-between">

                <div>

                    <Link
                        href="/doctor"
                        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"
                    >
                        <ArrowLeft size={16} />
                        Back
                    </Link>

                    <h1 className="mt-2 text-3xl font-semibold text-slate-900">
                        Doctor Profile
                    </h1>

                </div>

            </div>

            {/* PROFILE HEADER */}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-300 pb-6">

                {/* LEFT SIDE */}
                <div className="flex items-center gap-4">

                    {/* AVATAR */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border border-gray-300 flex-shrink-0">

                        {imageSrc ? (
                            <Image
                                src={imageSrc}
                                alt="Doctor"
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="flex items-center justify-center w-full h-full text-xs sm:text-sm text-slate-400">
                                No Image
                            </div>
                        )}

                    </div>

                    {/* NAME + EMAIL */}
                    <div className="min-w-0">

                        <h2 className="text-lg sm:text-xl font-semibold text-slate-900 truncate">
                            {profile?.name || "Doctor"}
                        </h2>

                        <p className="text-xs sm:text-sm text-slate-500 truncate">
                            {profile?.email}
                        </p>

                    </div>

                </div>

                {/* EDIT BUTTON */}
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 self-start sm:self-auto"
                >
                    <Pencil size={16} />
                    {isEditing ? "Editing" : "Edit"}
                </button>

            </div>

            {/* IMAGE + PRIMARY SPECIALITY */}

            <div className="grid md:grid-cols-2 gap-6 items-start">

                {/* IMAGE */}
                {isEditing && (
                    <div className="space-y-1">

                        <label className="text-xs font-medium text-slate-600">
                            Profile Image
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {

                                if (!e.target.files) return;

                                const file = e.target.files[0];
                                setImageFile(file);
                                setImagePreview(URL.createObjectURL(file));
                            }}
                            className={inputClass}
                        />

                    </div>
                )}

                {/* PRIMARY SPECIALITY */}
                <div className="space-y-1">

                    <label className="text-xs font-medium text-slate-600">
                        Primary Speciality
                    </label>

                    <select
                        disabled={!isEditing}
                        value={primarySpeciality}
                        onChange={(e) => setPrimarySpeciality(e.target.value)}
                        className={inputClass}
                    >
                        <option value="">Select speciality</option>

                        {specialities.map((s) => (
                            <option key={s.id} value={s.id}>
                                {s.name}
                            </option>
                        ))}

                    </select>

                </div>

            </div>


            {/* SECONDARY SPECIALITIES */}

            <Section title="Secondary Specialities">

                <PillSelector
                    items={specialities.filter(s => s.id !== primarySpeciality)}
                    selected={secondarySpecialities}
                    onChange={setSecondarySpecialities}
                    disabled={!isEditing}
                />

            </Section>


            {/* SUB SPECIALITIES */}

            {allSubSpecialities.length > 0 && (

                <Section title="Sub-specialities">

                    <PillSelector
                        items={allSubSpecialities}
                        selected={subIds}
                        onChange={setSubIds}
                        disabled={!isEditing}
                    />

                </Section>

            )}

            {minis.length > 0 && (
                <Section title="Mini Specialities">
                    <PillSelector
                        items={minis}
                        selected={miniIds}
                        onChange={setMiniIds}
                        disabled={!isEditing}
                    />
                </Section>
            )}

            {/* LANGUAGES */}

            <Section title="Languages">
                <PillSelector
                    items={languageOptions}
                    selected={languageIds}
                    onChange={setLanguageIds}
                    disabled={!isEditing}
                />
            </Section>

            {/* PROFESSIONAL DETAILS */}

            <Section title="Professional Details">

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">

                    {/* Experience */}
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-600">
                            Experience (years)
                        </label>

                        <input
                            type="number"
                            disabled={!isEditing}
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            className={inputClass}
                        />
                    </div>

                    {/* Qualification */}
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-600">
                            Qualification
                        </label>

                        <input
                            disabled={!isEditing}
                            value={qualification}
                            onChange={(e) => setQualification(e.target.value)}
                            className={inputClass}
                        />
                    </div>

                    {/* Consultation Fee */}
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-600">
                            Consultation Fee
                        </label>

                        <input
                            type="number"
                            disabled={!isEditing}
                            value={consultationFee}
                            onChange={(e) => setConsultationFee(e.target.value)}
                            className={inputClass}
                        />
                    </div>

                </div>

            </Section>


            {/* BIO */}

            <Section title="About You">

                <div className="space-y-1">

                    <label className="text-xs font-medium text-slate-600">
                        Bio / Description
                    </label>

                    <textarea
                        disabled={!isEditing}
                        rows={4}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className={`${inputClass} resize-none`}
                    />

                </div>

            </Section>

            {/* ACTIONS */}

            {isEditing && (

                <div className="flex justify-end gap-3 pt-6 border-t border-gray-300">

                    <button
                        onClick={handleCancel}
                        className="rounded-xl border border-gray-300 hover:bg-gray-100 px-5 py-2.5 text-sm"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => saveMutation.mutate()}
                        disabled={saveMutation.isPending}
                        className="rounded-xl hover:bg-teal-700 bg-teal-600 px-6 py-2.5 text-sm text-white"
                    >
                        {saveMutation.isPending ? "Saving..." : "Save Changes"}
                    </button>

                </div>

            )}

        </div>

    );

}

/* ---------------- SECTION ---------------- */

function Section({ title, children }: any) {

    return (
        <div className="space-y-4">
            <h2 className="text-base font-semibold text-slate-900">
                {title}
            </h2>
            {children}
        </div>
    );

}

/* ---------------- PILL SELECTOR ---------------- */

function PillSelector({ items, selected, onChange, disabled }: any) {

    return (

        <div className="flex flex-wrap gap-2">

            {items.map((item: any) => {

                const active = selected.includes(item.id);

                return (

                    <button
                        key={item.id}
                        type="button"
                        disabled={disabled}
                        onClick={() =>
                            onChange(
                                active
                                    ? selected.filter((id: string) => id !== item.id)
                                    : [...selected, item.id]
                            )
                        }
                        className={`px-3 py-1.5 rounded-lg text-xs border transition
                        
                        ${active
                                ? "bg-teal-600 border-teal-600 text-white"
                                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                            }
                        
                        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
                        `}
                    >
                        {item.name}
                    </button>

                );

            })}

        </div>

    );

}