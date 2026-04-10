"use client";

import { useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { X } from "lucide-react";

export default function AddInvestigationModal({ onSaved }: any) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const save = async () => {
    try {
      if (images.length === 0 && !note) {
        return toast.error("Add note or images");
      }

      setLoading(true);

      const formData = new FormData();
      formData.append("note", note);

      images.forEach((file) => {
        formData.append("files", file);
      });

      await api.post("/consultations/investigations/user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Uploaded successfully");

      setOpen(false);
      setNote("");
      setImages([]);
      onSaved?.();
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="bg-teal-600 text-white text-sm px-4 py-2 rounded-lg"
      >
        Upload Investigation
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[520px] rounded-xl p-6 space-y-4">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            Upload Investigation
          </h3>
          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        {/* Note */}
        <textarea
          placeholder="Describe your symptoms or issue..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="border rounded-lg w-full p-2 text-sm"
          rows={4}
        />

        {/* File input */}
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) =>
            setImages(Array.from(e.target.files || []))
          }
        />

        {/* Preview */}
        {images.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {images.map((file, i) => (
              <img
                key={i}
                src={URL.createObjectURL(file)}
                className="w-20 h-20 object-cover rounded-lg border"
              />
            ))}
          </div>
        )}

        {/* Submit */}
        <button
          onClick={save}
          disabled={loading}
          className="bg-teal-600 text-white px-4 py-2 rounded-lg w-full"
        >
          {loading ? "Uploading..." : "Submit"}
        </button>

      </div>
    </div>
  );
}