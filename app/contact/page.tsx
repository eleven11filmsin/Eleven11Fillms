"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import Footer from "@/components/Footer";

const socialLinks = [
    { href: "https://www.instagram.com/eleven11films/", src: "/images/instagram.png", label: "Instagram" },
    { href: "https://youtube.com", src: "/images/youtube.png", label: "YouTube" },
    { href: "https://www.facebook.com/profile.php?id=61567440545491", src: "/images/facebook.png", label: "Facebook" },
    { href: "https://vimeo.com/eleven11films?fl=pp&fe=sh", src: "/images/vimeo.png", label: "Vimeo" },
];

export default function ContactPage() {
    const formRef = useRef<HTMLFormElement>(null);

    const [submitted, setSubmitted] = useState(false);
    const [sending, setSending] = useState(false);
    const [sendError, setSendError] = useState<string | null>(null);

    const [services, setServices] = useState<string[]>([]);
    const [servicesError, setServicesError] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    function toggleService(service: string) {
        setServices(prev => {
            let updated: string[];
            if (service === "both") {
                updated = prev.includes("both") ? [] : ["both"];
            } else {
                const withoutBoth = prev.filter(s => s !== "both");
                updated = withoutBoth.includes(service)
                    ? withoutBoth.filter(s => s !== service)
                    : [...withoutBoth, service];
            }
            if (updated.length > 0) setServicesError(false);
            return updated;
        });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (services.length === 0) {
            setServicesError(true);
            return;
        }
        setServicesError(false);
        setSendError(null);
        setSending(true);

        // Inject the services value into a hidden input so EmailJS picks it up
        const hiddenInput = formRef.current?.querySelector<HTMLInputElement>(
            "input[name='services']"
        );
        if (hiddenInput) hiddenInput.value = services.join(", ");

        try {
            await emailjs.sendForm(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                formRef.current!,
                { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! }
            );
            setSubmitted(true);
        } catch (err) {
            console.error("EmailJS error:", err);
            setSendError("Something went wrong. Please try again or email us directly.");
        } finally {
            setSending(false);
        }
    }

    return (
        <main className="min-h-screen bg-[#f0ebe3] flex flex-col">

            {/* ── HERO with nav overlay ── */}
            <section className="relative h-[100svh] w-full overflow-hidden">
                <Image
                    src="/images/hero1.jpeg"
                    alt="Wedding hero"
                    fill
                    sizes="100vw"
                    className="object-cover object-center"
                    priority
                />

                {/* ── MOBILE NAVBAR ── */}
                <nav className="flex md:hidden absolute top-0 left-0 w-full items-center justify-between px-4 sm:px-6 py-4 sm:py-5 z-20">
                    <Link href="/">
                        <h1 className="text-base sm:text-lg text-red-400 font-semibold tracking-wide font-serif drop-shadow-md">
                            ELEVEN11 FILMS
                        </h1>
                    </Link>
                    <button
                        onClick={() => setMenuOpen(true)}
                        aria-label="Open menu"
                        className="w-8 h-8 flex items-center justify-center"
                    >
                        <Image
                            src="/images/menu.png"
                            alt="Open menu"
                            width={28}
                            height={28}
                            className="object-contain drop-shadow-md"
                        />
                    </button>
                </nav>

                {/* ── DESKTOP NAVBAR ── */}
                <div className="hidden md:flex absolute top-0 left-0 w-full items-center justify-between px-8 lg:px-14 xl:px-20 py-6 lg:py-8 z-20">
                    <Link href="/">
                        <h1 className="text-2xl lg:text-3xl xl:text-4xl text-red-400 font-semibold tracking-wide font-serif">
                            ELEVEN11 FILMS
                        </h1>
                    </Link>
                    <nav className="flex items-center gap-5 lg:gap-8 xl:gap-10">
                        {socialLinks.map((s) => (
                            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                                className="hover:opacity-70 transition-opacity">
                                <Image src={s.src} alt={s.label} width={22} height={22} className="lg:w-6 lg:h-6" />
                            </a>
                        ))}
                        <Link href="/contact"
                            className="relative overflow-hidden rounded-full border-2 border-red-400 bg-red-400 text-white font-serif tracking-wide text-xs lg:text-sm px-4 lg:px-6 py-2 transition-colors duration-300 group">
                            <span className="absolute inset-0 bg-[#7B1C2E] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
                            <span className="relative z-10 text-white">Create With Us</span>
                        </Link>
                    </nav>
                </div>
            </section>

            {/* ── MOBILE MENU BACKDROP ── */}
            <div
                className={`fixed inset-0 z-40 bg-black/40 md:hidden transition-opacity duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setMenuOpen(false)}
            />

            {/* ── MOBILE MENU PANEL ── */}
            <div
                className={`fixed top-0 left-0 z-50 flex flex-col bg-white md:hidden transition-transform duration-300 ease-in-out ${menuOpen ? "translate-y-0" : "-translate-y-full"
                    }`}
                style={{ width: "100vw", height: "50dvh" }}
            >
                {/* Top bar — logo + close */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-100 shrink-0">
                    <Link href="/" onClick={() => setMenuOpen(false)}>
                        <h1 className="text-base sm:text-lg text-red-400 font-semibold tracking-wide font-serif">
                            ELEVEN11 FILMS
                        </h1>
                    </Link>
                    <button
                        onClick={() => setMenuOpen(false)}
                        aria-label="Close menu"
                        className="w-7 h-7 flex items-center justify-center"
                    >
                        <Image src="/images/cross.png" alt="Close menu" width={18} height={18} className="object-contain" />
                    </button>
                </div>

                {/* Social links — centered */}
                <div className="flex-1 flex flex-col items-center justify-center gap-4 sm:gap-5 px-4 overflow-y-auto">
                    {socialLinks.map((s) => (
                        <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-3 hover:opacity-60 transition-opacity"
                            onClick={() => setMenuOpen(false)}
                        >
                            <Image src={s.src} alt={s.label} width={18} height={18} className="shrink-0" />
                            <span className="font-serif text-sm sm:text-base text-gray-800 tracking-wide w-28 sm:w-32">
                                {s.label}
                            </span>
                        </a>
                    ))}
                </div>

                {/* Get In Touch — pinned at bottom */}
                <div className="shrink-0 px-4 sm:px-6 py-4 sm:py-5">
                    <Link href="/contact" onClick={() => setMenuOpen(false)}
                        className="block w-full bg-gray-900 text-white font-serif tracking-widest text-xs py-3 rounded-lg text-center hover:bg-gray-700 transition-colors duration-300">
                        Get In Touch
                    </Link>
                </div>
            </div>

            {/* ── Address block ── */}
            <section className="bg-[#f0ebe3] py-16 px-6 text-center">
                <p className="text-gray-700 font-serif text-sm leading-8 max-w-2xl mx-auto font-semibold">
                    Please fill in the form below and provide as much details as possible to help us create an accurate quote.<br />
                    We will try to get back within 48hrs — give us a call on the number below if you don't hear from us or if it's a last minute enquiry.<br />
                    Please go through our FAQ section to find answers to some common questions.
                </p>
                <div className="mt-8 flex flex-col items-center gap-1 font-serif text-gray-800 text-sm font-semibold">
                    <a href="mailto:hello@eleven11films.com" className="hover:text-red-400 transition-colors">
                        hello@eleven11films.com
                    </a>
                    <a href="tel:+919964787383" className="hover:text-red-400 transition-colors">
                        +91 99647 87383
                    </a>
                </div>
                <div className="mt-6 text-gray-600 font-serif text-sm leading-7">
                    <p className="font-semibold text-gray-800">Eleven11 Films Private Limited</p>
                    <p>Site no 237, 2nd Floor</p>
                    <p>Vidyagiri Layout, Nagarbhavi Circle</p>
                    <p>Bengaluru, Karnataka — 560072</p>
                </div>
            </section>

            {/* ── Contact Form ── */}
            <section className="bg-[#f0ebe3] pb-20 px-6">
                {submitted ? (
                    <div className="flex flex-col items-center justify-center gap-6 py-20 text-center">
                        <p className="text-5xl">🎉</p>
                        <h2 className="text-3xl font-serif text-gray-800 tracking-wide">Thank You!</h2>
                        <p className="text-gray-500 text-base font-serif">
                            We've received your enquiry and will get back to you within 48 hours.
                        </p>
                        <Link href="/" className="mt-4 px-8 py-3 rounded-full border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition-colors duration-300 font-serif tracking-widest text-sm">
                            Back to Home
                        </Link>
                    </div>
                ) : (
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-white rounded-3xl p-10 shadow-sm">
                            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-7">

                                {/* Hidden services field — filled on submit */}
                                <input type="hidden" name="services" />

                                {/* Name */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="font-serif text-gray-900 font-semibold text-sm">
                                        Name <span className="text-gray-400 font-normal text-xs">(required)</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="from_name"
                                        required
                                        className="bg-[#f9f7f5] border border-gray-200 rounded-md px-4 py-3 text-gray-800 text-sm focus:outline-none focus:border-gray-400 transition-colors"
                                    />
                                </div>

                                {/* Email */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="font-serif text-gray-900 font-semibold text-sm">
                                        Email <span className="text-gray-400 font-normal text-xs">(required)</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="reply_to"
                                        required
                                        className="bg-[#f9f7f5] border border-gray-200 rounded-md px-4 py-3 text-gray-800 text-sm focus:outline-none focus:border-gray-400 transition-colors"
                                    />
                                </div>

                                {/* Phone */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="font-serif text-gray-900 font-semibold text-sm">
                                        Phone <span className="text-gray-400 font-normal text-xs">(required)</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        className="bg-[#f9f7f5] border border-gray-200 rounded-md px-4 py-3 text-gray-800 text-sm focus:outline-none focus:border-gray-400 transition-colors"
                                    />
                                </div>

                                {/* Estimated Guest Count */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="font-serif text-gray-900 font-semibold text-sm">
                                        Estimated Guest Count <span className="text-gray-400 font-normal text-xs">(required)</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="guest_count"
                                        required
                                        className="bg-[#f9f7f5] border border-gray-200 rounded-md px-4 py-3 text-gray-800 text-sm focus:outline-none focus:border-gray-400 transition-colors"
                                    />
                                </div>

                                {/* Tell us more */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="font-serif text-gray-900 font-semibold text-sm">
                                        Tell us more about your event — event flow, venues{" "}
                                        <span className="text-gray-400 font-normal text-xs">(required)</span>
                                    </label>
                                    <textarea
                                        rows={5}
                                        name="message"
                                        required
                                        className="bg-[#f9f7f5] border border-gray-200 rounded-md px-4 py-3 text-gray-800 text-sm focus:outline-none focus:border-gray-400 transition-colors resize-none"
                                    />
                                </div>

                                {/* Location */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="font-serif text-gray-900 font-semibold text-sm">
                                        Location of the wedding <span className="text-gray-400 font-normal text-xs">(required)</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        required
                                        className="bg-[#f9f7f5] border border-gray-200 rounded-md px-4 py-3 text-gray-800 text-sm focus:outline-none focus:border-gray-400 transition-colors"
                                    />
                                </div>

                                {/* Event Dates */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="font-serif text-gray-900 font-semibold text-sm">
                                        Event Date <span className="text-gray-400 font-normal text-xs">(required)</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="event_date"
                                        required
                                        className="bg-[#f9f7f5] border border-gray-200 rounded-md px-4 py-3 text-gray-500 text-sm focus:outline-none focus:border-gray-400 transition-colors"
                                    />
                                </div>

                                {/* Services checkboxes */}
                                <div className="flex flex-col gap-3">
                                    <span className="font-serif text-gray-900 font-semibold text-sm">
                                        What services are you looking for?{" "}
                                        <span className="text-gray-400 font-normal text-xs">(required)</span>
                                    </span>
                                    <div className="flex flex-col gap-3">
                                        {[
                                            { id: "photography", label: "Photography" },
                                            { id: "films", label: "Films" },
                                            { id: "both", label: "Both Photography & Film" },
                                        ].map(({ id, label }) => {
                                            const isChecked = services.includes(id);
                                            return (
                                                <div key={id} role="checkbox" aria-checked={isChecked} tabIndex={0}
                                                    onClick={() => toggleService(id)}
                                                    onKeyDown={(e) => e.key === " " && toggleService(id)}
                                                    className="flex items-center gap-3 cursor-pointer group outline-none"
                                                >
                                                    <div className={["w-5 h-5 rounded border flex items-center justify-center transition-all duration-200 shrink-0",
                                                        isChecked ? "bg-gray-900 border-gray-900" : "bg-[#f9f7f5] border-gray-300 group-hover:border-gray-500",
                                                    ].join(" ")}>
                                                        {isChecked && (
                                                            <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                                                                <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                    <span className="font-serif text-gray-800 text-sm select-none">{label}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    {servicesError && (
                                        <p className="text-red-400 text-xs font-serif mt-1">Please select at least one service.</p>
                                    )}
                                </div>

                                {/* Send error */}
                                {sendError && (
                                    <p className="text-red-500 text-sm font-serif text-center">{sendError}</p>
                                )}

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={sending}
                                    className="mt-2 relative overflow-hidden rounded-full border-2 border-red-400 bg-red-400 text-white font-serif tracking-widest text-sm px-8 py-4 transition-colors duration-300 group disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    <span className="absolute inset-0 bg-[#7B1C2E] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                                    <span className="relative z-10">
                                        {sending ? "SENDING…" : "SEND ENQUIRY"}
                                    </span>
                                </button>

                            </form>
                        </div>
                    </div>
                )}
            </section>

            <Footer />

        </main>
    );
}