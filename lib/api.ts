import axios from "axios";

const api = axios.create({
    baseURL:
        process.env.NEXT_PUBLIC_API_URL ||
        "http://localhost:4000",

    withCredentials: true,

    headers: {
        "Content-Type": "application/json",
    },
});

let isRefreshing = false;
let isRedirecting = false;

api.interceptors.response.use(

    (response) => response,

    async (error) => {

        const originalRequest = error.config;

        // prevent refresh loop
        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url?.includes("/auth/refresh")
        ) {

            originalRequest._retry = true;

            try {

                // avoid multiple refresh calls
                if (!isRefreshing) {

                    isRefreshing = true;

                    await axios.post(
                        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
                        {},
                        {
                            withCredentials: true,
                        }
                    );

                    isRefreshing = false;
                }

                return api(originalRequest);

            } catch (refreshError) {

                isRefreshing = false;

                // prevent infinite redirect
                if (
                    typeof window !== "undefined" &&
                    !isRedirecting
                ) {

                    isRedirecting = true;

                    return Promise.reject(refreshError);
                }

                return Promise.reject(refreshError);
            }
        }

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