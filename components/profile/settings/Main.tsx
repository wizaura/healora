"use client";

import { useAuth } from "@/lib/auth-context";
import { useMutation, useQuery } from "@tanstack/react-query";
import { updateSettings } from "@/lib/settings.api";
import { getProfile } from "@/lib/profile.api";

import {
    Controller,
    useForm,
} from "react-hook-form";

import {
    useEffect,
    useState,
    useMemo,
} from "react";

import Select from "react-select";

import countryList
    from "react-select-country-list";

import toast
    from "react-hot-toast";

import ReactCountryFlag
    from "react-country-flag";

import {
    Eye,
    EyeOff,
    Pencil,
} from "lucide-react";

import AddressForm
    from "./AddressForm";
import Loader from "@/components/common/Loader";

type FormValues = {

    name?: string;

    email?: string;

    age?: number;

    gender?: string;

    country?: string;

    phone?: string;

    whatsapp?: string;

    address?: any;

    password?: string;

    confirmPassword?: string;
};

export default function SettingsPage() {

    const { user, loading } =
        useAuth();

    const isDoctor =
        user?.role === "DOCTOR";

    const [isEditing, setIsEditing] =
        useState(false);

    const {
        register,
        handleSubmit,
        reset,
        control,
    } = useForm<FormValues>({

        defaultValues: {

            name: "",

            email: "",

            age: 0,

            gender: "",

            country: "",

            phone: "",

            whatsapp: "",

            address: "",

            password: "",

            confirmPassword: "",
        },
    });

    /* ---------------- PROFILE ---------------- */

    const {
        data: profile,
        isLoading,
        refetch,
    } = useQuery({

        queryKey: [
            "profile",
            user?.sub,
        ],

        queryFn: () =>
            getProfile(user!.sub),

        enabled: !!user?.sub,
    });

    /* ---------------- COUNTRIES ---------------- */

    const countries = useMemo(
        () =>

            countryList()
                .getData()
                .map((c) => ({

                    value: c.value,

                    label: (

                        <div className="flex items-center gap-2">

                            <ReactCountryFlag
                                svg
                                countryCode={c.value}
                            />

                            {c.label}

                        </div>
                    ),
                })),

        []
    );

    /* ---------------- RESET FORM ---------------- */

    useEffect(() => {

        if (!profile) return;

        reset({

            name:
                profile.name || "",

            email:
                profile.email || "",

            age:
                profile.age || 0,

            gender:
                profile.gender || "",

            country:
                profile.countryCode || "",

            phone:
                profile.phone || "",

            whatsapp:
                profile.whatsappNumber || "",

            address:
                profile.address || "",

            password: "",

            confirmPassword: "",
        });

    }, [profile, reset]);

    /* ---------------- PASSWORD ---------------- */

    const [showPassword, setShowPassword] =
        useState(false);

    const [showConfirm, setShowConfirm] =
        useState(false);

    /* ---------------- UPDATE ---------------- */

    const mutation = useMutation({

        mutationFn: updateSettings,

        onSuccess: () => {

            toast.success(
                "Settings updated successfully"
            );

            setIsEditing(false);

            refetch();
        },

        onError: () =>

            toast.error(
                "Failed to update settings"
            ),
    });

    /* ---------------- LOADING ---------------- */

    if (loading || isLoading) {

        return <Loader fullScreen />
    }

    /* ---------------- SUBMIT ---------------- */

    const onSubmit = (
        data: FormValues
    ) => {

        const payload: any = {
            ...data,
        };

        delete payload.confirmPassword;

        mutation.mutate(payload);
    };

    /* ---------------- INPUT STYLE ---------------- */

    const inputStyle =
        `
            w-full

            rounded-lg

            border border-slate-200

            bg-white

            px-4 py-2.5

            text-sm text-slate-700

            transition

            focus:outline-none
            focus:ring-4
            focus:ring-teal-500/10
            focus:border-teal-500

            disabled:bg-slate-50
            disabled:text-slate-500
            disabled:cursor-not-allowed
        `;

    return (

        <div className="min-h-screen py-12">

            <div className="max-w-5xl mx-auto px-6 space-y-6">

                {/* HEADER */}
                <div
                    className="
                        rounded-lg
                        border border-slate-200

                        bg-white

                        px-5 py-5

                        flex flex-col lg:flex-row
                        lg:items-center
                        lg:justify-between

                        gap-5

                        shadow-sm
                    "
                >

                    {/* LEFT */}
                    <div className="flex items-center gap-4">

                        {/* AVATAR */}
                        <div
                            className="
                                h-14 w-14

                                rounded-lg

                                bg-teal-100

                                flex items-center justify-center

                                text-lg font-semibold
                                text-teal-700
                            "
                        >

                            {profile?.name?.charAt(0) || "U"}

                        </div>

                        {/* INFO */}
                        <div>

                            <h1 className="text-xl font-semibold text-slate-900">
                                Account Settings
                            </h1>

                            <p className="text-sm text-slate-500 mt-1">
                                Manage your profile,
                                location and security
                            </p>

                        </div>

                    </div>

                    {/* RIGHT */}
                    <div>

                        {!isEditing ? (

                            <button
                                onClick={() =>
                                    setIsEditing(true)
                                }

                                className="
                                    inline-flex items-center gap-2

                                    rounded-lg

                                    bg-teal-600
                                    hover:bg-teal-700

                                    px-5 py-2.5

                                    text-sm font-medium text-white

                                    transition
                                "
                            >

                                <Pencil size={15} />

                                Edit Details

                            </button>

                        ) : (

                            <button
                                onClick={() => {

                                    reset();

                                    setIsEditing(false);
                                }}

                                className="
                                    rounded-lg

                                    border border-slate-200

                                    px-5 py-2.5

                                    text-sm font-medium text-slate-700

                                    hover:bg-slate-50

                                    transition
                                "
                            >
                                Cancel Editing
                            </button>

                        )}

                    </div>

                </div>

                {/* SETTINGS CARD */}
                <div
                    className="
                        rounded-lg
                        border border-slate-200

                        bg-white

                        shadow-sm

                        overflow-hidden
                    "
                >

                    {/* CARD HEADER */}
                    <div
                        className="
                            border-b border-slate-100

                            px-6 py-4

                            bg-slate-50/50
                        "
                    >

                        <h2 className="text-sm font-semibold text-slate-900">
                            Profile Information
                        </h2>

                    </div>

                    {/* FORM */}
                    <form
                        onSubmit={handleSubmit(onSubmit)}

                        className="
                            p-6
                            space-y-8
                        "
                    >

                        {/* PERSONAL */}
                        {!isDoctor && (

                            <div className="space-y-5">

                                <h2
                                    className="
                                        text-sm font-semibold text-slate-900

                                        border-b border-slate-100

                                        pb-3
                                    "
                                >
                                    Personal Information
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    <InputField label="Full Name">

                                        <input
                                            {...register("name")}

                                            disabled={!isEditing}

                                            className={inputStyle}
                                        />

                                    </InputField>

                                    <InputField label="Email Address">

                                        <input
                                            {...register("email")}

                                            disabled={!isEditing}

                                            className={inputStyle}
                                        />

                                    </InputField>

                                    <InputField label="Age">

                                        <input
                                            type="number"

                                            {...register("age")}

                                            disabled={!isEditing}

                                            className={inputStyle}
                                        />

                                    </InputField>

                                    <InputField label="Gender">

                                        <select
                                            {...register("gender")}

                                            disabled={!isEditing}

                                            className={inputStyle}
                                        >

                                            <option value="">
                                                Select gender
                                            </option>

                                            <option value="MALE">
                                                Male
                                            </option>

                                            <option value="FEMALE">
                                                Female
                                            </option>

                                            <option value="OTHER">
                                                Other
                                            </option>

                                        </select>

                                    </InputField>

                                </div>

                            </div>

                        )}

                        {/* LOCATION */}
                        {!isDoctor && (

                            <div className="space-y-5">

                                <h2
                                    className="
                                        text-sm font-semibold text-slate-900

                                        border-b border-slate-100

                                        pb-3
                                    "
                                >
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

                                                    isDisabled={!isEditing}

                                                    value={countries.find(
                                                        (c) =>
                                                            c.value === field.value
                                                    )}

                                                    onChange={(option) =>
                                                        field.onChange(
                                                            option?.value
                                                        )
                                                    }

                                                    placeholder="Select country"
                                                />

                                            )}
                                        />

                                    </InputField>

                                    {/* REGION */}
                                    <InputField label="Region">

                                        <input
                                            value={
                                                profile?.region || ""
                                            }

                                            disabled

                                            className={inputStyle}
                                        />

                                    </InputField>

                                    {/* CURRENCY */}
                                    <InputField label="Currency">

                                        <input
                                            value={
                                                profile?.currency || ""
                                            }

                                            disabled

                                            className={inputStyle}
                                        />

                                    </InputField>

                                    {/* ADDRESS */}
                                    <div className="md:col-span-2">

                                        <Controller
                                            name="address"

                                            control={control}

                                            render={({ field }) => (

                                                <AddressForm
                                                    value={
                                                        field.value || {}
                                                    }

                                                    disabled={!isEditing}

                                                    onChange={
                                                        field.onChange
                                                    }
                                                />

                                            )}
                                        />

                                    </div>

                                </div>

                            </div>

                        )}

                        {/* SECURITY */}
                        <div className="space-y-5">

                            <h2
                                className="
                                    text-sm font-semibold text-slate-900

                                    border-b border-slate-100

                                    pb-3
                                "
                            >
                                Security
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* PASSWORD */}
                                <PasswordField
                                    label="New Password"

                                    show={showPassword}

                                    toggle={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                >

                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }

                                        {...register("password")}

                                        disabled={!isEditing}

                                        className={`${inputStyle} pr-10`}
                                    />

                                </PasswordField>

                                {/* CONFIRM */}
                                <PasswordField
                                    label="Confirm Password"

                                    show={showConfirm}

                                    toggle={() =>
                                        setShowConfirm(
                                            !showConfirm
                                        )
                                    }
                                >

                                    <input
                                        type={
                                            showConfirm
                                                ? "text"
                                                : "password"
                                        }

                                        {...register(
                                            "confirmPassword"
                                        )}

                                        disabled={!isEditing}

                                        className={`${inputStyle} pr-10`}
                                    />

                                </PasswordField>

                            </div>

                        </div>

                        {/* SAVE BAR */}
                        {isEditing && (

                            <div
                                className="
                                    sticky bottom-0 z-10

                                    flex justify-end gap-3

                                    border-t border-slate-200

                                    bg-white

                                    pt-6
                                "
                            >

                                <button
                                    type="button"

                                    onClick={() => {

                                        reset();

                                        setIsEditing(false);
                                    }}

                                    className="
                                        rounded-lg

                                        border border-slate-200

                                        px-5 py-2.5

                                        text-sm font-medium text-slate-700

                                        hover:bg-slate-50

                                        transition
                                    "
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"

                                    disabled={
                                        mutation.isPending
                                    }

                                    className="
                                        rounded-lg

                                        bg-[#1F2147]
                                        hover:bg-[#141633]

                                        px-6 py-2.5

                                        text-sm font-medium text-white

                                        transition
                                    "
                                >

                                    {mutation.isPending
                                        ? "Saving..."
                                        : "Save Changes"}

                                </button>

                            </div>

                        )}

                    </form>

                </div>

            </div>

        </div>
    );
}

/* ---------------- INPUT FIELD ---------------- */

function InputField({
    label,
    children,
}: any) {

    return (

        <div className="space-y-1.5">

            <label
                className="
                    text-sm font-medium text-slate-700
                "
            >
                {label}
            </label>

            {children}

        </div>
    );
}

/* ---------------- PASSWORD FIELD ---------------- */

function PasswordField({
    label,
    show,
    toggle,
    children,
}: any) {

    return (

        <div className="space-y-1.5 relative">

            <label
                className="
                    text-sm font-medium text-slate-700
                "
            >
                {label}
            </label>

            <div className="relative">

                {children}

                <button
                    type="button"

                    onClick={toggle}

                    className="
                        absolute right-3 top-2.5

                        text-slate-400
                        hover:text-slate-600

                        transition
                    "
                >

                    {show
                        ? <EyeOff size={16} />
                        : <Eye size={16} />}

                </button>

            </div>

        </div>
    );
}