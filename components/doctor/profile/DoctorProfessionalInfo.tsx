import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function DoctorProfessionalInfo({ profile, setProfile, isEditing }: any) {
    const inputClass =
        "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm disabled:bg-gray-100";

    const [sealPreview, setSealPreview] = useState<string | null>(profile.sealUrl || null);
    const [signaturePreview, setSignaturePreview] = useState<string | null>(profile.signatureUrl || null);

    /* ---------------- FETCH MINI SPECIALITIES ---------------- */
    const { data: miniData } = useQuery({
        queryKey: ["doctor-mini"],
        queryFn: () => api.get("/doctor/mini/mini-specialities").then(res => res.data)
    });

    /* ---------------- FETCH LANGUAGES ---------------- */
    const { data: languageOptions = [] } = useQuery({
        queryKey: ["languages"],
        queryFn: () => api.get("/settings/languages").then(res => res.data),
    });

    /* ---------------- PREFILL MINI IDS ---------------- */
    useEffect(() => {
        if (miniData?.selectedMiniIds) {
            setProfile((prev: any) => ({
                ...prev,
                miniSpecialityIds: miniData.selectedMiniIds
            }));
        }
    }, [miniData]);

    const toggleMini = (id: string) => {
        if (!isEditing) return;

        const exists = profile.miniSpecialityIds?.includes(id);

        if (exists) {
            setProfile({
                ...profile,
                miniSpecialityIds: profile.miniSpecialityIds.filter((i: string) => i !== id),
            });
        } else {
            setProfile({
                ...profile,
                miniSpecialityIds: [...(profile.miniSpecialityIds || []), id],
            });
        }
    };

    const toggleLanguage = (id: string) => {
        if (!isEditing) return;

        const exists = profile.languageIds?.includes(id);

        if (exists) {
            setProfile({
                ...profile,
                languageIds: profile.languageIds.filter((i: string) => i !== id),
            });
        } else {
            setProfile({
                ...profile,
                languageIds: [...(profile.languageIds || []), id],
            });
        }
    };

    return (
        <div className="space-y-8 border border-gray-200 p-6 rounded-xl bg-white">

            <h2 className="font-semibold text-lg">Professional Details</h2>

            {/* Fees */}
            <div>
                <p className="text-sm font-medium mb-2">Consultation Fees</p>
                <div className="grid grid-cols-3 gap-4">
                    <FeeInput label="INR (Asian Counties)" field="consultationFeeINR" {...{ profile, setProfile, isEditing, inputClass }} />
                    <FeeInput label="USD (Latin American Countries)" field="consultationFeeUSD" {...{ profile, setProfile, isEditing, inputClass }} />
                    <FeeInput label="AED (Middle East Countries)" field="consultationFeeAED" {...{ profile, setProfile, isEditing, inputClass }} />
                    <FeeInput label="EUR (European Countries)" field="consultationFeeEUR" {...{ profile, setProfile, isEditing, inputClass }} />
                    <FeeInput label="GBP (UK)" field="consultationFeeGBP" {...{ profile, setProfile, isEditing, inputClass }} />
                    <FeeInput label="CAD (Canada)" field="consultationFeeCAD" {...{ profile, setProfile, isEditing, inputClass }} />
                </div>  
            </div>

            {/* Registration */}
            <div>
                <p className="text-sm font-medium mb-2">Registration</p>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        placeholder="Registration Number"
                        disabled={!isEditing}
                        value={profile.registrationNumber || ""}
                        onChange={(e) =>
                            setProfile({ ...profile, registrationNumber: e.target.value })
                        }
                        className={inputClass}
                    />

                    <input
                        placeholder="Medical Council"
                        disabled={!isEditing}
                        value={profile.registrationCouncil || ""}
                        onChange={(e) =>
                            setProfile({ ...profile, registrationCouncil: e.target.value })
                        }
                        className={inputClass}
                    />
                </div>
            </div>

            {/* Seal + Signature */}
            <div>
                <p className="text-sm font-medium mb-2">Doctor Seal & Signature</p>

                <div className="grid grid-cols-2 gap-6">
                    <ImageUpload
                        label="Seal"
                        preview={sealPreview}
                        onChange={(file: File) => {
                            setProfile({ ...profile, sealFile: file });
                            setSealPreview(URL.createObjectURL(file));
                        }}
                    />

                    <ImageUpload
                        label="Signature"
                        preview={signaturePreview}
                        onChange={(file: File) => {
                            setProfile({ ...profile, signatureFile: file });
                            setSignaturePreview(URL.createObjectURL(file));
                        }}
                    />
                </div>
            </div>

            {/* Specialities */}
            <TagSection title="Specialities (read only)" items={profile.specialities} />

            {/* Sub Specialities */}
            <TagSection title="Sub Specialities (read only)" items={profile.subSpecialities} />

            {/* Mini Specialities */}
            <SelectTagSection
                title="Mini Specialities"
                options={miniData?.miniOptions || []}
                selected={profile.miniSpecialityIds || []}
                toggle={toggleMini}
            />

            {/* Languages */}
            <SelectTagSection
                title="Languages"
                options={languageOptions}
                selected={profile.languageIds || []}
                toggle={toggleLanguage}
            />

        </div>
    );

    function FeeInput({ label, field, profile, setProfile, isEditing, inputClass }: any) {
        return (
            <div>
                <label className="text-xs text-gray-500">{label}</label>
                <input
                    type="number"
                    disabled={!isEditing}
                    value={profile[field] || ""}
                    onChange={(e) =>
                        setProfile((prev: any) => ({
                            ...prev,
                            [field]: e.target.value,
                        }))
                    }
                    className={inputClass}
                />
            </div>
        );
    }

    function ImageUpload({ label, preview, onChange }: any) {
        return (
            <div className="space-y-2">
                <label className="text-sm">{label}</label>

                {preview && (
                    <img
                        src={preview}
                        className="h-24 border border-gray-200 rounded-lg p-2 object-contain bg-white"
                    />
                )}

                {isEditing && (
                    <input
                        type="file"
                        onChange={(e: any) => onChange(e.target.files[0])}
                        className={inputClass}
                    />
                )}
            </div>
        );
    }

    function TagSection({ title, items = [] }: any) {
        return (
            <div>
                <label className="font-medium">{title}</label>
                <div className="flex flex-wrap gap-2 mt-2">
                    {items.map((i: any) => (
                        <span key={i.id} className="border border-gray-200 px-3 py-1 rounded-lg text-sm bg-gray-50">
                            {i.name}
                        </span>
                    ))}
                </div>
            </div>
        );
    }

    function SelectTagSection({ title, options = [], selected = [], toggle }: any) {
        return (
            <div>
                <label className="font-medium">{title}</label>
                <div className="flex flex-wrap gap-2 mt-2">
                    {options.map((o: any) => (
                        <button
                            key={o.id}
                            type="button"
                            onClick={() => toggle(o.id)}
                            className={`px-3 py-1 rounded-lg border text-sm transition
                                ${selected.includes(o.id)
                                    ? "bg-teal-600 text-white border-teal-600"
                                    : "bg-white border-gray-200 hover:bg-gray-50"}
                            `}
                        >
                            {o.name}
                        </button>
                    ))}
                </div>
            </div>
        );
    }
}