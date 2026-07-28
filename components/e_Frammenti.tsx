"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
    {
        src: "/images/story/1.jpg",
        subtitle: "Torino · Febbraio 2020",
        desktopClass: "md:col-span-5 md:row-span-2",
    },
    {
        src: "/images/story/2.jpg",
        subtitle: "Etna · Luglio 2020",
        desktopClass: "md:col-span-3 md:row-span-1",
    },
    {
        src: "/images/story/3.jpg",
        subtitle: "Taormina · Luglio 2020",
        desktopClass: "md:col-span-4 md:row-span-1",
    },
    {
        src: "/images/story/4.jpg",
        subtitle: "Ragusa · Luglio 2020",
        desktopClass: "md:col-span-4 md:row-span-1",
    },
    {
        src: "/images/story/5.jpg",
        subtitle: "Cascate delle Marmore · Agosto 2020",
        desktopClass: "md:col-span-3 md:row-span-1",
    },
    {
        src: "/images/story/6.jpg",
        subtitle: "Cascate delle Marmore · Agosto 2020",
        desktopClass: "md:col-span-5 md:row-span-1",
    },
    {
        src: "/images/story/7.jpg",
        subtitle: "Basilea · Marzo 2021",
        desktopClass: "md:col-span-7 md:row-span-2",
    },
    {
        src: "/images/story/8.jpg",
        subtitle: "Roma · Agosto 2020",
        desktopClass: "md:col-span-5 md:row-span-1",
    },
];

export default function Frammenti() {
    const repeatedImages = [...images, ...images];

    const trackRef = useRef<HTMLDivElement>(null);
    const offsetRef = useRef(0);
    const itemStepRef = useRef(0);
    const animationFrameRef = useRef<number | null>(null);
    const previousTimeRef = useRef<number | null>(null);

    const [activeImage, setActiveImage] = useState(0);
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 767px)");
        const track = trackRef.current;

        if (!track || !mediaQuery.matches) return;

        const calculateMeasurements = () => {
            const firstImage = track.firstElementChild as HTMLElement | null;

            if (!firstImage) return;

            const styles = window.getComputedStyle(track);
            const gap = parseFloat(
                styles.columnGap || styles.gap || "0"
            );

            itemStepRef.current = firstImage.offsetWidth + gap;
        };

        const speed = 35;

        const animate = (time: number) => {
            if (previousTimeRef.current === null) {
                previousTimeRef.current = time;
            }

            const elapsed = (time - previousTimeRef.current) / 1000;
            previousTimeRef.current = time;

            offsetRef.current -= speed * elapsed;

            const cycleWidth = track.scrollWidth / 2;

            if (
                cycleWidth > 0 &&
                Math.abs(offsetRef.current) >= cycleWidth
            ) {
                offsetRef.current += cycleWidth;
            }

            track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;

            if (itemStepRef.current > 0) {
                const currentIndex =
                    Math.round(
                        Math.abs(offsetRef.current) /
                        itemStepRef.current
                    ) % images.length;

                setActiveImage(currentIndex);
            }

            animationFrameRef.current =
                requestAnimationFrame(animate);
        };

        calculateMeasurements();

        window.addEventListener(
            "resize",
            calculateMeasurements
        );

        animationFrameRef.current =
            requestAnimationFrame(animate);

        return () => {
            window.removeEventListener(
                "resize",
                calculateMeasurements
            );

            if (animationFrameRef.current !== null) {
                cancelAnimationFrame(
                    animationFrameRef.current
                );
            }

            previousTimeRef.current = null;
        };
    }, []);

    const goToImage = (index: number) => {
        if (!trackRef.current || itemStepRef.current === 0) {
            return;
        }

        offsetRef.current = -(index * itemStepRef.current);
        setActiveImage(index);

        trackRef.current.style.transform =
            `translate3d(${offsetRef.current}px, 0, 0)`;
    };

    const goToPrevious = () => {
        const previousIndex =
            activeImage === 0
                ? images.length - 1
                : activeImage - 1;

        goToImage(previousIndex);
    };

    const goToNext = () => {
        const nextIndex =
            activeImage === images.length - 1
                ? 0
                : activeImage + 1;

        goToImage(nextIndex);
    };

    return (
        <section
            id="frammenti"
            className="overflow-hidden bg-[#F5F1E6] py-10 md:py-15"
        >
            <div className="mx-auto max-w-7xl px-6 text-center">
                <div className="mx-auto mb-10 w-full md:mb-12">
                    <p className="mb-4 text-center text-[10pt] uppercase tracking-[0.3em] md:text-[13pt]">
                        Frammenti
                    </p>

                    <h2 className="text-center font-title text-4xl leading-tight md:text-6xl">
                        Ricordi che abbiamo vissuto
                    </h2>

                    <div className="mx-auto mt-5 max-w-5xl space-y-4 text-center text-[12pt] leading-6.5 text-black/70 md:space-y-6 md:text-[15pt] md:leading-9">
                        <p>
                            La nostra storia è iniziata 7 anni fa, quasi per caso, tra incontri,
                            conversazioni e piccoli momenti diventati presto importanti.
                            Da allora abbiamo condiviso viaggi, progetti e sogni.
                        </p>
                    </div>
                </div>

                {/* Mobile: sequenza automatica */}
                <div className="md:hidden">
                    <div className="relative">
                        <div className="story-film overflow-hidden">
                            <div
                                ref={trackRef}
                                className="story-film-track flex w-max gap-4 will-change-transform"
                            >
                                {repeatedImages.map(
                                    (image, index) => (
                                        <div
                                            key={`${image.src}-${index}`}
                                            className="relative h-[225px] w-[300px] shrink-0 overflow-hidden rounded-[15px]"
                                        >
                                            <Image
                                                src={image.src}
                                                alt={`Alice e Giorgio ${(index %
                                                    images.length) +
                                                    1
                                                    }`}
                                                fill
                                                sizes="300px"
                                                className="object-cover"
                                            />

                                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-5 pb-5 pt-12 text-white">
                                                <p className="text-center text-sm tracking-wide text-white/90">
                                                    {
                                                        image.subtitle
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={goToPrevious}
                            aria-label="Foto precedente"
                            className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/25 text-white backdrop-blur-sm transition duration-300 hover:scale-105 hover:bg-black/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        >
                            <ChevronLeft
                                size={22}
                                strokeWidth={1.4}
                            />
                        </button>

                        <button
                            type="button"
                            onClick={goToNext}
                            aria-label="Foto successiva"
                            className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/25 text-white backdrop-blur-sm transition duration-300 hover:scale-105 hover:bg-black/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        >
                            <ChevronRight
                                size={22}
                                strokeWidth={1.4}
                            />
                        </button>
                    </div>

                    <div className="mt-6 flex justify-center gap-2">
                        {images.map((image, index) => (
                            <button
                                key={image.src}
                                type="button"
                                onClick={() => goToImage(index)}
                                aria-label={`Vai alla foto ${index + 1
                                    }: ${image.subtitle}`}
                                className={`h-2 rounded-full transition-all duration-300 ${activeImage === index
                                    ? "w-7 bg-[#6D1F32]"
                                    : "w-2 bg-[#C6B182]/50 hover:bg-[#C6B182]"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Desktop: mosaico */}
                <div className="hidden grid-cols-12 auto-rows-[190px] gap-4 md:grid">
                    {images.map((image, index) => {
                        const isSelected =
                            selectedImage === index;

                        return (
                            <button
                                key={image.src}
                                type="button"
                                onClick={() =>
                                    setSelectedImage(
                                        isSelected ? null : index
                                    )
                                }
                                aria-label={`Ingrandisci foto: ${image.subtitle}`}
                                aria-pressed={isSelected}
                                className={`
                                    group relative overflow-hidden
                                    rounded-[15px] text-left
                                    transition-[transform,box-shadow]
                                    duration-500 ease-out
                                    focus-visible:outline-none
                                    focus-visible:ring-2
                                    focus-visible:ring-[#6D1F32]
                                    ${image.desktopClass}
                                    ${isSelected
                                        ? "z-20 scale-[1.035] shadow-2xl"
                                        : "z-0 hover:z-10 hover:scale-[1.015]"
                                    }
                                `}
                            >
                                <Image
                                    src={image.src}
                                    alt={`Alice e Giorgio ${index + 1
                                        }`}
                                    fill
                                    sizes="(min-width: 1280px) 40vw, 50vw"
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                                />

                                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/5" />

                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent px-5 pb-5 pt-16 text-white">
                                    <p className="text-right text-sm tracking-wide text-white/90">
                                        {image.subtitle}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}