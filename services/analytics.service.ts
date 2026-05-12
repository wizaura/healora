import api from "@/lib/api";

import { API_ENDPOINTS }
    from "@/services/api-endpoints";

export const AnalyticsService = {

    async getAnalytics(params: {
        range: "daily" | "weekly" | "monthly";
        doctorId?: string;
    }) {

        const res = await api.get(
            API_ENDPOINTS.ANALYTICS.ADMIN,
            {
                params,
            }
        );

        return res.data;
    },
};