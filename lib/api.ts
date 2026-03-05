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
    (response) => response,
    (error) => {
        if (error.response?.data?.message) {
            error.message = Array.isArray(error.response.data.message)
                ? error.response.data.message.join(", ")
                : error.response.data.message;
        }

        return Promise.reject(error);
    }
);


export default api;
