"use client"

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, Earth } from "lucide-react";
import { FaInstagram, FaTiktok, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Contact() {

    return (
        <main className="min-h-screen">

            {/* Contact Form Section */}
            <section className="w-full min-h-screen flex flex-col items-center justify-center pt-8 md:pt-0 px-4 md:px-16 pb-12 md:pb-0"> {/* Ajustes de padding y min-h-screen */}

                <div className="max-w-[1440px] min-h-[1000px] w-full flex flex-col-reverse md:flex-row gap-8 md:gap-20 justify-center items-center"> {/* Cambiado a flex-col en móvil, ajuste de gap */}

                    <div className="flex w-full border border-gray-700/50 rounded-2xl p-6 md:p-16 mt-8 md:mt-0 gap-10"> {/* w-full en móvil, padding y margin top ajustados */}

                        <div className="w-[50%]">

                            <form className="w-full">
                                <h1 className="text-2xl md:text-[30px] font-bold Riosark text-white mb-6 md:mb-10 text-center text-start!">Contact us</h1> {/* Ajuste de tamaño de fuente y alineación */}
                                <div className="flex flex-col gap-4 text-white">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name" // Añadí id para el label
                                        placeholder="Your Name"
                                        className="p-3 md:p-4 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" // Añadí estilos para bg y text
                                    />
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email" // Añadí id para el label
                                        placeholder="Your Email"
                                        className="p-3 md:p-4 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <label htmlFor="message">Message</label>
                                    <textarea
                                        id="message" // Añadí id para el label
                                        placeholder="Your Message"
                                        rows={5} // Establecí un número de filas por defecto
                                        className="p-3 md:p-4 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    ></textarea>
                                    <span className="flex items-center gap-2 text-sm md:text-base"> {/* Alineación y ajuste de tamaño de fuente */}
                                        <input type="checkbox" id="privacy-policy" className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2" /> {/* ID para checkbox y estilos básicos */}
                                        <label htmlFor="privacy-policy">I have read and accept the privacy policies</label>
                                    </span>
                                    <button
                                        type="submit"
                                        className="principal-button flex gap-3 justify-center items-center mt-4 text-white hover:text-[var(--principal-background-color)]!" // Añadí margin-top al botón
                                    >
                                        <span className="text-base">Send Message</span>
                                    </button>
                                </div>
                            </form>

                        </div>

                        <div className="w-[50%] rounded-2xl overflow-hidden">
                            <Image
                                src="/map3.PNG"
                                alt="Contact Image"
                                className="w-full h-full  object-contain"
                                width={2000}
                                height={1000}
                                priority
                            />
                        </div>

                    </div>

                </div>

            </section>

            {/* Contact Map Section */}
            <section className="w-full flex flex-col items-center justify-center pt-0 px-0 md:px-16 pb-12 md:pb-0 border-t border-[var(--secondary-border-color)]">
                <div className="w-full max-w-[1440px] flex flex-col-reverse md:flex-col gap-6 py-16 justify-center items-center">
                    {/* Contact Info */}
                        <span className="flex flex-row gap-2 items-center"> {/* Asegura alineación vertical */}
                            <Link
                                href="tel:+0001238426000"
                                className="flex items-center gap-3 transition-colors duration-200 text-white text-lg md:text-[15px]" // Ajuste tamaño de fuente
                            >
                                <Phone className="size-6 md:size-7" /> {/* Ajuste de tamaño de icono */}
                                <span className="Riosark">Phone</span>
                                <span>+000 123 (8426) 000</span>
                            </Link>
                        </span>

                        <span className="flex flex-row gap-2 items-center"> {/* Asegura alineación vertical */}
                            <Link
                                href="mailto:Hello@noon.com"
                                className="flex items-center gap-3 transition-colors duration-200 text-white text-lg md:text-[15px]" // Ajuste tamaño de fuente
                            >
                                <Mail className="size-6 md:size-7" /> {/* Cambié a Mail icon, Phone repetido no es correcto */}
                                <span className="Riosark">Email</span>
                                <span>Hello@noon.com</span>
                            </Link>
                        </span>

                        <div className="flex space-x-6 justify-center md:justify-start text-white mt-4 md:mt-0"> {/* Ajuste de alineación y margin top para mobile */}
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
            </section>

        </main>
    );
}