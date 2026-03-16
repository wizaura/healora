"use client";

import { useState, useEffect } from "react";
import { FileInput, SectionTitle } from "./EditorMain";
import ImageCropModal from "@/components/common/ImageCropModal";

type Props = {
  form: any;
  existingImages?: any;
  setCropping?: (v: boolean) => void;
};

export default function ImageSection({ form, existingImages, setCropping }: Props) {

    const { register, setValue } = form;

    const [preview1, setPreview1] = useState(existingImages?.image1?.url || null);
    const [preview2, setPreview2] = useState(existingImages?.image2?.url || null);

    const [cropImage, setCropImage] = useState<string | null>(null);
    const [activeField, setActiveField] = useState<"image1" | "image2" | null>(null);

    const aspect = activeField === "image1" ? 1 : 16 / 9;

    useEffect(() => {
        register("image1");
        register("image2");
    }, [register]);

    function handleFileSelect(
        e: React.ChangeEvent<HTMLInputElement>,
        field: "image1" | "image2"
    ) {
        const file = e.target.files?.[0];
        if (!file) return;

        setActiveField(field);
        setCropImage(URL.createObjectURL(file));

        setCropping?.(true); // notify parent cropping started

        e.target.value = "";
    }

    function handleCropComplete(croppedFile: File) {

        const previewUrl = URL.createObjectURL(croppedFile);

        if (activeField === "image1") {
            setPreview1(previewUrl);
            setValue("image1", croppedFile, { shouldValidate: true });
        }

        if (activeField === "image2") {
            setPreview2(previewUrl);
            setValue("image2", croppedFile, { shouldValidate: true });
        }

        setCropImage(null);
        setActiveField(null);

        setCropping?.(false); // notify parent cropping finished
    }

    function handleClose() {
        setCropImage(null);
        setActiveField(null);
        setCropping?.(false);
    }

    return (

        <div className="space-y-6">

            <SectionTitle title="Images" />

            <div className="grid grid-cols-2 gap-6">

                {/* MAIN IMAGE */}

                <div className="space-y-3">

                    {preview1 && (
                        <img
                            src={preview1}
                            className="w-full h-48 object-cover rounded-lg border"
                            alt="Main preview"
                        />
                    )}

                    <FileInput
                        label="Main Image (Square)"
                        onChange={(e: any) => handleFileSelect(e, "image1")}
                    />

                </div>

                {/* HEADER IMAGE */}

                <div className="space-y-3">

                    {preview2 && (
                        <img
                            src={preview2}
                            className="w-full h-48 object-cover rounded-lg border"
                            alt="Header preview"
                        />
                    )}

                    <FileInput
                        label="Header Image (16:9)"
                        onChange={(e: any) => handleFileSelect(e, "image2")}
                    />

                </div>

            </div>

            {cropImage && (
                <ImageCropModal
                    image={cropImage}
                    aspect={aspect}
                    onClose={handleClose}
                    onCropComplete={handleCropComplete}
                />
            )}

        </div>
    );
}