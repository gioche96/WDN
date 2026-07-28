"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const links = [
    { label: "Anteprima", href: "#trailer" },
    { label: "Frammenti", href: "#frammenti" },
    { label: "Programma", href: "#program" },
    { label: "Location", href: "#location" },
    { label: "Viaggio", href: "#travel" },
    { label: "Donazione", href: "#donazione" },
    { label: "FAQ", href: "#faq" },
    { label: "RSVP", href: "#rsvp" },
];

const languages = ["IT", "FR", "DE", "EN"];

export default function a_Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeLanguage, setActiveLanguage] = useState("IT");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${isScrolled
                ? "bg-white/85 text-black shadow-sm backdrop-blur-md"
                : "bg-transparent text-white"
                }`}
        >
            <nav className="mx-auto flex h-20 max-w-7xl items-center px-6">
                <a href="#" className="shrink-0">
                    <Image
                        src="/logo.png"
                        alt="Alice e Giorgio"
                        width={2000}
                        height={2000}
                        loading="eager"
                        priority
                        className="h-10 w-auto object-contain"
                    />
                </a>

                <div className="hidden flex-1 justify-center gap-8 lg:flex">
                    {links.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="
                                relative pb-1 text-sm
                                transition-colors duration-300
                                after:absolute after:bottom-0 after:left-0
                                after:h-px after:w-0 after:bg-current
                                after:transition-all after:duration-300
                                hover:text-[#C6B182]
                                hover:after:w-full
                                focus-visible:text-[#C6B182]
                                focus-visible:outline-none
                                focus-visible:after:w-full
                            "
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                <div className="ml-auto flex items-center gap-4">
                    <div className="flex items-center gap-3 text-xs tracking-wider">
                        {languages.map((language) => {
                            const isActive =
                                activeLanguage === language;

                            return (
                                <button
                                    key={language}
                                    type="button"
                                    onClick={() =>
                                        setActiveLanguage(language)
                                    }
                                    aria-pressed={isActive}
                                    className={`
                                        relative pb-1
                                        transition-colors duration-300
                                        after:absolute after:bottom-0 after:left-0
                                        after:h-px after:transition-all
                                        after:duration-300
                                        ${isScrolled
                                            ? isActive
                                                ? "text-black after:w-full after:bg-black"
                                                : "text-black/40 after:w-0 after:bg-black hover:text-black/70"
                                            : isActive
                                                ? "text-white after:w-full after:bg-white"
                                                : "text-white/45 after:w-0 after:bg-white hover:text-white/75"
                                        }
                                    `}
                                >
                                    {language}
                                </button>
                            );
                        })}
                    </div>

                    <button
                        type="button"
                        aria-label={
                            isOpen ? "Chiudi menu" : "Apri menu"
                        }
                        aria-expanded={isOpen}
                        onClick={() =>
                            setIsOpen((current) => !current)
                        }
                        className="cursor-pointer lg:hidden"
                    >
                        {isOpen ? (
                            <X size={24} />
                        ) : (
                            <Menu size={24} />
                        )}
                    </button>
                </div>
            </nav>

            {isOpen && (
                <div className="border-t border-black/10 bg-white px-6 py-6 text-black shadow-lg lg:hidden">
                    <div className="flex flex-col gap-2">
                        {links.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="
                                    rounded-[10px] px-4 py-3
                                    text-lg transition-all duration-300
                                    hover:bg-[#979775]
                                    hover:text-white
                                    focus-visible:bg-[#979775]
                                    focus-visible:text-white
                                    focus-visible:outline-none
                                "
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}