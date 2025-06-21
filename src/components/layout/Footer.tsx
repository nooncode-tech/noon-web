import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Phone, MailOpen } from "lucide-react"
import { FaInstagram, FaTiktok, FaFacebook } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

const Footer: React.FC = () => {
  return (
    <footer className="text-gray-300 py-12 border-t border-[var(--secondary-border-color)] max-w-[2600px] mx-auto">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-5 border-b border-[var(--secondary-border-color)] pb-8">
            
          {/* Column 1: Logo and description*/}
          <div className="flex flex-col justify-center space-y-4 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="text-3xl font-extrabold text-white no-underline">
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
            <p className="text-sm leading-relaxed text-gray-400">
              Lorem ipsum dolor sit amet consectetur. Faucibus eget pharetra potenti aliquet.
            </p>
          </div>

          {/* Column 2: Accesses */}
          <div className="px-0 sm:px-6 lg:px-12 pt-4 pb-1 lg:col-span-1 sm:border-l-0 lg:border-l lg:border-[var(--secondary-border-color)]">
            <h3 className="text-lg font-semibold text-white mb-4 Riosark">Accesses</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-white text-gray-400 transition-colors duration-200 flex items-center"
                >
                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-white text-gray-400 transition-colors duration-200 flex items-center"
                >
                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white text-gray-400 transition-colors duration-200 flex items-center"
                >
                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white text-gray-400 transition-colors duration-200 flex items-center"
                >
                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div className="px-0 sm:px-6 lg:px-12 pt-4 pb-1 lg:col-span-1 sm:border-l-0 lg:border-l lg:border-[var(--secondary-border-color)]">
            <h3 className="text-lg font-semibold text-white mb-4 Riosark">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/cookies-policy"
                  className="hover:text-white text-gray-400 transition-colors duration-200 flex items-center"
                >
                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                  Cookies Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/legal-terms"
                  className="hover:text-white text-gray-400 transition-colors duration-200 flex items-center"
                >
                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                  Legal Terms
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-white text-gray-400 transition-colors duration-200 flex items-center"
                >
                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Phone and email */}
          <div className="flex flex-col justify-center lg:col-span-1 px-0 sm:px-6 lg:pl-6 gap-4 sm:border-l-0 lg:border-l lg:border-[var(--secondary-border-color)]">
            <div className="flex items-center space-x-3">
              <Link
                href="tel:+0001238426000"
                className="flex items-center gap-3 hover:text-white transition-colors duration-200"
              >
                <Phone className="size-5 text-gray-400" />
                <span className="text-white text-sm">+000 123 (8426) 000</span>
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                href="mailto:Hello@noon.com"
                className="flex items-center gap-3 hover:text-white transition-colors duration-200"
              >
                <MailOpen className="size-5 text-gray-400" />
                <span className="text-white text-sm">Hello@noon.com</span>
              </Link>
            </div>
          </div>

          {/* Column 5: Social media */}
          <div className="flex flex-col justify-center lg:col-span-1 px-0 sm:px-6 sm:border-l-0 lg:border-l lg:border-[var(--secondary-border-color)]">
            <div className="flex space-x-6 justify-start lg:justify-end">
              <Link
                href="#"
                aria-label="TikTok"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <FaTiktok className="size-6" />
              </Link>
              <Link
                href="#"
                aria-label="Facebook"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <FaFacebook className="size-6" />
              </Link>
              <Link
                href="#"
                aria-label="Instagram"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <FaInstagram className="size-6" />
              </Link>
              <Link
                href="#"
                aria-label="X (Twitter)"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <FaXTwitter className="size-6" />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-8 text-sm text-gray-500">
          © {new Date().getFullYear()} Noon. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer