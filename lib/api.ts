import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
    withCredentials: true, // 🔐 VERY IMPORTANT (cookies)
    headers: {
        "Content-Type": "application/json",
    },
});

// Optional: response interceptor
api.interceptors.response.use(
    (res) => res,
    (error) => {
        const message =
            error?.response?.data?.message ||
            error?.message ||
            "Something went wrong";

        return Promise.reject({
            ...error,
            friendlyMessage: Array.isArray(message)
                ? message.join(", ")
                : message,
        });
    }
);

export default api;
