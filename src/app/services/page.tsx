"use client"

import Link from "next/link";
import { ChevronRight} from "lucide-react";
import Image from "next/image";

export default function Home() {

    {/* Services Boxes */}
    const solutions = [
        { id: 1, title: "Web Solutions", icon: "/services_icons/web.svg" },
        { id: 2, title: "Mobile Solutions", icon: "/services_icons/mobile.svg" },
        { id: 3, title: "AI & Automation", icon: "/services_icons/ia.svg" },
        { id: 4, title: "Custom Software", icon: "/services_icons/custom_software.svg" },
        { id: 5, title: "Desktop Solutions", icon: "/services_icons/desktop.svg" },
        { id: 6, title: "Blockchain Services", icon: "/services_icons/blockchain.svg" },
        { id: 7, title: "Network Solutions", icon: "/services_icons/network.svg" },
        { id: 8, title: "Game Development", icon: "/services_icons/game.svg" },
    ];

    return (
        <main className="min-h-screen">

            {/* Hero Section */}
            <section className="max-h-[766px] h-[80vh] md:h-[80vh] w-full flex flex-col items-center justify-end pt-40 md:pt-0 px-8 md:px-16 bg-[var(--secondary-background-color)] relative">
                <div className="w-full flex flex-col lg:flex-row items-start relative text-white max-w-[1440px] pb-10 md:pb-20 justify-between gap-5 md:gap-20">

                    <h1 className="hero-title-h1 font-bold Riosark text-white max-w-[900px] text-center">
                        Services
                    </h1>

                    <p className="text-[12px] md:text-[16px]">
                        Lorem ipsum dolor sit amet consectetur. Aenean pharetra sagittis sed est viverra vel feugiat morbi pellentesque. Aenean vel viverra commodo ac turpis donec ut. Scelerisque amet venenatis nec lorem egestas. Tincidunt volutpat feugiat tincidunt orci gravida pretium ut scelerisque.
                    </p>

                </div>

            </section>

            {/* Services Section */}
            <section className="w-full flex flex-col items-center justify-center pt-8 md:pt-0 mt-0 md:mt-20 px-8 md:px-16">

                <div className="w-full flex flex-row">
                    <div className="text-white">
                        <h2 className="hero-title-h1 font-bold Riosark text-white text-left">
                            Services
                        </h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur. Aenean pharetra sagittis sed est viverra vel feugiat morbi pellentesque. Aenean vel viverra commodo ac turpis donec ut. Scelerisque amet venenatis nec lorem egestas.
                        </p>
                        <ul>
                            
                        </ul>
                        <div className="relative mt-9 " style={{ width: 'fit-content' }}>
                            <Link
                            href="/"
                            className="secondary-button flex gap-3 justify-center items-center"
                            >
                            <span className="text-base sm:text-sm md:text-base">Let's talk</span>
                            <span className="flex border border-[var(--principal-background-color)] rounded-full p-1">
                                <ChevronRight className="size-6 text-[var(--principal-background-color)]" />
                            </span>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h1 className="hero-title-h1 font-bold Riosark text-white text-center">
                            Services
                        </h1>
                    </div>
                </div>

            </section>

        </main>

    );
}