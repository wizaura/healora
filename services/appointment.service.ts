import api from "@/lib/api";

import { API_ENDPOINTS }
    from "@/services/api-endpoints";

type AppointmentParams = {
    page?: number;
    limit?: number;

    status?: string;
    paymentStatus?: string;

    doctorId?: string;

    from?: string;
    to?: string;

    search?: string;

    sort?: string;
};

export const AppointmentService = {

    /* ---------------- ADMIN ---------------- */

    async getAll(
        params?: AppointmentParams
    ) {

        const res = await api.get(
            API_ENDPOINTS.APPOINTMENTS.ALL,
            {
                params,
            }
        );

        return res.data;
    },

    /* ---------------- DOCTOR ---------------- */

    async getDoctorAppointments(
        params?: AppointmentParams
    ) {

        const res = await api.get(
            API_ENDPOINTS.APPOINTMENTS.DOCTOR,
            {
                params,
            }
        );

        return res.data;
    },

    /* ---------------- USER ---------------- */

    async getMyAppointments(
        params?: AppointmentParams
    ) {

        const res = await api.get(
            API_ENDPOINTS.APPOINTMENTS.MY,
            {
                params,
            }
        );

        return res.data;
    },

    /* ---------------- SINGLE ---------------- */

    async getById(id: string) {

        const res = await api.get(
            API_ENDPOINTS.APPOINTMENTS.BY_ID(id)
        );

        return res.data;
    },

    /* ---------------- DOCTORS ---------------- */

    async getDoctors() {

        const res = await api.get(
            API_ENDPOINTS.ADMIN.DOCTORS
        );

        return res.data;
    },
};