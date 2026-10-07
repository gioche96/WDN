import { NextResponse } from "next/server";

export const runtime = "nodejs";

const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbz0vq68U2T5NgY7u42Tg2feDeTzLf_zjViRVAxB2ebPeCu_Lv0VT7tsZYmoWUqdgtXTQQ/exec";

const MAX_IMAGE_SIZE = 100 * 1024 * 1024; // 100 MB
const MAX_VIDEO_SIZE = 1 * 1024 * 1024 * 1024; // 1 GB

const ALLOWED_MIME_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/heic",
    "image/heif",
    "video/mp4",
    "video/quicktime",
    "video/webm",
];

export async function POST(request: Request) {
    try {
        const data = await request.json();

        const fileName = String(data.fileName || "");
        const mimeType = String(data.mimeType || "");
        const fileSize = Number(data.fileSize);

        if (
            !fileName ||
            !mimeType ||
            !Number.isFinite(fileSize) ||
            fileSize <= 0
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Dati file non validi.",
                },
                { status: 400 }
            );
        }

        if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Questo tipo di file non è supportato.",
                },
                { status: 400 }
            );
        }

        if (
            mimeType.startsWith("image/") &&
            fileSize > MAX_IMAGE_SIZE
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "La foto supera il limite di 100 MB.",
                },
                { status: 400 }
            );
        }

        if (
            mimeType.startsWith("video/") &&
            fileSize > MAX_VIDEO_SIZE
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Il video supera il limite di 1 GB.",
                },
                { status: 400 }
            );
        }

        const response = await fetch(SCRIPT_URL, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=utf-8",
            },
            body: JSON.stringify({
                eventKey: process.env.GALLERY_EVENT_KEY,
                fileName,
                mimeType,
                fileSize,
            }),
            cache: "no-store",
        });

        const responseData = await response.json();

        if (!responseData.success || !responseData.uploadUrl) {
            throw new Error(
                responseData.message ||
                "Impossibile creare la sessione Google Drive."
            );
        }

        return NextResponse.json({
            success: true,
            uploadUrl: responseData.uploadUrl,
        });
    } catch (error) {
        console.error("SESSION ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Errore durante la creazione della sessione.",
            },
            { status: 500 }
        );
    }
}