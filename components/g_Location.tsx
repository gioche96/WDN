import Image from "next/image";
import { ExternalLink, MapPin } from "lucide-react";

const gallery = [
    {
        src: "/images/location/location-1.jpg",
        alt: "Esterno del Relais Chiaramonte",
    },
    {
        src: "/images/location/location-2.jpg",
        alt: "Sala Qirat",
    },
    {
        src: "/images/location/location-3.jpg",
        alt: "Dettaglio della location",
    },
];

export default function Location() {
    return (
        <section
            id="location"
            className="bg-[#F5F1E6] px-6 py-10 md:py-15"
        >
            <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
                <div>
                    <p className="mb-4 text-center text-[10pt] uppercase tracking-[0.3em] lg:text-left md:text-[13pt]">
                        La location
                    </p>

                    <h2 className="mb-8 text-center font-title text-4xl leading-tight md:text-6xl lg:text-left">
                        Un luogo speciale
                        <br />
                        per il nostro giorno
                    </h2>

                    <div className="flex gap-4">
                        <MapPin
                            className="mt-1 shrink-0 text-[#979775]"
                            size={22}
                            strokeWidth={1.5}
                        />

                        <div>
                            <h3 className="mb-2 text-2xl">
                                Relais Chiaramonte · Sala Qirat
                            </h3>

                            <p className="leading-7 text-black/70">
                                Contrada Gisolfo, SP81, Km 7
                                <br />
                                97100 Ragusa (RG), Italia
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-5 lg:justify-start">
                        <a
                            href="https://www.relaischiaramonte.com/"
                            target="_blank"
                            rel="noreferrer"
                            className="group inline-flex items-center gap-2 border-b border-black pb-1 text-sm uppercase tracking-[0.2em]"
                        >
                            Sito ufficiale

                            <ExternalLink
                                size={14}
                                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            />
                        </a>

                        <a
                            href="https://maps.app.goo.gl/nfrzeeS91FVjXqzB8"
                            target="_blank"
                            rel="noreferrer"
                            className="group inline-flex items-center gap-2 border-b border-black pb-1 text-sm uppercase tracking-[0.2em]"
                        >
                            Apri su Google Maps

                            <ExternalLink
                                size={14}
                                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            />
                        </a>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2 md:gap-4">
                        {gallery.map((image) => (
                            <div
                                key={image.src}
                                className="relative aspect-square overflow-hidden rounded-md"
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    sizes="(min-width: 1024px) 25vw, 33vw"
                                    className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="relative h-[160px] overflow-hidden rounded-md md:h-[180px]">
                        <iframe
                            title="Mappa Sala Qirat"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3787.8833677544035!2d14.63910647812349!3d36.83533987749175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1311bd0030d8c15f%3A0xa91169fdef8cdfd5!2sQIRAT!5e1!3m2!1sit!2sch!4v1785163491045!5m2!1sit!2sch"
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0 h-full w-full border-0"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}