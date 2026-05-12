import api from "@/lib/api";

import { API_ENDPOINTS }
    from "@/services/api-endpoints";

export const AdminDashboardService = {

    async getSummary() {

        const res = await api.get(
            API_ENDPOINTS.ADMIN_DASHBOARD.SUMMARY
        );

        return res.data;
    },

    async getRevenueChart(range: string) {

        const res = await api.get(
            API_ENDPOINTS.ADMIN_DASHBOARD.REVENUE_CHART,
            {
                params: { range },
            }
        );

        return res.data;
    },

    async getRecentPayments() {

        const res = await api.get(
            API_ENDPOINTS.ADMIN_DASHBOARD.RECENT_PAYMENTS
        );

        return res.data;
    },

    async getTopDoctors() {

        const res = await api.get(
            API_ENDPOINTS.ADMIN_DASHBOARD.TOP_DOCTORS
        );

        return res.data;
    },
};