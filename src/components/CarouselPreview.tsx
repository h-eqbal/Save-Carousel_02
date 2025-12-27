import React from 'react';
import Image from 'next/image';

interface CarouselPreviewProps {
    images: string[];
}

export default function CarouselPreview({ images }: CarouselPreviewProps) {
    return (
        <div className="w-full max-w-[1200px] flex flex-col items-center gap-8 py-10">
            <h3 className="font-serif text-[48px]">Preview</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                {images.map((src, idx) => (
                    <div key={idx} className="relative aspect-square w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                        <Image
                            src={src}
                            alt={`Slide ${idx + 1}`}
                            fill
                            className="object-cover"
                            unoptimized // for external urls
                            referrerPolicy="no-referrer"
                        />
                        <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                            {idx + 1}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
