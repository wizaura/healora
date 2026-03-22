"use client";

import { useState, useEffect } from "react";

export default function DoctorBasicInfo({ profile, setProfile, isEditing }: any) {
  const inputClass =
    "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm disabled:bg-gray-100";

  const [imagePreview, setImagePreview] = useState<string | null>(
    profile.imageUrl || null
  );

  useEffect(() => {
    if (profile.imageUrl) {
      setImagePreview(profile.imageUrl);
    }
  }, [profile.imageUrl]);

  return (
    <div className="space-y-6 border border-gray-200 p-6 rounded-xl bg-white">
      <h2 className="font-semibold text-lg">Basic Information</h2>

      {/* Profile Image */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Profile Image</label>

        {imagePreview && (
          <img
            src={imagePreview}
            className="h-28 w-28 object-cover rounded-xl border border-gray-200"
          />
        )}

        {isEditing && (
          <input
            type="file"
            onChange={(e: any) => {
              const file = e.target.files[0];
              setProfile((prev: any) => ({ ...prev, imageFile: file }));
              setImagePreview(URL.createObjectURL(file));
            }}
            className={inputClass}
          />
        )}
      </div>

      {/* Experience + Qualification */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Experience (Years)</label>
          <input
            disabled={!isEditing}
            value={profile.experience || ""}
            onChange={(e) =>
              setProfile((prev: any) => ({
                ...prev,
                experience: e.target.value,
              }))
            }
            className={inputClass}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Qualification</label>
          <input
            disabled={!isEditing}
            value={profile.qualification || ""}
            onChange={(e) =>
              setProfile((prev: any) => ({
                ...prev,
                qualification: e.target.value,
              }))
            }
            className={inputClass}
          />
        </div>
      </div>

      {/* Bio */}
      <div>
        <label className="text-sm font-medium">Doctor Bio</label>
        <textarea
          rows={4}
          disabled={!isEditing}
          value={profile.bio || ""}
          onChange={(e) =>
            setProfile((prev: any) => ({
              ...prev,
              bio: e.target.value,
            }))
          }
          className={inputClass}
        />
      </div>
    </div>
  );
}