export const API_ENDPOINTS = {

    AUTH: {
        LOGIN: "/auth/login",
        REGISTER: "/auth/register",
        LOGOUT: "/auth/logout",
        ME: "/auth/me",
        REFRESH: "/auth/refresh",
    },

    APPOINTMENTS: {
        ALL: "/appointments",
        DOCTOR: "/appointments/doctor",
        BY_ID: (id: string) =>
            `/appointments/${id}`,
        MY: "/appointments/my",
    },

    ADMIN: {
        DOCTORS: "/admin/doctors",
    },

    ADMIN_DASHBOARD: {

        SUMMARY:
            "/admin/dashboard/summary",

        REVENUE_CHART:
            "/admin/dashboard/revenue-chart",

        RECENT_PAYMENTS:
            "/admin/dashboard/payments",

        TOP_DOCTORS:
            "/admin/dashboard/top-doctors",
    },

    DOCTORS: {

        ALL:
            "/admin/doctors",

        CREATE:
            "/admin/doctors",

        UPDATE: (id: string) =>
            `/admin/doctors/${id}`,

        APPROVAL: (id: string) =>
            `/doctor/${id}/approval`,

        DELETE: (id: string) =>
            `/doctor/${id}/delete`,

        PENDING:
            "/admin/doctors/pending",

        PENDING_BY_ID: (id: string) =>
            `/admin/doctors/pending/${id}`,

        PROFILE_APPROVAL: (id: string) =>
            `/doctor/${id}/approve`,
    },

    LOOKUPS: {

        SPECIALITIES:
            "/admin/lookup/specialities",

        LANGUAGES:
            "/admin/lookup/languages",

        SUB_SPECIALITIES:
            "/admin/sub-specialities/by-specialities",
    },

    MEDIKITS: {

        ALL:
            "/medikits",

        CREATE:
            "/medikits",

        DETAIL: (id: string) =>
            `/medikits/${id}`,

        UPDATE: (id: string) =>
            `/medikits/${id}`,

        DELETE: (id: string) =>
            `/medikits/${id}`,
    },

    ANALYTICS: {

        ADMIN:
            "/admin/payments/analytics",
    },
};