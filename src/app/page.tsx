"use client"

import Link from "next/link";
import { ChevronRight, Search, Target, Code } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react"
import NumberFlow from '@number-flow/react'
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

interface ProcedureStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
}

interface LazyNumberFlowProps {
  targetValue: number;
}

const steps: ProcedureStep[] = [
  {
    id: "discovery",
    title: "Discovery",
    description:
      "We dive deep into understanding your business goals, target audience, and market landscape to create a solid foundation for your project.",
    icon: <Search className="w-8 h-8" />,
  },
  {
    id: "strategy",
    title: "Strategy",
    description:
      "Based on our findings, we develop a comprehensive strategy that aligns with your objectives and maximizes your digital potential.",
    icon: <Target className="w-8 h-8" />,
  },
  {
    id: "development",
    title: "Development",
    description:
      "We bring your vision to life with cutting-edge technology, ensuring scalability, performance, and exceptional user experience.",
    icon: <Code className="w-8 h-8" />,
  },
]

function LazyNumberFlow({ targetValue }: LazyNumberFlowProps) {
  const { ref, inView } = useInView({ triggerOnce: true });
  const valueToRender = inView ? targetValue : 0;

  return (
    <span ref={ref} className="hero-title-h2 font-bold text-white">
      + <CountUp start={0} end={valueToRender} duration={4} /> 
    </span>
  );
}

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

  const [activeStep, setActiveStep] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])



  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const section = sectionRef.current
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const windowHeight = window.innerHeight
      const scrollY = window.scrollY

      // Calculate if section is in view
      const sectionStart = sectionTop - windowHeight / 2
      const sectionEnd = sectionTop + sectionHeight - windowHeight / 2

      if (scrollY >= sectionStart && scrollY <= sectionEnd) {
        // Calculate progress within section
        const progress = Math.max(0, Math.min(1, (scrollY - sectionStart) / (sectionEnd - sectionStart)))
        setScrollProgress(progress)

        // Determine active step based on progress
        const stepIndex = Math.min(Math.floor(progress * steps.length), steps.length - 1)
        setActiveStep(stepIndex)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial call

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="min-h-screen">

      {/* Hero Section */}
      <section className="h-auto md:h-screen w-full flex flex-col items-center justify-end md:justify-center pt-40 md:pt-0 px-8 md:px-16">
        <div className="w-full flex flex-col items-center justify-center relative">

          <h1 className="hero-title-h1 font-bold Riosark text-white max-w-[900px] text-center">
            We boost your vision with digital innovation
          </h1>

          <div className="relative mt-9">
            <Link
              href="/"
              className="principal-button flex gap-3 justify-center items-center"
            >
              <span className="text-base sm:text-sm md:text-base">Anyways</span>
              <span className="flex border border-white-900 rounded-full p-1">
                <ChevronRight className="size-6 text-white" />
              </span>
            </Link>
          </div>

          {/* Semi-Arc */}
          <div className="relative w-full flex justify-center items-center" style={{ minHeight: '150px' }}>
            <div className="absolute top-0 left-0 right-0 w-full max-w-[1440px] overflow-hidden m-auto">
              <svg
                className="w-full h-auto"
                viewBox="0 0 1440 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,300 
                  C360,0 1080,0 1440,300" 
                  stroke="url(#gradient)" 
                  strokeWidth="7" 
                  fill="none"
                />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#FFF" stopOpacity="0" />
                    <stop offset="0.5" stopColor="#FFF" />
                    <stop offset="1" stopColor="#FFF" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

        </div>
      </section>

      {/* Services Section */}
      <section className="w-full flex flex-col items-center justify-center pt-8 md:pt-0 mt-0 md:mt-8 px-8 md:px-16">

        <h1 className="hero-title-h1 font-bold Riosark text-white max-w-[900px] text-center">
          Services
        </h1>

        <p className="max-w-[600px] text-white text-center text-base mt-10">
          Lorem ipsum dolor sit amet consectetur. Ipsum elementum ipsum volutpat odio fringilla augue. Sed dolor tempor in magna urna. Rhoncus feugiat turpis duis ultrices sit lacus magna euismod.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {solutions.map((solution) => (
            <div
              key={solution.id}
              className="px-6 py-16 rounded-xl  flex flex-col items-center text-center boxes-services-style"
            >
              {/* Icono (Placeholder) */}
              <div className="w-20 h-20 mb-4 rounded-full flex items-center justify-center">
                <Image
                  src={solution.icon}
                  alt={solution.title}
                  width={80}
                  height={80}
                  className="object-contain max-w-[80px] max-h-[80px]"
                />
              </div>
              <h3 className="text-xl font-semibold text-white Riosark">
                {solution.title}
              </h3>
            </div>
          ))}
        </div>

      </section>

      
      {/* Work Procedure Section */}
      <section ref={sectionRef} className="relative py-16 md:py-32 overflow-hidden px-4 md:px-16">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          {/* Section Title */}
          <div className="text-center mb-12 md:mb-24">
            <h1 className="hero-title-h1 m-auto font-bold Riosark text-white max-w-[900px] text-center">
              Work Procedure
            </h1>
            <p className="max-w-[600px] text-white text-center text-base mt-6 md:mt-10 m-auto">
              Lorem ipsum dolor sit amet consectetur. Ipsum elementum ipsum volutpat odio fringilla augue. Sed dolor tempor in magna urna. Rhoncus feugiat turpis duis ultrices sit lacus magna euismod.
            </p>
          </div>

          {/* Progress Line Container */}
          <div className="relative">
            {/* Background Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-700/30 rounded-full" />

            {/* Animated Progress Line */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-blue-900 to-blue-500 rounded-full transition-all duration-300 ease-out"
              style={{
                height: `${scrollProgress * 100}%`,
                boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)",
              }}
            />

            {/* Steps */}
            <div className="relative space-y-6 md:space-y-10">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  ref={(el) => { stepRefs.current[index] = el; }}
                  className={`flex flex-col items-center justify-center transition-all duration-700 ease-out ${
                    activeStep >= index ? "opacity-100 translate-y-0" : "opacity-30 translate-y-12"
                  }`}
                >
                  {/* Step Content */}
                  <div className={`flex items-center w-full max-w-lg md:max-w-4xl flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    {/* Content Card */}
                    <div className="flex-1 px-4 md:px-16">
                      <div
                        className={`boxes-services-style backdrop-blur-sm rounded-2xl p-8 transform transition-all duration-700 ${
                          activeStep >= index
                            ? "scale-100 translate-x-0"
                            : index % 2 === 0
                              ? "scale-95 -translate-x-8"
                              : "scale-95 translate-x-8"
                        }`}
                      >
                        <div className="flex items-center mb-4">
                          <div className="bg-gradient-to-r from-blue-900 to-blue-500 p-3 rounded-xl mr-4">
                            {step.icon}
                          </div>
                          <h3 className="text-xl md:text-2xl font-bold text-white">{step.title}</h3>
                        </div>
                        <p className="text-gray-300 leading-relaxed">{step.description}</p>
                      </div>
                    </div>

                    {/* Center Circle */}
                    <div className="relative z-10 my-4 md:my-0">
                      <div
                        className={`w-4 h-4 md:w-6 md:h-6 rounded-full border-4 transition-all duration-500 ${
                          activeStep >= index
                            ? "bg-gradient-to-r from-blue-900 to-blue-500 border-white scale-125"
                            : "bg-gray-700 border-gray-600 scale-100"
                        }`}
                      >
                        {activeStep >= index && (
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-900 to-blue-500 animate-ping opacity-75" />
                        )}
                      </div>
                    </div>

                    {/* Spacer for opposite side */}
                    <div className="flex-1 hidden md:block" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why noon? Section First Row */}
      <section className="w-full flex flex-col border-t border-b border-[var(--secondary-border-color)]">

        {/* Fist Row */}
        <div className="flex items-center w-full flex-col md:flex-row px-8 md:px-16 max-w-[1440px] m-auto">
            <div className="w-full md:w-[55%] flex flex-col justify-center items-center md:items-start py-10 pr-0 md:py-16 md:pr-16">
              <h2 className="hero-title-h2 font-bold text-white Riosark ">Why <span className="text-[var(--principal-border-button)]">noon?</span></h2>
              <p className="mt-4 text-gray-300 max-w-[544px] text-center md:text-left">
                Lorem ipsum dolor sit amet consectetur. Risus feugiat augue nisl leo augue ullamcorper tristique placerat. Malesuada pulvinar nunc malesuada a. Eu et egestas gravida at mi ut viverra pellentesque. Fermentum proin nibh faucibus in orci mattis est ultrices sit.
              </p>
            </div>
            <div className="flex w-full md:w-[45%] justify-center md:justify-center items-center border-l-0 md:border-l-1 md:border-[var(--secondary-border-color)] text-base relative pb-4 md:pb-0">
              <Image
                src="/base/profesor.gif"
                alt="profesor"
                width={508}
                height={508}
                className="profesor-style"
              />
            </div>
        </div>

      </section>

      {/* Why noon? Section Second Row */}
      <section className="w-full flex justify-center items-center flex-col border-t border-b border-[var(--secondary-border-color)]">

        {/* Second Row */}
        <div className="flex items-center w-full flex-row max-w-[1440px]">
            <div className="w-[45%] flex flex-col justify-center items-center py-20 md:py-30 Riosark">
              <div className="flex flex-col items-center">
                <h2 className="hero-title-h2 font-bold text-white"><LazyNumberFlow targetValue={45} /></h2>
                <p className="text-gray-300 max-w-[544px] text-center md:text-left">
                  Active programers
                </p>
              </div>
            </div>
            <div className="w-[55%] flex flex-row justify-center items-center border-l-1 border-[var(--secondary-border-color)] Riosark">
              <div className="w-full flex flex-row">
                <div className="w-[75%] flex flex-col items-center py-20 md:py-30">
                  <h2 className="hero-title-h2 font-bold text-white"><LazyNumberFlow targetValue={120} /></h2>
                  <p className="text-gray-300 max-w-[544px] text-center md:text-left">
                    Completed projects
                  </p>
                </div>
                <div className=" w-[25%] diagonal-pattern-box"></div>
              </div>
            </div>
        </div>

      </section>

      {/* Why noon? Section Three Row */}
      <section className="w-full flex justify-center items-center flex-col border-t border-b border-[var(--secondary-border-color)]">

        {/* Second Row */}
        <div className="flex items-center w-full flex-row max-w-[1440px]">
          <div className="w-[55%] flex flex-row justify-center items-center border-r-1 border-[var(--secondary-border-color)] Riosark">
              <div className="w-full flex flex-row">
                <div className=" w-[25%] diagonal-pattern-box"></div>
                <div className="w-[75%] flex flex-col items-center py-20 md:py-30">
                  <h2 className="hero-title-h2 font-bold text-white"><LazyNumberFlow targetValue={95} /></h2>
                  <p className="text-gray-300 max-w-[544px] text-center md:text-left">
                    Satisfied customers
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[45%] flex flex-col justify-center items-center py-20 md:py-30 Riosark">
              <div className="flex flex-col items-center">
                <h2 className="hero-title-h2 font-bold text-white"><LazyNumberFlow targetValue={83} /></h2>
                <p className="text-gray-300 max-w-[544px] text-center md:text-left">
                  Solutions implemented
                </p>
              </div>
            </div>
        </div>

      </section>

      {/* Contact Section */}
      <section className="w-full flex justify-center items-center flex-col px-8 md:px-30 py-16 md:py-30">

        {/* Tecnologies Box */}
        <div className="max-w-[1032px] w-full px-4 md:px-6 py-6 md:py-10 rounded-xl  flex flex-row items-center text-center boxes-tecnologies-style justify-evenly">
              <Image
                src="/tecnologies/react.svg"
                alt="react"
                width={100}
                height={100}
                className="tecnologies-img"
              />
              <Image
                src="/tecnologies/flutter.svg"
                alt="flutter"
                width={100}
                height={100}
                className="tecnologies-img"
              />
              <Image
                src="/tecnologies/solidity.svg"
                alt="solidity"
                width={100}
                height={100}
                className="tecnologies-img"
              />
              <Image
                src="/tecnologies/python.svg"
                alt="python"
                width={100}
                height={100}
                className="tecnologies-img"
              />
        </div>

        {/* Contact  */}
        <div className="w-full max-w-[1440px] flex flex-col md:flex-row items-center justify-center mt-16 md:mt-30 gap-10">
          <div className="w-[100%] md:w-[50%]">
            <h2 className="hero-title-h1 font-bold Riosark text-white max-w-[900px] text-left hero-title-h2">
              Contact us
            </h2>
            <p className="max-w-[480px] text-white text-left text-base mt-10">
              Lorem ipsum dolor sit amet consectetur. Aenean pharetra sagittis sed est viverra vel feugiat morbi pellentesque. Aenean vel viverra commodo ac turpis donec ut. Scelerisque amet venenatis nec lorem egestas. Tincidunt volutpat feugiat tincidunt orci gravida pretium ut scelerisque. Vulputate volutpat amet malesuada proin. Cras tempor pellentesque viverra molestie diam gravida.
            </p>
            <div className="w-[230px] relative mt-9">
              <Link
                href="/"
                className="principal-button flex gap-3 justify-center items-center"
              >
                <span className="text-base sm:text-sm md:text-base">Let's talk</span>
                <span className="flex border border-white-900 rounded-full p-1">
                  <ChevronRight className="size-6 text-white" />
                </span>
              </Link>
            </div>
          </div>
          <div className="w-[100%] md:w-[50%] max-w-[600px] border border-[var(--secondary-border-color)] rounded-xl overflow-hidden p-10">
            <Image
              src="/placeholder.png"
              alt="Contact Us"
              width={500}
              height={500}
              className="w-full h-auto"
            />
          </div>
        </div>

      </section>

    </main>

  );
}
