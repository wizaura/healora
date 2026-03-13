"use client";

import { useAuth } from "@/lib/auth-context";
import { useMutation, useQuery } from "@tanstack/react-query";
import { updateSettings } from "@/lib/settings.api";
import { getProfile } from "@/lib/profile.api";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { useMemo } from "react";
import toast from "react-hot-toast";
import ReactCountryFlag from "react-country-flag";
import {
    Eye,
    EyeOff,
    Lock,
    User,
    Mail,
    Globe,
    ArrowLeft
} from "lucide-react";
import { useRouter } from "next/navigation";

type FormValues = {
    name?: string;
    email?: string;
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
        watch,
        reset,
        control,
        formState: { errors }
    } = useForm<FormValues>({
        defaultValues: {
            name: "",
            email: "",
            country: "",
            password: "",
            confirmPassword: ""
        }
    });

    /* ---------------- PROFILE QUERY ---------------- */

    const { data: profile, isLoading } = useQuery({
        queryKey: ["profile", user?.sub],
        queryFn: () => getProfile(user!.sub),
        enabled: !!user?.sub
    });

    const countries = useMemo(() =>
        countryList().getData().map(c => ({
            value: c.value,
            name: c.label,
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
            country: profile.country || "",
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
        onSuccess: () => toast.success("Settings updated successfully"),
        onError: () => toast.error("Failed to update settings")
    });

    /* ---------------- LOADING STATES ---------------- */

    if (loading || isLoading) {
        return (
            <div className="pt-32 text-center text-slate-500">
                Loading settings...
            </div>
        );
    }

    /* ---------------- SUBMIT ---------------- */

    const onSubmit = (data: FormValues) => {

        const payload: any = { ...data };

        delete payload.confirmPassword;

        mutation.mutate(payload);
    };

    const inputStyle =
        "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 disabled:bg-slate-100";

    /* ---------------- UI ---------------- */

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-16">

            <div className="max-w-3xl mx-auto px-6 space-y-8">

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

                        <p className="text-sm text-slate-500 mt-1">
                            Update your personal information and security settings.
                        </p>
                    </div>

                </div>

                {/* SETTINGS CARD */}

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >

                        {/* PROFILE FIELDS */}

                        {!isDoctor && (

                            <>
                                <InputField
                                    icon={<User size={16} />}
                                    label="Full Name"
                                    error={errors.name?.message}
                                >
                                    <input
                                        {...register("name", {
                                            required: "Name is required",
                                            minLength: {
                                                value: 2,
                                                message: "Name must be at least 2 characters"
                                            }
                                        })}
                                        className={inputStyle}
                                    />
                                </InputField>

                                <InputField
                                    icon={<Mail size={16} />}
                                    label="Email Address"
                                    error={errors.email?.message}
                                >
                                    <input
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^\S+@\S+\.\S+$/,
                                                message: "Invalid email address"
                                            }
                                        })}
                                        className={inputStyle}
                                    />
                                </InputField>

                                <InputField
                                    icon={<Globe size={16} />}
                                    label="Country"
                                    error={errors.country?.message}
                                >
                                    <Controller
                                        name="country"
                                        control={control}
                                        rules={{ required: "Country is required" }}
                                        render={({ field }) => (
                                            <Select
                                                options={countries}
                                                value={countries.find(c => c.value === field.value)}
                                                onChange={(option) => field.onChange(option?.value)}
                                                placeholder="Select country"
                                                className="text-sm"
                                            />
                                        )}
                                    />
                                </InputField>
                            </>
                        )}

                        {/* PASSWORD */}

                        <PasswordField
                            label="New Password"
                            icon={<Lock size={16} />}
                            show={showPassword}
                            toggle={() => setShowPassword(!showPassword)}
                            error={errors.password?.message}
                        >
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password", {
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters"
                                    }
                                })}
                                className={`${inputStyle} pr-10`}
                            />
                        </PasswordField>

                        {/* CONFIRM PASSWORD */}

                        <PasswordField
                            label="Confirm Password"
                            icon={<Lock size={16} />}
                            show={showConfirm}
                            toggle={() => setShowConfirm(!showConfirm)}
                            error={errors.confirmPassword?.message}
                        >
                            <input
                                type={showConfirm ? "text" : "password"}
                                {...register("confirmPassword", {
                                    validate: (value) =>
                                        !watch("password") ||
                                        value === watch("password") ||
                                        "Passwords do not match"
                                })}
                                className={`${inputStyle} pr-10`}
                            />
                        </PasswordField>

                        {/* SAVE BUTTON */}

                        <div className="flex justify-end pt-4 border-t border-slate-200">

                            <button
                                type="submit"
                                disabled={mutation.isPending}
                                className="flex items-center gap-2 rounded-lg bg-teal-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-teal-700 disabled:opacity-60"
                            >
                                {mutation.isPending && (
                                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                )}

                                Save Changes
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}

/* ---------------- INPUT FIELD ---------------- */

function InputField({ label, icon, children, error }: any) {

    return (
        <div className="space-y-1">

            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                {icon}
                {label}
            </label>

            {children}

            {error && (
                <p className="text-xs text-red-500">
                    {error}
                </p>
            )}

        </div>
    );
}

/* ---------------- PASSWORD FIELD ---------------- */

function PasswordField({ label, icon, show, toggle, children, error }: any) {

    return (
        <div className="space-y-1 relative">

            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                {icon}
                {label}
            </label>

            <div className="relative">

                {children}

                <button
                    type="button"
                    onClick={toggle}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                    {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>

            </div>

            {error && (
                <p className="text-xs text-red-500">
                    {error}
                </p>
            )}

        </div>
    );
}