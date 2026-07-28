"use client";

import { FormEvent, useState } from "react";

type Attendance = "" | "yes" | "no";

export default function RSVP() {
    const [submitted, setSubmitted] = useState(false);
    const [attendance, setAttendance] = useState<Attendance>("");
    const [guestCount, setGuestCount] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [mainGuestName, setMainGuestName] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const selectedAttendance = formData.get(
            "attendance",
        ) as Attendance;

        setAttendance(selectedAttendance);
        setSubmitted(true);

        /*
        Qui potrai successivamente inviare i dati a Formspree,
        Supabase, Google Sheets o a una route API di Next.js.
        */
    }

    function handleAttendanceChange(
        event: React.ChangeEvent<HTMLSelectElement>,
    ) {
        const value = event.target.value as Attendance;

        setAttendance(value);

        if (value === "no") {
            setGuestCount(1);
        }
    }

    return (
        <section
            id="rsvp"
            className="scroll-mt-24 bg-[#979775] px-6 py-10 text-white md:py-15"
        >
            <div className="mx-auto max-w-3xl">
                <div className="mb-10 text-center md:mb-14">
                    <p className="mb-4 text-[10pt] uppercase tracking-[0.3em] text-white/75 md:text-[13pt]">
                        Conferma la tua presenza
                    </p>

                    <h2 className="font-title text-4xl leading-tight md:text-6xl">
                        RSVP
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-[13pt] leading-7 text-white/80 md:mt-6 md:text-[15pt] md:leading-9">
                        Compila il modulo per comunicarci se sarai
                        presente e fornirci tutte le informazioni
                        necessarie per accoglierti al meglio.
                        Per motivi organizzativi, ti chiediamo una
                        risposta entro il <strong>10 Febbraio 2027</strong>.
                    </p>
                </div>

                {submitted ? (
                    <div className="rounded-md border border-white/30 px-6 py-12 text-center md:px-10 md:py-16">
                        <p className="mb-4 text-[10pt] uppercase tracking-[0.3em] text-white/70 md:text-[13pt]">
                            Conferma ricevuta
                        </p>

                        <h3 className="font-title text-4xl leading-tight md:text-5xl">
                            Grazie!
                        </h3>

                        <p className="mx-auto mt-5 max-w-xl text-[13pt] leading-7 text-white/80 md:text-[15pt] md:leading-8">
                            {attendance === "yes"
                                ? "Abbiamo ricevuto la tua conferma. Non vediamo l'ora di condividere con te questa giornata speciale."
                                : "Abbiamo ricevuto la tua risposta. Ci dispiace che tu non possa essere con noi, ma ti ringraziamo per averci avvisato e ti mandiamo un caro abbraccio."}
                        </p>
                    </div>
                ) : (
                    <form
                        onSubmit={async function handleSubmit(event: FormEvent<HTMLFormElement>) {
                            event.preventDefault();

                            setIsSubmitting(true);
                            setSubmitError("");

                            try {
                                const formData = new FormData(event.currentTarget);

                                const selectedAttendance = formData.get(
                                    "attendance",
                                ) as Attendance;

                                const guests =
                                    selectedAttendance === "yes"
                                        ? Array.from({ length: guestCount }, (_, index) => ({
                                            name: String(
                                                formData.get(`guests[${index}][name]`) ?? "",
                                            ).trim(),

                                            menu: String(
                                                formData.get(`guests[${index}][menu]`) ?? "",
                                            ),

                                            allergies: String(
                                                formData.get(
                                                    `guests[${index}][allergies]`,
                                                ) ?? "",
                                            ).trim(),
                                        }))
                                        : [];

                                const payload = {
                                    name: String(formData.get("name") ?? "").trim(),
                                    email: String(formData.get("email") ?? "").trim(),
                                    attendance: selectedAttendance,
                                    guestCount:
                                        selectedAttendance === "yes" ? guestCount : 0,
                                    guests,
                                    transport:
                                        selectedAttendance === "yes"
                                            ? String(formData.get("transport") ?? "")
                                            : "",
                                    accommodation:
                                        selectedAttendance === "yes"
                                            ? String(formData.get("accommodation") ?? "")
                                            : "",
                                    message: String(
                                        formData.get("message") ?? "",
                                    ).trim(),
                                };

                                const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

                                console.log("ENV:", process.env);
                                console.log("RSVP URL:", process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL);
                                console.log("RSVP URL:", scriptUrl);
                                if (!scriptUrl) {
                                    throw new Error(
                                        "L'indirizzo del servizio RSVP non è configurato.",
                                    );
                                }

                                const response = await fetch(scriptUrl, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "text/plain;charset=utf-8",
                                    },
                                    body: JSON.stringify(payload),
                                });

                                if (!response.ok) {
                                    throw new Error(
                                        "Il servizio RSVP non ha risposto correttamente.",
                                    );
                                }

                                const result = await response.json();

                                if (!result.success) {
                                    throw new Error(
                                        result.message || "Invio della risposta non riuscito.",
                                    );
                                }

                                setAttendance(selectedAttendance);
                                setSubmitted(true);
                            } catch (error) {
                                setSubmitError(
                                    error instanceof Error
                                        ? error.message
                                        : "Si è verificato un errore. Riprova.",
                                );
                            } finally {
                                setIsSubmitting(false);
                            }
                        }}




                        className="grid gap-10"
                    >
                        {/* DATI PRINCIPALI */}

                        <fieldset className="grid gap-8">

                            <div className="grid gap-8 md:grid-cols-2">
                                <label className="grid gap-1">
                                    <span className="text-[10pt] uppercase tracking-[0.18em] text-white/85 md:text-sm">
                                        Nome e cognome
                                    </span>

                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        autoComplete="name"
                                        value={mainGuestName}
                                        onChange={(event) => setMainGuestName(event.target.value)}
                                        placeholder="Nome e cognome"
                                        className="border-b border-white/35 bg-transparent px-0 py-4 text-[13pt] text-white outline-none transition-colors placeholder:text-white/40 focus:border-white md:text-[14pt]"
                                    />
                                </label>

                                <label className="grid gap-1">
                                    <span className="text-[10pt] uppercase tracking-[0.18em] text-white/85 md:text-sm">
                                        Email
                                    </span>

                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        autoComplete="email"
                                        placeholder="indirizzo@email.com"
                                        className="border-b border-white/35 bg-transparent px-0 py-4 text-[13pt] text-white outline-none transition-colors placeholder:text-white/40 focus:border-white md:text-[14pt]"
                                    />
                                </label>
                            </div>

                            <label className="grid gap-1">
                                <span className="text-[10pt] uppercase tracking-[0.18em] text-white/85 md:text-sm">
                                    Parteciperai?
                                </span>

                                <select
                                    name="attendance"
                                    required
                                    value={attendance}
                                    onChange={handleAttendanceChange}
                                    className="border-b border-white/35 bg-[#979775] py-4 text-[13pt] text-white outline-none transition-colors focus:border-white md:text-[14pt]"
                                >
                                    <option value="" disabled className="bg-[#F5F1E6] text-black">
                                        Seleziona una risposta
                                    </option>

                                    <option value="yes" className="bg-[#F5F1E6] text-black">
                                        Sì, sarò presente
                                    </option>

                                    <option value="no" className="bg-[#F5F1E6] text-black">
                                        No, non potrò partecipare
                                    </option>
                                </select>
                            </label>
                        </fieldset>

                        {/* CAMPI VISIBILI SOLO IN CASO DI PARTECIPAZIONE */}

                        {attendance === "yes" && (
                            <>
                                {/* NUMERO PERSONE */}

                                <fieldset className="grid gap-8">

                                    <label className="grid gap-1">
                                        <span className="text-[10pt] uppercase tracking-[0.18em] text-white/85 md:text-sm">
                                            Numero di persone, incluso te
                                        </span>

                                        <select
                                            name="guestCount"
                                            value={guestCount}
                                            onChange={(event) =>
                                                setGuestCount(
                                                    Number(
                                                        event.target
                                                            .value,
                                                    ),
                                                )
                                            }
                                            className="border-b border-white/35 bg-[#979775] py-4 text-[13pt] text-white outline-none transition-colors focus:border-white md:text-[14pt]"
                                        >
                                            {Array.from(
                                                { length: 10 },
                                                (_, index) =>
                                                    index + 1,
                                            ).map((number) => (
                                                <option
                                                    key={number}
                                                    value={number}
                                                    className="bg-[#F5F1E6] text-black"
                                                >
                                                    {number}{" "}
                                                    {number === 1
                                                        ? "persona"
                                                        : "persone"}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                </fieldset>

                                {/* INFORMAZIONI OSPITI */}

                                <fieldset className="grid gap-8">
                                    <legend className="mb-2 w-full border-b border-white/25 pb-4 text-[10pt] uppercase tracking-[0.25em] text-white/75 md:text-sm">
                                        Informazioni degli ospiti
                                    </legend>

                                    <div className="grid gap-5">
                                        {Array.from({
                                            length: guestCount,
                                        }).map((_, index) => (
                                            <div
                                                key={index}
                                                className="grid gap-7 rounded-md border border-white/25 p-5 md:p-7"
                                            >
                                                <div>
                                                    <p className="font-title text-2xl md:text-3xl">
                                                        {index === 0
                                                            ? "Ospite 1"
                                                            : `Ospite ${index + 1}`}
                                                    </p>

                                                </div>

                                                <div className="grid gap-6 md:grid-cols-2">
                                                    {index === 0 ? (
                                                        <div className="grid gap-1">
                                                            <span className="text-[10pt] uppercase tracking-[0.18em] text-white/85 md:text-sm">
                                                                Nome e cognome
                                                            </span>

                                                            <p className="border-b border-white/35 py-4 text-[13pt] text-white/75 md:text-[14pt]">
                                                                {mainGuestName}
                                                            </p>

                                                            <input
                                                                type="hidden"
                                                                name={`guests[${index}][name]`}
                                                                value={mainGuestName}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <label className="grid gap-1">
                                                            <span className="text-[10pt] uppercase tracking-[0.18em] text-white/85 md:text-sm">
                                                                Nome e cognome
                                                            </span>

                                                            <input
                                                                type="text"
                                                                name={`guests[${index}][name]`}
                                                                required
                                                                placeholder="Nome e cognome dell'ospite"
                                                                className="border-b border-white/35 bg-transparent px-0 py-4 text-[13pt] text-white outline-none transition-colors placeholder:text-white/40 focus:border-white md:text-[14pt]"
                                                            />
                                                        </label>
                                                    )}

                                                    <label className="grid gap-2">
                                                        <span className="text-[10pt] uppercase tracking-[0.18em] text-white/85 md:text-sm">
                                                            Preferenza menu
                                                        </span>

                                                        <select
                                                            name={`guests[${index}][menu]`}
                                                            required
                                                            defaultValue=""
                                                            className="border-b border-white/35 bg-[#979775] py-4 text-[13pt] text-white outline-none transition-colors focus:border-white md:text-[14pt]"
                                                        >
                                                            <option value="" disabled className="bg-[#F5F1E6] text-black">
                                                                Seleziona un menu
                                                            </option>
                                                            <option value="standard" className="bg-[#F5F1E6] text-black">Menu normale</option>
                                                            <option value="vegetarian" className="bg-[#F5F1E6] text-black">Menu vegetariano</option>
                                                            <option value="vegan" className="bg-[#F5F1E6] text-black">Menu vegano</option>
                                                            <option value="child" className="bg-[#F5F1E6] text-black">Menu bambino</option>
                                                        </select>
                                                    </label>
                                                </div>


                                                <label className="grid gap-1">
                                                    <span className="text-[10pt] uppercase tracking-[0.18em] text-white/85 md:text-sm">
                                                        Allergie o
                                                        intolleranze
                                                    </span>

                                                    <textarea
                                                        name={`guests[${index}][allergies]`}
                                                        rows={3}
                                                        placeholder="Indica eventuali allergie, intolleranze o necessità alimentari"
                                                        className="resize-none rounded-md border border-white/30 bg-transparent p-4 text-[13pt] leading-7 text-white outline-none transition-colors placeholder:text-white/40 focus:border-white md:text-[14pt]"
                                                    />
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </fieldset>

                                {/* TRASPORTO */}

                                <label className="grid gap-2">
                                    <span className="text-[10pt] uppercase tracking-[0.18em] text-white/85 md:text-sm">
                                        Trasporto
                                    </span>

                                    <select
                                        name="transport"
                                        required
                                        defaultValue=""
                                        className="border-b border-white/35 bg-[#979775] py-4 text-[13pt] text-white outline-none transition-colors focus:border-white md:text-[14pt]"
                                    >
                                        <option value="" disabled className="bg-white text-black">
                                            Come pensi di raggiungere la location?
                                        </option>

                                        <option value="own" className="bg-[#F5F1E6] text-black">
                                            Arriverò con mezzi propri
                                        </option>

                                        <option value="rental" className="bg-[#F5F1E6] text-black">
                                            Affitterò un veicolo
                                        </option>

                                        <option value="help" className="bg-[#F5F1E6] text-black">
                                            Ho bisogno di aiuto per il trasporto
                                        </option>
                                    </select>
                                </label>

                                {/* ALLOGGIO */}

                                <label className="grid gap-2">
                                    <span className="text-[10pt] uppercase tracking-[0.18em] text-white/85 md:text-sm">
                                        Alloggio
                                    </span>

                                    <select
                                        name="accommodation"
                                        required
                                        defaultValue=""
                                        className="border-b border-white/35 bg-[#979775] py-4 text-[13pt] text-white outline-none transition-colors focus:border-white md:text-[14pt]"
                                    >
                                        <option value="" disabled className="bg-white text-black">
                                            Hai già organizzato il tuo soggiorno?
                                        </option>

                                        <option
                                            value="already-arranged"
                                            className="bg-[#F5F1E6] text-black"
                                        >
                                            Ho già una sistemazione
                                        </option>

                                        <option
                                            value="recommendation"
                                            className="bg-[#F5F1E6] text-black"
                                        >
                                            Vorrei una raccomandazione
                                        </option>

                                        <option value="help" className="bg-[#F5F1E6] text-black">
                                            Ho bisogno di aiuto
                                        </option>
                                    </select>
                                </label>
                            </>
                        )}

                        {/* MESSAGGIO */}

                        {attendance && (
                            <fieldset className="grid gap-6">
                                <legend className="mb-2 w-full border-b border-white/25 pb-4 text-[10pt] uppercase tracking-[0.25em] text-white/75 md:text-sm">
                                    Un messaggio per gli sposi
                                </legend>

                                <label className="grid gap-1">
                                    <span className="sr-only">
                                        Messaggio per gli sposi
                                    </span>

                                    <textarea
                                        name="message"
                                        rows={5}
                                        placeholder="Lasciaci un messaggio..."
                                        className="min-h-36 resize-none rounded-md border border-white/30 bg-transparent p-5 text-[13pt] leading-7 text-white outline-none transition-colors placeholder:text-white/40 focus:border-white md:text-[14pt] md:leading-8"
                                    />
                                </label>
                            </fieldset>
                        )}
                        {submitError && (
                            <p
                                role="alert"
                                className="rounded-md border border-white/35 px-5 py-4 text-center text-[12pt] leading-6 text-white"
                            >
                                {submitError}
                            </p>
                        )}
                        <button
                            type="submit"
                            disabled={!attendance || isSubmitting}
                            className="mt-2 justify-self-center rounded-md border border-white px-8 py-4 text-[10pt] uppercase tracking-[0.25em] transition-colors duration-300 hover:bg-white hover:text-[#979775] disabled:cursor-not-allowed disabled:opacity-40 md:mt-4 md:px-10 md:text-sm"
                        >
                            {isSubmitting ? "Invio in corso..." : "Invia conferma"}
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
}