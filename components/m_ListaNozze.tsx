import Image from "next/image";
import { ExternalLink, Heart, Plane } from "lucide-react";
import { BASE_PATH } from "@/lib/paths";

export default function Donazione() {
    return (
        <section
            id="donazione"
            className="bg-[#F5F1E6] px-6 py-10 md:py-15"
        >
            <div className="mx-auto max-w-6xl">

                <div className="mx-auto mb-8 max-w-3xl text-center md:mb-10">
                    <p className="mb-4 text-center text-[10pt] uppercase tracking-[0.3em] md:text-[13pt]">
                        Un nuovo capitolo
                    </p>

                    <h2 className="text-center font-title text-4xl leading-tight md:text-6xl">
                        Il regalo più bello
                    </h2>

                    <p className="mx-auto mt-5 max-w-5xl space-y-4 text-center text-[12pt] leading-6.5 text-black/70 md:space-y-6 md:text-[15pt] md:leading-9">
                        Più che oggetti, sogniamo esperienze.
                        Il regalo più bello sarà poter continuare a scoprire il mondo insieme,
                        collezionando ricordi che ci accompagneranno per tutta la vita.
                        Se desiderate farci un regalo, potrete contribuire al nostro viaggio
                        e, allo stesso tempo, sostenere una causa a cui teniamo particolarmente.
                    </p>
                </div>

                <div className="grid gap-10 lg:grid-cols-2">

                    {/* VIAGGIO */}

                    <div className="overflow-hidden rounded-md border border-black/10 bg-white">
                        <div className="relative h-72">
                            <Image
                                src={`${BASE_PATH}/images/gift/travel.jpg`}
                                alt="Il nostro prossimo viaggio"
                                fill
                                sizes="(min-width:1024px) 50vw, 100vw"
                                className="object-cover"
                            />
                        </div>

                        <div className="p-8">
                            <div className="mb-6 flex items-center gap-3">
                                <Plane
                                    size={20}
                                    strokeWidth={1.5}
                                    className="text-[#979775]"
                                />

                                <p className="uppercase tracking-[0.25em] text-sm">
                                    Viaggio di nozze
                                </p>
                            </div>

                            <h3 className="mb-5 text-3xl font-title">
                                Il nostro prossimo viaggio
                            </h3>

                            <p className="mx-auto mt-5 max-w-5xl space-y-4 text-left text-[12pt] leading-6.5 text-black/70 md:space-y-6 md:text-[13pt] md:leading-7">
                                Viaggiare è una delle cose che più amiamo.
                                Ogni destinazione ci lascia qualcosa di nuovo,
                                ogni partenza diventa un ricordo da custodire.
                                Se vorrete contribuire, ci aiuterete a vivere
                                una nuova avventura insieme.
                            </p>

                            <div className="mt-10 border-t border-black/20 pt-8">
                                <p className="text-xs uppercase tracking-[0.25em] text-black/50">
                                    IBAN
                                </p>

                                <p className="mt-3 font-mono text-lg tracking-wide">
                                    IT95 Q030 6917 0201 0000 0008 741
                                </p>

                                <p className="mt-2 text-sm text-black/60">
                                    Intestatario: Giorgio Chessari
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* BENEFICENZA */}

                    <div className="overflow-hidden rounded-md border border-black/10 bg-white">
                        <div className="relative h-72">
                            <Image
                                src={`${BASE_PATH}/images/gift/charity.jpg`}
                                alt="Associazione benefica"
                                fill
                                sizes="(min-width:1024px) 50vw, 100vw"
                                className="object-cover"
                            />
                        </div>

                        <div className="p-8">
                            <div className="mb-6 flex items-center gap-3">
                                <Heart
                                    size={20}
                                    strokeWidth={1.5}
                                    className="text-[#979775]"
                                />

                                <p className="uppercase tracking-[0.25em] text-sm">
                                    Beneficenza
                                </p>
                            </div>

                            <h3 className="mb-5 text-3xl font-title">
                                Un gesto che va oltre noi
                            </h3>

                            <p className="mx-auto mt-5 max-w-5xl space-y-4 text-left text-[12pt] leading-6.5 text-black/70 md:space-y-6 md:text-[13pt] md:leading-7">
                                Crediamo che un momento di gioia possa diventare
                                anche un'occasione per fare del bene.
                                Per questo motivo una parte dei regali ricevuti
                                sarà destinata a sostenere un'organizzazione
                                che opera ogni giorno per aiutare chi ne ha più bisogno.
                            </p>

                            <div className="mt-10 border-t border-black/20 pt-8">
                                <p className="text-xs uppercase tracking-[0.25em] text-black/50">
                                    Associazione
                                </p>

                                <h4 className="mt-3 text-xl">
                                    Nome dell'associazione
                                </h4>

                                <p className="mx-auto mt-5 max-w-5xl space-y-4 text-left text-[12pt] leading-6.5 text-black/70 md:space-y-6 md:text-[13pt] md:leading-7">
                                    Breve descrizione della missione
                                    dell'associazione. Potrai sostituire questo
                                    testo quando avrai scelto il progetto che
                                    desideri sostenere.
                                </p>

                                <a
                                    href="#"
                                    className="group mt-6 inline-flex items-center gap-2 border-b border-black pb-1 text-sm uppercase tracking-[0.2em]"
                                >
                                    Visita il sito

                                    <ExternalLink
                                        size={14}
                                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}