import api from "@/lib/api";

import { API_ENDPOINTS }
    from "@/services/api-endpoints";

export const DoctorService = {

    /* ================= DOCTORS ================= */

    async getDoctors(params?: any) {

        const res = await api.get(
            API_ENDPOINTS.DOCTORS.ALL,
            {
                params,
            }
        );

        return res.data;
    },

    async createDoctor(formData: FormData) {

        const res = await api.post(
            API_ENDPOINTS.DOCTORS.CREATE,
            formData,
            {
                headers: {
                    "Content-Type":
                        "multipart/form-data",
                },
            }
        );

        return res.data;
    },

    async updateDoctor(
        id: string,
        formData: FormData
    ) {

        const res = await api.patch(
            API_ENDPOINTS.DOCTORS.UPDATE(id),
            formData,
            {
                headers: {
                    "Content-Type":
                        "multipart/form-data",
                },
            }
        );

        return res.data;
    },

    async approveDoctor(
        id: string,
        isApproved: boolean
    ) {

        const res = await api.patch(
            API_ENDPOINTS.DOCTORS.APPROVAL(id),
            {
                isApproved,
            }
        );

        return res.data;
    },

    async deleteDoctor(id: string) {

        const res = await api.delete(
            API_ENDPOINTS.DOCTORS.DELETE(id)
        );

        return res.data;
    },

    /* ================= LOOKUPS ================= */

    async getSpecialities() {

        const res = await api.get(
            API_ENDPOINTS.LOOKUPS.SPECIALITIES
        );

        return res.data;
    },

    async getLanguages() {

        const res = await api.get(
            API_ENDPOINTS.LOOKUPS.LANGUAGES
        );

        return res.data;
    },

    async getSubSpecialities(ids: string[]) {

        const res = await api.get(
            API_ENDPOINTS.LOOKUPS.SUB_SPECIALITIES,
            {
                params: {
                    ids: ids.join(","),
                },
            }
        );

        return res.data;
    },

    /* ================= PENDING ================= */

    async getPendingUpdates() {

        const res = await api.get(
            API_ENDPOINTS.DOCTORS.PENDING
        );

        return res.data;
    },

    async getPendingUpdateById(id: string) {

        const res = await api.get(
            API_ENDPOINTS.DOCTORS.PENDING_BY_ID(id)
        );

        return res.data;
    },

    async approveProfileUpdate(
        id: string,
        isApproved: boolean
    ) {

        const res = await api.patch(
            API_ENDPOINTS.DOCTORS.PROFILE_APPROVAL(id),
            {
                isApproved,
            }
        );

        return res.data;
    },
};