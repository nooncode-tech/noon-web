import Image from "next/image";
import Link from "next/link";

export const ContactAgent = () => {
    return (
        <div className="flex flex-col items-center gap-6 py-4">
            <div className="flex-shrink-0 w-18 h-18 rounded-full bg-[var(--principal-button-color)] flex items-center justify-center shadow-sm p-1">
                <Image
                    src="/team/3.png" // Asegúrate que esta ruta es correcta
                    className="w-full h-full object-cover rounded-full"
                    width={64}
                    height={64}
                    alt="Agent Rafael Jiménez"
                />
            </div>

            <p className="text-gray-300 text-center text-sm">
                Rafael Jiménez, your Expert Advisor. Ready to help you grow.
            </p>

            <div className="flex items-center gap-3">
                <Link
                    className="text-[var(--principal-button-color)] bg-white py-2 px-4 rounded-full font-medium text-base flex items-center gap-2 hover:bg-gray-100 transition-colors duration-150 justify-center"
                    href="sms:+17865576079"
                >
                    Message
                </Link>

                <Link
                    className="text-white bg-green-500 py-2 px-4 rounded-full font-medium text-base flex items-center gap-2 hover:bg-green-600 transition-colors duration-150"
                    href="https://wa.me/17865576079"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    WhatsApp
                </Link>
            </div>
        </div>
    );
};