"use client";

import React from "react";

const TermSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="flex flex-col gap-3">
        <h2 className="text-xl md:text-2xl font-bold Riosark text-white">{title}</h2>
        <div className="flex flex-col gap-4 text-gray-300 leading-relaxed">
            {children}
        </div>
    </div>
);

export default function TermsAndConditions() {
    return (
        <main className="min-h-screen">
            <section className="w-full flex flex-col items-center pt-24 md:pt-32 px-4 md:px-16 pb-12 md:pb-24">
                <div className="max-w-[1440px] w-full flex flex-col items-center">

                    <div className="w-full max-w-5xl border border-[var(--secondary-border-color)] rounded-2xl p-6 md:p-12 lg:p-16">

                        <h1 className="text-2xl md:text-[30px] font-bold Riosark text-white mb-4 text-center">
                            Terms and Conditions
                        </h1>
                        <p className="text-center text-gray-400 mb-10 md:mb-12">
                            Effective: October 13, 2025
                        </p>

                        <div className="flex flex-col gap-8">

                            <TermSection title="1) Who we are and what these terms cover">
                                <p>
                                    These Terms and Conditions ("Terms") govern your access to and use of Noon's websites, apps,
                                    and services (collectively, the "Services") provided by Noon ("Noon," "we," "our," or "us"). By
                                    using the Services, you agree to these Terms.
                                </p>
                            </TermSection>

                            <TermSection title="2) Eligibility">
                                <p>
                                    You must be at least 13 years old to use the Services. If you are 13-17, you may use the
                                    Services only with the consent and supervision of a parent or legal guardian who agrees to these
                                    Terms on your behalf. The Services are not directed to children under 13.
                                </p>
                            </TermSection>

                            <TermSection title="3) Services">
                                <p>
                                    We provide technology development services, including web solutions, mobile apps, AI &
                                    automation, custom software, desktop solutions, blockchain services, network solutions,
                                    and game development.
                                </p>
                            </TermSection>

                            <TermSection title="4) Accounts and accuracy">
                                <p>
                                    You're responsible for your account credentials and for keeping your information accurate and up
                                    to date. Notify us promptly of any unauthorized use.
                                </p>
                            </TermSection>

                            <TermSection title="5) Acceptable use">
                                <p>
                                    You agree to use the Services lawfully and not to: (a) infringe IP or privacy rights, (b)
                                    reverse-engineer, probe, or disrupt the Services, (c) upload malware, or (d) use the Services to
                                    build competing datasets or services without written permission.
                                </p>
                                <h3 className="text-lg font-semibold Riosark text-white mt-2">5.1) Client responsibilities</h3>
                                <p>
                                    The client is responsible for providing information, materials, accesses, and approvals
                                    necessary to complete the project. Delays caused by missing or incomplete information are not
                                    Noon's responsibility and may affect timelines and costs.
                                </p>
                            </TermSection>

                            <TermSection title="6) Intellectual property and transfer of rights (custom work)">
                                <p>
                                    Except as agreed in a written services agreement or statement of work (SOW), all content,
                                    designs, software, code, documentation, and materials in or provided via the Services are
                                    owned by Noon or its licensors and protected by applicable IP laws.
                                </p>
                                <p>
                                    For custom development services, and once the final project is delivered and full payment
                                    is received, Noon will assign and transfer to the client the intellectual property rights in the
                                    Delivered Product, except for:
                                </p>
                                <ul className="list-disc list-inside pl-4 flex flex-col gap-2">
                                    <li>
                                        Noon pre-existing IP (frameworks, libraries, templates, utilities, and know-how), which remains
                                        Noon's; and
                                    </li>
                                    <li>
                                        Third-party and open-source components, which are governed by their own licenses.
                                    </li>
                                </ul>
                                <p>
                                    Noon grants the client a perpetual, worldwide, royalty-free license to use Noon's pre-existing IP
                                    only as incorporated in the Delivered Product and only as needed to operate that product. Until
                                    full payment, the client receives a limited, revocable license for internal review.
                                    Noon may reference the project in portfolios/case studies unless otherwise agreed in writing.
                                </p>
                            </TermSection>

                            <TermSection title="7) Feedback">
                                <p>
                                    If you submit ideas or suggestions, you grant Noon a perpetual, worldwide, royalty-free license
                                    to use them without obligation.
                                </p>
                            </TermSection>

                            <TermSection title="8) Third-party services">
                                <p>
                                    The Services may link to third-party sites or integrate third-party tools. Noon is not responsible for
                                    third-party services, and different terms may apply.
                                </p>
                                <p>
                                    Additional notice: Noon may use third-party platforms or APIs (e.g., hosting, cloud, or AI
                                    integrations) for specific functions. While Noon does not sell or share data with third parties for
                                    behavioral advertising, certain data may be processed by those vendors under their policies,
                                    acting as processors/service providers where applicable.
                                </p>
                            </TermSection>

                            <TermSection title="9) Fees and payment">
                                {/* El PDF dice "Choose ONE of the following". 
                  He elegido la opción (B) Direct billing que parecía más relevante 
                  para una agencia de desarrollo. 
                */}
                                <p>
                                    Direct billing: If you purchase directly from Noon, we use a third-party payment processor
                                    (e.g., Stripe/PayPal) to process payments. You authorize charges to your selected payment
                                    method for fees, applicable taxes, and any bank/transaction charges. Noon does not store your full
                                    card number; our processor does so on our behalf.
                                </p>
                                <p>
                                    Taxes: Prices exclude sales and similar taxes unless stated otherwise. Applicable taxes are
                                    calculated at checkout.
                                </p>
                                <p>
                                    Chargebacks/fees: You are responsible for fees arising from failed payments or chargebacks
                                    initiated by you (or, if applicable, your minor dependents using your account).
                                </p>
                            </TermSection>

                            <TermSection title="10) Cancellations and refunds">
                                <p>
                                    Refunds will not be issued once the client has approved the project and development has
                                    begun. Refunds may be considered only if Noon fails to deliver the agreed services due to a
                                    fault attributable to our production or development processes. Any deposit is non-refundable
                                    unless expressly agreed otherwise. Refunds (if applicable) are the exclusive remedy.
                                </p>
                            </TermSection>

                            <TermSection title="11) Warranties and disclaimers">
                                <p className="uppercase font-medium text-gray-200 tracking-wide">
                                    THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE." TO THE MAXIMUM EXTENT
                                    PERMITTED BY LAW, NOON DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED,
                                    INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
                                    NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICES WILL BE ERROR-FREE
                                    OR UNINTERRUPTED.
                                </p>
                            </TermSection>

                            Setting parameter temperature to 1
                            <TermSection title="12) Limitation of liability">
                                <p className="uppercase font-medium text-gray-200 tracking-wide">
                                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, NOON WILL NOT BE LIABLE FOR
                                    INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE
                                    DAMAGES, OR FOR LOST PROFITS, REVENUE, DATA, OR GOODWILL. NOON'S TOTAL
                                    LIABILITY FOR ALL CLAIMS RELATING TO THE SERVICES WILL NOT EXCEED THE
                                    AMOUNTS YOU PAID TO NOON FOR THE SERVICES IN THE 12 MONTHS BEFORE THE
                                    EVENT GIVING RISE TO LIABILITY.
                                </p>
                            </TermSection>

                            <TermSection title="13) Indemnification">
                                <p>
                                    You will indemnify and hold Noon harmless from claims, losses, and expenses (including
                                    reasonable attorneys' fees) arising from your use of the Services, your content, or your breach
                                    of these Terms.
                                </p>
                            </TermSection>

                            <TermSection title="14) Suspension and termination">
                                <p>
                                    We may suspend or terminate your access if we reasonably believe you breached these Terms,
                                    risk harm to the Services or others, or as required by law. You may stop using the Services at any
                                    time.
                                </p>
                            </TermSection>

                            <TermSection title="15) Deliverables and timelines">
                                <p>
                                    Timelines depend on the agreed scope. If the client promptly provides all required inputs, Noon
                                    usually delivers within one month, unless the project is of significant scale or complexity.
                                    Change requests may adjust schedule and fees.
                                </p>
                            </TermSection>

                            <TermSection title="16) Changes to the Services or Terms">
                                <p>
                                    We may modify the Services and these Terms. Material changes will be posted, and the revised
                                    Terms will apply upon posting. Continued use after changes means you accept the revised Terms.
                                </p>
                            </TermSection>

                            <TermSection title="17) Governing law; venue">
                                <p>
                                    These Terms are governed by the laws of the State of Delaware, USA, without regard to
                                    conflicts of laws principles. Venue for any disputes that are not subject to arbitration (if any) will be
                                    in state or federal courts located in Delaware, and you consent to personal jurisdiction there.
                                </p>
                                {/* He omitido la sección opcional de Arbitraje como indica el PDF.
                  Puedes añadirla aquí si lo deseas.
                */}
                            </TermSection>

                            <TermSection title="18) Force majeure">
                                <p>
                                    Noon is not liable for delays or failures due to causes beyond its reasonable control, including
                                    natural disasters, war, government actions, cyberattacks, or other force-mueure events.
                                </p>
                            </TermSection>

                            <TermSection title="19) Export and sanctions">
                                <p>
                                    You agree to comply with U.S. export controls and sanctions laws and not to use the Services
                                    where prohibited.
                                </p>
                            </TermSection>

                            <TermSection title="20) Contact">
                                <p>Noon</p>
                                <p>Wilmington, Delaware, USA</p>
                                <p>Email: noon.message@gmail.com</p>
                            </TermSection>

                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
