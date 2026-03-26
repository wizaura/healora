"use client";

import { useState, useMemo } from "react";
import { X } from "lucide-react";

export default function PharmacyModal({ data, onClose, onSubmit }: any) {
  const user = data.appointment.user;
  const slot = data.appointment.slot;
  const address = data.appointment.deliveryAddress;
  const UserCurrency = data.appointment.currency;

  const isInvoice = !!data.totalAmount;

  const [items, setItems] = useState(
    data.pharmacyItems
      ? data.pharmacyItems.filter((i: any) => i.type === "MEDICINE")
      : data.medicines?.map((m: any) => ({
        name: m.text,
        qty: 1,
        price: 0,
        type: "MEDICINE",
      })) || []
  );

  const [medikitItems, setMedikitItems] = useState(
    data.pharmacyItems
      ? data.pharmacyItems.filter((i: any) => i.type === "MEDIKIT")
      : data.medikits?.map((m: any) => ({
        name: m.title,
        qty: 1,
        price: 0,
        type: "MEDIKIT",
      })) || []
  );

  const [deliveryFee, setDeliveryFee] = useState(data.deliveryFee || 0);
  const [discount, setDiscount] = useState(data.discount || 0);
  const [currency, setCurrency] = useState(data.currency || "INR");
  const [note, setNote] = useState(data.pharmacyNote || "");
  const [loading, setLoading] = useState(false);

  const subtotal = useMemo(() => {
    const medicineTotal = items.reduce((acc: number, item: any) => {
      return acc + item.qty * item.price;
    }, 0);

    const medikitTotal = medikitItems.reduce((acc: number, item: any) => {
      return acc + item.qty * item.price;
    }, 0);

    return medicineTotal + medikitTotal;
  }, [items, medikitItems]);

  const total = useMemo(() => {
    return subtotal + deliveryFee - discount;
  }, [subtotal, deliveryFee, discount]);

  const updateItem = (index: number, field: string, value: any) => {
    const updated = [...items];
    updated[index][field] = Number(value);
    setItems(updated);
  };

  const updateMedikitItem = (index: number, field: string, value: any) => {
    const updated = [...medikitItems];
    updated[index][field] = Number(value);
    setMedikitItems(updated);
  };

  const handleSubmit = async () => {
    setLoading(true);

    await onSubmit({
      items,
      medikits: medikitItems,
      subtotal,
      deliveryFee,
      discount,
      totalAmount: total,
      currency,
      note,
    });

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[950px] max-h-[90vh] rounded-2xl shadow-xl flex flex-col">

        {/* HEADER */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">
            {isInvoice ? "Invoice Details" : "Create Invoice"}
          </h2>

          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-6 overflow-y-auto">

          {/* USER INFO */}
          <div className="border border-gray-200 rounded-xl p-4">
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-md text-gray-700">User base currency: {UserCurrency}</p>
            <p className="text-sm text-gray-500">
              {new Date(slot.startTimeUTC).toLocaleString()}
            </p>
          </div>

          {/* ADDRESS */}
          <div className="border border-gray-200 rounded-xl p-4">
            <h3 className="font-semibold mb-2">Delivery Address</h3>

            {address ? (
              <div className="text-sm text-gray-600 space-y-1">
                <p className="font-medium">{address.name}</p>
                <p>{address.line1}</p>
                <p>
                  {address.city}, {address.state} - {address.zip}
                </p>
                <p>{address.country}</p>
                <p>📞 {address.phone}</p>
              </div>
            ) : (
              <p className="text-sm text-gray-400">No address provided</p>
            )}
          </div>

          {/* MEDICINES */}
          <div>
            <h3 className="font-semibold mb-3">Medicines</h3>

            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="grid grid-cols-4 gap-3 bg-gray-50 p-3 text-sm font-medium">
                <div>Medicine</div>
                <div>Quantity</div>
                <div>Price</div>
                <div>Total</div>
              </div>

              {items.map((item: any, i: number) => (
                <div
                  key={i}
                  className="grid grid-cols-4 gap-3 p-3 border-t border-gray-200 items-center"
                >
                  <div>{item.name}</div>

                  {isInvoice ? (
                    <>
                      <div>{item.qty}</div>
                      <div>
                        {currency} {item.price}
                      </div>
                      <div className="font-medium">
                        {currency} {item.qty * item.price}
                      </div>
                    </>
                  ) : (
                    <>
                      <input
                        type="number"
                        value={item.qty}
                        onChange={(e) =>
                          updateItem(i, "qty", e.target.value)
                        }
                        className="border border-gray-200 px-2 py-1 rounded"
                      />

                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) =>
                          updateItem(i, "price", e.target.value)
                        }
                        className="border border-gray-200 px-2 py-1 rounded"
                      />

                      <div className="font-medium">
                        {currency} {item.qty * item.price}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {medikitItems.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">Medikits</h3>

              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="grid grid-cols-4 gap-3 bg-gray-50 p-3 text-sm font-medium">
                  <div>Medikit</div>
                  <div>Quantity</div>
                  <div>Price</div>
                  <div>Total</div>
                </div>

                {medikitItems.map((item: any, i: number) => (
                  <div
                    key={i}
                    className="grid grid-cols-4 gap-3 p-3 border-t border-gray-200 items-center"
                  >
                    <div>{item.name}</div>

                    {isInvoice ? (
                      <>
                        <div>{item.qty}</div>
                        <div>
                          {currency} {item.price}
                        </div>
                        <div className="font-medium">
                          {currency} {item.qty * item.price}
                        </div>
                      </>
                    ) : (
                      <>
                        <input
                          type="number"
                          value={item.qty}
                          onChange={(e) =>
                            updateMedikitItem(i, "qty", e.target.value)
                          }
                          className="border border-gray-200 px-2 py-1 rounded"
                        />

                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) =>
                            updateMedikitItem(i, "price", e.target.value)
                          }
                          className="border border-gray-200 px-2 py-1 rounded"
                        />

                        <div className="font-medium">
                          {currency} {item.qty * item.price}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FEES */}
          {!isInvoice && (
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-gray-600">
                  Delivery Fee
                </label>
                <input
                  type="number"
                  value={deliveryFee}
                  onChange={(e) => setDeliveryFee(Number(e.target.value))}
                  className="w-full border border-gray-200 px-3 py-2 rounded-lg mt-1"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Discount</label>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                  className="w-full border border-gray-200 px-3 py-2 rounded-lg mt-1"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full border border-gray-200 px-3 py-2 rounded-lg mt-1"
                >
                  <option value="INR">INR ₹</option>
                  <option value="USD">USD $</option>
                  <option value="AED">AED</option>
                  <option value="AED">AED</option>
                  <option value="AED">AED</option>
                  <option value="AED">AED</option>
                </select>
              </div>
            </div>
          )}

          {/* SUMMARY */}
          <div className="border border-gray-200 rounded-xl p-5 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>
                {currency} {subtotal}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>
                {currency} {deliveryFee}
              </span>
            </div>

            <div className="flex justify-between text-red-500">
              <span>Discount</span>
              <span>
                - {currency} {discount}
              </span>
            </div>

            <hr />

            <div className="flex justify-between font-semibold text-base">
              <span>Total</span>
              <span>
                {currency} {total}
              </span>
            </div>
          </div>

          {/* NOTE */}
          <div>
            <label className="text-sm text-gray-600">Pharmacy Note</label>
            <textarea
              value={note}
              disabled={isInvoice}
              onChange={(e) => setNote(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 mt-1 disabled:bg-gray-100"
              placeholder="Add note..."
            />
          </div>
        </div>

        {/* FOOTER */}
        {!isInvoice && (
          <div className="p-4 border-t border-gray-200 flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg"
            >
              {loading ? "Sending..." : "Send Invoice"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}