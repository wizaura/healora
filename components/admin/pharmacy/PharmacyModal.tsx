"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  CheckCheck,
  CheckCircle2,
  Clock3,
  PackageCheck,
  Phone,
  Truck,
  Wallet,
  X,
} from "lucide-react";

import api from "@/lib/api";
import toast from "react-hot-toast";

export default function PharmacyModal({
  data,
  onClose,
  onSubmit,
}: any) {

  const user =
    data.appointment.user;

  const slot =
    data.appointment.slot;

  const address =
    data.appointment.deliveryAddress;

  const UserCurrency =
    data.appointment.currency;

  const deliveryType =
    data.appointment.deliveryType;

  const isPaid =
    data.paymentStatus ===
    "PAID";

  const isInvoice =
    !!data.totalAmount;

  const [items, setItems] =
    useState(

      data.pharmacyItems

        ? data.pharmacyItems.filter(
          (i: any) =>
            i.type ===
            "MEDICINE"
        )

        : data.medicines?.map(
          (m: any) => ({
            name:
              m.text,

            qty: 1,

            price: 0,

            type:
              "MEDICINE",
          })
        ) || []
    );

  const [
    medikitItems,

    setMedikitItems,
  ] = useState(

    data.pharmacyItems

      ? data.pharmacyItems.filter(
        (i: any) =>
          i.type ===
          "MEDIKIT"
      )

      : data.medikits?.map(
        (m: any) => ({
          name:
            m.title,

          qty: 1,

          price: 0,

          type:
            "MEDIKIT",
        })
      ) || []
  );

  const [
    deliveryFee,

    setDeliveryFee,
  ] = useState(
    data.deliveryCharge || 0
  );

  const [isDelivered, setIsDelivered] = useState(
    data.isDelivered
  )

  const [
    discount,

    setDiscount,
  ] = useState(
    data.discount || 0
  );

  const [
    currency,

    setCurrency,
  ] = useState(
    data.currency || "INR"
  );

  const [note, setNote] =
    useState(
      data.pharmacyNote || ""
    );

  const [
    loading,

    setLoading,
  ] = useState(false);

  const [
    trackingId,

    setTrackingId,
  ] = useState(
    data.trackingId || ""
  );

  const [
    deliveryMedium,

    setDeliveryMedium,
  ] = useState(
    data.deliveryMedium || ""
  );

  const subtotal =
    useMemo(() => {

      const medicineTotal =
        items.reduce(

          (
            acc: number,

            item: any
          ) => {

            return (
              acc +
              item.qty *
              item.price
            );
          },

          0
        );

      const medikitTotal =
        medikitItems.reduce(

          (
            acc: number,

            item: any
          ) => {

            return (
              acc +
              item.qty *
              item.price
            );
          },

          0
        );

      return (
        medicineTotal +
        medikitTotal
      );

    }, [

      items,

      medikitItems,
    ]);

  const total =
    useMemo(() => {

      return (
        subtotal +
        deliveryFee -
        discount
      );

    }, [

      subtotal,

      deliveryFee,

      discount,
    ]);

  const updateItem = (
    index: number,

    field: string,

    value: any
  ) => {

    const updated =
      [...items];

    updated[index][field] =
      Number(value);

    setItems(updated);
  };

  const updateMedikitItem = (
    index: number,

    field: string,

    value: any
  ) => {

    const updated =
      [...medikitItems];

    updated[index][field] =
      Number(value);

    setMedikitItems(updated);
  };

  const handleSubmit =
    async () => {

      try {

        setLoading(true);

        await onSubmit({

          items,

          medikits:
            medikitItems,

          subtotal,

          deliveryFee,

          discount,

          totalAmount:
            total,

          currency,

          note,
        });

      } finally {

        setLoading(false);
      }
    };

  const handleSubmitTrackingId =
    async (
      id: string,
    ) => {

      try {

        setLoading(true);

        await api.patch(

          `/pharmacy/${id}/invoice/track`,

          {

            trackingId,

            deliveryMedium,

            isShipping:
              true,
          }
        );

        toast.success(
          "Shipment details updated"
        );

      } catch {

        toast.error(
          "Failed to update shipment"
        );

      } finally {

        setLoading(false);
      }
    };

  const handleMarkCompleted =
    async () => {

      try {

        setLoading(true);

        await api.patch(

          `/pharmacy/${data.id}/invoice/shipping-status`,

          {

            isShipping:
              false,
          }
        );

        toast.success(
          "Order marked completed"
        );

      } catch {

        toast.error(
          "Failed to update order"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div
      className="
        fixed inset-0

        z-50

        flex items-center
        justify-center

        bg-black/50
        backdrop-blur-sm

        p-4
      "
    >

      <div
        className="
          flex h-[94vh]
          w-full
          max-w-6xl

          flex-col

          overflow-hidden

          rounded-3xl

          bg-white

          shadow-2xl
        "
      >

        {/* HEADER */}

        <div
          className="
            flex items-center
            justify-between

            border-b border-slate-200

            px-6 py-5
          "
        >

          <div
            className="
              flex items-center gap-4
            "
          >

            <div
              className="
                flex h-12 w-12
                items-center
                justify-center

                rounded-2xl

                bg-emerald-100
              "
            >

              <PackageCheck
                className="
                  h-6 w-6

                  text-emerald-700
                "
              />

            </div>

            <div>

              <h2
                className="
                  text-xl
                  font-semibold

                  text-slate-900
                "
              >

                {isInvoice
                  ? "Pharmacy Invoice"
                  : "Create Pharmacy Invoice"}

              </h2>

              <p
                className="
                  mt-1

                  text-sm

                  text-slate-500
                "
              >

                Manage medicines,
                pricing and delivery

              </p>

            </div>

          </div>

          <button
            onClick={onClose}

            className="
              rounded-xl

              border border-slate-200

              p-2

              transition

              hover:bg-slate-50
            "
          >

            <X size={18} />

          </button>

        </div>

        {/* BODY */}

        <div
          className="
            flex-1

            overflow-y-auto

            p-6

            [scrollbar-width:none]
            [-ms-overflow-style:none]

            [&::-webkit-scrollbar]:hidden
          "
        >

          <div
            className="
              grid gap-6

              xl:grid-cols-[1fr_350px]
            "
          >

            {/* LEFT */}

            <div className="space-y-4">

              {/* USER */}

              <div
                className="
                  rounded-3xl

                  border border-slate-200

                  bg-white

                  p-5

                  shadow-sm
                "
              >

                <div
                  className="
                    flex flex-col gap-4

                    lg:flex-row
                    lg:items-start
                    lg:justify-between
                  "
                >

                  <div>

                    <h3
                      className="
                        text-lg
                        font-semibold

                        text-slate-900
                      "
                    >

                      {user.name}

                    </h3>

                    <p
                      className="
                        mt-1

                        text-sm

                        text-slate-500
                      "
                    >

                      {user.email}

                    </p>

                    <div
                      className="
                        mt-3

                        flex flex-wrap gap-2
                      "
                    >

                      <span
                        className="
                          rounded-full

                          bg-slate-100

                          px-3 py-1

                          text-xs
                          font-medium

                          text-slate-700
                        "
                      >

                        Base Currency:
                        {" "}
                        {UserCurrency}

                      </span>

                      <span
                        className="
                          rounded-full

                          bg-blue-100

                          px-3 py-1

                          text-xs
                          font-medium

                          text-blue-700
                        "
                      >

                        {deliveryType}

                      </span>

                    </div>

                  </div>

                  {/* STATUS */}

                  <div className="flex flex-wrap gap-2">

                    {isDelivered && (
                      <span
                        className="
                          flex items-center gap-2

                          rounded-full

                          bg-blue-100

                          px-4 py-2

                          text-xs
                          font-semibold

                          text-bluer-700
                        "
                      >

                        <CheckCheck size={14} />

                        Delivered

                      </span>
                    )}

                    {isPaid && (

                      <span
                        className="
                          flex items-center gap-2

                          rounded-full

                          bg-emerald-100

                          px-4 py-2

                          text-xs
                          font-semibold

                          text-emerald-700
                        "
                      >

                        <Wallet size={14} />

                        Paid

                      </span>
                    )}

                    {data.isShipping ? (

                      <span
                        className="
                          flex items-center gap-2

                          rounded-full

                          bg-blue-100

                          px-4 py-2

                          text-xs
                          font-semibold

                          text-blue-700
                        "
                      >

                        <Truck size={14} />

                        Shipped

                      </span>

                    ) : (
                      <span
                        className="
                          flex items-center gap-2

                          rounded-full

                          bg-amber-100

                          px-4 py-2

                          text-xs
                          font-semibold

                          text-amber-700
                        "
                      >

                        <Clock3 size={14} />

                        {data.isDelivered ? "Completed" : "Pending"}

                      </span>
                    )}

                  </div>

                </div>

              </div>

              {/* ADDRESS */}

              <div
                className="
                  rounded-3xl

                  border border-slate-200

                  bg-white

                  p-5

                  shadow-sm
                "
              >

                <h3
                  className="
                    mb-4

                    text-base
                    font-semibold

                    text-slate-900
                  "
                >

                  Delivery Address

                </h3>

                {address ? (

                  <div
                    className="
                      space-y-2

                      text-sm

                      text-slate-600
                    "
                  >

                    <p className="font-semibold">
                      {address.name}
                    </p>

                    <p>
                      {address.line1}
                    </p>

                    <p>
                      {address.city},
                      {" "}
                      {address.state}
                      {" "}
                      -
                      {" "}
                      {address.zip}
                    </p>

                    <p>
                      {address.country}
                    </p>

                    <p className="flex flex-row gap-3">
                      <Phone size={15} />
                      {" "}
                      {address.phone}
                    </p>

                  </div>

                ) : (

                  <p
                    className="
                      text-sm

                      text-slate-400
                    "
                  >

                    No address provided

                  </p>
                )}

              </div>

              {/* MEDICINES */}

              <div
                className="
                  rounded-3xl

                  border border-slate-200

                  bg-white

                  p-5

                  shadow-sm
                "
              >

                <h3
                  className="
                    mb-4

                    text-lg
                    font-semibold

                    text-slate-900
                  "
                >

                  Medicines

                </h3>

                <div className="space-y-3">

                  {items.map(
                    (
                      item: any,

                      i: number
                    ) => (

                      <div
                        key={i}

                        className="
                          grid gap-3

                          rounded-2xl

                          border border-slate-200

                          p-4

                          md:grid-cols-4
                        "
                      >

                        <div>

                          <p
                            className="
                              text-xs

                              text-slate-400
                            "
                          >

                            Medicine

                          </p>

                          <p
                            className="
    mt-1

    break-words

    text-sm
    font-medium

    leading-6

    text-slate-800
  "
                          >

                            {item.name}

                          </p>

                        </div>

                        {/* QTY */}

                        <div>

                          <p
                            className="
                              mb-2

                              text-xs

                              text-slate-400
                            "
                          >

                            Quantity

                          </p>

                          {isInvoice ? (

                            <p>
                              {item.qty}
                            </p>

                          ) : (

                            <input
                              type="number"

                              value={item.qty}

                              onChange={(e) =>
                                updateItem(
                                  i,

                                  "qty",

                                  e.target.value
                                )
                              }

                              className="
                                w-full

                                rounded-xl

                                border border-slate-200

                                px-3 py-2
                              "
                            />
                          )}

                        </div>

                        {/* PRICE */}

                        <div>

                          <p
                            className="
                              mb-2

                              text-xs

                              text-slate-400
                            "
                          >

                            Price

                          </p>

                          {isInvoice ? (

                            <p>
                              {currency}
                              {" "}
                              {item.price}
                            </p>

                          ) : (

                            <input
                              type="number"

                              value={item.price}

                              onChange={(e) =>
                                updateItem(
                                  i,

                                  "price",

                                  e.target.value
                                )
                              }

                              className="
                                w-full

                                rounded-xl

                                border border-slate-200

                                px-3 py-2
                              "
                            />
                          )}

                        </div>

                        {/* TOTAL */}

                        <div>

                          <p
                            className="
                              text-xs

                              text-slate-400
                            "
                          >

                            Total

                          </p>

                          <p
                            className="
                              mt-1

                              font-semibold

                              text-slate-900
                            "
                          >

                            {currency}
                            {" "}
                            {item.qty *
                              item.price}

                          </p>

                        </div>

                      </div>
                    )
                  )}

                </div>

              </div>

              {/* MEDIKITS */}

              {medikitItems.length > 0 && (

                <div
                  className="
                    rounded-3xl

                    border border-slate-200

                    bg-white

                    p-5

                    shadow-sm
                  "
                >

                  <h3
                    className="
                      mb-4

                      text-lg
                      font-semibold

                      text-slate-900
                    "
                  >

                    Medikits

                  </h3>

                  <div className="space-y-3">

                    {medikitItems.map(
                      (
                        item: any,

                        i: number
                      ) => (

                        <div
                          key={i}

                          className="
                            grid gap-3

                            rounded-2xl

                            border border-slate-200

                            p-4

                            md:grid-cols-4
                          "
                        >

                          <div>

                            <p
                              className="
                                text-xs

                                text-slate-400
                              "
                            >

                              Medikit

                            </p>

                            <p
                              className="
                                mt-1

                                font-medium

                                text-slate-800
                              "
                            >

                              {item.name}

                            </p>

                          </div>

                          <div>

                            <p
                              className="
                                mb-2

                                text-xs

                                text-slate-400
                              "
                            >

                              Quantity

                            </p>

                            {isInvoice ? (

                              <p>
                                {item.qty}
                              </p>

                            ) : (

                              <input
                                type="number"

                                value={item.qty}

                                onChange={(e) =>
                                  updateMedikitItem(
                                    i,

                                    "qty",

                                    e.target.value
                                  )
                                }

                                className="
                                  w-full

                                  rounded-xl

                                  border border-slate-200

                                  px-3 py-2
                                "
                              />
                            )}

                          </div>

                          <div>

                            <p
                              className="
                                mb-2

                                text-xs

                                text-slate-400
                              "
                            >

                              Price

                            </p>

                            {isInvoice ? (

                              <p>
                                {currency}
                                {" "}
                                {item.price}
                              </p>

                            ) : (

                              <input
                                type="number"

                                value={item.price}

                                onChange={(e) =>
                                  updateMedikitItem(
                                    i,

                                    "price",

                                    e.target.value
                                  )
                                }

                                className="
                                  w-full

                                  rounded-xl

                                  border border-slate-200

                                  px-3 py-2
                                "
                              />
                            )}

                          </div>

                          <div>

                            <p
                              className="
                                text-xs

                                text-slate-400
                              "
                            >

                              Total

                            </p>

                            <p
                              className="
                                mt-1

                                font-semibold

                                text-slate-900
                              "
                            >

                              {currency}
                              {" "}
                              {item.qty *
                                item.price}

                            </p>

                          </div>

                        </div>
                      )
                    )}

                  </div>

                </div>
              )}

              {/* NOTE */}

              <div
                className="
                  rounded-3xl

                  border border-slate-200

                  bg-white

                  p-5

                  shadow-sm
                "
              >

                <label
                  className="
                    mb-2 block

                    text-sm
                    font-medium

                    text-slate-700
                  "
                >

                  Pharmacy Note

                </label>

                <textarea
                  value={note}

                  disabled={isInvoice}

                  onChange={(e) =>
                    setNote(
                      e.target.value
                    )
                  }

                  className="
                    min-h-[120px]
                    w-full

                    rounded-2xl

                    border border-slate-200

                    px-4 py-3

                    outline-none

                    transition

                    focus:border-emerald-500
                    focus:ring-4
                    focus:ring-emerald-100

                    disabled:bg-slate-50
                  "

                  placeholder="Add pharmacy note..."
                />

              </div>

            </div>

            {/* RIGHT */}

            <div className="space-y-4">

              {/* FEES */}

              {!isInvoice && (

                <div
                  className="
                    rounded-3xl

                    border border-slate-200

                    bg-white

                    p-6

                    shadow-sm
                  "
                >

                  <h3
                    className="
                      mb-5

                      text-lg
                      font-semibold

                      text-slate-900
                    "
                  >

                    Pricing

                  </h3>

                  <div className="space-y-4">

                    <div>

                      <label
                        className="
                          mb-2 block

                          text-sm

                          text-slate-600
                        "
                      >

                        Delivery Fee

                      </label>

                      <input
                        type="number"

                        value={deliveryFee}

                        onChange={(e) =>
                          setDeliveryFee(
                            Number(
                              e.target.value
                            )
                          )
                        }

                        className="
                          w-full

                          rounded-2xl

                          border border-slate-200

                          px-4 py-3
                        "
                      />

                    </div>

                    <div>

                      <label
                        className="
                          mb-2 block

                          text-sm

                          text-slate-600
                        "
                      >

                        Discount

                      </label>

                      <input
                        type="number"

                        value={discount}

                        onChange={(e) =>
                          setDiscount(
                            Number(
                              e.target.value
                            )
                          )
                        }

                        className="
                          w-full

                          rounded-2xl

                          border border-slate-200

                          px-4 py-3
                        "
                      />

                    </div>

                    <div>

                      <label
                        className="
                          mb-2 block

                          text-sm

                          text-slate-600
                        "
                      >

                        Currency

                      </label>

                      <select
                        value={currency}

                        onChange={(e) =>
                          setCurrency(
                            e.target.value
                          )
                        }

                        className="
                          w-full

                          rounded-2xl

                          border border-slate-200

                          px-4 py-3
                        "
                      >

                        <option value="INR">
                          INR ₹
                        </option>

                        <option value="USD">
                          USD $
                        </option>

                        <option value="AED">
                          AED
                        </option>

                        <option value="CAD">
                          CAD
                        </option>
                        <option value="GBP">
                          GBP
                        </option>
                        <option value="EUR">
                          EUR
                        </option>

                      </select>

                    </div>

                  </div>

                </div>
              )}

              {/* SUMMARY */}

              <div className="sticky top-0 space-y-2">
                <div
                  className="

                  rounded-3xl

                  border border-slate-200

                  bg-slate-50

                  p-6

                  shadow-sm
                "
                >

                  <h3
                    className="
                    mb-5

                    text-lg
                    font-semibold

                    text-slate-900
                  "
                  >

                    Invoice Summary

                  </h3>

                  <div className="space-y-3">

                    <div
                      className="
                      flex items-center
                      justify-between

                      text-sm
                    "
                    >

                      <span className="text-slate-500">
                        Subtotal
                      </span>

                      <span className="font-medium">
                        {currency}
                        {" "}
                        {subtotal}
                      </span>

                    </div>

                    <div
                      className="
                      flex items-center
                      justify-between

                      text-sm
                    "
                    >

                      <span className="text-slate-500">
                        Delivery Fee
                      </span>

                      <span className="font-medium">
                        {currency}
                        {" "}
                        {deliveryFee}
                      </span>

                    </div>

                    <div
                      className="
                      flex items-center
                      justify-between

                      text-sm

                      text-red-500
                    "
                    >

                      <span>
                        Discount
                      </span>

                      <span>
                        -
                        {" "}
                        {currency}
                        {" "}
                        {discount}
                      </span>

                    </div>

                    <div
                      className="
                      border-t border-slate-200
                    "
                    />

                    <div
                      className="
                      flex items-center
                      justify-between

                      text-lg
                      font-semibold

                      text-slate-900
                    "
                    >

                      <span>
                        Total
                      </span>

                      <span>
                        {currency}
                        {" "}
                        {total}
                      </span>

                    </div>

                  </div>

                </div>

                {/* TRACKING */}

                {isPaid && isInvoice && (

                  <div
                    className="

                    rounded-3xl

                    border border-slate-200

                    bg-white

                    p-6

                    shadow-sm
                  "
                  >

                    <h3
                      className="
                      text-lg
                      font-semibold

                      text-slate-900
                    "
                    >

                      Shipment Tracking

                    </h3>

                    <div className="mt-5 space-y-2">

                      <input
                        type="text"
                        disabled={isDelivered}

                        value={trackingId}

                        onChange={(e) =>
                          setTrackingId(
                            e.target.value
                          )
                        }

                        placeholder="Tracking ID"

                        className="
                        w-full

                        rounded-2xl

                        border border-slate-200

                        px-4 py-3
                      "
                      />

                      <select
                        disabled={isDelivered}
                        value={deliveryMedium}

                        onChange={(e) =>
                          setDeliveryMedium(
                            e.target.value
                          )
                        }

                        className="
                        w-full

                        rounded-2xl

                        border border-slate-200

                        px-4 py-3
                      "
                      >

                        <option value="">
                          Select Courier
                        </option>

                        <option value="DTDC">
                          DTDC
                        </option>

                        <option value="India Post">
                          India Post
                        </option>

                      </select>

                      {!isDelivered && (

                        <div className="space-y-3">

                          <button
                            onClick={() =>
                              handleSubmitTrackingId(
                                data.id
                              )
                            }

                            disabled={
                              loading ||

                              !trackingId ||

                              !deliveryMedium
                            }

                            className="
        w-full

        rounded-2xl

        bg-blue-600

        px-5 py-3

        text-sm
        font-semibold

        text-white

        transition

        hover:bg-blue-700

        disabled:cursor-not-allowed
        disabled:opacity-50
      "
                          >

                            {loading
                              ? "Saving..."
                              : "Save Shipment"}

                          </button>

                          {data.isShipping && (

                            <button
                              onClick={
                                handleMarkCompleted
                              }

                              disabled={loading}

                              className="
          w-full

          rounded-2xl

          bg-emerald-600

          px-5 py-3

          text-sm
          font-semibold

          text-white

          transition

          hover:bg-emerald-700

          disabled:cursor-not-allowed
          disabled:opacity-50
        "
                            >

                              Mark as Completed

                            </button>
                          )}

                        </div>
                      )}

                    </div>

                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

        {/* FOOTER */}

        {!isInvoice && (

          <div
            className="
              flex items-center
              justify-end

              border-t border-slate-200

              bg-white

              px-6 py-5
            "
          >

            <button
              onClick={handleSubmit}

              disabled={loading}

              className="
                rounded-2xl

                bg-emerald-600

                px-7 py-3

                text-sm
                font-semibold

                text-white

                transition

                hover:bg-emerald-700

                disabled:opacity-50
              "
            >

              {loading
                ? "Sending..."
                : "Send Invoice"}

            </button>

          </div>
        )}

      </div>

    </div>
  );
}