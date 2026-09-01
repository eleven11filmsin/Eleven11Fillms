"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import emailjs from "@emailjs/browser";
import Footer from "@/components/Footer";
import MobileMenu from "@/components/MobileMenu";

const socialLinks = [
    {
        href: "https://www.instagram.com/eleven11films/",
        src: "/instagram.png",
        label: "Instagram",
    },
    {
        href: "https://www.youtube.com/@Eleven11_film",
        src: "/youtube.png",
        label: "YouTube",
    },
    {
        href: "https://www.facebook.com/profile.php?id=61567440545491",
        src: "/facebook.png",
        label: "Facebook",
    },
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
            <section className="relative w-full h-auto md:h-[100svh] overflow-hidden">

                {/* ── MOBILE HERO VIDEO (4:5, top-aligned, uncropped) ── */}
                <video
                    className="md:hidden block  w-full h-auto"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                >
                    <source src="/videos/getintouchmobile.mp4" type="video/mp4" />
                </video>

                {/* ── DESKTOP / TABLET HERO VIDEO (covers hero area) ── */}
                <video
                    className="hidden md:block absolute inset-0 w-full h-full object-cover object-center z-0"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                >
                    <source src="/videos/getintouch.mp4" type="video/mp4" />
                </video>

                {/* ── MOBILE NAVBAR ── */}
                <nav className="flex md:hidden absolute top-0 left-0 w-full items-center justify-between px-4 sm:px-6 py-4 sm:py-5 z-20">
                    <Link href="/" className="flex items-center shrink-0">
                        <Image
                            src="/images/Eleven11filmsred.png"
                            alt="Eleven11 Films"
                            width={390}
                            height={95}
                            className="h-[50px] sm:h-[60px] w-auto max-w-[160px] sm:max-w-[190px] object-contain drop-shadow-md"
                            priority
                        />
                    </Link>
                    <button
                        onClick={() => setMenuOpen(true)}
                        aria-label="Open menu"
                        className="w-10 h-10 flex items-center justify-center shrink-0"
                    >
                        <Image
                            src="/images/menu.png"
                            alt="Open menu"
                            width={34}
                            height={34}
                            className="w-[30px] h-[30px] sm:w-[34px] sm:h-[34px] object-contain drop-shadow-md"
                        />
                    </button>
                </nav>

                {/* ── DESKTOP NAVBAR ── */}
                <div className="hidden md:flex absolute top-0 left-0 w-full min-h-[100px] lg:min-h-[120px] xl:min-h-[130px] items-center justify-between gap-8 px-6 md:px-8 lg:px-12 xl:px-16 py-4 z-20">
                    <Link href="/" className="flex items-center shrink-0 min-w-0">
                        <Image
                            src="/images/Eleven11Filmsred.png"
                            alt="Eleven11 Films"
                            width={450}
                            height={110}
                            className="h-[50px] lg:h-[55px] xl:h-[60px] w-auto max-w-[160px] lg:max-w-[190px] xl:max-w-[280px] object-contain drop-shadow-md"
                            priority
                        />
                    </Link>
                    <nav className="flex items-center justify-end gap-4 lg:gap-6 xl:gap-8 shrink min-w-0">
                        {/* {socialLinks.map((s) => (
                            <a key={s.label}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={s.label}
                                className="flex items-center justify-center shrink-0 hover:opacity-70 transition-opacity"
                            >
                                <Image
                                    src={s.src}
                                    alt={s.label}
                                    width={30}
                                    height={30}
                                    className="w-[26px] h-[26px] lg:w-[30px] lg:h-[30px] xl:w-[32px] xl:h-[32px] object-contain"
                                />
                            </a>
                        ))} */}
                        <Link href="/contact"
                            className="relative overflow-hidden rounded-full border-2 border-[#5b0625] text-white font-manrope tracking-wide text-xs lg:text-sm px-4 lg:px-5 xl:px-6 py-2 lg:py-2.5 whitespace-nowrap shrink-0 transition-colors duration-300 group">
                            <span className="absolute inset-0 bg-[#5b0625]  translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
                            <span className="relative z-20 text-[#7B1C2E] group-hover:text-white transition-colors duration-300">GET IN TOUCH</span>
                        </Link>
                    </nav>
                </div>
            </section>

            {/* Mobile menu — shared component, consistent with Hero */}
            <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

            {/* ── Address block ── */}
            <section className="bg-[#f0ebe3] py-7 px-6 text-center">
                <p className="text-gray-700 font-manrope text-sm leading-8 max-w-2xl mx-auto font-semibold">
                    Please fill in the form below and provide as much details as possible to help us create an accurate quote.<br />
                    We will try to get back within 48hrs — give us a call on the number below if you don't hear from us or if it's a last minute enquiry.<br />
                </p>
                <div className="mt-3 flex flex-col items-center gap-1 font-manrope text-gray-800 text-sm font-semibold">
                    <a href="mailto:eleven11films.in@gmail.com" className="hover: transition-colors">
                        eleven11films.in@gmail.com
                    </a>
                    <a href="tel:+91 9359101185" className="hover: transition-colors">
                        +91 93591 01185
                    </a>
                </div>
                <div className="mt-3 text-gray-600 font-manrope text-sm leading-7">
                    <p className="font-semibold text-gray-800">Eleven11 Films Private Limited</p>
                    <p>Shop no 2, Parth Apartment</p>
                    <p>Kala Kutir Rd, Dongarpada, Vartak Ward</p>
                    <p>Virar West, Vasai-Virar, Maharashtra 401303</p>
                </div>
            </section>

            {/* ── Contact Form ── */}
            <section className="bg-[#f0ebe3] pb-20 px-6">
                {submitted ? (
                    <div className="flex flex-col items-center justify-center gap-6 py-20 text-center">
                        <p className="text-5xl">🎉</p>
                        <h2 className="text-3xl font-manrope text-gray-800 tracking-wide">Thank You!</h2>
                        <p className="text-gray-500 text-base font-manrope">
                            We've received your enquiry and will get back to you within 48 hours.
                        </p>
                        <Link href="/" className="mt-4 px-8 py-3 rounded-full border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition-colors duration-300 font-manrope tracking-widest text-sm">
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
                                    <label className="font-manrope text-gray-900 font-semibold text-sm">
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
                                    <label className="font-manrope text-gray-900 font-semibold text-sm">
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
                                    <label className="font-manrope text-gray-900 font-semibold text-sm">
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
                                    <label className="font-manrope text-gray-900 font-semibold text-sm">
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
                                    <label className="font-manrope text-gray-900 font-semibold text-sm">
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
                                    <label className="font-manrope text-gray-900 font-semibold text-sm">
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
                                    <label className="font-manrope text-gray-900 font-semibold text-sm">
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
                                    <span className="font-manrope text-gray-900 font-semibold text-sm">
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
                                    className="mt-2 relative overflow-hidden rounded-full border-2 border-[#5b0625] text-[#5b0625] font-manrope tracking-widest text-sm px-8 py-4 transition-colors duration-300 group disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    <span className="absolute inset-0 bg-[#5b0625] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />

                                    <span className="relative z-10 text-[#5b0625] group-hover:text-white transition-colors duration-300">
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