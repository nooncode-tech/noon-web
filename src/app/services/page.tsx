"use client"

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Plus, Minus } from "lucide-react";
import Image from "next/image";

export default function Services() {

    const solutions = [
        { id: 1, title: "Web Solutions", description: "Lorem ipsum dolor sit amet consectetur. Aenean pharetra sagittis sed est viverra vel feugiat morbi pellentesque. Aenean vel viverra commodo ac turpis donec ut.", list: [{ id: 1, item: "Lorem Ipsum"}, { id: 2, item: "Lorem Ipsum"}, { id: 3, item: "Lorem Ipsum"}, { id: 4, item: "Lorem Ipsum"}], icon: "/services_icons/web.svg", image: "/placeholder.png" },
        { id: 2, title: "Mobile Solutions", description: "Lorem ipsum dolor sit amet consectetur. Aenean pharetra sagittis sed est viverra vel feugiat morbi pellentesque. Aenean vel viverra commodo ac turpis donec ut.", list: [{ id: 1, item: "Lorem Ipsum"}, { id: 2, item: "Lorem Ipsum"}, { id: 3, item: "Lorem Ipsum"}, { id: 4, item: "Lorem Ipsum"}], icon: "/services_icons/mobile.svg", image: "/placeholder.png" },
        { id: 3, title: "AI & Automation", description: "Lorem ipsum dolor sit amet consectetur. Aenean pharetra sagittis sed est viverra vel feugiat morbi pellentesque. Aenean vel viverra commodo ac turpis donec ut.", list: [{ id: 1, item: "Lorem Ipsum"}, { id: 2, item: "Lorem Ipsum"}, { id: 3, item: "Lorem Ipsum"}, { id: 4, item: "Lorem Ipsum"}], icon: "/services_icons/ia.svg", image: "/placeholder.png" },
        { id: 4, title: "Custom Software", description: "Lorem ipsum dolor sit amet consectetur. Aenean pharetra sagittis sed est viverra vel feugiat morbi pellentesque. Aenean vel viverra commodo ac turpis donec ut.", list: [{ id: 1, item: "Lorem Ipsum"}, { id: 2, item: "Lorem Ipsum"}, { id: 3, item: "Lorem Ipsum"}, { id: 4, item: "Lorem Ipsum"}], icon: "/services_icons/custom_software.svg", image: "/placeholder.png" },
        { id: 5, title: "Desktop Solutions", description: "Lorem ipsum dolor sit amet consectetur. Aenean pharetra sagittis sed est viverra vel feugiat morbi pellentesque. Aenean vel viverra commodo ac turpis donec ut.", list: [{ id: 1, item: "Lorem Ipsum"}, { id: 2, item: "Lorem Ipsum"}, { id: 3, item: "Lorem Ipsum"}, { id: 4, item: "Lorem Ipsum"}], icon: "/services_icons/desktop.svg", image: "/placeholder.png" },
        { id: 6, title: "Blockchain Services", description: "Lorem ipsum dolor sit amet consectetur. Aenean pharetra sagittis sed est viverra vel feugiat morbi pellentesque. Aenean vel viverra commodo ac turpis donec ut.", list: [{ id: 1, item: "Lorem Ipsum"}, { id: 2, item: "Lorem Ipsum"}, { id: 3, item: "Lorem Ipsum"}, { id: 4, item: "Lorem Ipsum"}], icon: "/services_icons/blockchain.svg", image: "/placeholder.png" },
        { id: 7, title: "Network Solutions", description: "Lorem ipsum dolor sit amet consectetur. Aenean pharetra sagittis sed est viverra vel feugiat morbi pellentesque. Aenean vel viverra commodo ac turpis donec ut.", list: [{ id: 1, item: "Lorem Ipsum"}, { id: 2, item: "Lorem Ipsum"}, { id: 3, item: "Lorem Ipsum"}, { id: 4, item: "Lorem Ipsum"}], icon: "/services_icons/network.svg", image: "/placeholder.png" },
        { id: 8, title: "Game Development", description: "Lorem ipsum dolor sit amet consectetur. Aenean pharetra sagittis sed est viverra vel feugiat morbi pellentesque. Aenean vel viverra commodo ac turpis donec ut.", list: [{ id: 1, item: "Lorem Ipsum"}, { id: 2, item: "Lorem Ipsum"}, { id: 3, item: "Lorem Ipsum"}, { id: 4, item: "Lorem Ipsum"}], icon: "/services_icons/game.svg", image: "/placeholder.png" },
    ];

    const [openSolutionId, setOpenSolutionId] = useState<number | null>(null);

    const handleToggle = (id: number) => {
        setOpenSolutionId(openSolutionId === id ? null : id);
    };

    return (
        <main className="min-h-screen text-white">

            {/* Hero Section */}
            <section className=" w-full flex flex-col items-center justify-end pt-40 md:pt-40 px-8 md:px-16 relative mx-auto">
                <div className="w-full flex flex-col items-start relative max-w-[1440px] pb-10 md:pb-20 justify-between gap-5">
                    <h1 className="hero-title-h1 font-bold Riosark max-w-[900px] text-center">
                        Services
                    </h1>
                    <p className="text-[12px] md:text-[16px]">
                        Lorem ipsum dolor sit amet consectetur. Aenean pharetra sagittis sed est viverra vel feugiat morbi pellentesque. Aenean vel viverra commodo ac turpis donec ut. Scelerisque amet venenatis nec lorem egestas. Tincidunt volutpat feugiat tincidunt orci gravida pretium ut scelerisque.
                    </p>
                </div>
            </section>

            {/* Services Section  */}
            <section className="w-full flex flex-col items-center justify-center py-12 md:py-0 px-8 md:px-16">
                <div className="w-full max-w-[1440px] flex flex-col gap-4">
                    {solutions.map((solution, index) => (
                        <div key={solution.id} className="border border-[var(--secondary-border-color)] rounded-xl overflow-hidden transition-all duration-300">
                            
                            {/* Clickeable */}
                            <div
                                className="p-4 md:p-6 flex justify-between items-center cursor-pointer hover:bg-white/5"
                                onClick={() => handleToggle(solution.id)}
                            >
                                <div className="flex items-center gap-4">
                                    <Image src={solution.icon} alt={`${solution.title} icon`} width={32} height={32} />
                                    <h3 className="text-lg md:text-2xl font-bold Riosark">{solution.title}</h3>
                                </div>
                                <span className="text-[var(--principal-button-color)]">
                                    {openSolutionId === solution.id ? <Minus size={30} /> : <Plus size={30} />}
                                </span>
                            </div>

                            {/* Desplegable */}
                            {openSolutionId === solution.id && (
                                <div className="p-6 md:p-10 bg-[var(--secondary-background-color)]/30">

                                    <div className={`w-full flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-10 items-center`}>
                                        
                                        <div className="w-full md:w-[45%] flex flex-col gap-6 justify-center">
                                            <h2 className="text-3xl md:text-4xl font-bold Riosark text-left">
                                                {solution.title}
                                            </h2>
                                            <p className="text-sm">
                                                {solution.description}
                                            </p>
                                            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm list-disc list-inside">
                                                {solution.list.map(item => (
                                                    <li key={item.id} className="text-[var(--secondary-text-color)]">
                                                        {item.item}
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="mt-4" style={{ width: 'fit-content' }}>
                                                <Link
                                                    href="/"
                                                    className="principal-button flex gap-3 justify-center items-center text-white hover:text-[var(--principal-background-color)]!"
                                                >
                                                    <span className="text-base sm:text-sm md:text-base">Let's talk</span>
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="w-full md:w-[55%] flex justify-center items-center relative">
                                            <Image
                                                src={solution.image}
                                                alt={`${solution.title} illustration`}
                                                className="rounded-xl border border-[var(--secondary-border-color)] p-4 md:p-10 w-full h-auto max-h-[480px] object-cover"
                                                width={540}
                                                height={540}
                                                priority={index < 2}
                                            />
                                            <Image
                                                src={solution.icon}
                                                alt={solution.title}
                                                width={80}
                                                height={80}
                                                className="object-contain w-full h-full max-w-[80px] md:max-w-[120px] max-h-[80px] md:max-h-[120px] absolute bottom-[-10px] md:bottom-[-20px] right-[-10px] md:right-[-20px] bg-[var(--principal-background-color)] rounded-xl border border-[var(--secondary-border-color)] p-3"
                                            />
                                        </div>

                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* NOON Section */}
            <section className="relative py-12 md:py-15 overflow-hidden px-4 md:px-16 border-t border-[var(--secondary-border-color)] mt-20">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">
                    {/* Section Title and Text */}
                    <div className="w-full md:w-[80%] flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-10">
                    <h2 className="w-full md:max-w-[620px] Riosark text-3xl sm:text-4xl md:text-[48px] text-center md:text-left">
                        Another service
                    </h2>
                    <p className="text-blank text-base sm:text-[15px] md:text-[14px] w-full md:max-w-[500px] text-center md:text-left">
                        We are people who create technology with purpose. That's why behind every solution there is a team that listens, analyzes, and supports.
                    </p>
                    </div>
                    {/* Button */}
                    <div className="w-full md:w-[20%] flex justify-center md:justify-center mt-4 md:mt-0">
                    <div className="w-fit">
                        <Link
                            href="/"
                            className="principal-button flex gap-3 justify-center items-center text-white hover:text-[var(--principal-background-color)]!"
                        >
                            <span className="text-base sm:text-sm md:text-base">Let's talk</span>
                        </Link>
                    </div>
                    </div>
                </div>
            </section>
        </main>
    );
}