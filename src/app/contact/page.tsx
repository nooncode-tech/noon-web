"use client"

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, Earth } from "lucide-react";
import { FaInstagram, FaTiktok, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", message: "", accepted: false });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<null | "success" | "error">(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value, type } = e.target;
        if (type === "checkbox") {
            // Aquí sí sabemos que es un input
            setForm((prev) => ({
            ...prev,
            [id]: (e.target as HTMLInputElement).checked,
            }));
        } else {
            setForm((prev) => ({
            ...prev,
            [id]: value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        if (!form.name || !form.email || !form.message || !form.accepted) {
        setStatus("error");
        setLoading(false);
        return;
        }

        try {
        const res = await fetch("/api/gmail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
        });
        const data = await res.json();
        if (data.ok) {
            setStatus("success");
            setForm({ name: "", email: "", message: "", accepted: false });
        } else {
            setStatus("error");
        }
        } catch (err) {
        setStatus("error");
        }
        setLoading(false);
    };

    return (
        <main className="min-h-screen">

            {/* Contact Form Section */}
            <section className="w-full min-h-screen flex flex-col items-center justify-center pt-8 md:pt-0 px-4 md:px-16 pb-12 md:pb-0"> {/* Ajustes de padding y min-h-screen */}

                <div className="max-w-[1440px] min-h-[1000px] w-full flex flex-col-reverse md:flex-row gap-8 md:gap-20 justify-center items-center"> {/* Cambiado a flex-col en móvil, ajuste de gap */}

                    <div className="flex flex-col md:flex-row w-full border border-[var(--secondary-border-color)] rounded-2xl p-6 md:p-16 mt-8 md:mt-0 gap-10"> {/* w-full en móvil, padding y margin top ajustados */}

                        <div className="w-full md:w-[50%]">

                            <form className="w-full" onSubmit={handleSubmit}>
                                <h1 className="text-2xl md:text-[30px] font-bold Riosark text-white mb-6 md:mb-10 text-center text-start!">Contact us</h1> {/* Ajuste de tamaño de fuente y alineación */}
                                <div className="flex flex-col gap-4 text-white">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name" // Añadí id para el label
                                        placeholder="Your Name"
                                        value={form.name}
                                        onChange={handleChange} 
                                        className="p-3 md:p-4 rounded-md border border-[var(--secondary-border-color)] focus:outline-none focus:ring-2 focus:ring-blue-500" // Añadí estilos para bg y text
                                    />

                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email" // Añadí id para el label
                                        placeholder="Your Email"
                                        value={form.email} 
                                        onChange={handleChange}
                                        className="p-3 md:p-4 rounded-md border border-[var(--secondary-border-color)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />

                                    <label htmlFor="message">Message</label>
                                    <textarea
                                        id="message" // Añadí id para el label
                                        placeholder="Your Message"
                                        rows={5} // Establecí un número de filas por defecto
                                        value={form.message} 
                                        onChange={handleChange}
                                        className="p-3 md:p-4 rounded-md border border-[var(--secondary-border-color)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    ></textarea>

                                    <span className="flex items-center gap-2 text-sm md:text-base"> {/* Alineación y ajuste de tamaño de fuente */}
                                        <input type="checkbox" id="accepted" checked={form.accepted} onChange={handleChange} className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2" /> {/* ID para checkbox y estilos básicos */}
                                        <label htmlFor="accepted">I have read and accept the privacy policies</label>
                                    </span>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="principal-button flex gap-3 justify-center items-center mt-4 text-white hover:text-[var(--principal-background-color)]!" // Añadí margin-top al botón
                                    >
                                        <span className="text-base">{loading ? "Enviando..." : "Send Message"}</span>
                                    </button>

                                    {status === "success" && (
                                        <p className="text-green-500 mt-2">¡Mensaje enviado correctamente!</p>
                                    )}
                                    {status === "error" && (
                                        <p className="text-red-500 mt-2">Hubo un error al enviar el mensaje.</p>
                                    )}
                                </div>
                            </form>

                        </div>

                        <div className="w-full md:w-[50%] flex flex-col gap-10 rounded-2xl overflow-hidden">
                            <div className="border border-[var(--secondary-border-color)] rounded-2xl relative
                            ">
                                <Image
                                    src="/map3.PNG"
                                    alt="Contact Image"
                                    className="w-full h-full  object-contain"
                                    width={2000}
                                    height={1000}
                                    priority
                                />
                            </div>
                            <div className="border border-[var(--secondary-border-color)] rounded-2xl relative p-10 flex flex-col align-start justify-start gap-3 md:gap-6">
                                <span className="flex flex-row gap-2 items-center"> {/* Asegura alineación vertical */}
                                    <Link
                                        href="tel:+0001238426000"
                                        className="flex items-center gap-3 transition-colors duration-200 text-white text-[12px] md:text-[15px]" // Ajuste tamaño de fuente
                                    >
                                        <Phone className="size-6 md:size-7" /> {/* Ajuste de tamaño de icono */}
                                        <span className="Riosark">Phone</span>
                                        <span>+000 123 (8426) 000</span>
                                    </Link>
                                </span>

                                <span className="flex flex-row gap-2 items-center"> {/* Asegura alineación vertical */}
                                    <Link
                                        href="mailto:Hello@noon.com"
                                        className="flex items-center gap-3 transition-colors duration-200 text-white text-[12px] md:text-[15px]" // Ajuste tamaño de fuente
                                    >
                                        <Mail className="size-6 md:size-7" /> {/* Cambié a Mail icon, Phone repetido no es correcto */}
                                        <span className="Riosark">Email</span>
                                        <span>Hello@noon.com</span>
                                    </Link>
                                </span>

                                <div className="flex space-x-6 justify-center md:justify-start text-white mt-4 md:mt-0"> {/* Ajuste de alineación y margin top para mobile */}
                                    <Link 
                                      href="https://www.tiktok.com/@nooncode.dev?_t=ZS-8ztpxIfHgHw&_r=1" 
                                      target="_blank" 
                                      rel="noopener noreferrer" 
                                      aria-label="TikTok"
                                    >
                                        <FaTiktok className="size-6" />
                                    </Link>
                                    <Link 
                                      href="https://www.facebook.com/profile.php?id=61571938881520"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      aria-label="Facebook"
                                    >
                                        <FaFacebook className="size-6" />
                                    </Link>
                                    <Link 
                                      href="https://www.instagram.com/nooncode.dev?igsh=MWR1djY1bHJidWxuZA=="
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      aria-label="Instagram"
                                    >
                                        <FaInstagram className="size-6" />
                                    </Link>
                                    <Link href="#" aria-label="X (Twitter)">
                                        <FaXTwitter className="size-6" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </section>

            {/* Contact Map Section
            <section className="w-full flex flex-col items-center justify-center pt-0 px-0 md:px-16 pb-12 md:pb-0 border-t border-[var(--secondary-border-color)]">
                <div className="w-full max-w-[1440px] flex flex-col-reverse md:flex-col gap-6 py-16 justify-center items-center">
                   
                        <span className="flex flex-row gap-2 items-center">
                            <Link
                                href="tel:+0001238426000"
                                className="flex items-center gap-3 transition-colors duration-200 text-white text-lg md:text-[15px]" 
                            >
                                <Phone className="size-6 md:size-7" />
                                <span className="Riosark">Phone</span>
                                <span>+000 123 (8426) 000</span>
                            </Link>
                        </span>

                        <span className="flex flex-row gap-2 items-center">
                            <Link
                                href="mailto:Hello@noon.com"
                                className="flex items-center gap-3 transition-colors duration-200 text-white text-lg md:text-[15px]"
                            >
                                <Mail className="size-6 md:size-7" /> 
                                <span className="Riosark">Email</span>
                                <span>Hello@noon.com</span>
                            </Link>
                        </span>

                        <div className="flex space-x-6 justify-center md:justify-start text-white mt-4 md:mt-0">
                            <Link href="#" aria-label="TikTok">
                                <FaTiktok className="size-6" />
                            </Link>
                            <Link href="#" aria-label="Facebook">
                                <FaFacebook className="size-6" />
                            </Link>
                            <Link href="#" aria-label="Instagram">
                                <FaInstagram className="size-6" />
                            </Link>
                            <Link href="#" aria-label="X (Twitter)">
                                <FaXTwitter className="size-6" />
                            </Link>
                        </div>
                </div>
            </section>*/}

        </main>
    );
}
