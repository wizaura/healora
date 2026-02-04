import api from "./api";

/* =========================
    USER APIs
========================= */

export const getActiveSpecialities = async () => {
    const res = await api.get("/specialities");
    return res.data;
};

export const getSpecialityBySlug = async (slug: string) => {
    const res = await api.get(`/specialities/${slug}`);
    return res.data;
};

export const getSubSpecialitiesBySlug = async (slug: string) => {
    const res = await api.get(`/specialities/${slug}/sub-specialities`);
    return res.data;
};

/* =========================
    ADMIN APIs
========================= */

export const getAdminSpecialities = async () => {
    const res = await api.get("/admin/specialities");
    return res.data;
};

export const createSpeciality = async (data: {
    name: string;
    description?: string;
    icon?: string;
}) => {
    const res = await api.post("/admin/specialities", data);
    return res.data;
};

export const updateSpeciality = async (
    id: string,
    data: Partial<{
        name: string;
        description: string;
        icon: string;
    }>
) => {
    const res = await api.patch(`/admin/specialities/${id}`, data);
    return res.data;
};

export const toggleSpecialityStatus = async (
    id: string,
    isActive: boolean
) => {
    const res = await api.patch(`/admin/specialities/${id}/status`, {
        isActive,
    });
    return res.data;
};

export const deleteSpeciality = async (id: string) => {
    const res = await api.delete(`/admin/specialities/${id}`);
    return res.data;
};

/* =========================
    SUB-SPECIALITIES (ADMIN)
========================= */
export const getAdminSubSpecialities = async (specialityId: string) => {
    const res = await api.get(
        `/admin/specialities/${specialityId}/sub-specialities`
    );
    return res.data;
};

export const createSubSpeciality = async (data: {
    name: string;
    specialityId: string;
}) => {
    const res = await api.post("/admin/sub-specialities", data);
    return res.data;
};

export const updateSubSpeciality = async (
    id: string,
    data: {
        name: string;
    }
) => {
    const res = await api.patch(`/admin/sub-specialities/${id}`, data);
    return res.data;
};


export const toggleSubSpecialityStatus = async (
    id: string,
    isActive: boolean
) => {
    const res = await api.patch(`/admin/sub-specialities/${id}/status`, {
        isActive,
    });
    return res.data;
};