"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function PrototypeContent() {
    const searchParams = useSearchParams();
    const urlParam = searchParams.get("url");

    return (
        <div
            style={{
                width: "90vw",
                height: "90vh",
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid var(--secondary-border-color)",
                background: "#fff",
            }}
        >
            <iframe
                src={urlParam ?? ""}
                title="Prototype Preview"
                sandbox="allow-scripts allow-same-origin allow-popups"
                style={{ width: "100%", height: "100%", border: "none" }}
            />
        </div>
    );
}

export default function PrototypePreview() {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <Suspense fallback={<div className="text-gray-500">Cargando vista previa...</div>}>
                <PrototypeContent />
            </Suspense>
        </div>
    );
}