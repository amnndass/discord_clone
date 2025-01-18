"use client";

import { Vault, X } from "lucide-react";
import Image from "next/image";

import { UploadDropzone } from "@/lib/uploadthing";
import { useDropzone } from "@uploadthing/react";
import "@uploadthing/react/styles.css"

interface fileUploadProps {
    onChange: (url?:string) => void;
    value: string;
    endPoint: "messageFile" | "serverImage"
}

export const FileUpload = ({
    onChange,
    value,
    endPoint
}: fileUploadProps) => {
    const fileType = value?.split(".").pop();

    if(value && fileType !== "pdf") {
        return (
            <div className="relative h-20 w-20">
            <Image
                fill
                src={value}
                alt="Upload"
                className="rounded-full"
            />

            <button
                onClick={() => onChange("")}
                className="bg-red-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
            >
                <X className="h-4 w-4"/>
            </button>
            </div>
        )
    }

    return (
        <UploadDropzone
            endpoint={endPoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url);
            }}
            onUploadError={(error: Error) => {
                console.log(error);
            }}
        />
    )
}