"use client";

import {
    BedDouble,
    MessageCircle,
    Plane,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Travel() {
    const { t } = useTranslation();

    const travelInformation = [
        {
            icon: Plane,
            key: "arrival",
            title: t("travel.items.arrival.title"),
        },
        {
            icon: BedDouble,
            key: "accommodation",
            title: t("travel.items.accommodation.title"),
            description: t(
                "travel.items.accommodation.description"
            ),
        },
        {
            icon: MessageCircle,
            key: "community",
            title: t("travel.items.community.title"),
        },
    ];

    return (
        <section
            id="travel"
            className="bg-white px-6 py-10 md:py-15"
        >
            <div className="mx-auto max-w-7xl px-6 text-center">
                <div className="mx-auto mb-10 w-full md:mb-12">
                    <p className="mb-4 text-center text-[10pt] uppercase tracking-[0.3em] md:text-[13pt] text-black">
                        {t("travel.subtitle")}
                    </p>

                    <h2 className="text-center font-title text-4xl leading-tight md:text-6xl text-black">
                        {t("travel.title")}
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
                                    {item.key === "arrival" ? (
                                        <>
                                            {t(
                                                "travel.items.arrival.description.beforeLink"
                                            )}
                                            <a
                                                href="https://www.etnatrasporti.it"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="underline underline-offset-2 transition-opacity hover:opacity-70"
                                            >
                                                {t(
                                                    "travel.items.arrival.description.link"
                                                )}
                                            </a>
                                            {t(
                                                "travel.items.arrival.description.afterLink"
                                            )}
                                        </>
                                    ) : item.key ===
                                        "community" ? (
                                        <>
                                            {t(
                                                "travel.items.community.description.beforeLink"
                                            )}
                                            <a
                                                href="https://chat.whatsapp.com/HLIDLbxukx1EL6eT2OBdcF"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="underline underline-offset-2 transition-opacity hover:opacity-70"
                                            >
                                                {t(
                                                    "travel.items.community.description.link"
                                                )}
                                            </a>
                                            {t(
                                                "travel.items.community.description.afterLink"
                                            )}
                                        </>
                                    ) : (
                                        item.description
                                    )}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}