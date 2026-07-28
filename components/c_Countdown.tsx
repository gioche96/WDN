"use client";

import { useEffect, useState } from "react";

const weddingDate = new Date("2027-09-04T16:00:00");

type TimeLeft = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

function getTimeLeft(): TimeLeft {
    const difference = weddingDate.getTime() - Date.now();

    if (difference <= 0) {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };
    }

    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
    };
}

export default function Countdown() {
    const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

    useEffect(() => {
        setTimeLeft(getTimeLeft());

        const timer = window.setInterval(() => {
            setTimeLeft(getTimeLeft());
        }, 1000);

        return () => window.clearInterval(timer);
    }, []);

    const items = [
        { value: timeLeft?.days ?? 0, label: "Giorni" },
        { value: timeLeft?.hours ?? 0, label: "Ore" },
        { value: timeLeft?.minutes ?? 0, label: "Minuti" },
        { value: timeLeft?.seconds ?? 0, label: "Secondi" },
    ];

    return (
        <section
            id="countdown"
            className="bg-[#F5F1E6] pt-10 pb-10 md:pt-15 md:pb-15"
        >
            <div className="mx-auto max-w-5xl px-8 text-center">
                <div className="mb-8 h-px w-full bg-black/15" />

                <p className="text-[10pt] uppercase tracking-[0.35em] text-black/55 md:text-[13pt]">
                    Mancano
                </p>

                <div className="mt-8 grid grid-cols-4 gap-4 md:gap-8">
                    {items.map((item) => (
                        <div
                            key={item.label}
                        >
                            <p className="text-3xl font-light tabular-nums md:text-5xl">
                                {String(item.value).padStart(2, "0")}
                            </p>

                            <p className="mt-2 text-[11px] uppercase tracking-[0.25em] text-black/50">
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>

                <p className="font-title mt-8 text-4xl md:text-5xl">
                    al nostro sì
                </p>

                <div className="mt-10 h-px w-full bg-black/15" />
            </div>
        </section>
    );
}