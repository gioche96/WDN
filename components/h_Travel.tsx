import { BedDouble, Car, Plane } from "lucide-react";

const travelInformation = [
    {
        icon: Plane,
        title: "Per chi arriva da lontano",
        description:
            "L'aeroporto di Catania è il principale punto di arrivo per chi raggiunge la Sicilia in aereo. Da lì è possibile noleggiare un'auto oppure prendere gli autobus Etna Trasporti, che collegano Catania a Ragusa con corse frequenti durante la giornata.",
    },
    {
        icon: Car,
        title: "Come arrivare",
        description:
            "Il Relais Chiaramonte è facilmente raggiungibile in automobile e dista circa 15 minuti dal centro di Ragusa. La struttura dispone di un ampio parcheggio riservato agli ospiti.",
    },
    {
        icon: BedDouble,
        title: "Dove dormire",
        description:
            "Per chi desidera fermarsi a dormire, il Relais dispone di un numero limitato di camere. In alternativa, Ragusa e i dintorni offrono numerose soluzioni tra hotel, B&B e case vacanza per ogni esigenza.",
    },
];

export default function Travel() {
    return (
        <section id="travel" className="bg-white px-6 py-10 md:py-15">
            <div className="mx-auto max-w-7xl px-6 text-center">
                <div className="mx-auto mb-10 w-full md:mb-12">
                    <p className="mb-4 text-center text-[10pt] uppercase tracking-[0.3em] md:text-[13pt]">
                        Informazioni utili
                    </p>

                    <h2 className="text-center font-title text-4xl leading-tight md:text-6xl">
                        Viaggio e soggiorno
                    </h2>
                </div>

                <div className="grid gap-10 md:grid-cols-3">
                    {travelInformation.map((item) => {
                        const Icon = item.icon;

                        return (
                            <article
                                key={item.title}
                                className="border-t border-black/20 pt-8 text-center"
                            >
                                <Icon
                                    size={30}
                                    strokeWidth={1.4}
                                    className="mx-auto"
                                />

                                <h3 className="mb-4 mt-6 text-2xl font-light">
                                    {item.title}
                                </h3>

                                <p className="mx-auto mt-5 max-w-5xl space-y-4 text-center text-[12pt] leading-6.5 text-black/70 md:space-y-6 md:text-[13pt] md:leading-7">
                                    {item.description}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}