import React from 'react';
import Image from 'next/image';

const features = [
    {
        icon: '/assets/mobile-icon.svg',
        title: 'Native Mobile Feel',
        description: 'Designed as a PWA. Add to your home screen and it behaves exactly like a native iOS app.'
    },
    {
        icon: '/assets/carousel-icon.svg',
        title: 'Carousel Extraction',
        description: 'Our engine intelligently scrolls through Instagram carousels to capture every single slide.'
    },
    {
        icon: '/assets/lock-icon.svg',
        title: 'Zero Data Stored',
        description: 'We act as a pass-through tunnel. Your links and downloaded content never stay on our servers.'
    },
    {
        icon: '/assets/globe-icon.svg',
        title: 'Universal Support',
        description: 'Works on any public Instagram post, tweet, or article that supports open graph standards.'
    },
    {
        icon: '/assets/lightning-icon.svg',
        title: 'Lightning Fast',
        description: 'Powered by edge-caching and optimized serverless functions for sub-second response times.'
    },
    {
        icon: '/assets/pdf-icon.svg',
        title: 'Smart PDF Formatting',
        description: 'Images are automatically scaled and centered on A4 pages for perfect printing.'
    }
];

export default function Features() {
    return (
        <section id="features" className="w-full flex flex-col items-center py-[100px] px-[70px]">
            <h2 className="font-serif text-[64px] mb-[30px] text-black">Features</h2>
            <p className="font-sans text-[24px] text-center max-w-[900px] mb-[80px] text-[#4c4c4c]">
                We stripped away the clutter. No ads, no popups, just purely functional extraction technology.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] w-full max-w-[1200px]">
                {features.map((feature, index) => (
                    <div key={index} className="bg-white border border-[#8c8c8c] p-[40px] flex flex-col items-start gap-[20px] h-full min-h-[300px] transition-all duration-300 ease-in-out hover:shadow-[0px_10px_30px_rgba(0,0,0,0.1)] hover:-translate-y-2 hover:border-black cursor-pointer group">
                        <div className="w-[40px] h-[40px] relative">
                            <Image src={feature.icon} alt={feature.title} fill className="object-contain transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        <h3 className="font-bold font-sans text-[20px] text-black pt-4">{feature.title}</h3>
                        <p className="font-sans text-[16px] text-[#666] leading-relaxed">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
