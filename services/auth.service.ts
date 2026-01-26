import api from "@/lib/api";

export const AuthService = {
    register: (data: {
        name: string;
        email: string;
        password: string;
    }) => api.post("/auth/register", data),

    login: (data: {
        email: string;
        password: string;
    }) => api.post("/auth/login", data),

    logout: () => api.post("/auth/logout"),

    me: () => api.get("/auth/me"),
};
