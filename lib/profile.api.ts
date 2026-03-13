import api from "./api";

export async function getProfile(id: string) {
    const res = await api.get(`/auth/profile`);
    return res.data;
}