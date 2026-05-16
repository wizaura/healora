"use client";

import { useMemo, useState } from "react";

import {
    useMutation,
    useQuery,
} from "@tanstack/react-query";

import api from "@/lib/api";

import toast from "react-hot-toast";

import UserModal from "./UserModal";
import AdminReviews from "./Reviews";

import {
    Users,
    Eye,
    ChevronLeft,
    ChevronRight,
    Search,
    MessageSquare,
} from "lucide-react";

import SelectOption from "@/components/common/SelectOption";
import Loader from "@/components/common/Loader";
import { useRouter } from "next/navigation";

export default function AdminUsers() {

    const router = useRouter();

    const [selectedUser, setSelectedUser] =
        useState<any>(null);

    const [confirmBlock, setConfirmBlock] =
        useState(false);

    const [showReviews, setShowReviews] =
        useState(false);

    /* =====================================================
       FILTERS
       ===================================================== */

    const [search, setSearch] =
        useState("");

    const [status, setStatus] =
        useState("");

    const [sort, setSort] =
        useState("new");

    /* =====================================================
       PAGINATION
       ===================================================== */

    const [page, setPage] =
        useState(1);

    const limit = 10;

    /* =====================================================
       USERS
       ===================================================== */

    const {
        data,
        isLoading,
        refetch,
        isFetching,
        error,
    } = useQuery({

        queryKey: [
            "admin-users",
            search,
            status,
            sort,
            page,
        ],

        queryFn: async () => {

            const res =
                await api.get(
                    "/admin/users",
                    {
                        params: {
                            search,
                            status,
                            sort,
                            page,
                            limit,
                        },
                    }
                );

            return res.data;
        },

        staleTime: 0,

        refetchOnWindowFocus: false,
    });

    /* =====================================================
       RESPONSE
       ===================================================== */

    const users =
        Array.isArray(data?.users)
            ? data.users
            : [];

    const pagination =
        data?.pagination || {

            total: 0,

            page: 1,

            limit: 10,

            totalPages: 1,

            hasNext: false,

            hasPrev: false,
        };

    const totalPages =
        pagination?.totalPages || 1;

    /* =====================================================
       BLOCK
       ===================================================== */

    const blockMutation =
        useMutation({

            mutationFn:
                async ({
                    userId,
                    isBlocked,
                }: any) => {

                    await api.patch(
                        `/admin/users/${userId}/status`,
                        { isBlocked }
                    );
                },

            onSuccess: () => {

                toast.success(
                    "User updated"
                );

                refetch();
            },
        });

    /* =====================================================
       UI
       ===================================================== */

    if (isFetching) {
        return <Loader fullScreen />
    }

    return (

        <div className="space-y-8">

            {/* =====================================================
               HERO HEADER
               ===================================================== */}

            <div
                className="
                    overflow-hidden

                    rounded-2xl

                    border border-slate-200

                    bg-white

                    shadow-sm
                "
            >

                <div
                    className="
                        border-b border-slate-200

                        bg-gradient-to-r
                        from-teal-50
                        via-cyan-50
                        to-white

                        px-8 py-7
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

                        <div>

                            <div
                                className="
                                    inline-flex items-center gap-2

                                    rounded-full

                                    border border-teal-100

                                    bg-white

                                    px-3 py-1

                                    text-xs font-semibold

                                    uppercase tracking-wide

                                    text-teal-700
                                "
                            >

                                User Management

                            </div>

                            <h1
                                className="
                                    mt-4

                                    text-3xl font-semibold

                                    tracking-[-0.03em]

                                    text-slate-900
                                "
                            >

                                Platform Users

                            </h1>

                            <p
                                className="
                                    mt-2

                                    max-w-2xl

                                    text-sm leading-6

                                    text-slate-500
                                "
                            >

                                Manage users, monitor activity,
                                review account status,
                                and moderate platform access.

                            </p>

                        </div>

                        {/* ACTIONS */}

                        <div
                            className="
                                flex flex-wrap gap-3
                            "
                        >

                            <button
                                onClick={() => {

                                    const next =
                                        !showReviews;

                                    setShowReviews(next);

                                    if (next) {

                                        router.push(
                                            "/admin/users#reviews"
                                        );

                                    } else {

                                        router.push(
                                            "/admin/users"
                                        );
                                    }
                                }}

                                className={`
                                    inline-flex items-center gap-2

                                    rounded-lg

                                    px-5 py-3

                                    text-sm font-semibold

                                    transition-all duration-200

                                    ${showReviews

                                        ? `
                                            bg-slate-900
                                            text-white
                                        `

                                        : `
                                            border border-slate-200
                                            bg-white
                                            text-slate-700
                                            hover:bg-slate-50
                                        `
                                    }
                                `}
                            >

                                <MessageSquare size={16} />

                                {showReviews
                                    ? "Hide Reviews"
                                    : "Reviews"}

                            </button>

                        </div>

                    </div>

                </div>

            </div>

            {/* =====================================================
               STATS
               ===================================================== */}

            <div
                className="
                    grid grid-cols-1 gap-5

                    md:grid-cols-3
                "
            >

                <StatCard
                    title="Total Users"
                    value={users.length}
                    icon={<Users size={18} />}
                />

                <StatCard
                    title="Active Users"
                    value={
                        users.filter(
                            (u: any) =>
                                !u.isBlocked
                        ).length
                    }
                    icon={<Eye size={18} />}
                />

                <StatCard
                    title="Blocked Users"
                    value={
                        users.filter(
                            (u: any) =>
                                u.isBlocked
                        ).length
                    }
                    icon={<Users size={18} />}
                />

            </div>

            {/* =====================================================
               FILTERS
               ===================================================== */}

            <div
                className="
                    rounded-2xl

                    border border-slate-200

                    bg-white

                    p-6

                    shadow-sm
                "
            >

                <div
                    className="
                        flex flex-col gap-5

                        lg:flex-row
                        lg:items-end
                    "
                >

                    {/* SEARCH */}

                    <div className="flex-1">

                        <label
                            className="
                                mb-2 block

                                text-sm font-medium

                                text-slate-700
                            "
                        >

                            Search Users

                        </label>

                        <div className="relative">

                            <Search
                                size={16}

                                className="
                                    absolute left-4 top-4

                                    text-slate-400
                                "
                            />

                            <input
                                type="text"

                                placeholder="
Search by name or email
                                "

                                value={search}

                                onChange={(e) => {

                                    setPage(1);

                                    setSearch(
                                        e.target.value
                                    );
                                }}

                                className="
                                    w-full

                                    rounded-lg

                                    border border-slate-200

                                    bg-white

                                    py-3.5 pl-11 pr-4

                                    text-sm

                                    shadow-sm

                                    transition-all duration-200

                                    focus:outline-none
                                    focus:ring-4
                                    focus:ring-teal-500/10
                                    focus:border-teal-500
                                "
                            />

                        </div>

                    </div>

                    {/* STATUS */}

                    <div>

                        <label
                            className="
                                mb-2 block

                                text-sm font-medium

                                text-slate-700
                            "
                        >

                            Status

                        </label>

                        <SelectOption
                            value={status}

                            onChange={(v) => {

                                setPage(1);

                                setStatus(v);
                            }}

                            className="w-[180px]"

                            placeholder="All Status"

                            options={[
                                {
                                    label: "All",
                                    value: "",
                                },
                                {
                                    label: "Active",
                                    value: "active",
                                },
                                {
                                    label: "Blocked",
                                    value: "blocked",
                                },
                            ]}
                        />

                    </div>

                    {/* SORT */}

                    <div>

                        <label
                            className="
                                mb-2 block

                                text-sm font-medium

                                text-slate-700
                            "
                        >

                            Sort

                        </label>

                        <SelectOption
                            value={sort}

                            onChange={(v) => {

                                setPage(1);

                                setSort(v);
                            }}

                            className="w-[200px]"

                            options={[
                                {
                                    label: "Newest",
                                    value: "new",
                                },
                                {
                                    label: "Oldest",
                                    value: "old",
                                },
                                {
                                    label: "Most Visits",
                                    value: "visits",
                                },
                            ]}
                        />

                    </div>

                </div>

            </div>

            {/* =====================================================
               TABLE
               ===================================================== */}

            <div
                className="
                    overflow-hidden

                    rounded-2xl

                    border border-slate-200

                    bg-white

                    shadow-sm
                "
            >

                {/* HEADER */}

                <div
                    className="
                        flex items-center justify-between

                        border-b border-slate-200

                        px-7 py-5
                    "
                >

                    <div>

                        <h2
                            className="
                                text-xl font-semibold

                                text-slate-900
                            "
                        >

                            Users

                        </h2>

                        <p
                            className="
                                mt-1

                                text-sm

                                text-slate-500
                            "
                        >

                            {data.length} users found

                        </p>

                    </div>

                </div>

                {/* TABLE */}

                {isLoading ? (

                    <div
                        className="
                            p-10

                            text-center

                            text-sm text-slate-500
                        "
                    >

                        Loading users...

                    </div>

                ) : (

                    <>
                        <div className="overflow-x-auto">

                            <table className="w-full text-sm">

                                <thead
                                    className="
                                        bg-slate-50
                                    "
                                >

                                    <tr>

                                        <Th>User</Th>

                                        <Th>Role</Th>

                                        <Th>Visits</Th>

                                        <Th>Joined</Th>

                                        <Th>Status</Th>

                                        <Th align="right">
                                            Action
                                        </Th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {users.map(
                                        (user: any) => (

                                            <tr
                                                key={user.id}

                                                className="
                                                    border-t border-slate-200

                                                    transition

                                                    hover:bg-slate-50/70
                                                "
                                            >

                                                {/* USER */}

                                                <Td>

                                                    <div
                                                        className="
                                                            flex items-center gap-4
                                                        "
                                                    >

                                                        <div
                                                            className="
                                                                flex h-12 w-12
                                                                items-center justify-center

                                                                rounded-2xl

                                                                bg-gradient-to-br
                                                                from-teal-500
                                                                to-cyan-500

                                                                text-sm font-semibold
                                                                text-white
                                                            "
                                                        >

                                                            {user.name?.charAt(0)}

                                                        </div>

                                                        <div>

                                                            <p
                                                                className="
                                                                    font-semibold

                                                                    text-slate-900
                                                                "
                                                            >

                                                                {user.name}

                                                            </p>

                                                            <p
                                                                className="
                                                                    mt-1

                                                                    text-xs

                                                                    text-slate-500
                                                                "
                                                            >

                                                                {user.email}

                                                            </p>

                                                        </div>

                                                    </div>

                                                </Td>

                                                {/* ROLE */}

                                                <Td>
                                                    {user.role}
                                                </Td>

                                                {/* VISITS */}

                                                <Td>
                                                    {user.appointmentCount}
                                                </Td>

                                                {/* DATE */}

                                                <Td>

                                                    {new Date(
                                                        user.createdAt
                                                    ).toLocaleDateString()}

                                                </Td>

                                                {/* STATUS */}

                                                <Td>

                                                    <span
                                                        className={`
                                                            inline-flex items-center

                                                            rounded-full

                                                            px-3 py-1

                                                            text-xs font-medium

                                                            ${user.isBlocked

                                                                ? `
                                                                    bg-red-100
                                                                    text-red-600
                                                                `

                                                                : `
                                                                    bg-green-100
                                                                    text-green-600
                                                                `
                                                            }
                                                        `}
                                                    >

                                                        {user.isBlocked
                                                            ? "Blocked"
                                                            : "Active"}

                                                    </span>

                                                </Td>

                                                {/* ACTION */}

                                                <Td align="right">

                                                    <div className="flex justify-end gap-2">

                                                        {/* VIEW */}

                                                        <button
                                                            onClick={() =>
                                                                router.push(
                                                                    `/admin/users/${user.id}`
                                                                )
                                                            }

                                                            className="
                rounded-xl

                border border-slate-200

                bg-white

                px-4 py-2

                text-sm font-medium

                text-slate-700

                transition

                hover:bg-slate-100
            "
                                                        >

                                                            View

                                                        </button>

                                                        {/* BLOCK / UNBLOCK */}

                                                        <button
                                                            onClick={() => {

                                                                setSelectedUser(user);

                                                                setConfirmBlock(true);
                                                            }}

                                                            className={`
                rounded-xl

                px-4 py-2

                text-sm font-medium

                transition

                ${user.isBlocked

                                                                    ? `
                        border border-green-200
                        bg-green-50
                        text-green-700

                        hover:bg-green-100
                    `

                                                                    : `
                        border border-red-200
                        bg-red-50
                        text-red-700

                        hover:bg-red-100
                    `
                                                                }
            `}
                                                        >

                                                            {user.isBlocked
                                                                ? "Unblock"
                                                                : "Block"}

                                                        </button>

                                                    </div>

                                                </Td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                        {/* PAGINATION */}

                        {totalPages > 1 && (

                            <div
                                className="
                                    flex flex-col gap-4

                                    border-t border-slate-200

                                    px-6 py-5

                                    md:flex-row
                                    md:items-center
                                    md:justify-between
                                "
                            >

                                <p
                                    className="
                                        text-sm

                                        text-slate-500
                                    "
                                >

                                    Page {page} of {totalPages}

                                </p>

                                <div
                                    className="
                                        flex items-center gap-2
                                    "
                                >

                                    <button
                                        disabled={page === 1}

                                        onClick={() =>
                                            setPage(
                                                page - 1
                                            )
                                        }

                                        className="
                                            flex h-10 w-10
                                            items-center justify-center

                                            rounded-xl

                                            border border-slate-200

                                            bg-white

                                            transition

                                            hover:bg-slate-50

                                            disabled:opacity-40
                                        "
                                    >

                                        <ChevronLeft size={16} />

                                    </button>

                                    <button
                                        disabled={
                                            page === totalPages
                                        }

                                        onClick={() =>
                                            setPage(
                                                page + 1
                                            )
                                        }

                                        className="
                                            flex h-10 w-10
                                            items-center justify-center

                                            rounded-xl

                                            border border-slate-200

                                            bg-white

                                            transition

                                            hover:bg-slate-50

                                            disabled:opacity-40
                                        "
                                    >

                                        <ChevronRight size={16} />

                                    </button>

                                </div>

                            </div>

                        )}

                    </>

                )}

            </div>


            {/* =====================================================
               REVIEWS
               ===================================================== */}

            {showReviews && (

                <div
                    className="
                        rounded-3xl

                        border border-slate-200

                        bg-white

                        p-6

                        shadow-sm
                    "
                >

                    <AdminReviews />

                </div>

            )}

            {/* =====================================================
   BLOCK CONFIRM
   ===================================================== */}

            {confirmBlock && selectedUser && (

                <div
                    className="
            fixed inset-0 z-50

            flex items-center justify-center

            bg-black/40

            backdrop-blur-sm
        "
                >

                    <div
                        className="
                w-full max-w-md

                rounded-3xl

                border border-slate-200

                bg-white

                p-7

                shadow-2xl
            "
                    >

                        <h3
                            className="
                    text-xl font-semibold

                    text-slate-900
                "
                        >

                            {selectedUser.isBlocked
                                ? "Unblock User?"
                                : "Block User?"}

                        </h3>

                        <p
                            className="
                    mt-3

                    text-sm leading-6

                    text-slate-500
                "
                        >

                            {selectedUser.isBlocked

                                ? `
                        This user will regain access
                        to the platform.
                    `

                                : `
                        This user will lose access
                        to the platform immediately.
                    `
                            }

                        </p>

                        <div
                            className="
                    mt-7

                    flex justify-end gap-3
                "
                        >

                            <button
                                onClick={() => {

                                    setConfirmBlock(false);

                                    setSelectedUser(null);
                                }}

                                className="
                        rounded-xl

                        border border-slate-200

                        bg-white

                        px-5 py-2.5

                        text-sm font-medium

                        text-slate-700

                        transition

                        hover:bg-slate-100
                    "
                            >

                                Cancel

                            </button>

                            <button
                                disabled={
                                    blockMutation.isPending
                                }

                                onClick={() => {

                                    blockMutation.mutate({

                                        userId:
                                            selectedUser.id,

                                        isBlocked:
                                            !selectedUser.isBlocked,
                                    });

                                    setConfirmBlock(false);
                                }}

                                className={`
                        rounded-xl

                        px-5 py-2.5

                        text-sm font-semibold

                        text-white

                        transition

                        ${selectedUser.isBlocked

                                        ? `
                                bg-green-600
                                hover:bg-green-700
                            `

                                        : `
                                bg-red-600
                                hover:bg-red-700
                            `
                                    }
                    `}
                            >

                                {blockMutation.isPending

                                    ? "Please wait..."

                                    : selectedUser.isBlocked
                                        ? "Unblock User"
                                        : "Block User"
                                }

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}

/* =====================================================
   HELPERS
   ===================================================== */

function StatCard({
    title,
    value,
    icon,
}: any) {

    return (

        <div
            className="
                rounded-xl

                border border-slate-200

                bg-white

                p-6

                shadow-sm
            "
        >

            <div
                className="
                    flex h-11 w-11
                    items-center justify-center

                    rounded-xl

                    bg-teal-50

                    text-teal-600
                "
            >

                {icon}

            </div>

            <p
                className="
                    mt-4

                    text-sm

                    text-slate-500
                "
            >

                {title}

            </p>

            <p
                className="
                    mt-2

                    text-3xl font-semibold

                    text-slate-900
                "
            >

                {value}

            </p>

        </div>

    );
}

function Th({
    children,
    align = "left",
}: any) {

    return (

        <th
            className={`
                px-6 py-4

                text-${align}

                font-medium

                text-slate-600
            `}
        >

            {children}

        </th>

    );
}

function Td({
    children,
    align = "left",
}: any) {

    return (

        <td
            className={`
                px-6 py-4

                text-${align}

                text-slate-700
            `}
        >

            {children}

        </td>

    );
}