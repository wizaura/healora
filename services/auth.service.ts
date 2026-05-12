import api from "@/lib/api";

import { API_ENDPOINTS }
    from "./api-endpoints";

export const AuthService = {

    async register(data: {
        name: string;
        email: string;
        password: string;
    }) {

        const res = await api.post(
            API_ENDPOINTS.AUTH.REGISTER,
            data
        );

        return res.data;
    },

    async login(data: {
        email: string;
        password: string;
    }) {

        const res = await api.post(
            API_ENDPOINTS.AUTH.LOGIN,
            data
        );

        return res.data;
    },

    async logout() {

        const res = await api.post(
            API_ENDPOINTS.AUTH.LOGOUT
        );

        return res.data;
    },

    async me() {

        const res = await api.get(
            API_ENDPOINTS.AUTH.ME
        );

        return res.data;
    },

    async refresh() {

        const res = await api.post(
            API_ENDPOINTS.AUTH.REFRESH
        );

        return res.data;
    },
};