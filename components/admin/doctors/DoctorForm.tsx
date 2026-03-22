"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";

type Props = {
    doctor?: any;
    onSuccess: () => void;
    onClose: () => void;
};

export default function DoctorForm({ doctor, onSuccess, onClose }: Props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [specialities, setSpecialities] = useState<any[]>([]);
    const [subSpecialities, setSubSpecialities] = useState<any[]>([]);

    const [selectedSpecialities, setSelectedSpecialities] = useState<string[]>([]);
    const [selectedSubs, setSelectedSubs] = useState<string[]>([]);

    const [existingCertificates, setExistingCertificates] = useState<any[]>([]);
    const [removedCertificateIds, setRemovedCertificateIds] = useState<string[]>([]);

    const [newCertificates, setNewCertificates] = useState<File[]>([]);
    const [certificatePreviews, setCertificatePreviews] = useState<string[]>([]);

    const [saving, setSaving] = useState(false);

    /* ---------------- PREFILL EDIT DATA ---------------- */
    useEffect(() => {
        if (!doctor) return;

        setName(doctor.name || "");
        setEmail(doctor.email || "");

        // Specialities
        if (doctor.doctor?.specialities) {
            const specIds = doctor.doctor.specialities.map(
                (s: any) => s.speciality.id
            );
            setSelectedSpecialities(specIds);
        }

        // Sub Specialities
        if (doctor.doctor?.subSpecialities) {
            const subIds = doctor.doctor.subSpecialities.map(
                (s: any) => s.subSpeciality.id
            );
            setSelectedSubs(subIds);
        }

        // Certificates
        if (doctor.doctor?.certificates) {
            setExistingCertificates(doctor.doctor.certificates);
            setCertificatePreviews(
                doctor.doctor.certificates.map((c: any) => c.fileUrl)
            );
        }
    }, [doctor]);

    /* ---------------- FETCH SPECIALITIES ---------------- */
    useEffect(() => {
        api.get("/admin/specialities").then((res) => {
            setSpecialities(res.data);
        });
    }, []);

    /* ---------------- FETCH SUB SPECIALITIES ---------------- */
    useEffect(() => {
        if (!selectedSpecialities.length) {
            setSubSpecialities([]);
            setSelectedSubs([]);
            return;
        }

        api
            .get(`/admin/sub-specialities/by-specialities?ids=${selectedSpecialities.join(",")}`)
            .then((res) => {
                setSubSpecialities(res.data);

                // Re-apply selected subs
                if (doctor?.doctor?.subSpecialities) {
                    const subIds = doctor.doctor.subSpecialities.map(
                        (s: any) => s.subSpeciality.id
                    );
                    setSelectedSubs(subIds);
                }
            });
    }, [selectedSpecialities, doctor]);

    /* ---------------- TOGGLE SELECT ---------------- */
    const toggleSpeciality = (id: string) => {
        setSelectedSpecialities((prev) =>
            prev.includes(id)
                ? prev.filter((i) => i !== id)
                : [...prev, id]
        );
    };

    const toggleSub = (id: string) => {
        setSelectedSubs((prev) =>
            prev.includes(id)
                ? prev.filter((i) => i !== id)
                : [...prev, id]
        );
    };

    /* ---------------- NEW CERTIFICATES ---------------- */
    const handleCertificates = (files: FileList) => {
        const fileArray = Array.from(files);
        setNewCertificates((prev) => [...prev, ...fileArray]);
        setCertificatePreviews((prev) => [
            ...prev,
            ...fileArray.map((f) => URL.createObjectURL(f)),
        ]);
    };

    const removeNewCertificate = (index: number) => {
        const newFiles = [...newCertificates];
        const newPreviews = [...certificatePreviews];

        newFiles.splice(index, 1);
        newPreviews.splice(index, 1);

        setNewCertificates(newFiles);
        setCertificatePreviews(newPreviews);
    };

    const removeExistingCertificate = (id: string, index: number) => {
        setRemovedCertificateIds((prev) => [...prev, id]);

        const newExisting = existingCertificates.filter((c) => c.id !== id);
        setExistingCertificates(newExisting);

        const newPreviews = [...certificatePreviews];
        newPreviews.splice(index, 1);
        setCertificatePreviews(newPreviews);
    };

    /* ---------------- SUBMIT ---------------- */
    const handleSubmit = async () => {
        if (!name.trim()) return toast.error("Doctor name required");
        if (!email.trim()) return toast.error("Email required");

        try {
            setSaving(true);

            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("specialityIds", JSON.stringify(selectedSpecialities));
            formData.append("subSpecialityIds", JSON.stringify(selectedSubs));
            formData.append("removedCertificateIds", JSON.stringify(removedCertificateIds));

            newCertificates.forEach((file) => {
                formData.append("certificates", file);
            });

            if (doctor) {
                await api.patch(`/admin/doctors/${doctor.id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                toast.success("Doctor updated");
            } else {
                const res = await api.post("/admin/doctors", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                toast.success("Doctor created");

                if (res.data?.tempPassword) {
                    toast(`Temporary password: ${res.data.tempPassword}`, {
                        duration: 7000,
                    });
                }
            }

            onSuccess();
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Error");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="text-lg font-semibold">
                {doctor ? "Edit Doctor" : "Add Doctor"}
            </h3>

            {/* NAME + EMAIL */}
            <div className="grid md:grid-cols-2 gap-6">
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Doctor Name"
                    className="border border-gray-200 rounded-xl px-4 py-2"
                />

                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="border border-gray-200 rounded-xl px-4 py-2"
                />
            </div>

            {/* SPECIALITIES */}
            <div>
                <label className="font-medium">Specialities</label>
                <div className="flex flex-wrap gap-2 mt-2">
                    {specialities.map((s) => (
                        <button
                            key={s.id}
                            type="button"
                            onClick={() => toggleSpeciality(s.id)}
                            className={`px-3 py-1 rounded-lg border text-sm
                ${selectedSpecialities.includes(s.id)
                                    ? "bg-teal-600 text-white border-teal-600"
                                    : "border-gray-200 bg-white"}
              `}
                        >
                            {s.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* SUB SPECIALITIES */}
            {subSpecialities.length > 0 && (
                <div>
                    <label className="font-medium">Sub Specialities</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {subSpecialities.map((s) => (
                            <button
                                key={s.id}
                                type="button"
                                onClick={() => toggleSub(s.id)}
                                className={`px-3 py-1 rounded-lg border text-sm
                  ${selectedSubs.includes(s.id)
                                        ? "bg-teal-600 text-white border-teal-600"
                                        : "border-gray-200 bg-white"}
                `}
                            >
                                {s.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* CERTIFICATES */}
            <div>
                <label className="font-medium">Certificates </label>
                <input
                    type="file"
                    multiple
                    onChange={(e: any) => handleCertificates(e.target.files)}
                    className="border border-gray-200 rounded-xl px-3 py-2 mt-2"
                />

                <div className="grid grid-cols-3 gap-3 mt-3">
                    {certificatePreviews.map((preview, i) => (
                        <div key={i} className="border border-gray-200 rounded-lg p-2 relative">

                            <img
                                src={preview}
                                className="w-full h-32 object-cover rounded-lg cursor-pointer"
                                onClick={() => window.open(preview, "_blank")}
                            />

                            <button
                                onClick={() => {
                                    if (existingCertificates[i]) {
                                        removeExistingCertificate(existingCertificates[i].id, i);
                                    } else {
                                        removeNewCertificate(i - existingCertificates.length);
                                    }
                                }}
                                className="absolute top-2 right-2 bg-white border rounded px-2 text-xs text-red-600"
                            >
                                Remove
                            </button>

                        </div>
                    ))}
                </div>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button onClick={onClose} className="px-4 py-2 bg-gray-100 rounded-lg">
                    Cancel
                </button>

                <button
                    onClick={handleSubmit}
                    disabled={saving}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg"
                >
                    {saving ? "Saving..." : doctor ? "Update" : "Create"}
                </button>
            </div>
        </div>
    );
}