"use client";

import dynamic from "next/dynamic";
import tinymceConfig from "@/tinymce.config";

const Editor = dynamic(
    () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
    { ssr: false }
);

export default function TinyEditor({
    content,
    onChange,
}: {
    content: string;
    onChange: (value: string) => void;
}) {
    return (
        <Editor
            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || "no-api-key"}
            value={content}
            onEditorChange={(value) => onChange(value)}
            init={tinymceConfig}
        />
    );
}