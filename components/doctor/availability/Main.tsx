import AvailabilityForm from "./AvailabilityForm";
import ExistingAvailability from "./ExistingAvailability";
import GoogleCalenderSetup from "./GoogleCalenderSetup";
import ZoomSetup from "./ZoomSetup";

export default function DoctorAvailability() {
    return (
        <div className="max-w-7xl mx-auto space-y-6 p-3 pt-12 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 mx-auto justify-center">
                <GoogleCalenderSetup />
                <ZoomSetup />
            </div>
            <AvailabilityForm />
            <ExistingAvailability />
        </div>
    );
}
