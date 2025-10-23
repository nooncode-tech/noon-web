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

export default function CookiePolicy() {
    return (
        <main className="min-h-screen">
            <section className="w-full flex flex-col items-center pt-24 md:pt-32 px-4 md:px-16 pb-12 md:pb-24">
                <div className="max-w-[1440px] w-full flex flex-col items-center">

                    <div className="w-full max-w-5xl border border-[var(--secondary-border-color)] rounded-2xl p-6 md:p-12 lg:p-16">

                        <h1 className="text-2xl md:text-[30px] font-bold Riosark text-white mb-4 text-center">
                            Cookies Policy
                        </h1>
                        <p className="text-center text-gray-400 mb-10 md:mb-12">
                            Effective: October 13, 2025
                        </p>

                        <div className="flex flex-col gap-8">

                            <TermSection title="1) What are cookies?">
                                <p>
                                    Cookies are small files placed on your device to operate the site, remember preferences, and
                                    measure usage. We also use similar technologies (local storage, pixels, SDKs).
                                </p>
                            </TermSection>

                            <TermSection title="2) Current cookies state">
                                <p>
                                    For now, Noon uses only essential and functional cookies necessary for site operation and to
                                    remember basic preferences. We do not use analytics or advertising cookies at this time. If we
                                    enable analytics or measurement in the future, we will update this Policy and provide prior
                                    notice.
                                </p>
                            </TermSection>

                            <TermSection title="3) Types we use">
                                <ul className="list-disc list-inside pl-4 flex flex-col gap-2">
                                    <li>
                                        <strong className="text-gray-100">Strictly Necessary:</strong> required for login, security, forms, load balancing.
                                    </li>
                                    <li>
                                        <strong className="text-gray-100">Functional/Preferences:</strong> remember settings (language, region).
                                    </li>
                                    <li>
                                        <strong className="text-gray-100">Analytics/Performance:</strong> measure traffic and usage to improve the Services. (Note: Currently not used).
                                    </li>
                                    <li>
                                        <strong className="text-gray-100">(Optional) Advertising:</strong> only if enabled; used to show or measure ads. (Note: Currently not used).
                                    </li>

                                </ul>
                            </TermSection>

                            <TermSection title="4) Minors">
                                <p>
                                    We do not knowingly collect information from children under 13 via cookies.
                                </p>
                            </TermSection>

                            <TermSection title="5) How to control cookies">
                                <p>
                                    Most browsers let you block or delete cookies in settings. If you block essential cookies, some
                                    features may not work. You can also manage analytics/ads cookies via in-product settings (if
                                    provided) or the opt-out links of our analytics/ads providers (if used).
                                </p>
                            </TermSection>

                            <TermSection title="6) Retention">
                                <p>
                                    Cookie lifetimes vary: some last only for the session; others persist from 1 day to ~26 months,
                                    unless you delete them earlier.
                                </p>
                            </TermSection>

                            <TermSection title="7) Updates & contact">
                                <p>
                                    We may update this policy as needed and will post the revised version here.
                                </p>
                                <p>
                                    Contact: noon.message@gmail.com
                                </p>
                            </TermSection>

                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}