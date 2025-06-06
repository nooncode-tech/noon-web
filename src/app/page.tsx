"use client"

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

interface LazyNumberFlowProps {
  targetValue: number;
}
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

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 mt-20">
          {solutions.map((solution) => (
            <div
              key={solution.id}
              className="px-6 py-6 rounded-xl max-w-[160px] flex flex-col items-center text-center boxes-services-style"
            >
              {/* Icono (Placeholder) */}
              <div className="w-20 h-20 mb-4 rounded-full flex items-center justify-center">
                <Image
                  src={solution.icon}
                  alt={solution.title}
                  width={80}
                  height={80}
                  className="object-contain max-w-[60px] max-h-[60px]"
                />
              </div>
              <h3 className="text-[12px] md:text-[17px] font-semibold text-white Riosark">
                {solution.title}
              </h3>
            </div>
          ))}
        </div>

      </section>

      {/* Work Procedure Section */}
      <section className="relative py-16 md:py-32 overflow-hidden px-4 md:px-16">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          {/* Section Title */}
          <div className="text-center">
            <h1 className="hero-title-h1 m-auto font-bold Riosark text-white max-w-[900px] text-center">
              Work Procedure
            </h1>
            <p className="max-w-[600px] text-white text-center text-base mt-6 md:mt-10 m-auto">
              Lorem ipsum dolor sit amet consectetur. Ipsum elementum ipsum volutpat
              odio fringilla augue. Sed dolor tempor in magna urna. Rhoncus feugiat
              turpis duis ultrices sit lacus magna euismod.
            </p>

            <div
              className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-6 mt-8"
            >
              <div
                className="flex flex-col items-center gap-7 text-white rounded-xl boxes-services-style p-7 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)]"
              >
                <Image
                  src="/placeholder.png"
                  alt="Discovery"
                  className="rounded-xl border border-[var(--secondary-border-color)] p-4"
                  width={100}
                  height={100}
                />
                <h2 className="Riosark">Discovery</h2>
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
                  alt="Strategy"
                  className="rounded-xl border border-[var(--secondary-border-color)] p-4"
                  width={100}
                  height={100}
                />
                <h2 className="Riosark">Strategy</h2>
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
                  alt="Development"
                  className="rounded-xl border border-[var(--secondary-border-color)] p-4"
                  width={100}
                  height={100}
                />
                <h2 className="Riosark">Development</h2>
                <p className="text-[12px]">
                  Lorem ipsum dolor sit amet consectetur. Ipsum elementum ipsum
                  volutpat odio fringilla augue.
                </p>
              </div>
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
                unoptimized
              />
            </div>
        </div>

      </section>

      {/* Why noon? Section Second Row V1
      <section className="w-full flex justify-center items-center flex-col border-t border-b border-[var(--secondary-border-color)]">

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
      */}

      {/* Why noon? Section Three Row
      <section className="w-full flex justify-center items-center flex-col border-t border-b border-[var(--secondary-border-color)]">

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
      */}

      {/* Why noon? Section Three Row V2 */}
      <section className="w-full flex justify-center items-center flex-col px-8 md:px-16 my-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1440px] w-[60%] mt-10">
          
          <div className="flex flex-col justify-center items-center py-10 md:py-20 rounded-xl boxes-services-style">
            <div className="flex flex-col items-center text-center px-12">
              <h2 className="hero-title-h2 font-bold text-white">
                <LazyNumberFlow targetValue={45} />
              </h2>
              <p className="text-gray-300 max-w-[544px] text-center">
                Active programers
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center py-10 md:py-20 rounded-xl boxes-services-style">
            <div className="flex flex-col items-center text-center px-12">
              <h2 className="hero-title-h2 font-bold text-white">
                <LazyNumberFlow targetValue={120} />
              </h2>
              <p className="text-gray-300 max-w-[544px] text-center">
                Completed projects
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center py-10 md:py-20 rounded-xl boxes-services-style">
            <div className="flex flex-col items-center text-center px-12">
              <h2 className="hero-title-h2 font-bold text-white">
                <LazyNumberFlow targetValue={95} />
              </h2>
              <p className="text-gray-300 max-w-[544px] text-center">
                Satisfied customers
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center py-10 md:py-20 rounded-xl boxes-services-style">
            <div className="flex flex-col items-center text-center px-12">
              <h2 className="hero-title-h2 font-bold text-white">
                <LazyNumberFlow targetValue={83} />
              </h2>
              <p className="text-gray-300 max-w-[544px] text-center">
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
            <div className="relative mt-9" style={{ width: 'fit-content' }}>
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
