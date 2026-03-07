"use client";

type Props = {
    preview: string | null;
    setPreview: (v: string | null) => void;
    setFile: (f: File | null) => void;
};

export default function ImageUpload({ preview, setPreview, setFile }: Props) {
    return (
        <label
            className="
            flex items-center justify-center
            w-full h-28
            border-2 border-dashed border-slate-300
            rounded-xl
            cursor-pointer
            hover:border-teal-500
            transition
            bg-slate-50
        "
        >
            <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                    if (!e.target.files) return;

                    const file = e.target.files[0];

                    setFile(file);
                    setPreview(URL.createObjectURL(file));
                }}
            />

            {preview ? (
                <img
                    src={preview}
                    className="h-24 w-24 object-cover rounded-lg"
                />
            ) : (
                <span className="text-sm text-slate-500">
                    Click to upload image
                </span>
            )}
        </label>
    );
}