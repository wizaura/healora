import { useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { getApiError } from "@/lib/util";
import { useQuery } from "@tanstack/react-query";
import { getActiveSpecialities } from "@/lib/specialities.api";
import SelectOption from "../common/SelectOption";

export default function CareerFormSection() {
    const { data, isLoading } = useQuery({
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
        if (!form.speciality.trim()) return toast.error("Speciality required"), false;
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

    const inputClasses = "w-full border border-slate-200 bg-white rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent transition-all duration-200";
    const labelClasses = "block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2";

    return (
        <section className="bg-gradient-to-b from-white via-white to-wellness-bg m-4 rounded-2xl border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
                {/* Framed Two-Column Layout */}
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                    
                    {/* Left Side: Engaging Sticky Context Frame */}
                    <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold text-navy tracking-tight">
                                Faculty Intake Portal
                            </h2>
                            <p className="text-md text-slate-500 mt-2 leading-relaxed">
                                Join a global network of premier healthcare practitioners redefining digital consultations and clinical autonomy.
                            </p>
                        </div>

                        {/* Informative Perks Cards */}
                        <div className="space-y-4 pt-4 border-t border-slate-100">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-navy font-semibold text-md">
                                    01
                                </div>
                                <div>
                                    <h4 className="text-md font-semibold text-slate-900">Credential Review</h4>
                                    <p className="text-sm text-slate-500 mt-0.5">Our medical board evaluates applications within 3–5 business days.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-navy font-semibold text-md">
                                    02
                                </div>
                                <div>
                                    <h4 className="text-md font-semibold text-slate-900">Digital Onboarding</h4>
                                    <p className="text-sm text-slate-500 mt-0.5">Approved clinicians receive personalized training on our advanced telehealth suite.</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-100 text-sm text-slate-600 leading-relaxed">
                            <strong>Security & Privacy Notice:</strong> All uploaded medical licenses and documentation are encrypted and handled in strict accordance with healthcare compliance standards.
                        </div>
                    </div>

                    {/* Right Side: The Interactive Form Frame */}
                    <div className="lg:col-span-8 bg-white lg:p-8 lg:border lg:border-slate-100 lg:rounded-2xl lg:shadow-sm">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            
                            {/* Personal Details Subsection */}
                            <div>
                                <h3 className="text-sm font-bold text-navy uppercase tracking-wider mb-6 pb-2 border-b border-slate-100">
                                    1. Personal Identification
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className={labelClasses}>First Name *</label>
                                        <input
                                            type="text"
                                            name="fname"
                                            value={form.fname}
                                            onChange={handleChange}
                                            placeholder="e.g., Dr. Elizabeth"
                                            className={inputClasses}
                                        />
                                    </div>

                                    <div>
                                        <label className={labelClasses}>Last Name *</label>
                                        <input
                                            type="text"
                                            name="lname"
                                            value={form.lname}
                                            onChange={handleChange}
                                            placeholder="e.g., Blackwell"
                                            className={inputClasses}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Contact Framework */}
                            <div>
                                <h3 className="text-sm font-bold text-navy uppercase tracking-wider mb-6 pb-2 border-b border-slate-100">
                                    2. Contact & Demographics
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className={labelClasses}>Professional Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="dr.name@hospital.com"
                                            className={inputClasses}
                                        />
                                    </div>

                                    <div>
                                        <label className={labelClasses}>Contact Number *</label>
                                        <input
                                            type="text"
                                            name="number"
                                            value={form.number}
                                            onChange={handleChange}
                                            placeholder="+1 (555) 000-0000"
                                            className={inputClasses}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Scope of Practice */}
                            <div>
                                <h3 className="text-sm font-bold text-navy uppercase tracking-wider mb-6 pb-2 border-b border-slate-100">
                                    3. Scope of Practice
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className={labelClasses}>Country of Practice *</label>
                                        <input
                                            type="text"
                                            name="country"
                                            value={form.country}
                                            onChange={handleChange}
                                            placeholder="United Kingdom"
                                            className={inputClasses}
                                        />
                                    </div>

                                    <div>
                                        <label className={labelClasses}>Medical Speciality *</label>
                                        <SelectOption
                                            value={form.speciality}
                                            onChange={(val) => setForm({ ...form, speciality: val })}
                                            options={specialityOptions}
                                            placeholder={isLoading ? "Loading specialities..." : "Select Core Specialty"}
                                            className="w-full"
                                            subClasses="rounded-xl px-4 py-3 border border-slate-200 focus:ring-2 focus:ring-navy"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Verification Infrastructure */}
                            <div>
                                <h3 className="text-sm font-bold text-navy uppercase tracking-wider mb-6 pb-2 border-b border-slate-100">
                                    4. Verification Documents
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className={labelClasses}>Curriculum Vitae / Resume *</label>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                accept="application/pdf"
                                                onChange={(e) => setResume(e.target.files?.[0] || null)}
                                                className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 border border-slate-200 rounded-xl px-3 py-2 bg-slate-50/30"
                                            />
                                        </div>
                                        <p className="text-[10px] text-slate-400 mt-1.5">PDF format only. Max file size 10MB.</p>
                                    </div>

                                    <div>
                                        <label className={labelClasses}>Cover Letter / Statements</label>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                accept="application/pdf, image/png, image/jpeg, image/jpg, image/webp"
                                                onChange={(e) => setCoverLetter(e.target.files?.[0] || null)}
                                                className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 border border-slate-200 rounded-xl px-3 py-2 bg-slate-50/30"
                                            />
                                        </div>
                                        <p className="text-[10px] text-slate-400 mt-1.5">PDF or high-res images accepted.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Call to Action Wrapper */}
                            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4 flex-wrap">
                                <p className="text-xs text-slate-400 max-w-md">
                                    By submitting, you certify that all clinical licenses and background declarations provided are valid and active.
                                </p>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full sm:w-auto bg-navy text-white px-8 py-3.5 rounded-xl font-medium hover:bg-slate-800 transition-all duration-200 disabled:opacity-60 shadow-sm active:scale-[0.99]"
                                >
                                    {loading ? "Verifying Profile..." : "Submit Formal Application"}
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}