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