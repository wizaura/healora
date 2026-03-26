import { useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { getApiError } from "@/lib/util";
import { useQuery } from "@tanstack/react-query";
import { getActiveSpecialities } from "@/lib/specialities.api";
import SelectOption from "../common/SelectOption";

export default function CareerFormSection() {

    const { data, isLoading, isError } = useQuery({
        queryKey: ["specialities"],
        queryFn: getActiveSpecialities,
        retry: false,
    });

    const [form, setForm] = useState({
        fname: "",
        lname: "",
        email: "",
        number: "",
        country: "",
        speciality: "",
    });

    const [resume, setResume] = useState<File | null>(null);
    const [coverLetter, setCoverLetter] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const specialityOptions = Array.isArray(data)
        ? data.map((s: any) => ({
            label: s.name,
            value: s.name,
        }))
        : [];

    const validate = () => {
        if (!form.fname.trim()) return toast.error("First name required"), false;
        if (!form.lname.trim()) return toast.error("Last name required"), false;
        if (!form.email.trim()) return toast.error("Email required"), false;
        if (!form.number.trim()) return toast.error("Phone required"), false;
        if (!form.country.trim()) return toast.error("Country required"), false;
        if (!form.speciality.trim())
            return toast.error("Speciality required"), false;
        if (!resume) return toast.error("Resume required"), false;

        return true;
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!validate()) return;

        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            formData.append(key, value);
        });

        if (resume) formData.append("resume", resume);
        if (coverLetter) formData.append("coverLetter", coverLetter);

        setLoading(true);

        try {
            await api.post("consultations/career/apply", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            toast.success("Application submitted successfully!");

            setForm({
                fname: "",
                lname: "",
                email: "",
                number: "",
                country: "",
                speciality: "",
            });

            setResume(null);
            setCoverLetter(null);
        } catch (err: any) {
            toast.error(getApiError(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="m-4 rounded-2xl">
            <div className="max-w-4xl mx-auto px-6 pb-16">
                <div className="text-center mb-14">
                    <h2 className="text-2xl md:text-4xl font-semibold text-slate-900">
                        Apply to Join Healora
                    </h2>

                    <p className="text-slate-600 mt-4 max-w-xl mx-auto">
                        Submit your application and our team will review your profile.
                        If shortlisted, we will contact you for the next steps.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-sm text-slate-600">
                                First Name *
                            </label>
                            <input
                                type="text"
                                name="fname"
                                value={form.fname}
                                onChange={handleChange}
                                placeholder="First Name"
                                className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-slate-600">
                                Last Name *
                            </label>
                            <input
                                type="text"
                                name="lname"
                                value={form.lname}
                                onChange={handleChange}
                                placeholder="Last Name"
                                className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-sm text-slate-600">
                                Email *
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Email Address"
                                className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-slate-600">
                                Number *
                            </label>
                            <input
                                type="text"
                                name="number"
                                value={form.number}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-sm text-slate-600">
                                Country *
                            </label>
                            <input
                                type="text"
                                name="country"
                                value={form.country}
                                onChange={handleChange}
                                placeholder="Country"
                                className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-slate-600">
                                Speciality *
                            </label>

                            <SelectOption
                                value={form.speciality}
                                onChange={(val) =>
                                    setForm({ ...form, speciality: val })
                                }
                                options={specialityOptions}
                                placeholder={
                                    isLoading ? "Loading..." : "Select Speciality"
                                }
                                className="w-full"
                                subClasses="rounded-lg px-4 py-3"
                            />
                        </div>
                    </div>

                    {/* FILE UPLOAD */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-sm text-slate-600">
                                Resume (PDF) *
                            </label>
                            <input
                                type="file"
                                accept="application/pdf"
                                onChange={(e) =>
                                    setResume(e.target.files?.[0] || null)
                                }
                                className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-slate-600">
                                Cover Letter (PDF)
                            </label>
                            <input
                                type="file"
                                accept="application/pdf"
                                onChange={(e) =>
                                    setCoverLetter(e.target.files?.[0] || null)
                                }
                                className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition disabled:opacity-60"
                    >
                        {loading ? "Submitting..." : "Submit Application"}
                    </button>
                </form>
            </div>
        </section>
    );
}