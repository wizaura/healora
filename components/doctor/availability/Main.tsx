import AvailabilityForm from "./AvailabilityForm";
import ExistingAvailability from "./ExistingAvailability";

export default function DoctorAvailability() {
    return (
        <div className="max-w-2xl mx-auto space-y-6 pt-20">
            <AvailabilityForm />
            <ExistingAvailability />
        </div>
    );
}
