"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const questions = [
    {
        question: "Entro quando dobbiamo confermare la presenza?",
        answer:
            "Vi chiediamo di confermare la vostra presenza entro la data che comunicheremo nell'invito.",
    },
    {
        question: "È previsto un dress code?",
        answer:
            "Il dress code sarà elegante. Aggiungeremo qui eventuali indicazioni più specifiche.",
    },
    {
        question: "È possibile comunicare allergie o intolleranze?",
        answer:
            "Sì. Potrete indicare allergie, intolleranze ed esigenze alimentari nel modulo RSVP.",
    },
    {
        question: "I bambini sono invitati?",
        answer:
            "Inseriremo qui le indicazioni relative alla partecipazione dei bambini.",
    },
    {
        question: "È disponibile un parcheggio?",
        answer:
            "Aggiungeremo le informazioni sul parcheggio quando saranno confermate.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="bg-white px-6 py-10 md:py-15">
            <div className="mx-auto max-w-4xl">
                <div className="mb-10 text-center">
                    <p className="mb-4 text-center text-[10pt] uppercase tracking-[0.3em] md:text-[13pt] text-black">
                        Informazioni
                    </p>

                    <h2 className="text-center font-title text-4xl leading-tight md:text-6xl text-black">
                        Domande frequenti
                    </h2>
                </div>

                <div className="border-t border-black/20">
                    {questions.map((item, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div key={item.question} className="border-b border-black/20">
                                <button
                                    type="button"
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    aria-expanded={isOpen}
                                    className="flex w-full items-center justify-between gap-6 py-7 text-left"
                                >
                                    <span className="text-lg md:text-xl">
                                        {item.question}
                                    </span>

                                    <ChevronDown
                                        size={22}
                                        className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
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