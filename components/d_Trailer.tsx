"use client";

import { BASE_PATH } from "@/lib/paths";
import { useTranslation } from "react-i18next";

export default function Trailer() {
    const { t } = useTranslation();

    return (
        <section
            id="trailer"
            className="bg-[#C6B182]/45 px-6 py-10 md:py-15"
        >
            <div className="mx-auto max-w-5xl text-center">
                <p className="text-[10pt] uppercase tracking-[0.35em] text-black/50 md:text-[13pt]">
                    {t("trailer.subtitle")}
                </p>

                <h2 className="mt-2 font-title text-4xl leading-tight md:text-6xl text-black">
                    {t("trailer.title")}
                </h2>

                <div className="mx-auto mt-5 max-w-5xl space-y-4 text-center text-[12pt] leading-6.5 text-black/70 md:space-y-6 md:text-[15pt] md:leading-9">
                    <p>{t("trailer.description")}</p>
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
                        <source
                            src={`${BASE_PATH}/videos/trailer.mp4`}
                            type="video/mp4"
                        />
                    </video>
                </div>

                <div className="mx-auto mt-8 max-w-5xl space-y-4 text-center text-[12pt] leading-6.5 text-black/70 md:space-y-6 md:text-[15pt] md:leading-9">
                    <p>
                        {t("trailer.story.beforeDate")}{" "}
                        <strong>10 Febbraio 2027</strong>,
                        {t("trailer.story.afterDate")}
                    </p>
                </div>
            </div>
        </section>
    );
}