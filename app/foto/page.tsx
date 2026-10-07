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
const CHUNK_SIZE = 4 * 1024 * 1024; // 4 MB

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
                `The file "${invalidType.name}" is not supported.`
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
                `"${invalidSize.name}" exceeds the ${limit} limit.`
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
                `Unable to start the upload of "${file.name}".`
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
                `Error while uploading "${file.name}".`
            );
        }
    }

    async function handleUpload() {
        if (files.length === 0) {
            setMessage("Please select at least one file.");
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
                                : `Error while uploading "${file.name}".`;
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
                `Partial upload: ${completed} of ${files.length} files completed. ${firstError}`
            );
        } else {
            setFiles([]);
            setMessage(
                "upload-complete"
            );
        }
    }

    const isCompleted = message === "upload-complete";

    return (
        <main className="min-h-screen bg-[#f4f0e6] px-5 py-10 text-[#4d4d3c] sm:px-8 sm:py-16">
            <div className="mx-auto max-w-2xl">
                {/* Header */}
                <div className="text-center">
                    <p className="text-m uppercase tracking-[0.28em] text-[#7f8060] font-normal">
                        Alice & Giorgio
                    </p>

                    <h1 className="mt-4 font-serif text-5xl leading-tight text-[#55563f] sm:text-6xl">
                        Photo & Video
                    </h1>

                    <h2 className="font-serif text-5xl leading-tight text-[#55563f] sm:text-6xl">
                        Gallery
                    </h2>

                    <p className="mt-5 text-sm uppercase tracking-[0.22em] text-[#88896d]">
                        4 September 2027
                    </p>

                    <div className="mx-auto mt-6 h-px w-16 bg-[#a7a889] font-normal" />

                    <p className="mx-auto mt-6 max-w-lg text-base leading-7 text-[#77785f]">
                        Share the photos and videos you captured
                        during our special day.
                    </p>
                </div>

                {/* Upload area */}
                <div className="mt-8">
                    <label
                        htmlFor="photo-upload"
                        className={`
                            group flex cursor-pointer flex-col items-center
                            rounded-3xl border border-dashed
                            border-[#9b9d78] bg-[#faf8f1]
                            px-6 py-7 text-center
                            transition-all duration-300
                            hover:border-[#6f7655]
                            hover:bg-[#f8f6ed]
                            ${uploading
                                ? "pointer-events-none opacity-60"
                                : ""
                            }
                        `}
                    >
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#dfe2c8] text-[#697052] transition-transform duration-300 group-hover:scale-105">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                className="h-9 w-9"
                                aria-hidden="true"
                            >
                                <rect
                                    x="3"
                                    y="4"
                                    width="18"
                                    height="16"
                                    rx="2"
                                />
                                <circle
                                    cx="8.5"
                                    cy="9"
                                    r="1.5"
                                />
                                <path d="m3 16 5-5 4 4 2.5-2.5L21 17" />
                            </svg>
                        </div>

                        <p className="mt-4 font-serif text-2xl text-[#55563f]">
                            Share your memories
                        </p>

                        <p className="mt-1 max-w-sm text-sm leading-6 text-[#85866d]">
                            Choose one or more photos or videos
                            from your device.
                        </p>

                        <span className="mt-5 rounded-full bg-[#727955] px-6 py-3 text-sm font-medium text-white transition-colors duration-200 group-hover:bg-[#626947]">
                            Choose files
                        </span>

                        <p className="mt-3 text-xs text-[#9a9b83]">
                            Photos up to 100 MB · Videos up to 1 GB
                        </p>

                        <input
                            id="photo-upload"
                            type="file"
                            accept={ALLOWED_TYPES.join(",")}
                            multiple
                            onChange={handleFileChange}
                            disabled={uploading}
                            className="sr-only"
                        />
                    </label>
                </div>

                {/* Selected files */}
                {files.length > 0 && (
                    <div className="mt-6 rounded-2xl bg-[#e7e5d5] px-5 py-5">
                        <div className="flex items-center justify-between gap-4">
                            <p className="text-sm font-medium uppercase tracking-[0.12em] text-[#62654b]">
                                Selected files
                            </p>

                            <span className="rounded-full bg-[#d2d5b8] px-3 py-1 text-xs font-medium text-[#62654b]">
                                {files.length}
                            </span>
                        </div>

                        <ul className="mt-4 max-h-56 space-y-2 overflow-y-auto">
                            {files.map((file, index) => (
                                <li
                                    key={`${file.name}-${file.size}-${index}`}
                                    className="flex items-center gap-3 rounded-xl bg-[#f5f3ea] px-3 py-2.5 text-sm text-[#656750]"
                                >
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#dfe2c8] text-[#697052]">
                                        {file.type.startsWith("video/") ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                className="h-4 w-4"
                                                aria-hidden="true"
                                            >
                                                <rect
                                                    x="3"
                                                    y="5"
                                                    width="13"
                                                    height="14"
                                                    rx="2"
                                                />
                                                <path d="m16 10 5-3v10l-5-3z" />
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                className="h-4 w-4"
                                                aria-hidden="true"
                                            >
                                                <rect
                                                    x="3"
                                                    y="4"
                                                    width="18"
                                                    height="16"
                                                    rx="2"
                                                />
                                                <circle
                                                    cx="8.5"
                                                    cy="9"
                                                    r="1.5"
                                                />
                                                <path d="m3 16 5-5 4 4 2.5-2.5L21 17" />
                                            </svg>
                                        )}
                                    </span>

                                    <span className="min-w-0 flex-1 truncate">
                                        {file.name}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Upload button */}
                <button
                    type="button"
                    onClick={handleUpload}
                    disabled={
                        uploading ||
                        files.length === 0
                    }
                    className="mt-7 w-full rounded-full bg-[#727955] px-8 py-4 text-sm font-medium tracking-wide text-white transition-all duration-200 hover:bg-[#626947] disabled:cursor-not-allowed disabled:opacity-40"
                >
                    {uploading
                        ? `Uploading ${uploadedCount}/${files.length}...`
                        : "Upload photos & videos"}
                </button>

                {/* Status */}
                {message && !isCompleted && (
                    <div
                        className="mt-6 rounded-2xl bg-[#e7e5d5] px-5 py-4 text-center text-sm leading-6 text-[#62654b]"
                        aria-live="polite"
                    >
                        {message}
                    </div>
                )}

                {/* Success */}
                {isCompleted && (
                    <div
                        className="mt-8 rounded-3xl border border-[#b4b792] bg-[#e4e6d2] px-6 py-8 text-center"
                        aria-live="polite"
                    >
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#727955] text-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                className="h-7 w-7"
                                aria-hidden="true"
                            >
                                <path
                                    d="m5 12 4 4L19 6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>

                        <p className="mt-5 font-serif text-3xl text-[#55563f]">
                            Grazie · Thanks · Merci · Danke
                        </p>

                        <p className="mt-3 text-sm leading-6 text-[#6e7056]">
                            Upload completed.
                            <br />
                            Thank you for sharing your memories! ❤️
                        </p>
                    </div>
                )}

                {/* Footer note */}
                <p className="mt-5 text-center text-xs leading-5 text-[#999a82]">
                    Your original photos and videos are uploaded
                    without compression.
                </p>
            </div>
        </main>
    );
}