"use client";

import { ChangeEvent, useState } from "react";

const MAX_IMAGE_SIZE = 100 * 1024 * 1024; // 100 MB
const MAX_VIDEO_SIZE = 1 * 1024 * 1024 * 1024; // 1 GB

const ALLOWED_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/heic",
    "image/heif",
    "video/mp4",
    "video/quicktime",
    "video/webm",
];

const CONCURRENT_UPLOADS = 3;
const CHUNK_SIZE = 4 * 1024 * 1024; // 10 MB

export default function FotoPage() {
    const [files, setFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");
    const [uploadedCount, setUploadedCount] = useState(0);

    function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        const selectedFiles = Array.from(event.target.files || []);

        const invalidType = selectedFiles.find(
            (file) => !ALLOWED_TYPES.includes(file.type)
        );

        if (invalidType) {
            setMessage(
                `Il file "${invalidType.name}" non è supportato.`
            );
            return;
        }

        const invalidSize = selectedFiles.find((file) => {
            if (file.type.startsWith("image/")) {
                return file.size > MAX_IMAGE_SIZE;
            }

            if (file.type.startsWith("video/")) {
                return file.size > MAX_VIDEO_SIZE;
            }

            return true;
        });

        if (invalidSize) {
            const limit = invalidSize.type.startsWith("image/")
                ? "100 MB"
                : "1 GB";

            setMessage(
                `"${invalidSize.name}" supera il limite di ${limit}.`
            );
            return;
        }

        setFiles(selectedFiles);
        setUploadedCount(0);
        setMessage("");

        event.target.value = "";
    }

    async function uploadFile(file: File) {
        const sessionResponse = await fetch("/foto/api/session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fileName: file.name,
                mimeType: file.type,
                fileSize: file.size,
            }),
        });

        const sessionData = await sessionResponse.json();

        if (!sessionResponse.ok || !sessionData.success) {
            throw new Error(
                sessionData.message ||
                `Impossibile iniziare il caricamento di "${file.name}".`
            );
        }

        const uploadUrl = sessionData.uploadUrl;

        let start = 0;

        while (start < file.size) {
            const end = Math.min(
                start + CHUNK_SIZE,
                file.size
            );

            const chunk = file.slice(start, end);

            const response = await fetch(
                "/foto/api/upload-chunk",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": file.type,
                        "Content-Length": String(chunk.size),
                        "Content-Range":
                            `bytes ${start}-${end - 1}/${file.size}`,
                        "X-Upload-Url": uploadUrl,
                    },
                    body: chunk,
                }
            );

            const responseText = await response.text();

            if (response.status === 308) {
                const range = response.headers.get("Range");

                if (range) {
                    const match = range.match(
                        /bytes=0-(\d+)/
                    );

                    if (match) {
                        start = Number(match[1]) + 1;
                    } else {
                        start = end;
                    }
                } else {
                    start = end;
                }

                continue;
            }

            if (response.ok) {
                start = file.size;
                continue;
            }

            throw new Error(
                `Errore durante il caricamento di "${file.name}".`
            );
        }
    }

    async function handleUpload() {
        if (files.length === 0) {
            setMessage("Seleziona almeno un file.");
            return;
        }

        setUploading(true);
        setMessage("");
        setUploadedCount(0);

        let nextIndex = 0;
        let completed = 0;
        let firstError: string | null = null;

        async function worker() {
            while (true) {
                const currentIndex = nextIndex++;

                if (currentIndex >= files.length) {
                    return;
                }

                const file = files[currentIndex];

                try {
                    await uploadFile(file);

                    completed++;
                    setUploadedCount(completed);
                } catch (error) {
                    if (!firstError) {
                        firstError =
                            error instanceof Error
                                ? error.message
                                : `Errore durante il caricamento di "${file.name}".`;
                    }
                }
            }
        }

        const workers = Array.from(
            {
                length: Math.min(
                    CONCURRENT_UPLOADS,
                    files.length
                ),
            },
            () => worker()
        );

        await Promise.all(workers);

        setUploading(false);

        if (firstError) {
            setMessage(
                `Caricamento parziale: ${completed} di ${files.length} file completati. ${firstError}`
            );
        } else {
            setFiles([]);
            setMessage(
                "Caricamento completato. Grazie per aver condiviso i tuoi ricordi! ❤️"
            );
        }
    }

    return (
        <main className="min-h-screen bg-[#f5f1e8] px-6 py-12">
            <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-4xl font-serif text-[#4d4d3c]">
                    Alice & Giorgio
                </h1>

                <p className="mt-4 text-lg text-[#6b6b55]">
                    Condividi con noi le foto e i video del nostro giorno
                    speciale.
                </p>

                <div className="mt-10">
                    <input
                        type="file"
                        accept={ALLOWED_TYPES.join(",")}
                        multiple
                        onChange={handleFileChange}
                        disabled={uploading}
                        className="w-full rounded-xl border border-[#828265] bg-white p-4"
                    />
                </div>

                {files.length > 0 && (
                    <div className="mt-6 text-left text-[#4d4d3c]">
                        <p className="font-medium">
                            {files.length} file selezionati
                        </p>

                        <ul className="mt-3 max-h-64 space-y-1 overflow-y-auto text-sm">
                            {files.map((file, index) => (
                                <li
                                    key={`${file.name}-${file.size}-${index}`}
                                >
                                    {file.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <button
                    type="button"
                    onClick={handleUpload}
                    disabled={
                        uploading ||
                        files.length === 0
                    }
                    className="mt-8 rounded-xl bg-[#828265] px-8 py-4 text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {uploading
                        ? `Caricamento ${uploadedCount}/${files.length}...`
                        : "Carica foto e video"}
                </button>

                {message && (
                    <p
                        className="mt-6 text-[#4d4d3c]"
                        aria-live="polite"
                    >
                        {message}
                    </p>
                )}
            </div>
        </main>
    );
}