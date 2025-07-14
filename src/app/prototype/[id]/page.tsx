"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Sandpack } from "@codesandbox/sandpack-react";

export default function PrototypePreview() {
    const params = useParams();
    const id = params?.id as string;
    const [code, setCode] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        (async () => {
            const { data, error } = await supabase
                .from("prototypes")
                .select("code")
                .eq("id", id)
                .single();
            if (data?.code) setCode(data.code);
        })();
    }, [id]);

    if (!code) return <div className="p-8 text-center">Loading prototype...</div>;

    return (
        <div style={{ height: "100vh", background: "#f7f7f7" }}>
            <Sandpack
                template="static"
                files={{
                    "/index.html": { code, active: true }
                }}
                options={{
                    showTabs: false,
                    showNavigator: true,
                    showLineNumbers: true,
                    wrapContent: true,
                }}
            />
        </div>
    );
}