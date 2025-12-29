'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/utils/cn';
import axios from 'axios';

interface HeroProps {
    onDataLoaded?: (data: unknown) => void;
}

// function to trigger download from blob
const downloadBlob = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
};

export default function Hero({ onDataLoaded }: HeroProps) {
    const searchParams = useSearchParams();
    // Initialize state with 'url' query param if present
    const [url, setUrl] = useState(searchParams?.get('url') || '');
    const [format, setFormat] = useState<'pdf' | 'png'>('pdf');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [status, setStatus] = useState('');

    // Optional: Auto-start if URL has a specific trigger, but for now just pre-fill is safer


    const handleDownload = async () => {
        if (!url) {
            setError('Please enter a valid URL');
            return;
        }
        setError('');
        setLoading(true);
        setStatus('Fetching carousel data...');

        try {
            // 1. Fetch Carousel Data
            const res = await axios.post('/api/fetch-carousel', { url });

            if (res.data.success) {
                const images = res.data.data.images;

                // Show preview
                if (onDataLoaded) {
                    onDataLoaded(res.data.data);
                }

                // 2. Export based on format
                setStatus(`Generating ${format.toUpperCase()}...`);

                if (format === 'pdf') {
                    const pdfRes = await axios.post('/api/export/pdf', { images }, { responseType: 'blob' });
                    downloadBlob(pdfRes.data, 'carousel.pdf');
                } else {
                    const pngRes = await axios.post('/api/export/png', { images }, { responseType: 'blob' });
                    downloadBlob(pngRes.data, 'carousel_images.zip');
                }

                setStatus('Done!');
            } else {
                setError(res.data.error || 'Failed to fetch');
            }
        } catch (err) {
            console.error(err);
            setError('Failed to process request. Please check the URL.');
        } finally {
            setLoading(false);
            setStatus('');
        }
    };

    return (
        <section className="flex flex-col items-center justify-center w-full pt-[100px] pb-[50px] gap-[60px]">
            {/* Title Section */}
            <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex items-center gap-4">
                    <h1 className="font-serif text-[80px] leading-tight text-black">
                        Save posts instantly
                    </h1>
                    <Image src="/💨.png" alt="cloud" width={80} height={80} className="mb-4" />
                </div>

                <div className="flex items-center gap-4">
                    <h2 className="font-serif text-[80px] leading-tight text-black">
                        One click. Done
                    </h2>
                    <Image src="/☑️.png" alt="check" width={80} height={80} className="mb-2" />
                </div>

                <p className="font-sans text-[24px] text-[#4c4c4c] mt-4">
                    Why not try yourself here
                </p>
            </div>

            {/* Card Section */}
            <div className="bg-white rounded-[20px] shadow-[0px_4px_24px_rgba(0,0,0,0.08)] p-[50px] w-full max-w-[800px] flex flex-col items-center gap-[40px] border border-[#d9d9d9]">
                <h3 className="font-serif text-[32px] text-center text-black max-w-[500px] leading-snug">
                    Hey there! Let&rsquo;s turn your link into some awesome slides!
                </h3>

                <div className="w-full flex flex-col gap-[30px]">
                    {/* Input */}
                    <div className="relative w-full">
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 w-[24px] h-[24px]">
                            <Image src="/assets/link-icon.svg" alt="link" fill className="object-contain" />
                        </div>
                        <input
                            type="text"
                            placeholder="Enter your insta post link"
                            className="w-full h-[70px] pl-[60px] pr-[30px] rounded-[12px] border border-[#8c8c8c] text-[20px] font-sans outline-none focus:border-black transition-colors placeholder:text-[#8c8c8c]"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mt-[-20px] ml-2">{error}</p>}

                    {/* Format Selection */}
                    <div className="grid grid-cols-2 gap-6 w-full">
                        <button
                            onClick={() => setFormat('pdf')}
                            className={cn(
                                "h-[80px] rounded-[12px] flex items-center px-6 gap-4 transition-all",
                                format === 'pdf' ? "border-[3px] border-black bg-[#f2f2f2] shadow-lg transform scale-[1.02]" : "border border-[#8c8c8c] bg-white hover:bg-gray-50 hover:border-gray-400"
                            )}
                        >
                            <Image src="/mingcute_document-line.svg" alt="PDF" width={32} height={32} />
                            <div className="flex flex-col items-start">
                                <span className="font-bold text-[18px] font-sans">PDF</span>
                                <span className="text-[14px] text-[#666] font-sans">Document</span>
                            </div>
                        </button>

                        <button
                            onClick={() => setFormat('png')}
                            className={cn(
                                "h-[80px] rounded-[12px] flex items-center px-6 gap-4 transition-all",
                                format === 'png' ? "border-[3px] border-black bg-[#f2f2f2] shadow-lg transform scale-[1.02]" : "border border-[#8c8c8c] bg-white hover:bg-gray-50 hover:border-gray-400"
                            )}
                        >
                            <Image src="/ic_outline-image.svg" alt="PNG" width={32} height={32} />
                            <div className="flex flex-col items-start">
                                <span className="font-bold text-[18px] font-sans">PNG</span>
                                <span className="text-[14px] text-[#666] font-sans">Image</span>
                            </div>
                        </button>
                    </div>

                    {/* Download Button */}
                    <button
                        onClick={handleDownload}
                        disabled={loading}
                        className="h-[60px] w-[200px] mx-auto border-[2px] border-black rounded-[8px] font-bold text-[18px] hover:bg-black hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-sans mt-4"
                    >
                        {loading ? (status || 'Processing...') : 'Download Your Post'}
                    </button>
                </div>
            </div>
        </section>
    );
}
