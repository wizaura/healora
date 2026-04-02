"use client";

import { useAuth } from "@/lib/auth-context";
import { useMutation, useQuery } from "@tanstack/react-query";
import { updateSettings } from "@/lib/settings.api";
import { getProfile } from "@/lib/profile.api";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import toast from "react-hot-toast";
import ReactCountryFlag from "react-country-flag";
import {
    Eye,
    EyeOff,
    ArrowLeft
} from "lucide-react";
import { useRouter } from "next/navigation";

type FormValues = {
    name?: string;
    email?: string;
    age?: number;
    gender?: string;
    country?: string;
    password?: string;
    confirmPassword?: string;
};

export default function SettingsPage() {

    const { user, loading } = useAuth();
    const router = useRouter();
    const isDoctor = user?.role === "DOCTOR";

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors }
    } = useForm<FormValues>({
        defaultValues: {
            name: "",
            email: "",
            age: 0,
            gender: "",
            country: "",
            password: "",
            confirmPassword: ""
        }
    });

    /* ---------------- PROFILE QUERY ---------------- */

    const { data: profile, isLoading, refetch } = useQuery({
        queryKey: ["profile", user?.sub],
        queryFn: () => getProfile(user!.sub),
        enabled: !!user?.sub
    });

    const countries = useMemo(() =>
        countryList().getData().map(c => ({
            value: c.value,
            label: (
                <div className="flex items-center gap-2">
                    <ReactCountryFlag svg countryCode={c.value} />
                    {c.label}
                </div>
            )
        })),
        []);

    useEffect(() => {
        if (!profile) return;

        reset({
            name: profile.name || "",
            email: profile.email || "",
            age: profile.age || 0,
            gender: profile.gender || "",
            country: profile.countryCode || "",
            password: "",
            confirmPassword: ""
        });
    }, [profile, reset]);

    /* ---------------- PASSWORD VISIBILITY ---------------- */

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    /* ---------------- UPDATE MUTATION ---------------- */

    const mutation = useMutation({
        mutationFn: updateSettings,
        onSuccess: () => {
            toast.success("Settings updated successfully");
            refetch(); // 🔥 IMPORTANT → reload region & currency
        },
        onError: () => toast.error("Failed to update settings")
    });

    if (loading || isLoading) {
        return (
            <div className="pt-32 text-center text-slate-500">
                Loading settings...
            </div>
        );
    }

    const onSubmit = (data: FormValues) => {
        const payload: any = { ...data };
        delete payload.confirmPassword;
        mutation.mutate(payload);
    };

    const inputStyle =
        "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 disabled:bg-slate-100";

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-16">
            <div className="max-w-5xl mx-auto px-6 space-y-8">

                {/* HEADER */}
                <div className="space-y-2">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800"
                    >
                        <ArrowLeft size={16} />
                        Back
                    </button>

                    <div>
                        <h1 className="text-2xl font-semibold text-slate-900">
                            Account Settings
                        </h1>
                    </div>
                </div>

                {/* SETTINGS CARD */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                        {/* PERSONAL INFO */}
                        {!isDoctor && (
                            <div className="space-y-4">
                                <h2 className="text-sm font-semibold text-slate-900 border-b pb-2">
                                    Personal Information
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    {/* NAME */}
                                    <InputField label="Full Name">
                                        <input {...register("name")} className={inputStyle} />
                                    </InputField>

                                    {/* EMAIL */}
                                    <InputField label="Email Address">
                                        <input {...register("email")} className={inputStyle} />
                                    </InputField>

                                    {/* AGE */}
                                    <InputField label="Age">
                                        <input
                                            type="number"
                                            {...register("age")}
                                            className={inputStyle}
                                        />
                                    </InputField>

                                    {/* GENDER */}
                                    <InputField label="Gender">
                                        <select {...register("gender")} className={inputStyle}>
                                            <option value="">Select gender</option>
                                            <option value="MALE">Male</option>
                                            <option value="FEMALE">Female</option>
                                            <option value="OTHER">Other</option>
                                        </select>
                                    </InputField>

                                </div>
                            </div>
                        )}

                        {/* LOCATION */}
                        {!isDoctor && (
                            <div className="space-y-4">
                                <h2 className="text-sm font-semibold text-slate-900 border-b pb-2">
                                    Location & Region
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    {/* COUNTRY */}
                                    <InputField label="Country">
                                        <Controller
                                            name="country"
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    options={countries}
                                                    value={countries.find(c => c.value === field.value)}
                                                    onChange={(option) => field.onChange(option?.value)}
                                                    placeholder="Select country"
                                                />
                                            )}
                                        />
                                    </InputField>

                                    {/* REGION */}
                                    <InputField label="Region">
                                        <input
                                            value={profile?.region || ""}
                                            disabled
                                            className={inputStyle}
                                        />
                                    </InputField>

                                    {/* CURRENCY */}
                                    <InputField label="Currency">
                                        <input
                                            value={profile?.currency || ""}
                                            disabled
                                            className={inputStyle}
                                        />
                                    </InputField>

                                </div>
                            </div>
                        )}

                        {/* SECURITY */}
                        <div className="space-y-4">
                            <h2 className="text-sm font-semibold text-slate-900 border-b pb-2">
                                Security
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* PASSWORD */}
                                <PasswordField
                                    label="New Password"
                                    show={showPassword}
                                    toggle={() => setShowPassword(!showPassword)}
                                >
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        {...register("password")}
                                        className={`${inputStyle} pr-10`}
                                    />
                                </PasswordField>

                                {/* CONFIRM PASSWORD */}
                                <PasswordField
                                    label="Confirm Password"
                                    show={showConfirm}
                                    toggle={() => setShowConfirm(!showConfirm)}
                                >
                                    <input
                                        type={showConfirm ? "text" : "password"}
                                        {...register("confirmPassword")}
                                        className={`${inputStyle} pr-10`}
                                    />
                                </PasswordField>

                            </div>
                        </div>

                        {/* SAVE BUTTON */}
                        <div className="flex justify-end pt-6 border-t border-slate-200">
                            <button
                                type="submit"
                                disabled={mutation.isPending}
                                className="rounded-lg bg-[#1F2147] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#141633] transition"
                            >
                                {mutation.isPending ? "Saving..." : "Save Changes"}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

/* ---------------- INPUT FIELD ---------------- */

function InputField({ label, children }: any) {
    return (
        <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">
                {label}
            </label>
            {children}
        </div>
    );
}

/* ---------------- PASSWORD FIELD ---------------- */

function PasswordField({ label, show, toggle, children }: any) {
    return (
        <div className="space-y-1 relative">
            <label className="text-sm font-medium text-slate-700">
                {label}
            </label>

            <div className="relative">
                {children}
                <button
                    type="button"
                    onClick={toggle}
                    className="absolute right-3 top-2.5 text-slate-400"
                >
                    {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
            </div>
        </div>
    );
}