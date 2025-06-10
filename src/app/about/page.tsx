"use client"

import React from "react";
import Image from "next/image";
import TeamSlider from "../../components/layout/SliderTeams"
import Link from "next/link";

export default function About() {

    return (
        <main className="min-h-screen text-white">

            {/* Hero Section */}
            <section className="h-auto md:h-screen w-full flex flex-col md:flex-row items-center md:items-center justify-end md:justify-center pt-40 md:pt-0 px-6 md:px-16 background-about relative overflow-hidden gap-8 border-b border-[var(--secondary-border-color)]">

                <div className="w-full md:w-[50%] flex flex-col items-center md:items-end justify-center relative text-center md:text-right px-4 md:px-0">
                    <h1 className="hero-title-h1 font-bold Riosark text-white max-w-[900px]">
                        Who we are
                    </h1>
                    <p className="hero-title-p max-w-[465px] mt-4">
                        Lorem ipsum dolor sit amet consectetur. Volutpat in risus sit vulputate penatibus. Urna nisi sollicitudin imperdiet vel commodo ultricies vitae velit varius. Non suspendisse consequat vulputate in.
                    </p>
                </div>

                <div className="w-full md:w-[50%] relative h-64 md:h-full flex items-center justify-start md:justify-center">
                    <Image
                        src="/base/LOGO-NOON-WHITE.svg"
                        alt="About Hero Image"
                        width={100}
                        height={100}
                        className="w-[150%] md:w-[4000px] absolute z-10 opacity-30 md:opacity-100"
                        style={{
                            left: '0%',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            maskImage: 'linear-gradient(to right, rgba(15, 14, 43, 1) 0%, rgba(15, 14, 43, 0.1) 80%)',
                            WebkitMaskImage: 'linear-gradient(to right, rgba(15, 14, 43, 1) 0%, rgba(15, 14, 43, 0.1) 80%)',
                        }}
                    />
                </div>
            </section>

            {/* Work Team Section */}
            <section className="relative pt-16 md:pt-20 overflow-hidden px-4 md:px-16">
                <div className="max-w-7xl mx-auto px-4 md:px-12">
                    {/* Section Title */}
                    <div className="text-center">
                        <h1 className="hero-title-h1 m-auto font-bold Riosark text-white max-w-[900px] text-center">
                            Work team
                        </h1>
                        <p className="max-w-[600px] text-white text-center text-base my-10 md:my-10 m-auto">
                            Lorem ipsum dolor sit amet consectetur. Leo scelerisque in non sit sem sit id neque. Blandit at vulputate vitae tincidunt. Commodo mauris egestas viverra enim diam natoque rhoncus adipiscing.
                        </p>
        
                    </div>

                    <TeamSlider />

                </div>
            </section>

            {/* Work Methodology Section */}
            <section className="relative  overflow-hidden pt-16 md:pt-20 px-4 md:px-16">
                <div className="max-w-7xl mx-auto px-4 md:px-12">
                    {/* Section Title */}
                    <div className="text-center">
                    <h1 className="hero-title-h1 m-auto font-bold Riosark text-white max-w-[900px] text-center">
                        Work Methodology
                    </h1>
                    <p className="max-w-[600px] text-white text-center text-base my-6 md:my-12 m-auto">
                        Lorem ipsum dolor sit amet consectetur. Ipsum elementum ipsum volutpat
                        odio fringilla augue. Sed dolor tempor in magna urna. Rhoncus feugiat
                        turpis duis ultrices sit lacus magna euismod.
                    </p>
        
                    <div
                        className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-6 mt-16"
                    >
                        <div
                        className="flex flex-col items-center gap-7 text-white rounded-xl boxes-services-style p-7 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)]"
                        >
                        <Image
                            src="/placeholder.png"
                            alt="Agile"
                            className="rounded-xl border border-[var(--secondary-border-color)] p-4"
                            width={100}
                            height={100}
                        />
                        <h2 className="Riosark">Agile</h2>
                        <p className="text-[12px]">
                            Lorem ipsum dolor sit amet consectetur. Ipsum elementum ipsum
                            volutpat odio fringilla augue.
                        </p>
                        </div>
                        <div
                        className="flex flex-col items-center gap-7 text-white rounded-xl boxes-services-style p-7 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)]"
                        >
                        <Image
                            src="/placeholder.png"
                            alt="Customer"
                            className="rounded-xl border border-[var(--secondary-border-color)] p-4"
                            width={100}
                            height={100}
                        />
                        <h2 className="Riosark">Customer focus</h2>
                        <p className="text-[12px]">
                            Lorem ipsum dolor sit amet consectetur. Ipsum elementum ipsum
                            volutpat odio fringilla augue.
                        </p>
                        </div>
                        <div
                        className="flex flex-col items-center gap-7 text-white rounded-xl boxes-services-style p-7 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)]"
                            >
                                <Image
                                src="/placeholder.png"
                                alt="Innovation"
                                className="rounded-xl border border-[var(--secondary-border-color)] p-4"
                                width={100}
                                height={100}
                                />
                                <h2 className="Riosark">Constant innovation</h2>
                                <p className="text-[12px]">
                                Lorem ipsum dolor sit amet consectetur. Ipsum elementum ipsum
                                volutpat odio fringilla augue.
                                </p>
                            </div>
                            </div>
                        </div>
                        </div>
            </section>

            {/* Brand Values Section */}
            <section className="relative pt-16 px-4 overflow-hidden md:pt-32 md:px-16">
                <div className="max-w-7xl mx-auto flex flex-col gap-8 px-0 md:px-12 md:flex-row md:gap-10">
                    
                    <div className="w-full flex flex-col items-center justify-center relative md:w-[60%] md:flex-row md:items-center md:justify-end">
                        <Image
                            src="/placeholder.png"
                            alt="Brand Values Image"
                            className="rounded-xl border border-[var(--secondary-border-color)] p-4 w-[90%] h-auto max-h-[480px] object-cover md:p-10"
                            width={540}
                            height={540}
                        />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  md:-translate-x-0 md:-translate-y-0 flex flex-col Riosark
                                        text-center text-3xl md:text-left md:text-3xl lg:text-[40px]
                                        md:top-10 md:left-0 md:transform-none">
                            <h2 className="font-bold text-white mt-2 tracking-[3px] md:mt-5 md:tracking-[5px]">
                                Innovation
                            </h2>
                            <h2 className="font-bold text-white mt-2 tracking-[3px] md:mt-5 md:tracking-[5px]">
                                Quality
                            </h2>
                            <h2 className="font-bold text-white mt-2 tracking-[3px] md:mt-5 md:tracking-[5px]">
                                Commitment
                            </h2>
                        </div>
                    </div>

                    <div className="w-full flex flex-col items-center justify-center text-center mt-8 md:mt-0 md:w-[40%] md:items-start md:text-left">
                        <h2 className="text-3xl font-bold text-white Riosark max-w-[240px] md:text-[40px]">
                            Brand Values
                        </h2>
                        <p className="text-gray-300 mt-4 max-w-[400px]">
                            Lorem ipsum dolor sit amet consectetur. Sodales proin vitae aenean auctor. Fames orci non suspendisse fermentum non tempus diam risus.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mision Vision */}
            <section className="w-full flex justify-center items-center flex-col px-8 md:px-16 pt-16 md:pt-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1440px] w-[75%]">
                
                    <div className="flex flex-col justify-center items-center py-10 md:py-10 rounded-xl boxes-services-style">
                        <div className="flex flex-col items-center text-center px-12">
                        <h2 className="hero-title-h2 font-bold text-white Riosark">
                            Mision
                        </h2>
                        <p className="text-gray-300 max-w-[544px] text-center pt-4">
                            Lorem ipsum dolor sit amet consectetur. Volutpat in risus sit vulputate penatibus. Urna nisi sollicitudin imperdiet vel commodo ultricies vitae velit varius. Non suspendisse consequat vulputate in.
                        </p>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center items-center py-10 md:py-10 rounded-xl boxes-services-style">
                        <div className="flex flex-col items-center text-center px-12">
                        <h2 className="hero-title-h2 font-bold text-white Riosark">
                            Vision
                        </h2>
                        <p className="text-gray-300 max-w-[544px] text-center pt-4">
                            Lorem ipsum dolor sit amet consectetur. Volutpat in risus sit vulputate penatibus. Urna nisi sollicitudin imperdiet vel commodo ultricies vitae velit varius. Non suspendisse consequat vulputate in.
                        </p>
                        </div>
                    </div>

                </div>
            </section>

            {/* NOON Section */}
            <section className="relative pb-16 md:pb-15 overflow-hidden px-4 md:px-16 pt-30">
                <div className="max-w-7xl mx-auto px-4 md:px-12">
                    {/* Section Title */}
                    <div className="text-center flex flex-col items-center">
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
                        <p className="max-w-[900px] text-white text-center text-base mt-6 md:mt-10 m-auto">
                            We are people who create technology with purpose. That’s why behind every solution there is a team that listens,
                            analyzes, and supports. More than just developing software, we help our clients move forward with confidence, clarity, and results.
                        </p>
                    </div>
                </div>
            </section>

            {/* NOON Contact Section */}
            <section className="relative py-12 md:py-15 overflow-hidden px-4 md:px-16 border-t border-[var(--secondary-border-color)]">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">
                    {/* Section Title and Text */}
                    <div className="w-full md:w-[80%] flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-10">
                    <h2 className="w-full md:max-w-[320px] Riosark text-3xl sm:text-4xl md:text-[48px] text-center md:text-left">
                        Contact us
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