"use client";

import {
    motion,
    useScroll,
    useTransform,
} from "framer-motion";
import { useRef } from "react";

const events = [
    {
        time: "15:30",
        title: "Cerimonia",
        description:
            "Accoglienza degli ospiti e inizio della cerimonia.",
    },
    {
        time: "17:00",
        title: "Aperitivo",
        description:
            "Brindisi, musica e momenti insieme.",
    },
    {
        time: "19:30",
        title: "Cena",
        description:
            "Cena, discorsi e festeggiamenti.",
    },
    {
        time: "23:00",
        title: "Party",
        description:
            "Musica, balli e festa fino a tardi.",
    },
];

export default function Program() {
    const timelineRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start 65%", "end 50%"],
    });

    const lineScale = useTransform(
        scrollYProgress,
        [0.15, 1],
        [0, 1]
    );

    return (
        <section
            id="program"
            className="bg-white px-6 py-10 pb-13 md:py-15 md:pb-20"
        >
            <div className="mx-auto max-w-6xl">
                {/* Intestazione */}
                <div className="mx-auto mb-11 max-w-2xl text-center md:mb-15">
                    <p className="mb-4 text-[10pt] uppercase tracking-[0.3em] text-black/65 md:text-[13pt]">
                        Sabato 4 settembre 2027
                    </p>

                    <h2 className="font-title text-4xl leading-tight md:text-6xl">
                        Il programma
                    </h2>
                </div>

                {/* Timeline */}
                <div className="mx-auto max-w-3xl">
                    <div
                        ref={timelineRef}
                        className="relative"
                    >
                        {/* Linea di base */}
                        <div
                            className="
                            absolute bottom-0 left-[7px] top-0
                            w-0.5 bg-black/15
                            md:left-[239px]
                        "
                        />

                        {/* Linea attiva */}
                        <motion.div
                            style={{
                                scaleY: lineScale,
                                transformOrigin: "top",
                            }}
                            className="
                            absolute bottom-0 left-[7px] top-0
                            z-10 w-0.5 bg-[#979775]
                            md:left-[239px]
                        "
                        />

                        <div>
                            {events.map((event) => (
                                <ProgramEvent
                                    key={event.time}
                                    event={event}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

type ProgramEventProps = {
    event: {
        time: string;
        title: string;
        description: string;
    };
};

function ProgramEvent({
    event,
}: ProgramEventProps) {
    return (
        <article
            className="
                relative grid gap-3 pb-14 pl-10
                last:pb-0
                md:grid-cols-[200px_1fr]
                md:gap-20 md:pb-20 md:pl-0
            "
        >
            {/* Punto timeline */}
            <motion.div
                initial={{
                    scale: 0.8,
                    backgroundColor: "#D9D5D2",
                }}
                whileInView={{
                    scale: 1,
                    backgroundColor: "#979775",
                }}
                viewport={{
                    once: false,
                    amount: 0.6,
                }}
                transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                }}
                className="
                    absolute left-0 top-2 z-20
                    h-[16px] w-[16px]
                    rounded-full border-4 border-white
                    md:left-[232px]
                "
            />

            {/* Orario e titolo */}
            <div className="md:text-right">
                <p className="mb-3 text-sm tracking-[0.22em] text-black/65">
                    {event.time}
                </p>

                <h3 className="text-3xl font-light text-black md:text-4xl">
                    {event.title}
                </h3>
            </div>

            {/* Descrizione */}
            <div className="relative flex items-center">

                <p className="max-w-xl text-[13pt] leading-6 text-black/60 md:text-[14pt] md:leading-8">
                    {event.description}
                </p>
            </div>
        </article>
    );
}
