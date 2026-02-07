import AvailabilityForm from "./AvailabilityForm";
import ExistingAvailability from "./ExistingAvailability";

export default function DoctorAvailability() {
    return (
        <div className="max-w-7xl mx-auto space-y-6 pt-20 p-6">
            <AvailabilityForm />
            <ExistingAvailability />
        </div>
    );
}
