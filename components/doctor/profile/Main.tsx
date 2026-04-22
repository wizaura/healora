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

    console.log(data,'dar')

    useEffect(() => {
        if (data) setProfile(data);
    }, [data]);

    const saveMutation = useMutation({
        mutationFn: async () => {
            const formData = new FormData();

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


            return api.post("/doctor/profile", formData,{
                headers: { "Content-Type": "multipart/form-data" },
            });
        },
        onSuccess: () => {
            toast.success("Profile updated");
            setIsEditing(false);
            refetch();
        },
        onError: (err) => toast.error(getApiError(err)),
    });

    if (!profile) return null;

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-16">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* HEADER */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 flex justify-between items-center shadow-sm">
                    <div>
                        <h1 className="text-2xl font-semibold">Doctor Profile</h1>
                        <p>{profile?.name} • {profile?.email}</p>
                        <p className="text-sm text-gray-500">
                            Manage your professional details, fees and documents
                        </p>
                    </div>  

                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className={`px-5 py-2 rounded-lg text-sm font-medium border transition
          ${isEditing
                                ? "bg-yellow-50 border-yellow-300 text-yellow-700"
                                : "bg-teal-600 text-white border-teal-600 hover:bg-teal-700"}
        `}
                    >
                        {isEditing ? "Editing Mode" : "Edit Profile"}
                    </button>
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
                            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-xl flex items-center gap-2 shadow-sm"
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