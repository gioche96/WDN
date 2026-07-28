import { BASE_PATH } from "@/lib/paths";

export default function Trailer() {
    return (
        <section
            id="trailer"
            className="bg-[#C6B182]/45 px-6 py-10 md:py-15"
        >
            <div className="mx-auto max-w-5xl text-center">
                <p className="text-[10pt] uppercase tracking-[0.35em] text-black/50 md:text-[13pt]">
                    Un'anteprima
                </p>

                <h2 className="mt-2 font-title text-4xl leading-tight md:text-6xl text-black">
                    Il nostro trailer
                </h2>

                <div className="mx-auto mt-5 max-w-5xl space-y-4 text-center text-[12pt] leading-6.5 text-black/70 md:space-y-6 md:text-[15pt] md:leading-9">
                    <p>
                        Prima del grande giorno, desideriamo condividere con voi un piccolo
                        assaggio di ciò che ci aspetta. Un breve trailer che racconta un
                        momento speciale della nostra storia e che apre le porte al capitolo
                        più bello.
                    </p>
                </div>

                <div className="mx-auto mt-8 max-w-4xl">
                    <video
                        controls
                        controlsList="nodownload noplaybackrate"
                        disablePictureInPicture
                        playsInline
                        preload="metadata"
                        className="aspect-video w-full rounded-xl border-5 border-[#6D1F32]/80 object-cover shadow-lg"
                    >
                        <source src={`${BASE_PATH}/videos/trailer.mp4`} type="video/mp4" />
                    </video>
                </div>

                <div className="mx-auto mt-8 max-w-5xl space-y-4 text-center text-[12pt] leading-6.5 text-black/70 md:space-y-6 md:text-[15pt] md:leading-9">
                    <p>
                        Questo video è stato realizzato il <strong>10 Febbraio 2027</strong>,
                        a Chieri, il luogo in cui ci siamo già promessi l'uno all'altra con
                        una cerimonia civile, vissuta nella semplicità e nell'intimità.
                        Il prossimo passo, però, sarà quello che sogniamo di vivere insieme a
                        voi. Il 4 settembre celebreremo la nostra unione circondati dalle
                        persone che hanno reso speciale il nostro cammino. Questo è soltanto
                        il trailer... il film più bello deve ancora cominciare!
                    </p>
                </div>
            </div>
        </section>
    );
}