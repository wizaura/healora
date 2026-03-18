"use client";

import { useState, useMemo } from "react";
import { X } from "lucide-react";

export default function PharmacyModal({ data, mode, onClose, onSubmit }: any) {
  const user = data.appointment.user;
  const slot = data.appointment.slot;
  const address = data.appointment.deliveryAddress;

  const isPrescriptionView = mode === "view";
  const isCreateMode = mode === "create";
  const isInvoiceView = mode === "invoice";

  const isInvoice = !!data.pharmacyItems;

  /* ---------------- STATE ---------------- */

  const [items, setItems] = useState(
    isInvoice
      ? data.pharmacyItems
      : data.medicines?.map((m: any) => ({
          name: m.text,
          qty: 1,
          price: 0,
        })) || []
  );

  const [deliveryCharge, setDeliveryCharge] = useState(
    data.deliveryCharge || 0
  );
  const [discount, setDiscount] = useState(data.discount || 0);
  const [tax, setTax] = useState(data.tax || 0);
  const [note, setNote] = useState(data.pharmacyNote || "");
  const [loading, setLoading] = useState(false);

  /* ---------------- CALCULATIONS ---------------- */

  const subtotal = useMemo(() => {
    return items.reduce((acc: number, item: any) => {
      return acc + item.qty * item.price;
    }, 0);
  }, [items]);

  const total = useMemo(() => {
    return subtotal + deliveryCharge + tax - discount;
  }, [subtotal, deliveryCharge, tax, discount]);

  const displaySubtotal = data.subtotal ?? subtotal;
  const displayTotal = data.totalAmount ?? total;

  /* ---------------- HANDLERS ---------------- */

  const updateItem = (index: number, field: string, value: any) => {
    const updated = [...items];
    updated[index][field] = Number(value);
    setItems(updated);
  };

  const handleSubmit = async () => {
    setLoading(true);

    await onSubmit({
      items,
      subtotal,
      deliveryCharge,
      tax,
      discount,
      totalAmount: total,
      note,
    });

    setLoading(false);
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[900px] max-h-[90vh] rounded-xl shadow-lg flex flex-col">

        {/* HEADER */}
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-lg font-semibold">
            {isPrescriptionView
              ? "Prescription Details"
              : isCreateMode
              ? "Create Invoice"
              : "Invoice Details"}
          </h2>

          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-6 overflow-y-auto">

          {/* USER */}
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>

          {/* ADDRESS */}
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="font-semibold mb-1">Delivery Address</h3>

            {address ? (
              <div className="text-sm text-gray-600 space-y-1">
                <p className="font-medium">{address.name}</p>
                <p>{address.line1}</p>
                <p>{address.city}, {address.state} - {address.zip}</p>
                <p>{address.country}</p>
                <p>📞 {address.phone}</p>
              </div>
            ) : (
              <p className="text-sm text-gray-400">No address provided</p>
            )}
          </div>

          {/* DATE */}
          <div className="text-sm text-gray-600">
            {new Date(slot.startTimeUTC).toLocaleString()}
          </div>

          {/* MEDICINES */}
          <div>
            <h3 className="font-semibold mb-3">Medicines</h3>

            <div className="space-y-3">
              {items.map((item: any, i: number) => (
                <div key={i} className="grid grid-cols-4 gap-3 items-center">
                  <span>{item.name}</span>

                  {!isCreateMode ? (
                    <>
                      <span>{item.qty}</span>
                      <span>₹{item.price}</span>
                      <span className="font-medium">
                        ₹{item.qty * item.price}
                      </span>
                    </>
                  ) : (
                    <>
                      <input
                        type="number"
                        value={item.qty}
                        onChange={(e) =>
                          updateItem(i, "qty", e.target.value)
                        }
                        className="border px-2 py-1 rounded"
                      />

                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) =>
                          updateItem(i, "price", e.target.value)
                        }
                        className="border px-2 py-1 rounded"
                      />

                      <span className="font-medium">
                        ₹{item.qty * item.price}
                      </span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* PRICING INPUT */}
          {isCreateMode && (
            <div className="grid grid-cols-3 gap-4">
              <input
                type="number"
                value={deliveryCharge}
                onChange={(e) => setDeliveryCharge(Number(e.target.value))}
                className="border px-3 py-2 rounded"
                placeholder="Delivery"
              />

              <input
                type="number"
                value={tax}
                onChange={(e) => setTax(Number(e.target.value))}
                className="border px-3 py-2 rounded"
                placeholder="Tax"
              />

              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="border px-3 py-2 rounded"
                placeholder="Discount"
              />
            </div>
          )}

          {/* BREAKDOWN */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{displaySubtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span>₹{deliveryCharge}</span>
            </div>

            <div className="flex justify-between">
              <span>Tax</span>
              <span>₹{tax}</span>
            </div>

            <div className="flex justify-between text-red-500">
              <span>Discount</span>
              <span>- ₹{discount}</span>
            </div>

            <hr />

            <div className="flex justify-between font-semibold text-base">
              <span>Total</span>
              <span>₹{displayTotal}</span>
            </div>
          </div>

          {/* STATUS */}
          {isInvoiceView && (
            <div className="bg-green-50 p-4 rounded-lg text-sm">
              <p><strong>Status:</strong> {data.paymentStatus}</p>
            </div>
          )}

          {/* NOTE */}
          <textarea
            value={note}
            disabled={!isCreateMode}
            onChange={(e) => setNote(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 disabled:bg-gray-100"
            placeholder="Pharmacy note"
          />
        </div>

        {/* FOOTER */}
        {isCreateMode && (
          <div className="p-4 border-t flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-teal-600 text-white px-6 py-2 rounded-lg"
            >
              {loading ? "Sending..." : "Send Invoice"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}