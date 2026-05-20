"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "@/lib/api";
import DoctorBasicInfo from "./DoctorBasicInfo";
import DoctorProfessionalInfo from "./DoctorProfessionalInfo";
import { getApiError } from "@/lib/util";

export default function DoctorProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState<any>(null);

    const { data, refetch } = useQuery({
        queryKey: ["doctor-profile"],
        queryFn: () => api.get("/doctor/profile").then(res => res.data),
    });

    useEffect(() => {
        if (data) setProfile(data);
    }, [data]);

    const saveMutation = useMutation({
        mutationFn: async () => {
            const formData = new FormData();

            formData.append("graduation", profile.graduation);
            formData.append("experience", profile.experience);
            formData.append("qualification", profile.qualification);
            formData.append("bio", profile.bio);

            formData.append("consultationFeeINR", profile.consultationFeeINR || "");
            formData.append("consultationFeeUSD", profile.consultationFeeUSD || "");
            formData.append("consultationFeeAED", profile.consultationFeeAED || "");
            formData.append("consultationFeeEUR", profile.consultationFeeEUR || "");
            formData.append("consultationFeeGBP", profile.consultationFeeGBP || "");
            formData.append("consultationFeeCAD", profile.consultationFeeCAD || "");

            formData.append("registrationNumber", profile.registrationNumber || "");
            formData.append("registrationCouncil", profile.registrationCouncil || "");

            formData.append("miniSpecialityIds", JSON.stringify(profile.miniSpecialityIds || []));
            formData.append("languageIds", JSON.stringify(profile.languageIds || []));

            if (profile.imageFile) formData.append("image", profile.imageFile);
            if (profile.sealFile) formData.append("seal", profile.sealFile);
            if (profile.signatureFile) formData.append("signature", profile.signatureFile);


            return api.post("/doctor/profile", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        },
        onSuccess: () => {
            toast.success("Profile pending for admin approval");
            setIsEditing(false);
            refetch();
        },
        onError: (err) => toast.error(getApiError(err)),
    });

    if (!profile) return null;

    return (
        <div className="min-h-screen pt-8 pb-16">
            <div className="max-w-6xl mx-auto space-y-4">

                {/* HEADER */}
                <div className="
                    relative overflow-hidden
                    bg-gradient-to-br from-white via-white to-teal-50/40
                    border border-gray-200
                    rounded-2xl p-6 sm:p-8
                    shadow-sm
                    flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6
                ">

                    {/* LEFT CONTENT */}
                    <div className="flex items-center gap-4">

                        {/* Avatar */}
                        <div
                            className="
                                h-14 w-14 rounded-full
                                bg-teal-100 text-teal-700
                                flex items-center justify-center
                                font-semibold text-lg
                                shadow-inner
                                flex-shrink-0 overflow-hidden
                            "
                        >
                            {profile?.imageUrl ? (
                                <img
                                    src={profile.imageUrl}
                                    alt={profile?.name || "Doctor"}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <span>
                                    {profile?.name?.charAt(0)?.toUpperCase() || "D"}
                                </span>
                            )}
                        </div>

                        {/* Text */}
                        {/* Text */}
                        <div className="min-w-0">

                            <div className="flex flex-wrap items-center gap-3">

                                <h1 className="text-2xl font-semibold text-gray-900">
                                    Doctor Profile
                                </h1>

                                {/* RATING */}
                                {profile?.ratingCount > 0 && (

                                    <div
                                        className="
                    inline-flex items-center gap-1.5

                    rounded-full

                    border border-yellow-200

                    bg-yellow-50

                    px-3 py-1

                    text-sm font-medium

                    text-yellow-700
                "
                                    >

                                        <span className="text-yellow-500">
                                            ⭐
                                        </span>

                                        <span>
                                            {Number(
                                                profile.averageRating || 0
                                            ).toFixed(1)}
                                        </span>

                                        {/* <span className="text-yellow-600/70">
                                            ({profile.ratingCount})
                                        </span> */}

                                    </div>

                                )}

                            </div>

                            <p className="text-sm text-gray-600 mt-2 truncate">
                                {profile?.name} • {profile?.email}
                            </p>

                            <p className="text-xs sm:text-sm text-gray-500 mt-1">
                                Manage your professional details, fees and documents
                            </p>

                        </div>

                    </div>

                    {/* RIGHT ACTION */}
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className={`
                            group flex items-center justify-center gap-2
                            px-5 py-2.5 rounded-xl text-sm font-medium
                            transition-all duration-200
                            shadow-sm
                            ${isEditing
                                ? "bg-yellow-50 text-yellow-700 border border-yellow-300 hover:bg-yellow-100"
                                : "bg-navy text-white hover:bg-navy-dark"
                            }
                        `}
                    >
                        {isEditing ? "Editing Mode" : "Edit Profile"}

                        {/* subtle arrow */}
                        <span className="group-hover:translate-x-0.5 transition">
                            →
                        </span>
                    </button>

                    {/* subtle glow */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-teal-100/40 blur-3xl rounded-full pointer-events-none" />

                </div>

                {/* BASIC INFO */}
                <DoctorBasicInfo
                    profile={profile}
                    setProfile={setProfile}
                    isEditing={isEditing}
                />

                {/* PROFESSIONAL INFO */}
                <DoctorProfessionalInfo
                    profile={profile}
                    setProfile={setProfile}
                    isEditing={isEditing}
                />

                {/* SAVE BUTTON */}
                {isEditing && (
                    <div className="flex justify-end">
                        <button
                            onClick={() => saveMutation.mutate()}
                            className="bg-navy hover:bg-navy-dark text-white px-8 py-3 rounded-xl flex items-center gap-2 shadow-sm"
                            disabled={saveMutation.isPending}
                        >
                            {saveMutation.isPending && (
                                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            )}
                            {saveMutation.isPending ? "Saving Changes..." : "Save Changes"}
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
}