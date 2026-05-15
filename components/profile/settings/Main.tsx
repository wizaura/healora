"use client";

import { useAuth } from "@/lib/auth-context";

import {
    useMutation,
    useQuery,
} from "@tanstack/react-query";

import {
    updateSettings,
} from "@/lib/settings.api";

import {
    getProfile,
} from "@/lib/profile.api";

import {
    Controller,
    useForm,
} from "react-hook-form";

import {
    useEffect,
    useState,
} from "react";

import toast
    from "react-hot-toast";

import ReactCountryFlag
    from "react-country-flag";

import countryList
    from "react-select-country-list";

import {
    Eye,
    EyeOff,
    MapPin,
    Pencil,
    Shield,
    User2,
} from "lucide-react";

import AddressForm
    from "./AddressForm";

import Loader
    from "@/components/common/Loader";
import { getApiError } from "@/lib/util";

type FormValues = {

    name?: string;

    email?: string;

    age?: number;

    gender?: string;

    phone?: string;

    whatsapp?: string;

    address?: any;

    password?: string;

    confirmPassword?: string;
};

export default function SettingsPage() {

    const {
        user,
        loading,
    } = useAuth();

    const [isEditing, setIsEditing] =
        useState(false);

    const {
        register,
        handleSubmit,
        reset,
        control,
        watch,
        formState: { errors }
    } = useForm<FormValues>({

        defaultValues: {

            name: "",

            email: "",

            age: 0,

            gender: "",

            phone: "",

            whatsapp: "",

            address: "",

            password: "",

            confirmPassword: "",
        },
    });

    const password =
        watch("password");
    /* =====================================================
       PROFILE
       ===================================================== */

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

        enabled:
            !!user?.sub,
    });

    /* =====================================================
       RESET FORM
       ===================================================== */

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

    /* =====================================================
       PASSWORD VISIBILITY
       ===================================================== */

    const [showPassword, setShowPassword] =
        useState(false);

    const [showConfirm, setShowConfirm] =
        useState(false);

    /* =====================================================
       UPDATE
       ===================================================== */

    const mutation = useMutation({

        mutationFn:
            updateSettings,

        onSuccess: () => {

            toast.success(
                "Settings updated successfully"
            );

            setIsEditing(false);

            refetch();
        },

        onError: (err) =>

            toast.error(getApiError(err)),
    });

    /* =====================================================
       LOADING
       ===================================================== */

    if (
        loading ||
        isLoading
    ) {

        return <Loader fullScreen />;
    }

    /* =====================================================
       SUBMIT
       ===================================================== */

    const onSubmit = (
        data: FormValues
    ) => {

        const payload: any = {
            ...data,
        };

        delete payload.confirmPassword;

        mutation.mutate(payload);
    };

    /* =====================================================
       INPUT STYLE
       ===================================================== */

    const inputStyle =
        `
            w-full

            rounded-xl

            border border-slate-200

            bg-white

            px-4 py-3

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

        <div
            className="
                min-h-screen

                py-12
            "
        >

            <div
                className="
                    mx-auto

                    max-w-5xl

                    space-y-6

                    px-4 md:px-6
                "
            >

                {/* =====================================================
                   HEADER
                   ===================================================== */}

                <div
                    className="
                        rounded-xl

                        border border-slate-200

                        bg-white

                        p-6 md:p-8

                        shadow-sm
                    "
                >

                    <div
                        className="
                            flex flex-col gap-6

                            lg:flex-row
                            lg:items-center
                            lg:justify-between
                        "
                    >

                        {/* LEFT */}

                        <div
                            className="
                                flex items-center gap-5
                            "
                        >

                            {/* AVATAR */}

                            <div
                                className="
                                    flex h-16 w-16
                                    items-center justify-center

                                    rounded-2xl

                                    bg-gradient-to-br
                                    from-teal-500
                                    to-cyan-500

                                    text-2xl font-semibold
                                    text-white
                                "
                            >

                                {profile?.name?.charAt(0) || "U"}

                            </div>

                            {/* INFO */}

                            <div>

                                <h1
                                    className="
                                        text-2xl font-semibold

                                        tracking-[-0.03em]

                                        text-slate-900

                                        md:text-3xl
                                    "
                                >

                                    Account Settings

                                </h1>

                                <p
                                    className="
                                        mt-2

                                        text-sm leading-6

                                        text-slate-500
                                    "
                                >

                                    Manage your profile, address
                                    and security settings.

                                </p>

                            </div>

                        </div>

                        {/* ACTION */}

                        <div>

                            {!isEditing ? (

                                <button
                                    onClick={() =>
                                        setIsEditing(true)
                                    }

                                    className="
                                        inline-flex items-center gap-2

                                        rounded-xl

                                        bg-teal-600

                                        px-5 py-3

                                        text-sm font-medium
                                        text-white

                                        transition

                                        hover:bg-teal-700
                                    "
                                >

                                    <Pencil size={16} />

                                    Edit Details

                                </button>

                            ) : (

                                <button
                                    onClick={() => {

                                        reset();

                                        setIsEditing(false);
                                    }}

                                    className="
                                        rounded-xl

                                        border border-slate-200

                                        bg-white

                                        px-5 py-3

                                        text-sm font-medium
                                        text-slate-700

                                        transition

                                        hover:bg-slate-50
                                    "
                                >

                                    Cancel Editing

                                </button>

                            )}

                        </div>

                    </div>

                </div>

                {/* =====================================================
                   FORM CARD
                   ===================================================== */}

                <div
                    className="
                        overflow-hidden

                        rounded-xl

                        border border-slate-200

                        bg-white

                        shadow-sm
                    "
                >

                    {/* HEADER */}

                    <div
                        className="
                            border-b border-slate-100

                            bg-slate-50/70

                            px-6 py-5
                        "
                    >

                        <h2
                            className="
                                text-sm font-semibold

                                uppercase tracking-wide

                                text-slate-700
                            "
                        >

                            Profile Information

                        </h2>

                    </div>

                    {/* FORM */}

                    <form
                        onSubmit={handleSubmit(onSubmit)}

                        className="
                            space-y-10

                            p-6 md:p-8
                        "
                    >

                        {/* =====================================================
                           PERSONAL
                           ===================================================== */}

                        <SectionHeader
                            title="Personal Information"
                            icon={
                                <User2 size={16} />
                            }
                        />

                        <div
                            className="
                                grid grid-cols-1 gap-6

                                md:grid-cols-2
                            "
                        >

                            <InputField label="Full Name" required>

                                <input
                                    {...register("name", {
                                        required: "Full name is required",
                                        minLength: {
                                            value: 2,
                                            message: "Name is too short",
                                        },
                                    })}

                                    disabled={!isEditing}

                                    className={inputStyle}
                                />

                                {errors.name && (

                                    <p className="text-sm text-rose-500">
                                        {errors.name.message}
                                    </p>

                                )}

                            </InputField>

                            <InputField label="Email Address" required>

                                <input
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value:
                                                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message:
                                                "Invalid email address",
                                        },
                                    })}

                                    disabled={!isEditing}

                                    className={inputStyle}
                                />

                                {errors.email && (

                                    <p className="text-sm text-rose-500">
                                        {errors.email.message}
                                    </p>

                                )}

                            </InputField>

                            <InputField label="Age" required>

                                <input
                                    type="number"

                                    {...register("age", {
                                        required: "Age is required",
                                        min: {
                                            value: 1,
                                            message: "Invalid age",
                                        },
                                    })}

                                    disabled={!isEditing}

                                    className={inputStyle}
                                />

                                {errors.age && (

                                    <p className="text-sm text-rose-500">
                                        {errors.age.message}
                                    </p>

                                )}

                            </InputField>

                            <InputField label="Gender" required>

                                <select
                                    {...register("gender", {
                                        required: "Gender is required",
                                    })}

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

                                {errors.gender && (

                                    <p className="text-sm text-rose-500">
                                        {errors.gender.message}
                                    </p>

                                )}

                            </InputField>

                        </div>

                        {/* =====================================================
                           LOCATION
                           ===================================================== */}

                        <SectionHeader
                            title="Location Details"
                            icon={
                                <MapPin size={16} />
                            }
                        />

                        <div
                            className="
                                grid grid-cols-1 gap-6

                                md:grid-cols-2
                            "
                        >

                            {/* COUNTRY */}

                            <InputField label="Country">

                                <div
                                    className="
                                        flex items-center gap-3

                                        rounded-xl

                                        border border-slate-200

                                        bg-slate-50

                                        px-4 py-3

                                        text-sm text-slate-700
                                    "
                                >

                                    {profile?.countryCode && (

                                        <ReactCountryFlag
                                            svg
                                            countryCode={
                                                profile.countryCode
                                            }
                                        />

                                    )}

                                    <span>

                                        {
                                            countryList()
                                                .getLabel(
                                                    profile?.countryCode || "IN"
                                                )
                                        }

                                    </span>

                                </div>

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

                        {/* =====================================================
                           SECURITY
                           ===================================================== */}

                        <SectionHeader
                            title="Security"
                            icon={
                                <Shield size={16} />
                            }
                        />

                        <div
                            className="
                                grid grid-cols-1 gap-6

                                md:grid-cols-2
                            "
                        >

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

                                    {...register("password", {
                                        minLength: {
                                            value: 6,
                                            message:
                                                "Password must be at least 6 characters",
                                        },
                                    })}

                                    disabled={!isEditing}

                                    className={`${inputStyle} pr-10`}
                                />

                                {errors.password && (

                                    <p className="text-sm text-rose-500">
                                        {errors.password.message}
                                    </p>

                                )}

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

                                    {...register("confirmPassword", {

                                        validate: (value) => {

                                            if (
                                                password &&
                                                value !== password
                                            ) {

                                                return "Passwords do not match";
                                            }

                                            return true;
                                        },
                                    })}

                                    disabled={!isEditing}

                                    className={`${inputStyle} pr-10`}
                                />

                                {errors.confirmPassword && (

                                    <p className="text-sm text-rose-500">
                                        {errors.confirmPassword.message}
                                    </p>

                                )}

                            </PasswordField>

                        </div>

                        {/* =====================================================
                           SAVE BAR
                           ===================================================== */}

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
                                        rounded-xl

                                        border border-slate-200

                                        bg-white

                                        px-5 py-3

                                        text-sm font-medium
                                        text-slate-700

                                        transition

                                        hover:bg-slate-50
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
                                        rounded-xl

                                        bg-[#1F2147]

                                        px-6 py-3

                                        text-sm font-medium
                                        text-white

                                        transition

                                        hover:bg-[#141633]
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

/* =====================================================
   SECTION HEADER
   ===================================================== */

function SectionHeader({
    title,
    icon,
}: any) {

    return (

        <div
            className="
                flex items-center gap-2

                border-b border-slate-100

                pb-3
            "
        >

            <div className="text-slate-500">
                {icon}
            </div>

            <h2
                className="
                    text-sm font-semibold

                    uppercase tracking-wide

                    text-slate-900
                "
            >

                {title}

            </h2>

        </div>
    );
}

/* =====================================================
   INPUT FIELD
   ===================================================== */

function InputField({
    label,
    required = false,
    children,
}: any) {

    return (

        <div className="space-y-2">

            <label
                className="
                    flex itmems-center gap-1

                    text-sm font-medium

                    text-slate-700
                "
            >

                {label}

                {required && (

                    <span className="text-rose-500">
                        *
                    </span>

                )}

            </label>

            {children}

        </div>
    );
}

/* =====================================================
   PASSWORD FIELD
   ===================================================== */

function PasswordField({
    label,
    show,
    toggle,
    children,
}: any) {

    return (

        <div className="space-y-2">

            <label
                className="
                    text-sm font-medium

                    text-slate-700
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
                        absolute right-3 top-3

                        text-slate-400

                        transition

                        hover:text-slate-600
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