// "use client";

// import { Globe, Flag } from "lucide-react";

// export default function PaymentMethodCard({
//     paymentMethod,
//     setPaymentMethod,
// }: any) {
//     return (
//         <section className="rounded-2xl max-h-[60vh] bg-white shadow-sm border border-gray-100 p-8">
//             <div className="mx-auto max-w-lg">

//                 <h2 className="text-2xl font-semibold text-navy">
//                     Choose payment method
//                 </h2>

//                 <div className="mt-8 space-y-4 text-center">

//                     {/* Razorpay - India */}
//                     <Option
//                         selected={paymentMethod === "RAZORPAY"}
//                         icon={<Flag size={16} />}
//                         title="Razorpay"
//                         tag="India"
//                         desc="UPI, Cards, NetBanking (Domestic payments)"
//                         onClick={() => setPaymentMethod("RAZORPAY")}
//                     />

//                     {/* Stripe - International */}
//                     <Option
//                         selected={paymentMethod === "STRIPE"}
//                         icon={<Globe size={16} />}
//                         title="Stripe"
//                         tag="International"
//                         desc="Cards & global payments"
//                         onClick={() => setPaymentMethod("STRIPE")}
//                     />
//                 </div>
//             </div>
//         </section>
//     );
// }

// function Option({
//     selected,
//     title,
//     desc,
//     onClick,
//     tag,
//     icon,
// }: {
//     selected: boolean;
//     title: string;
//     desc: string;
//     onClick: () => void;
//     tag: string;
//     icon: React.ReactNode;
// }) {
//     return (
//         <button
//             onClick={onClick}
//             className={`
//                 w-full rounded-2xl border px-6 py-5 text-left transition-all
//                 ${selected
//                     ? "border-navy bg-navy/5 shadow-sm"
//                     : "border-gray-200 bg-white hover:bg-gray-50"
//                 }
//             `}
//         >
//             <div className="flex items-center justify-between">
//                 <div>
//                     <div className="flex items-center gap-2">
//                         <span className="text-navy">{icon}</span>
//                         <p className="font-semibold text-navy">{title}</p>
//                         <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
//                             {tag}
//                         </span>
//                     </div>
//                     <p className="text-sm text-navy/60 mt-1">{desc}</p>
//                 </div>

//                 {selected && (
//                     <span className="text-xs font-medium text-navy">
//                         Selected
//                     </span>
//                 )}
//             </div>
//         </button>
//     );
// }

"use client";

import {
    Copy,
    Flag,
    Globe,
    QrCode,
} from "lucide-react";

import toast from "react-hot-toast";

const UPI_ID =
    "drdilrajm94-1@okaxis";

export default function PaymentMethodCard({
    paymentMethod,
    setPaymentMethod,
}: any) {

    const copyUPI = async () => {

        try {

            await navigator
                .clipboard
                .writeText(
                    UPI_ID
                );

            toast.success(
                "UPI ID copied"
            );

        } catch {

            toast.error(
                "Failed to copy UPI ID"
            );
        }
    };

    return (

        <section
            className="
                rounded-2xl

                border border-gray-100

                bg-white

                p-8

                shadow-sm
            "
        >

            <div
                className="
                    mx-auto
                    max-w-lg
                "
            >

                <h2
                    className="
                        text-2xl
                        font-semibold
                        text-navy
                    "
                >

                    Choose payment method

                </h2>

                <div
                    className="
                        mt-8
                        space-y-4
                        text-center
                    "
                >

                    {/* =====================================================
                       UPI MANUAL
                       ===================================================== */}

                    <div
                        className="
                            rounded-2xl

                            border border-green-100

                            bg-green-50

                            p-6

                            text-left
                        "
                    >

                        <div
                            className="
                                flex items-center
                                gap-2
                            "
                        >

                            <QrCode
                                size={18}
                                className="
                                    text-green-700
                                "
                            />

                            <h3
                                className="
                                    font-semibold
                                    text-green-900
                                "
                            >

                                Direct UPI Payment

                            </h3>

                        </div>

                        <p
                            className="
                                mt-2

                                text-sm
                                leading-relaxed

                                text-green-800/80
                            "
                        >

                            Please copy the
                            UPI ID below and
                            complete payment
                            using any UPI app
                            like Google Pay,
                            PhonePe or Paytm.

                        </p>

                        <div
                            className="
                                mt-4

                                flex items-center
                                justify-between

                                rounded-xl

                                border border-green-200

                                bg-white

                                px-4 py-3
                            "
                        >

                            <p
                                className="
                                    text-sm
                                    font-semibold
                                    text-green-900
                                "
                            >

                                {UPI_ID}

                            </p>

                            <button
                                onClick={
                                    copyUPI
                                }

                                className="
                                    flex items-center
                                    gap-1

                                    rounded-lg

                                    bg-navy

                                    px-3 py-1.5

                                    text-xs
                                    font-medium

                                    text-white

                                    transition

                                    hover:bg-navy-dark
                                "
                            >

                                <Copy
                                    size={14}
                                />

                                Copy

                            </button>

                        </div>

                    </div>

                    {/* =====================================================
                       STRIPE
                       ===================================================== */}

                    <Option
                        selected={
                            paymentMethod ===
                            "STRIPE"
                        }

                        icon={
                            <Globe size={16} />
                        }

                        title="Stripe"

                        tag="International"

                        desc="Cards & global payments"

                        onClick={() =>
                            setPaymentMethod(
                                "STRIPE"
                            )
                        }
                    />

                    {/* =====================================================
                       RAZORPAY
                       ===================================================== */}

                    <button
                        disabled

                        className="
                            w-full

                            cursor-not-allowed

                            rounded-2xl

                            border border-gray-200

                            bg-gray-50

                            px-6 py-5

                            text-left

                            opacity-70
                        "
                    >

                        <div
                            className="
                                flex items-center
                                justify-between
                            "
                        >

                            <div>

                                <div
                                    className="
                                        flex items-center
                                        gap-2
                                    "
                                >

                                    <span className="text-navy">
                                        <Flag size={16} />
                                    </span>

                                    <p
                                        className="
                                            font-semibold
                                            text-navy
                                        "
                                    >

                                        Razorpay

                                    </p>

                                    <span
                                        className="
                                            rounded-full

                                            bg-yellow-100

                                            px-2 py-1

                                            text-xs

                                            text-yellow-700
                                        "
                                    >

                                        Coming Soon

                                    </span>

                                </div>

                                <p
                                    className="
                                        mt-1

                                        text-sm
                                        text-navy/60
                                    "
                                >

                                    UPI, Cards &
                                    NetBanking

                                </p>

                            </div>

                        </div>

                    </button>


                </div>

            </div>

        </section>
    );
}

function Option({
    selected,
    title,
    desc,
    onClick,
    tag,
    icon,
}: {
    selected: boolean;
    title: string;
    desc: string;
    onClick: () => void;
    tag: string;
    icon: React.ReactNode;
}) {

    return (

        <button
            onClick={onClick}

            className={`
                w-full

                rounded-2xl

                border

                px-6 py-5

                text-left

                transition-all

                ${selected

                    ? `
                        border-navy
                        bg-navy/5
                        shadow-sm
                    `

                    : `
                        border-gray-200
                        bg-white
                        hover:bg-gray-50
                    `
                }
            `}
        >

            <div
                className="
                    flex items-center
                    justify-between
                "
            >

                <div>

                    <div
                        className="
                            flex items-center
                            gap-2
                        "
                    >

                        <span className="text-navy">
                            {icon}
                        </span>

                        <p
                            className="
                                font-semibold
                                text-navy
                            "
                        >

                            {title}

                        </p>

                        <span
                            className="
                                rounded-full

                                bg-gray-100

                                px-2 py-1

                                text-xs

                                text-gray-600
                            "
                        >

                            {tag}

                        </span>

                    </div>

                    <p
                        className="
                            mt-1

                            text-sm
                            text-navy/60
                        "
                    >

                        {desc}

                    </p>

                </div>

                {selected && (

                    <span
                        className="
                            text-xs
                            font-medium
                            text-navy
                        "
                    >

                        Selected

                    </span>
                )}

            </div>

        </button>
    );
}