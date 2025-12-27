import React from 'react';

const steps = [
    {
        step: 'Step 1',
        title: 'Copy your Instagram post',
        description: 'Copy the link in post'
    },
    {
        step: 'Step 2',
        title: 'Paste the link in the placeholder box',
        description: ''
    },
    {
        step: 'Step 3',
        title: 'Wait for your PDF or PNG to be converted',
        description: ''
    },
    {
        step: 'Step 4',
        title: 'Voila! Freshly baked Insta carousels into PDF or PNG',
        description: ''
    }
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="w-full flex flex-col items-center py-[100px] px-[70px]">
            <h2 className="font-serif text-[64px] mb-[30px] text-black">How it Works?</h2>
            <p className="font-sans text-[24px] text-center max-w-[900px] mb-[80px] text-[#4c4c4c]">
                We stripped away the clutter. No ads, no popups, just purely functional extraction technology.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] w-full max-w-[800px]">
                {steps.map((item, index) => (
                    <div key={index} className="bg-white border border-[#8c8c8c] p-[40px] flex flex-col gap-[15px] min-h-[220px]">
                        <span className="font-sans text-[#8c8c8c] text-[16px]">{item.step}</span>
                        <h3 className="font-bold font-sans text-[24px] text-black leading-tight">
                            {item.title}
                        </h3>
                        {item.description && (
                            <p className="font-sans text-[16px] text-[#666]">
                                {item.description}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
