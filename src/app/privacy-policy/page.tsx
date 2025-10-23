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

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen">
            <section className="w-full flex flex-col items-center pt-24 md:pt-32 px-4 md:px-16 pb-12 md:pb-24">
                <div className="max-w-[1440px] w-full flex flex-col items-center">

                    <div className="w-full max-w-5xl border border-[var(--secondary-border-color)] rounded-2xl p-6 md:p-12 lg:p-16">

                        <h1 className="text-2xl md:text-[30px] font-bold Riosark text-white mb-4 text-center">
                            Privacy Policy
                        </h1>
                        <p className="text-center text-gray-400 mb-10 md:mb-12">
                            Effective: October 13, 2025
                        </p>

                        <div className="flex flex-col gap-8">

                            <TermSection title="1) What we collect (by context)">
                                <p>
                                    We collect information directly from you, automatically from your device, and from our
                                    payment/analytics providers when you use our Services.
                                </p>

                                <h3 className="text-lg font-semibold Riosark text-white mt-2">a) Account & identity information</h3>
                                <p>Name, email address, organization, role/title, country/state, and password (hashed).</p>
                                <p><span className="font-semibold text-gray-100">Why:</span> create and secure your account, communicate with you, provide service deliverables.</p>

                                <h3 className="text-lg font-semibold Riosark text-white mt-2">b) Communications & files you send to us</h3>
                                <p>Support requests, project briefs, attachments, and feedback.</p>
                                <p><span className="font-semibold text-gray-100">Why:</span> deliver our services, provide support, maintain records, improve quality.</p>

                                <h3 className="text-lg font-semibold Riosark text-white mt-2">c) Usage & device information (automatically collected)</h3>
                                <p>IP address, device type, browser/app version, OS, language, pages/screens viewed, time on page, referring URLs, and diagnostic logs.</p>
                                <p><span className="font-semibold text-gray-100">Why:</span> operate the Service, prevent abuse, debug, and improve performance.</p>

                                <h3 className="text-lg font-semibold Riosark text-white mt-2">d) Cookies and similar technologies</h3>
                                <p>Identifiers that remember your session, preferences, analytics events, and (if enabled) advertising identifiers.</p>
                                <p><span className="font-semibold text-gray-100">Why:</span> keep you signed in, measure usage, and (if applicable) personalize content or ads. See our Cookies Policy.</p>

                                <h3 className="text-lg font-semibold Riosark text-white mt-2">e) Transaction & billing information (when you buy)</h3>
                                <ul className="list-disc list-inside pl-4 flex flex-col gap-2">
                                    <li>Payment method details (tokenized by our processor or the App Store/Google Play), last4, card brand, expiry (we do not store full card numbers)</li>
                                    <li>Billing name, email, address; items purchased, price, tax, currency; date/time; status (paid/refunded/chargeback)</li>
                                    <li>Platform order IDs (e.g., Apple/Google) when purchases occur there</li>
                                </ul>
                                <p><span className="font-semibold text-gray-100">Why:</span> process payments, deliver purchases, generate invoices/receipts, prevent fraud, support audits and tax compliance, show your purchase history.</p>

                                <h3 className="text-lg font-semibold Riosark text-white mt-2">Children:</h3>
                                <p>
                                    We do not knowingly collect personal information from children under 13. If we
                                    learn we have done so, we will delete it. Parents/guardians who believe a child under 13 has
                                    provided information should contact noon.message@gmail.com.
                                </p>
                            </TermSection>

                            <TermSection title="2) How we use information">
                                <ul className="list-disc list-inside pl-4 flex flex-col gap-2">
                                    <li>Provide, operate, secure, and improve the Services</li>
                                    <li>Process transactions and deliver purchased services or features</li>
                                    <li>Communicate with you about projects, updates, security alerts, and administrative messages</li>
                                    <li>Analyze usage to improve performance and user experience</li>
                                    <li>Protect against fraud, abuse, and violations of our Terms</li>
                                    <li>Comply with legal obligations (tax, accounting, regulatory inquiries)</li>
                                </ul>
                                <h3 className="text-lg font-semibold Riosark text-white mt-2">AI & customer content</h3>
                                <p>
                                    If our Services process your content with AI features, we use it only to
                                    provide the requested output and to maintain the feature. We do not use your customer
                                    content to train our foundation models without your explicit permission.
                                </p>
                            </TermSection>

                            <TermSection title="3) When we share information">
                                <p>
                                    We do not "sell" personal information and we do not "share" personal information for
                                    cross-context behavioral advertising as those terms are defined under California law.
                                    We disclose information to:
                                </p>
                                <ul className="list-disc list-inside pl-4 flex flex-col gap-2">
                                    <li>Service providers/processors (e.g., hosting, cloud, analytics, payment processing, customer support) under contracts limiting their use to our instructions;</li>
                                    <li>App platforms (Apple/Google) when you buy through them;</li>
                                    <li>Authorities when required by law, subpoena, or to protect rights, safety, and security;</li>
                                    <li>Successors in a merger, acquisition, or similar corporate transaction (with notice where required).</li>
                                </ul>
                                <h3 className="text-lg font-semibold Riosark text-white mt-2">Use of third-party services</h3>
                                <p>
                                    To operate and deliver features, we use third-party services (e.g.,
                                    hosting, cloud, analytics, support, payments). These act as processors under contract and cannot
                                    use your data beyond our instructions. Certain integrations may process data under their own
                                    policies (e.g., AI APIs).
                                </p>
                            </TermSection>

                            <TermSection title="4) Data retention">
                                <p>
                                    We retain information only as long as needed for the purposes above.
                                </p>
                                <h3 className="text-lg font-semibold Riosark text-white mt-2">Typical periods (adjust as needed):</h3>
                                <ul className="list-disc list-inside pl-4 flex flex-col gap-2">
                                    <li>Account data: active use + 24 months of inactivity</li>
                                    <li>Transaction records & invoices: 7 years (tax/audit)</li>
                                    <li>Support tickets & project files: up to 24 months after project close (unless contract requires longer)</li>
                                    <li>Logs & diagnostics: 12-18 months</li>
                                    <li>Cookies: per our Cookies Policy (session to ~26 months, depending on cookie)</li>
                                </ul>
                                <p>
                                    We may retain data longer if required by law, to resolve disputes, or to enforce agreements.
                                </p>
                            </TermSection>

                            <TermSection title="5) Your choices & rights">
                                <ul className="list-disc list-inside pl-4 flex flex-col gap-2">
                                    <li>Access, correct, or delete your personal information by emailing noon.message@gmail.com.</li>
                                    <li>Marketing controls: unsubscribe from non-essential emails via the links in those emails.</li>
                                    <li>Cookies/analytics: see our Cookies Policy for controls.</li>
                                </ul>
                                <h3 className="text-lg font-semibold Riosark text-white mt-2">California residents</h3>
                                <p>
                                    You can request to know, delete, or correct personal information. We do
                                    not "sell" or "share" your personal information; thus no opt-out link is required. We will not
                                    discriminate against you for exercising your rights. We will verify requests to protect your data.
                                </p>
                            </TermSection>

                            <TermSection title="6) Marketing communications">
                                <p>
                                    With your consent, we may send newsletters, product updates, and offers. You can opt out at
                                    any time using the unsubscribe link in those emails. We will continue to send operational/legal
                                    messages essential to your account.
                                </p>
                            </TermSection>

                            <TermSection title="7) Security">
                                <p>
                                    We implement reasonable administrative, technical, and physical safeguards appropriate to
                                    the nature of the data. No system is 100% secure; please use strong, unique passwords and keep
                                    them confidential.
                                </p>
                            </TermSection>

                            <TermSection title="8) International transfers (U.S. and Mexico)">
                                <p>
                                    We may transfer and process your personal information in the United States and Mexico (and in
                                    other countries where our providers operate). Data protection laws may differ from those in your
                                    country. We apply reasonable and contractual safeguards where appropriate.
                                </p>
                            </TermSection>

                            <TermSection title="9) Analytics & tracking">
                                <p>
                                    At present, Noon does not use analytics or tracking tools (e.g., Google Analytics or Facebook
                                    Pixel). If this changes, we will update this Policy and notify users before enabling them.
                                </p>
                            </TermSection>

                            <TermSection title="10) Changes to this Policy">
                                <p>
                                    We will post updates here and, for material changes, notify you through the Services or email
                                    before they take effect.
                                </p>
                            </TermSection>

                            <TermSection title="11) Contact">
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
