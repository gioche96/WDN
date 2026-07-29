"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function FAQ() {
    const { t } = useTranslation();

    const questions = [
        {
            question: t("faq.questions.confirmation.question"),
            answer: t("faq.questions.confirmation.answer"),
        },
        {
            question: t("faq.questions.dressCode.question"),
            answer: t("faq.questions.dressCode.answer"),
        },
        {
            question: t("faq.questions.allergies.question"),
            answer: t("faq.questions.allergies.answer"),
        },
        {
            question: t("faq.questions.children.question"),
            answer: t("faq.questions.children.answer"),
        },
        {
            question: t("faq.questions.parking.question"),
            answer: t("faq.questions.parking.answer"),
        },
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="bg-white px-6 py-10 md:py-15">
            <div className="mx-auto max-w-4xl">
                <div className="mb-10 text-center">
                    <p className="mb-4 text-center text-[10pt] uppercase tracking-[0.3em] md:text-[13pt] text-black">
                        {t("faq.subtitle")}
                    </p>

                    <h2 className="text-center font-title text-4xl leading-tight md:text-6xl text-black">
                        {t("faq.title")}
                    </h2>
                </div>

                <div className="border-t border-black/20">
                    {questions.map((item, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={item.question}
                                className="border-b border-black/20"
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        setOpenIndex(
                                            isOpen ? null : index
                                        )
                                    }
                                    aria-expanded={isOpen}
                                    className="flex w-full items-center justify-between gap-6 py-7 text-left"
                                >
                                    <span className="text-lg md:text-xl">
                                        {item.question}
                                    </span>

                                    <ChevronDown
                                        size={22}
                                        className={`shrink-0 transition-transform duration-300 ${isOpen
                                                ? "rotate-180"
                                                : ""
                                            }`}
                                    />
                                </button>

                                <div
                                    className={`grid transition-all duration-300 ${isOpen
                                            ? "grid-rows-[1fr] pb-7"
                                            : "grid-rows-[0fr]"
                                        }`}
                                >
                                    <div className="overflow-hidden">
                                        <p className="max-w-2xl leading-7 text-black/70">
                                            {item.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}