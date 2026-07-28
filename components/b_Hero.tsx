"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { BASE_PATH } from "@/lib/paths";

export default function Hero() {
    const { t } = useTranslation();

    const { scrollY } = useScroll();

    const textY = useTransform(scrollY, [0, 700], [0, -500]);
    const textOpacity = useTransform(scrollY, [0, 600], [1, 0.35]);

    return (
        <section className="relative min-h-screen overflow-hidden">
            <Image
                src={`${BASE_PATH}/wedding-cover.jpg`}
                alt={t("hero.imageAlt")}
                fill
                priority
                className="object-cover object-center"
            />

            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/10 to-transparent" />

            <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-8 text-white md:px-14 lg:px-24">
                <motion.div
                    style={{
                        y: textY,
                        opacity: textOpacity,
                    }}
                    className="w-full max-w-4xl"
                >
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9 }}
                        className="mb-10 text-lg uppercase tracking-[0.45em] md:mb-15"
                    >
                        {t("hero.announcement")}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.15 }}
                        className="font-title"
                    >
                        <div className="flex items-end">
                            <h1 className="text-[5rem] font-normal leading-[0.85] tracking-[0] md:text-[7rem] lg:text-[10rem]">
                                Alice
                            </h1>

                            <span className="font-ampersand mb-2 ml-3 text-[2rem] font-normal leading-none text-white/65 md:text-[2.8rem] lg:text-[3.4rem]">
                                &
                            </span>
                        </div>

                        <h1 className="ml-16 mt-2 text-[5rem] font-normal leading-[0.85] tracking-[0] md:ml-28 md:text-[7rem] lg:ml-40 lg:text-[10rem]">
                            Giorgio
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.9, delay: 0.75 }}
                        className="mt-10 text-lg uppercase tracking-[0.4em] md:mt-15"
                    >
                        {t("hero.date")}
                    </motion.p>
                </motion.div>
            </div>

            <motion.a
                href="#countdown"
                aria-label={t("hero.scrollToCountdown")}
                initial={{ opacity: 0 }}
                animate={{
                    opacity: 1,
                    y: [0, 8, 0],
                }}
                transition={{
                    opacity: {
                        duration: 1,
                        delay: 1.1,
                    },
                    y: {
                        duration: 1.8,
                        repeat: Infinity,
                    },
                }}
                className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white"
            >
                <ChevronDown size={28} strokeWidth={1.2} />
            </motion.a>
        </section>
    );
}