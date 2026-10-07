import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function PUT(request: Request) {
    try {
        const uploadUrl = request.headers.get("X-Upload-Url");
        const contentRange = request.headers.get("Content-Range");
        const contentLength = request.headers.get("Content-Length");
        const contentType =
            request.headers.get("Content-Type") ||
            "application/octet-stream";

        if (!uploadUrl) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Sessione di caricamento mancante.",
                },
                { status: 400 }
            );
        }

        if (!contentRange) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Content-Range mancante.",
                },
                { status: 400 }
            );
        }

        const parsedUrl = new URL(uploadUrl);

        if (
            parsedUrl.protocol !== "https:" ||
            parsedUrl.hostname !== "www.googleapis.com"
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "URL di upload non valido.",
                },
                { status: 400 }
            );
        }

        const body = await request.arrayBuffer();

        const response = await fetch(uploadUrl, {
            method: "PUT",
            headers: {
                "Content-Type": contentType,
                "Content-Length":
                    contentLength || String(body.byteLength),
                "Content-Range": contentRange,
            },
            body,
        });

        const responseBody = await response.text();

        const result = new NextResponse(responseBody, {
            status: response.status,
        });

        const range = response.headers.get("Range");

        if (range) {
            result.headers.set("Range", range);
        }

        result.headers.set(
            "Content-Type",
            response.headers.get("Content-Type") ||
            "application/json"
        );

        return result;
    } catch (error) {
        console.error("CHUNK ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Errore durante il caricamento.",
            },
            { status: 500 }
        );
    }
}