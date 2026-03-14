export const paymentLabel = (status: string) => {
    switch (status) {
        case "PAID":
            return "Paid";
        case "FAILED":
            return "Failed";
        case "PENDING":
            return "Pending";
        case "NOT_REQUIRED":
            return "Not Paid";
        default:
            return status;
    }
};

export function getApiError(err: any): string {
    if (err?.response?.data?.message) {
        if (Array.isArray(err.response.data.message)) {
            return err.response.data.message.join(", ");
        }
        return err.response.data.message;
    }

    return err?.message || "Something went wrong";
}