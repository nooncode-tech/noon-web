"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function PrototypePreview() {
    const params = useParams();
    const id = params?.id as string;
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        (async () => {
            const { data, error } = await supabase
                .from("prototypes")
                .select("preview_url")
                .eq("id", id)
                .single();
            if (data?.preview_url) setPreview(data.preview_url);
        })();
    }, [id]);

    if (!preview) return <div className="p-8 text-center">Loading prototype...</div>;

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div
                style={{
                    width: "90vw",
                    height: "90vh",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: "1px solid var(--secondary-border-color)",
                    background: "#fff"
                }}
            >
                <iframe
                    src={preview}
                    title="Prototype Preview"
                    sandbox="allow-scripts allow-same-origin allow-popups"
                    frameBorder={0}
                    style={{ width: "100%", height: "100%" }}
                />
            </div>
        </div>
    );
}