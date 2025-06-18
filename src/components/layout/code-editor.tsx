"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTypewriter } from "react-simple-typewriter"

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
  code = `import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Chrome, Github, Mail, Zap, Cpu, Info } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">NebulaGrid</span>
            </div>
  )
}`,
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

  // Typewriter hook
  const [text, { isDone }] = useTypewriter({
    words: [code],
    typeSpeed: Math.max(1, Math.floor(3000 / (code ? code.length : 1))),
    deleteSpeed: 99999,
    delaySpeed: 99999,
    loop: 1
  })

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Error al copiar:", err)
    }
  }

  const highlightCode = (str: string) => {
    let highlighted = str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")
    highlighted = highlighted
      .replace(/(\/\/.*$|#.*$)/gm, '<span style="color: #6b7280;">$1</span>')
      .replace(
        /\b(function|const|let|var|if|else|for|while|return|import|export|class|extends|def|print|from|as)\b/g,
        '<span style="color: #a855f7;">$1</span>',
      )
      .replace(/\b(console|document|window)\b/g, '<span style="color: #3b82f6;">$1</span>')
      .replace(/(&quot;[^&]*?&quot;|&#39;[^&]*?&#39;)/g, '<span style="color: #10b981;">$1</span>')
      .replace(/\b(\d+)\b/g, '<span style="color: #f97316;">$1</span>')
    return highlighted
  }

  const lines = code.split("\n")
  const shownLines: string[] = (text ? text : "").split("\n")
  const showCursor = !isDone

  return (
    <div
      className={`
        w-full
        max-w-[320px]
        md:max-w-[680px]
        max-h-auto
        md:max-h-[360px]
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
        boxShadow: '0 6px 32px 0 rgba(59, 46, 185, 0.35), 0 1.5px 3px 0 rgba(255,255,255,0.12)',
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
          <div className="flex space-x-0.5">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
          <span className={`text-[10px] font-medium ${theme === "dark" ? "text-gray-200" : "text-gray-700"}`}>{title}</span>
        </div>
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

      {/* Altura responsive con Tailwind */}
      <div
        className="flex h-[220px] xs:h-[260px] sm:h-[320px] md:h-[400px] lg:h-[500px] min-h-0"
      >
        {/* Barra lateral de archivos */}
        <div
          className={`
            flex flex-col py-1.5 pr-1 pl-0.5 min-w-[54px] w-[70px] bg-gray-900/80 border-r
            ${theme === "dark" ? "border-[var(--secondary-border-color)]" : "border-gray-200"}
          `}
          style={{
            fontSize: '10px'
          }}
        >
          <div className="text-[9px] text-gray-400 font-semibold mb-1 px-1 select-none tracking-wide">
            EXPLORER
          </div>
          <div className="flex-1 flex flex-col gap-0.5 overflow-y-hidden">
            {files.map((file) => (
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
        <div className="flex-1 overflow-x-hidden overflow-y-hidden min-w-0">
          <div className="flex h-full min-h-0">
            {/* Números de línea */}
            <div
              className={`
                select-none py-3 px-1 text-right
                ${theme === "dark"
                  ? "bg-gray-800/30 text-gray-500 border-r border-[var(--secondary-border-color)]"
                  : "bg-gray-800/30 text-gray-400 border-r border-gray-200"
                }
              `}
              style={{ minWidth: '27px' }}
            >
              {Array.from({ length: Math.max(1, shownLines.length) }).map((_, index) => (
                <div key={index} className="text-[9.5px] min-h-[1.10rem] font-mono">
                  {index + 1}
                </div>
              ))}
            </div>
            {/* Contenido del código */}
            <div className="flex-1 py-2 px-2 overflow-hidden min-w-0">
              <pre
                className={`
                  text-[10.5px] font-mono leading-4 min-h-[80px] md:min-h-[200px]
                  ${theme === "dark" ? "text-gray-100" : "text-gray-800"}
                `}
                style={{ margin: 0 }}
              >
                {shownLines.map((line: string, index: number) => (
                  <div key={index} className="min-h-[1.10rem]">
                    <code
                      style={{ fontSize: "10.5px" }}
                      dangerouslySetInnerHTML={{
                        __html:
                          highlightCode(line) +
                          (showCursor && index === shownLines.length - 1
                            ? '<span class="animate-pulse inline-block w-2" style="color:#a3a3a3;">|</span>'
                            : ""),
                      }}
                    />
                  </div>
                ))}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}