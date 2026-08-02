"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

type DressCodeColor = {
    name: string;
    hex: string;
};

type OpenFaqEvent = CustomEvent<{
    key: string;
}>;

const questionKeys = [
    "arrival",
    "location",
    "dressCode",
    "children",
    "rsvpMeaning",
    "allergies",
    "accommodation",
    "parking",
    "confirmation",
    "modify",
    "unplugged",
];

export default function FAQ() {
    const { t } = useTranslation();

    const dressCodeColors = t(
        "faq.questions.dressCode.women.colors",
        {
            returnObjects: true,
        }
    ) as DressCodeColor[];

    const questions = [
        {
            key: "arrival",
            question: t("faq.questions.arrival.question"),
            answer: t("faq.questions.arrival.answer"),
        },
        {
            key: "location",
            question: t("faq.questions.location.question"),
            answer: t("faq.questions.location.answer"),
        },
        {
            key: "dressCode",
            question: t("faq.questions.dressCode.question"),
        },
        {
            key: "children",
            question: t("faq.questions.children.question"),
            answer: t("faq.questions.children.answer"),
        },
        {
            key: "rsvpMeaning",
            question: t("faq.questions.rsvpMeaning.question"),
            answer: t("faq.questions.rsvpMeaning.answer"),
        },
        {
            key: "allergies",
            question: t("faq.questions.allergies.question"),
            answer: t("faq.questions.allergies.answer"),
        },
        {
            key: "accommodation",
            question: t(
                "faq.questions.accommodation.question"
            ),
        },
        {
            key: "parking",
            question: t("faq.questions.parking.question"),
            answer: t("faq.questions.parking.answer"),
        },
        {
            key: "confirmation",
            question: t(
                "faq.questions.confirmation.question"
            ),
            answer: t(
                "faq.questions.confirmation.answer"
            ),
        },
        {
            key: "modify",
            question: t("faq.questions.modify.question"),
            answer: t("faq.questions.modify.answer"),
        },
        {
            key: "unplugged",
            question: t("faq.questions.unplugged.question"),
            answer: t("faq.questions.unplugged.answer"),
        },
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(
        null
    );

    useEffect(() => {
        const openQuestion = (questionKey: string) => {
            const questionIndex =
                questionKeys.indexOf(questionKey);

            if (questionIndex === -1) {
                return;
            }

            setOpenIndex(questionIndex);

            window.requestAnimationFrame(() => {
                window.requestAnimationFrame(() => {
                    document
                        .getElementById(
                            `faq-${questionKey}`
                        )
                        ?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                        });
                });
            });
        };

        const openQuestionFromHash = () => {
            const hash = window.location.hash;

            if (!hash.startsWith("#faq-")) {
                return;
            }

            const questionKey = hash.replace(
                "#faq-",
                ""
            );

            openQuestion(questionKey);
        };

        const handleOpenFaq = (event: Event) => {
            const customEvent = event as OpenFaqEvent;

            openQuestion(customEvent.detail.key);
        };

        openQuestionFromHash();

        window.addEventListener(
            "hashchange",
            openQuestionFromHash
        );

        window.addEventListener(
            "open-faq",
            handleOpenFaq
        );

        return () => {
            window.removeEventListener(
                "hashchange",
                openQuestionFromHash
            );

            window.removeEventListener(
                "open-faq",
                handleOpenFaq
            );
        };
    }, []);

    return (
        <section
            id="faq"
            className="bg-white px-6 py-10 md:py-15"
        >
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
                                id={`faq-${item.key}`}
                                key={item.key}
                                className="scroll-mt-20 border-b border-black/20 md:scroll-mt-20"
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        setOpenIndex(
                                            isOpen
                                                ? null
                                                : index
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
                                        {item.key ===
                                            "dressCode" ? (
                                            <div className="max-w-2xl leading-7 text-black/70">
                                                <p>
                                                    {t(
                                                        "faq.questions.dressCode.intro"
                                                    )}
                                                </p>

                                                <ul className="mt-4 list-disc space-y-5 pl-5">
                                                    <li>
                                                        <span className="font-medium text-black/80">
                                                            {t(
                                                                "faq.questions.dressCode.women.label"
                                                            )}
                                                            :
                                                        </span>{" "}
                                                        <div className="inline">
                                                            <span>
                                                                {t("faq.questions.dressCode.women.text")}
                                                            </span>

                                                            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
                                                                {dressCodeColors.map((color) => (
                                                                    <span
                                                                        key={color.hex}
                                                                        className="inline-flex items-center gap-2"
                                                                    >
                                                                        <span
                                                                            className="h-3.5 w-3.5 shrink-0 rounded-full border border-black/15"
                                                                            style={{
                                                                                backgroundColor: color.hex,
                                                                            }}
                                                                            aria-hidden="true"
                                                                        />

                                                                        <span>{color.name}</span>
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </li>

                                                    <li>
                                                        <span className="font-medium text-black/80">
                                                            {t(
                                                                "faq.questions.dressCode.men.label"
                                                            )}
                                                            :
                                                        </span>{" "}
                                                        {t(
                                                            "faq.questions.dressCode.men.text"
                                                        )}
                                                    </li>
                                                </ul>
                                                <p className="mt-6 text-sm italic text-black/55">
                                                    <span className="font-medium">
                                                        {t("faq.questions.dressCode.ps.label")}:
                                                    </span>{" "}
                                                    {t("faq.questions.dressCode.ps.text")}
                                                </p>
                                            </div>
                                        ) : item.key ===
                                            "accommodation" ? (
                                            <p className="max-w-2xl leading-7 text-black/70">
                                                {t(
                                                    "faq.questions.accommodation.answer.beforeEmail"
                                                )}

                                                <a
                                                    href="https://mail.google.com/mail/?view=cm&fs=1&to=info@relaischiaramonte.com"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="underline underline-offset-2 transition-opacity hover:opacity-70"
                                                >
                                                    {t("faq.questions.accommodation.answer.email")}
                                                </a>

                                                {t(
                                                    "faq.questions.accommodation.answer.afterEmail"
                                                )}
                                            </p>
                                        ) : item.key === "unplugged" ? (
                                            <p className="max-w-2xl leading-7 text-black/70">
                                                {t(
                                                    "faq.questions.unplugged.answer.beforeLink"
                                                )}

                                                <a
                                                    href="https://TUO-LINK-QUI"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="underline underline-offset-2 transition-opacity hover:opacity-70"
                                                >
                                                    {t(
                                                        "faq.questions.unplugged.answer.link"
                                                    )}
                                                </a>

                                                {t(
                                                    "faq.questions.unplugged.answer.afterLink"
                                                )}
                                            </p>
                                        ) : (
                                            <p className="max-w-2xl leading-7 text-black/70">
                                                {item.answer}
                                            </p>
                                        )}
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