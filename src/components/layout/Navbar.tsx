"use client"

import { useState } from "react"
import Link from "next/link"
import Image from 'next/image'
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"

// Array de los items del menú
const menuItems = [
    { label: "Home", path: "/" },
    { label: "Services", path: "/services" },
    { label: "About Us", path: "/about" },
    { label: "Contact", path: "/contact", className: "navbar-button flex gap-3 justify-center items-center text-white hover:text-[var(--principal-background-color)]!" },
]

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="flex align-center justify-center sticky top-0 z-50 w-full px-8 md:px-16 border-b border-[var(--secondary-border-color)] bg-[var(--principal-background-color)] max-w-[2600px] mx-auto">
            <nav className="max-w-[1440px]  py-4 md:py-8 flex justify-between items-center w-full">
                {/* Logo */}
                <div>
                    <Link href="/" className="block">
                        <div className="relative w-[90px] h-[28px] md:w-[152px] md:h-[35px]">
                            <Image
                                src="/base/LOGO-NOON-WHITE.svg"
                                alt="Logo"
                                fill
                                sizes="(max-width: 768px) 120px, 152px"
                                priority
                                className="object-contain"
                            />
                        </div>
                    </Link>
                </div>


                {/* Menú de Navegación Desktop */}
                <ul className="hidden md:flex items-center space-x-6 list-none m-0 p-0">
                    {menuItems.map((item) => (
                        <li key={item.path}>
                            <Link
                            href={item.path}
                            className={`text-white hover:text-gray-200 no-underline transition-colors duration-200 font-medium ${item.className}`}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Menú Mobile */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden text-white hover:text-gray-200 hover:bg-gray-700">
                            <Menu className="size-6" />
                            <span className="sr-only">Abrir menú</span>
                        </Button>
                    </SheetTrigger>

                    <SheetTitle className="hidden">Menu</SheetTitle>

                    <SheetContent side="right" className="w-[300px] bg-[var(--principal-background-color)] border-gray-700 p-0 [&>button]:hidden">
                        <div className="flex flex-col h-full">
                            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
                                <Link
                                href="/"
                                className="text-xl font-bold text-white hover:text-gray-200 no-underline"
                                onClick={() => setIsOpen(false)}
                                >
                                    <div className="relative w-[90px] h-[28px]">
                                        <Image
                                            src="/base/LOGO-NOON.svg"
                                            alt="Logo"
                                            fill
                                            sizes="(max-width: 768px) 120px, 152px"
                                            priority
                                            className="object-contain"
                                        />
                                    </div>
                                </Link>
                                <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsOpen(false)}
                                className="text-white hover:text-gray-200 hover:bg-gray-700 h-8 w-8"
                                >
                                    <X className="size-7" />
                                    <span className="sr-only">Cerrar menú</span>
                                </Button>
                            </div>

                            <nav className="flex flex-col space-y-2 px-6 py-2">
                                {menuItems.map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className="text-white hover:text-gray-200 no-underline py-1 rounded-md hover:bg-gray-700 transition-colors duration-200 font-medium"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </Link>
                                ))}
                            </nav>
                        </div>
                    </SheetContent>
                </Sheet>
            </nav>
        </div>
    )
}

export default Navbar