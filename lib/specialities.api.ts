import api from "./api";

/* =================================================
   USER APIs
================================================= */

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

/* =================================================
   ADMIN – SPECIALITIES
================================================= */

// 🔹 List all
export const getAdminSpecialities = async () => {
    const res = await api.get("/admin/specialities");
    return res.data;
};

// 🔹 Get single by ID
export const getAdminSpecialityById = async (id: string) => {
    const res = await api.get(`/admin/specialities/${id}`);
    return res.data;
};

// 🔹 Create
export const createSpeciality = async (data: {
    name: string;
}) => {
    const res = await api.post("/admin/specialities", data);
    return res.data;
};

// 🔹 Update
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

// 🔹 Toggle Status
export const toggleSpecialityStatus = async (
    id: string,
    isActive: boolean
) => {
    const res = await api.patch(`/admin/specialities/${id}/status`, {
        isActive,
    });
    return res.data;
};

/* =================================================
   ADMIN – SUB-SPECIALITIES
================================================= */

// 🔹 List subs under a speciality
export const getAdminSubSpecialities = async (
    specialityId: string
) => {
    const res = await api.get(
        `/admin/specialities/${specialityId}/sub-specialities`
    );
    return res.data;
};

// 🔹 Get single sub
export const getAdminSubSpecialityById = async (id: string) => {
    const res = await api.get(`/admin/sub-specialities/${id}`);
    return res.data;
};

// 🔹 Create sub
export const createSubSpeciality = async (data: {
    name: string;
    specialityId: string;
    description?: string;
    hasMiniLevel?: boolean;
}) => {
    const res = await api.post("/admin/sub-specialities", data);
    return res.data;
};

// 🔹 Update sub
export const updateSubSpeciality = async (
    id: string,
    data: Partial<{
        name: string;
        description: string;
        hasMiniLevel: boolean;
    }>
) => {
    const res = await api.patch(
        `/admin/sub-specialities/${id}`,
        data
    );
    return res.data;
};

// 🔹 Toggle sub status
export const toggleSubSpecialityStatus = async (
    id: string,
    isActive: boolean
) => {
    const res = await api.patch(
        `/admin/sub-specialities/${id}/status`,
        { isActive }
    );
    return res.data;
};