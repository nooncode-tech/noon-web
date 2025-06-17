"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CodeEditorWidgetProps {
    title?: string
    language?: string
    code?: string
    theme?: "dark"
    files?: string[]
}

export default function CodeEditorWidget({
    title = "page.tsx",
    language = "typescript",
    code = `// Ejemplo de código JavaScript
function saludar(nombre) {
console.log("Hola, " + nombre + "!");
return "Bienvenido, " + nombre;
}

const usuario = "Desarrollador";
const mensaje = saludar(usuario);
const usuario = "Desarrollador";
const mensaje = saludar(usuario);
const usuario = "Desarrollador";
const mensaje = saludar(usuario);
const usuario = "Desarrollador";
const mensaje = saludar(usuario);
const usuario = "Desarrollador";`,
    theme = "dark",
    files = [
        "page.tsx",
        "app.tsx",
        "useStore.ts",
        "api.ts",
        "README.md",
        "styles.css"
    ]
}: CodeEditorWidgetProps) {
    const [copied, setCopied] = useState(false)

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(code)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error("Error al copiar:", err)
        }
    }

    const highlightCode = (code: string) => {
        // Escapar HTML primero
        let highlighted = code
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;")

        // Aplicar syntax highlighting de forma más segura
        highlighted = highlighted
            // Comentarios
            .replace(/(\/\/.*$|#.*$)/gm, '<span style="color: #6b7280;">$1</span>')
            // Palabras clave
            .replace(
                /\b(function|const|let|var|if|else|for|while|return|import|export|class|extends|def|print|from|as)\b/g,
                '<span style="color: #a855f7;">$1</span>',
            )
            // Objetos/métodos comunes
            .replace(/\b(console|document|window)\b/g, '<span style="color: #3b82f6;">$1</span>')
            // Strings (más simple y seguro)
            .replace(/(&quot;[^&]*?&quot;|&#39;[^&]*?&#39;)/g, '<span style="color: #10b981;">$1</span>')
            // Números
            .replace(/\b(\d+)\b/g, '<span style="color: #f97316;">$1</span>')

        return highlighted
    }

    const lines = code.split("\n")

    return (
        <div
            className={`
                w-full 
                max-w-[700px]
                mx-auto 
                rounded 
                overflow-hidden 
                shadow-xl
                ${theme === "dark" ? "bg-gray-800/30" : "bg-gray-800/30"}
                border 
                ${theme === "dark" ? "border-[var(--secondary-border-color)]" : "border-gray-200"}
            `}
            style={{
                fontSize: '11px',
                lineHeight: 1.35,
            }}
        >
            {/* Barra de título de la ventana */}
            <div
                className={`
                    flex items-center justify-between px-2 py-1.5
                    ${theme === "dark" ? "bg-gray-800/30 border-b border-[var(--secondary-border-color)]" : "bg-gray-100 border-b border-gray-200"}
                `}
                style={{
                    fontSize: '11px',
                    minHeight: '26px'
                }}
            >
                <div className="flex items-center space-x-1">
                    {/* Botones de ventana */}
                    <div className="flex space-x-0.5">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>

                    {/* Título del archivo */}
                    <span className={`text-[10px] font-medium ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>{title}</span>

                    {/* Indicador de lenguaje */}
                    <span
                        className={`text-[9px] px-1 py-0.5 rounded ${theme === "dark" ? "bg-blue-600 text-blue-100" : "bg-blue-100 text-blue-800"
                            }`}
                    >
                        {language}
                    </span>
                </div>

                {/* Botón de copiar */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyToClipboard}
                    className={`
                        h-6 px-1.5 text-[10px]
                        ${theme === "dark"
                            ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700"
                            : "text-gray-600 hover:text-gray-800 hover:bg-gray-200"
                        }
                    `}
                >
                    {copied ? (
                        <>
                            <Check className="w-3 h-3 mr-0.5" />
                            Copiado
                        </>
                    ) : (
                        <>
                            <Copy className="w-3 h-3 mr-0.5" />
                            Copiar
                        </>
                    )}
                </Button>
            </div>

            {/* Contenido principal: barra de archivos + código */}
            <div className={`flex ${theme === "dark" ? "bg-[var(--principal-background-color)]" : "bg-gray-50"}`} style={{height: 'calc(100% - 26px - 22px)', minHeight: 0}}>
                {/* Barra lateral de archivos */}
                <div
                    className={`
                        flex flex-col py-1.5 pr-1 pl-0.5 min-w-[85px] w-[90px] bg-gray-900/80 border-r 
                        ${theme === "dark" ? "border-[var(--secondary-border-color)]" : "border-gray-200"}
                    `}
                    style={{
                        fontSize: '10px'
                    }}
                >
                    <div className="text-[9px] text-gray-400 font-semibold mb-1 px-1 select-none tracking-wide">
                        EXPLORER
                    </div>
                    <div className="flex-1 flex flex-col gap-0.5">
                        {files.map((file, idx) => (
                            <div
                                key={file}
                                className={`
                                    px-1.5 py-0.5 rounded text-[10px] truncate font-mono cursor-default select-none
                                    ${file === title
                                        ? "bg-gray-700/90 text-blue-300 font-bold"
                                        : "text-gray-300 hover:bg-gray-800/70"
                                    }
                                `}
                                style={{
                                    opacity: file === title ? 1 : 0.82
                                }}
                            >
                                {file}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Código */}
                <div className="flex-1 overflow-x-auto overflow-y-auto" style={{ minHeight: 0 }}>
                    <div className="flex">
                        {/* Números de línea */}
                        <div
                            className={`
                                select-none py-2 px-1 text-right 
                                ${theme === "dark"
                                    ? "bg-gray-800/30 text-gray-500 border-r border-[var(--secondary-border-color)]"
                                    : "bg-gray-800/30 text-gray-400 border-r border-gray-200"
                                }
                            `}
                        >
                            {lines.map((_, index) => (
                                <div key={index} className="text-[9.5px] leading-4 font-mono">
                                    {index + 1}
                                </div>
                            ))}
                        </div>

                        {/* Contenido del código */}
                        <div className="flex-1 py-2 px-2">
                            <pre
                                className={`
                                    text-[10.5px] font-mono leading-4
                                    ${theme === "dark" ? "text-gray-100" : "text-gray-800"}
                                `}
                                style={{ margin: 0 }}
                            >
                                {lines.map((line, index) => (
                                    <div key={index} className="min-h-[1.10rem]">
                                        <code
                                            style={{ fontSize: "10.5px" }}
                                            dangerouslySetInnerHTML={{
                                                __html: line ? highlightCode(line) : "&nbsp;",
                                            }}
                                        />
                                    </div>
                                ))}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>

            {/* Barra de estado */}
            <div
                className={`
                    flex items-center justify-between px-2 py-1 text-[9.5px]
                    ${theme === "dark"
                        ? "bg-gray-800/30 text-gray-400 border-t border-[var(--secondary-border-color)]"
                        : "bg-gray-800/30 text-gray-600 border-t border-[var(--secondary-border-color)]"
                    }
                `}
                style={{
                    minHeight: '22px',
                    fontSize: "9.5px"
                }}
            >
                <div className="flex items-center space-x-2">
                    <span>Líneas: {lines.length}</span>
                    <span>Caracteres: {code.length}</span>
                </div>
                <div className="flex items-center space-x-1">
                    <span>UTF-8</span>
                    <span>•</span>
                    <span className="capitalize">{language}</span>
                </div>
            </div>
        </div>
    )
}