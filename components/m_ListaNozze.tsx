"use client";

import Image from "next/image";
import { ExternalLink, Heart, Plane } from "lucide-react";
import { BASE_PATH } from "@/lib/paths";
import { useTranslation } from "react-i18next";

export default function Donazione() {
    const { t } = useTranslation();

    return (
        <section
            id="donazione"
            className="bg-[#F5F1E6] px-6 py-10 md:py-15"
        >
            <div className="mx-auto max-w-6xl">

                <div className="mx-auto mb-8 max-w-3xl text-center md:mb-10">
                    <p className="mb-4 text-center text-[10pt] uppercase tracking-[0.3em] md:text-[13pt] text-black">
                        {t("donation.subtitle")}
                    </p>

                    <h2 className="text-center font-title text-4xl leading-tight md:text-6xl text-black">
                        {t("donation.title")}
                    </h2>

                    <p className="mx-auto mt-5 max-w-5xl space-y-4 text-center text-[12pt] leading-6.5 text-black/70 md:space-y-6 md:text-[15pt] md:leading-9">
                        {t("donation.description")}
                    </p>
                </div>

                <div className="grid gap-10 lg:grid-cols-2">

                    {/* VIAGGIO */}

                    <div className="overflow-hidden rounded-md border border-[#6D1F32]/30 bg-white">
                        <div className="relative h-72">
                            <Image
                                src={`${BASE_PATH}/images/gift/travel.jpg`}
                                alt={t("donation.travel.imageAlt")}
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
                                    {t("donation.travel.label")}
                                </p>
                            </div>

                            <h3 className="mb-5 text-3xl font-title">
                                {t("donation.travel.title")}
                            </h3>

                            <p className="mx-auto mt-5 max-w-5xl space-y-4 text-left text-[12pt] leading-6.5 text-black/70 md:space-y-6 md:text-[13pt] md:leading-7">
                                {t("donation.travel.description")}
                            </p>

                            <div className="mt-7 border-t border-black/20 pt-7">
                                <p className="text-xs uppercase tracking-[0.25em] text-black/50">
                                    IBAN
                                </p>

                                <p className="mt-3 font-mono text-lg tracking-wide">
                                    IT95 Q030 6917 0201 0000 0008 741
                                </p>

                                <p className="mt-2 text-sm text-black/60">
                                    {t("donation.travel.accountHolder")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* BENEFICENZA */}

                    <div className="overflow-hidden rounded-md border border-[#6D1F32]/30 bg-white">
                        <div className="relative h-72">
                            <Image
                                src={`${BASE_PATH}/images/gift/charity.jpg`}
                                alt={t("donation.charity.imageAlt")}
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
                                    {t("donation.charity.label")}
                                </p>
                            </div>

                            <h3 className="mb-5 text-3xl font-title">
                                {t("donation.charity.title")}
                            </h3>

                            <p className="mx-auto mt-5 max-w-5xl space-y-4 text-left text-[12pt] leading-6.5 text-black/70 md:space-y-6 md:text-[13pt] md:leading-7">
                                {t("donation.charity.description")}
                            </p>

                            <div className="mt-7 border-t border-black/20 pt-7">
                                <p className="text-xs uppercase tracking-[0.25em] text-black/50">
                                    {t("donation.charity.organizationLabel")}
                                </p>

                                <h4 className="mt-3 text-xl">
                                    {t("donation.charity.organizationName")}
                                </h4>

                                <p className="mx-auto mt-5 max-w-5xl space-y-4 text-left text-[12pt] leading-6.5 text-black/70 md:space-y-6 md:text-[13pt] md:leading-7">
                                    {t("donation.charity.organizationDescription")}
                                </p>

                                <a
                                    href="#"
                                    className="group mt-6 inline-flex items-center gap-2 border-b border-black pb-1 text-sm uppercase tracking-[0.2em]"
                                >
                                    {t("donation.charity.visitWebsite")}

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