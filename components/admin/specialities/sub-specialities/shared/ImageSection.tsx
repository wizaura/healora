import { useState } from "react";
import { FileInput, SectionTitle } from "./EditorMain";

export default function ImageSection({ form, existingImages }: any) {

    const { register, watch } = form;

    const file1 = watch("image1");
    const file2 = watch("image2");

    const [preview1, setPreview1] = useState(
        existingImages?.image1?.url || null
    );

    const [preview2, setPreview2] = useState(
        existingImages?.image2?.url || null
    );

    const handlePreview = (file: File, setPreview: any) => {
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);
    };

    if (file1?.[0] && !preview1) {
        handlePreview(file1[0], setPreview1);
    }

    if (file2?.[0] && !preview2) {
        handlePreview(file2[0], setPreview2);
    }

    return (

        <div className="space-y-6">

            <SectionTitle title="Images" />

            <div className="grid grid-cols-2 gap-6">

                <div className="space-y-3">

                    {preview1 && (
                        <img
                            src={preview1}
                            className="w-full h-48 object-cover rounded-lg border"
                        />
                    )}

                    <FileInput
                        label="Image 1"
                        {...register("image1")}
                    />

                </div>

                <div className="space-y-3">

                    {preview2 && (
                        <img
                            src={preview2}
                            className="w-full h-48 object-cover rounded-lg border"
                        />
                    )}

                    <FileInput
                        label="Image 2"
                        {...register("image2")}
                    />

                </div>

            </div>

        </div>
    );
}