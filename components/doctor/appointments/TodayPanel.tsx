export default function TodayPanel({ appointments }: any) {
    const today = new Date();

    const todayAppointments = appointments
        .filter((appt: any) => {
            const date = new Date(appt.slot.startTimeUTC);
            return (
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear()
            );
        })
        .sort(
            (a: any, b: any) =>
                new Date(a.slot.startTimeUTC).getTime() -
                new Date(b.slot.startTimeUTC).getTime()
        );

    return (
        <div className="px-6 py-3">
            <h2 className="font-semibold mb-3">Today</h2>
            {todayAppointments.length === 0 ? (
                <p className="text-sm text-gray-500">No appointments today</p>
            ) : (
                <div className="space-y-2">
                    {todayAppointments.map((appt: any) => (
                        <div key={appt.id} className="p-3 border rounded-xl text-sm">
                            <div className="font-medium">
                                {new Date(appt.slot.startTimeUTC).toLocaleTimeString(
                                    "en-IN",
                                    { hour: "2-digit", minute: "2-digit" }
                                )}
                            </div>
                            <div>{appt.user?.name}</div>
                            <div className="text-xs text-gray-500">
                                {appt.status}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
