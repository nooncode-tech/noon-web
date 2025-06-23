"use client"

import React from "react";
import Image from "next/image";
import TeamSlider from "../../components/layout/SliderTeams"
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { TrendingUp, Users, Award, Target, Star, CheckCircle } from "lucide-react"

function useCountUp(end: number, duration = 2000) {
    const [count, setCount] = useState(0)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (!isVisible) return

        let startTime: number
        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime
            const progress = Math.min((currentTime - startTime) / duration, 1)

            setCount(Math.floor(progress * end))

            if (progress < 1) {
                requestAnimationFrame(animate)
            }
        }

        requestAnimationFrame(animate)
    }, [end, duration, isVisible])

    return { count, setIsVisible }
}

function StatCard({
    icon: Icon,
    value,
    suffix = "",
    label,
    delay = 0,
}: {
    icon: any
    value: number
    suffix?: string
    label: string
    delay?: number
}) {
    const { count, setIsVisible } = useCountUp(value, 2000 + delay)
    const cardRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const refCurrent = cardRef.current
        if (!refCurrent) return

        const observer = new window.IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setIsVisible(true), delay)
                    observer.unobserve(refCurrent)
                }
            },
            { threshold: 0.3 } // Ajusta el threshold según necesites
        )

        observer.observe(refCurrent)

        return () => observer.disconnect()
    }, [delay, setIsVisible])

    return (
        <div
            ref={cardRef}
            className="px-4 py-8 rounded-xl flex flex-col items-center text-center bg-gray-800/30 border border-gray-700/50 transition-colors duration-200 hover:bg-gray-700/70 cursor-pointer"
        >
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-3">
                <Icon className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-white Riosark">
                {count}
                {suffix}
            </div>
            <div className="text-[12px] text-gray-300 mt-1">{label}</div>
        </div>
    )
}

function ProgressBar({
    label,
    percentage,
    color = "blue",
}: {
    label: string
    percentage: number
    color?: string
}) {
    const [width, setWidth] = useState(0)
    const barRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const refCurrent = barRef.current
        if (!refCurrent) return

        const observer = new window.IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setWidth(percentage), 500)
                    observer.unobserve(refCurrent)
                }
            },
            { threshold: 0.3 } // Ajusta el threshold si lo necesitas
        )

        observer.observe(refCurrent)

        return () => observer.disconnect()
    }, [percentage])

    const colorClasses = {
        blue: "bg-blue-500",
        green: "bg-green-500",
        purple: "bg-purple-500",
        orange: "bg-orange-500",
    }

    return (
        <div className="space-y-2" ref={barRef}>
            <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">{label}</span>
                <span className="text-sm font-semibold text-white">{percentage}%</span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-2">
                <div
                    className={`h-2 rounded-full transition-all duration-1000 ease-out ${colorClasses[color as keyof typeof colorClasses]}`}
                    style={{ width: `${width}%` }}
                />
            </div>
        </div>
    )
}

export default function About() {

    return (
        <main className="min-h-screen text-white">

            {/* Hero Section */}
            <section className="h-[40vh] md:h-[80vh] w-full flex flex-col md:flex-row items-center md:items-center justify-center px-6 md:px-16 background-about relative overflow-hidden gap-8 border-b border-[var(--secondary-border-color)]">

                <div className="w-full md:w-[50%] flex flex-col items-center md:items-end justify-center relative text-center md:text-right px-4 md:px-0">
                    <h1 className="hero-title-h1 font-bold Riosark text-white max-w-[900px]">
                        Who we are
                    </h1>
                    <p className="hero-title-p max-w-[465px] mt-4 text-[14px]">
                        Noon is a global tech company focused on custom digital solutions.
                        With 500+ expert developers and a results-driven approach, we deliver efficient, high-quality technology tailored to your goals.
                    </p>
                </div>

                <div className="w-full md:w-[50%] relative h-64 md:h-full hidden md:flex items-center justify-start md:justify-center">
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
            <section className="relative overflow-hidden px-4 md:px-16 border-b border-[var(--secondary-border-color)] py-10 md:py-30">
                <div className="max-w-7xl mx-auto px-4 md:px-12">
                    {/* Section Title */}
                    <div className="text-center">
                        <h1 className="hero-title-h1 m-auto font-bold Riosark text-white max-w-[900px] text-center">
                            Work team
                        </h1>
                        <p className="max-w-[600px] text-white text-center text-[14px] my-10 md:my-6 m-auto">
                            At Noon, our team comprises highly qualified developers, designers, and technology specialists dedicated to delivering excellence.
                            We operate with precision, collaboration, and a clear focus on achieving our clients' objectives.
                        </p>

                    </div>

                    <TeamSlider />

                </div>
            </section>

            {/* Work Methodology Section */}
            <section className="relative px-4 md:px-16 border-b border-[var(--secondary-border-color)] py-10 md:py-30">
                <div className="max-w-7xl mx-auto px-4 md:px-12">
                    {/* Section Title */}
                    <div className="text-center flex flex-col items-center">
                        <h1 className="hero-title-h1 m-auto font-bold Riosark text-white max-w-[900px] text-center">
                            Work Procedure
                        </h1>
                        <p className="max-w-[600px] text-white text-center text-[14px] mt-6 md:my-6 m-auto">
                            Clear steps. Reliable results.
                            At Noon, we follow a streamlined process that keeps you involved and your project on track—from the first visual prototype to final delivery. Our method ensures speed, precision, and full alignment with your vision.
                        </p>

                        <div
                            className="max-w-[80%] flex flex-col md:flex-row justify-stretch  pt-6 gap-8"
                        >
                            <div
                                className="flex flex-col items-center gap-5 text-white rounded-xl boxes-services-style p-7 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] shadow-xl"
                                style={{
                                    boxShadow: '0 6px 32px 0 rgba(59, 46, 185, 0.35), 0 1.5px 3px 0 rgba(255,255,255,0.12)',
                                }}
                            >
                                <Image
                                    src="/home-img/visual-prototype.png"
                                    alt="Discovery"
                                    className="p-4"
                                    width={110}
                                    height={100}
                                />
                                <h2 className="Riosark">Visual Prototype</h2>
                                <p className="text-[12px]">
                                    We create a visual prototype of your idea to review details together and make adjustments before development.
                                </p>
                            </div>
                            <div
                                className="flex flex-col items-center gap-5 text-white rounded-xl boxes-services-style p-7 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)]"
                                style={{
                                    boxShadow: '0 6px 32px 0 rgba(59, 46, 185, 0.35), 0 1.5px 3px 0 rgba(255,255,255,0.12)',
                                }}
                            >
                                <Image
                                    src="/home-img/development.png"
                                    alt="Strategy"
                                    className="p-4"
                                    width={110}
                                    height={100}
                                />
                                <h2 className="Riosark">Development</h2>
                                <p className="text-[12px]">
                                    We turn the prototype into functional code, built with quality and efficiency.
                                </p>
                            </div>
                            <div
                                className="flex flex-col items-center gap-5 text-white rounded-xl boxes-services-style p-7 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)]"
                                style={{
                                    boxShadow: '0 6px 32px 0 rgba(59, 46, 185, 0.35), 0 1.5px 3px 0 rgba(255,255,255,0.12)',
                                }}
                            >
                                <Image
                                    src="/home-img/delivery.png"
                                    alt="Delivery"
                                    className="p-4"
                                    width={110}
                                    height={100}
                                />
                                <h2 className="Riosark">Delivery</h2>
                                <p className="text-[12px]">
                                    We deliver the final product on time—ready to launch and fully tailored to your needs.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Brand Values Section */}
            <section className="relative px-4 overflow-hidden md:px-16 border-b border-[var(--secondary-border-color)] py-10 md:py-30">
                <div className="max-w-7xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-white text-center Riosark md:text-[40px]">
                        What Sets Us Apart
                    </h2>
                </div>
                <div className="max-w-7xl mx-auto flex flex-col gap-8 px-0 md:px-12 md:flex-row md:gap-10">

                    <div className="w-full flex flex-col items-center justify-start text-center mt-0 md:mt-0 md:w-[50%] md:items-center md:text-left">
                        <div className="grid grid-cols-2 gap-4 w-full max-w-[400px]">
                            <StatCard icon={Users} value={95} suffix="+" label="Satisfied Customers" delay={0} />
                            <StatCard icon={Award} value={98} suffix="+" label="Solutions Implemented" delay={200} />
                            <StatCard icon={TrendingUp} value={250} suffix="+" label="Projects Delivered" delay={400} />
                            <StatCard icon={Target} value={5} suffix=" Years" label="Experience" delay={600} />
                        </div>
                    </div>

                    <div className="w-full flex flex-col items-center justify-center relative md:w-[50%] md:flex-col md:items-center md:justify-center">
                        {/* Barras de Progreso */}
                        <div className="w-full max-w-[400px] space-y-4">
                            <h3 className="text-lg font-semibold text-white Riosark mb-4">Our Expertise</h3>
                            <ProgressBar label="Commitment to Quality" percentage={98} color="blue" />
                            <ProgressBar label="Agile & Scalable Delivery" percentage={95} color="green" />
                            <ProgressBar label="Client-Centered Communication" percentage={92} color="purple" />
                            <ProgressBar label="Cutting-Edge Tech Solutions" percentage={96} color="orange" />
                        </div>

                        {/* Logros Destacados */}
                        <div className="w-full max-w-[400px] mt-8">
                            <h3 className="text-lg font-semibold text-white Riosark mb-4">Key Achievements</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <Award className="w-5 h-5 text-blue-400 flex-shrink-0" />
                                    <span className="text-sm text-gray-300">ISO 9001 Quality Certified</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                                    <span className="text-sm text-gray-300">250+ Projects Successfully Delivered</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Star className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                                    <span className="text-sm text-gray-300">4.9/5 Average Client Rating</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Mision Vision */}
            <section className="w-full flex justify-center items-center flex-col px-8 md:px-16 border-b border-[var(--secondary-border-color)] py-10 md:py-30">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1440px] w-[90%] md:w-[70%]">

                    <div className="flex flex-col justify-center items-center py-10 md:py-10 rounded-xl boxes-services-style" style={{
                        boxShadow: '0 6px 32px 0 rgba(59, 46, 185, 0.35), 0 1.5px 3px 0 rgba(255,255,255,0.12)',
                    }}>
                        <div className="flex flex-col items-center text-center px-10">
                            <h2 className="hero-title-h2 font-bold text-white Riosark">
                                Mision
                            </h2>
                            <p className="text-gray-300 max-w-[544px] text-center pt-4 text-[14px]">
                                To develop tailored technological solutions that drive growth and digital transformation for our clients, delivering quality, innovation, and efficiency in every project.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center items-center py-10 md:py-10 rounded-xl boxes-services-style" style={{
                        boxShadow: '0 6px 32px 0 rgba(59, 46, 185, 0.35), 0 1.5px 3px 0 rgba(255,255,255,0.12)',
                    }}>
                        <div className="flex flex-col items-center text-center px-10">
                            <h2 className="hero-title-h2 font-bold text-white Riosark">
                                Vision
                            </h2>
                            <p className="text-gray-300 max-w-[544px] text-center pt-4 text-[14px]">
                                To become a global leader in technology development, recognized for the excellence of our services, our commitment to clients, and our ability to turn ideas into scalable, real-world solutions.
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            {/* NOON Section */}
            <section className="relative overflow-hidden px-4 md:px-16 py-10 md:py-20">
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
                        <p className="max-w-[900px] text-white text-center text-[14px] mt-6 md:mt-10 m-auto">
                            We are people who create technology with purpose. That's why behind every solution there is a team that listens,
                            analyzes, and supports. More than just developing software, we help our clients move forward with confidence, clarity, and results.
                        </p>
                    </div>
                </div>
            </section>

            {/* NOON Contact Section */}
            <section className="relative overflow-hidden px-4 md:px-16 border-t border-[var(--secondary-border-color)] py-10 md:py-20">
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