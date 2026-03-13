import AvailabilityForm from "./AvailabilityForm";
import ExistingAvailability from "./ExistingAvailability";

export default function DoctorAvailability() {
    return (
        <div className="max-w-7xl mx-auto space-y-6 p-3 pt-24 md:p-8">
            <AvailabilityForm />
            <ExistingAvailability />
        </div>
    );
}
