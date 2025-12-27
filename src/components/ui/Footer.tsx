import Link from 'next/link';
import React from 'react';

export default function Footer() {
    return (
        <footer className="w-full px-[70px] py-[60px] bg-[#f4f4f4]">
            <div className="flex flex-col items-start gap-8 w-full max-w-[1440px] mx-auto">
                <Link href="/" className="font-serif text-[74px] leading-none text-black">
                    SaveCarousel
                </Link>
                <div className="flex flex-col gap-5 items-start">
                    <Link href="#how-it-works" className="font-sans text-[24px] text-black underline decoration-solid underline-offset-4">
                        How it work?
                    </Link>
                    <Link href="#features" className="font-sans text-[24px] text-black underline decoration-solid underline-offset-4">
                        Features
                    </Link>
                </div>
            </div>
        </footer>
    );
}
