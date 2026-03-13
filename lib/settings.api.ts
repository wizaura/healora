import api from "./api";

export async function updateSettings(data: any) {
    const res = await api.patch("/auth/settings", data);
    return res.data;
}