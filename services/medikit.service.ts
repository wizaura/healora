import api from "@/lib/api";

import { API_ENDPOINTS }
    from "@/services/api-endpoints";

export const MedikitService = {

    async getAll() {

        const res = await api.get(
            API_ENDPOINTS.MEDIKITS.ALL
        );

        return res.data;
    },

    async getById(id: string) {

        const res = await api.get(
            API_ENDPOINTS.MEDIKITS.DETAIL(id)
        );

        return res.data;
    },

    async create(formData: FormData) {

        const res = await api.post(
            API_ENDPOINTS.MEDIKITS.CREATE,
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

    async update(
        id: string,
        formData: FormData
    ) {

        const res = await api.patch(
            API_ENDPOINTS.MEDIKITS.UPDATE(id),
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

    async delete(id: string) {

        const res = await api.delete(
            API_ENDPOINTS.MEDIKITS.DELETE(id)
        );

        return res.data;
    },
};