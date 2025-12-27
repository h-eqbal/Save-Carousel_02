import Link from 'next/link';
import React from 'react';

export default function Header() {
    return (
        <header className="w-full border-b-2 border-[#8c8c8c] px-[70px] py-[32px] bg-[#f4f4f4]">
            <div className="flex items-center justify-between w-full max-w-[1440px] mx-auto">
                <Link href="/" className="font-serif text-[74px] leading-none text-black">
                    SaveCarousel
                </Link>
                <nav className="flex items-center gap-[44px]">
                    <Link href="#how-it-works" className="font-sans text-[28px] text-black underline decoration-solid underline-offset-4">
                        How it work?
                    </Link>
                    <Link href="#features" className="font-sans text-[28px] text-black underline decoration-solid underline-offset-4">
                        Features
                    </Link>
                </nav>
            </div>
        </header>
    );
}
